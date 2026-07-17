"use client";

import { useState } from "react";
import { GripVertical, Plus } from "lucide-react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Button from "@/components/ui/Button";
import CostInput from "@/components/ui/CostInput";
import ConfirmIconDeleteButton from "@/components/ui/ConfirmIconDeleteButton";

import { Quote, SummaryPaymentItem } from "./types";
import SectionHeader from "./SectionHeader";

import {
  createSummaryPaymentItem,
  deleteSummaryPaymentItem,
  reorderSummaryPaymentItems,
  updateQuoteStartAt,
  updateSummaryPaymentItem,
} from "./summary/actions";

type Props = {
  quote: Quote;
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

type PaymentItemRowProps = {
  quoteId: number;
  item: SummaryPaymentItem;
  enabled: boolean;
  percentage: number;
  onDeleted: () => void;
};

function getPaymentPercentages(itemCount: number) {
  if (itemCount <= 0) return [];

  const remainingPercentage = 50;
  const basePercentage = Math.floor(
    remainingPercentage / itemCount,
  );
  const remainder =
    remainingPercentage - basePercentage * itemCount;

  return Array.from({ length: itemCount }, (_, index) =>
    index < remainder
      ? basePercentage + 1
      : basePercentage,
  );
}

function getDateInputValue(value: string | null) {
  if (!value) return "";

  return value.slice(0, 10);
}

function PaymentItemRow({
  quoteId,
  item,
  enabled,
  percentage,
  onDeleted,
}: PaymentItemRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled: !enabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  async function handleDelete() {
    await deleteSummaryPaymentItem(quoteId, item.id);
    onDeleted();
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        grid gap-2 rounded-lg bg-background p-2
        md:grid-cols-[40px_100px_1fr_auto]
        ${isDragging ? "opacity-60" : ""}
      `}
    >
      <button
        type="button"
        disabled={!enabled}
        className="flex cursor-grab items-center justify-center text-text-muted disabled:cursor-not-allowed"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={16} />
      </button>

      <div className="flex min-h-10 items-center justify-center rounded-md bg-background-dark px-3 font-display text-xl">
        {percentage}%
      </div>

      <CostInput
        defaultValue={item.label || ""}
        placeholder="Ej. Al validar branding"
        disabled={!enabled}
        onBlur={(event) =>
          updateSummaryPaymentItem(
            quoteId,
            item.id,
            event.target.value,
          )
        }
      />

      <ConfirmIconDeleteButton
        disabled={!enabled}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default function SummarySection({
  quote,
  enabled,
  onToggle,
}: Props) {
  const [items, setItems] = useState<SummaryPaymentItem[]>(
    quote.summary_payment_items || [],
  );

  const [startAt, setStartAt] = useState(
    getDateInputValue(quote.start_at),
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const percentages = getPaymentPercentages(items.length);
  const hasItems = items.length > 0;

  async function handleStartAtChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const value = event.target.value;

    setStartAt(value);

    await updateQuoteStartAt(
      quote.id,
      value || null,
    );
  }

  async function handleCreateItem() {
    const newItem = await createSummaryPaymentItem(quote.id);

    setItems((currentItems) => [
      ...currentItems,
      newItem,
    ]);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(
      (item) => item.id === active.id,
    );

    const newIndex = items.findIndex(
      (item) => item.id === over.id,
    );

    if (oldIndex === -1 || newIndex === -1) return;

    const newItems = arrayMove(
      items,
      oldIndex,
      newIndex,
    );

    setItems(newItems);

    await reorderSummaryPaymentItems(
      quote.id,
      newItems.map((item) => item.id),
    );
  }

  return (
    <section className="rounded-lg bg-background-light p-6">
      <SectionHeader
        title="Resumen"
        enabled={enabled}
        onToggle={onToggle}
      />

      <div
        className={
          !enabled
            ? "cursor-not-allowed opacity-50"
            : ""
        }
      >
        <div
          className={
            !enabled
              ? "pointer-events-none"
              : ""
          }
        >
          <div className="mt-5 rounded-2xl bg-background p-2">
            <div className="mb-2 grid gap-2 rounded-lg bg-background-dark p-2 md:grid-cols-[240px_1fr]">
              <div className="flex min-h-12 items-center rounded-md bg-background px-4 font-display text-xl">
                Día de arranque
              </div>

              <input
                type="date"
                value={startAt}
                disabled={!enabled}
                onChange={handleStartAtChange}
                className="min-h-12 w-full rounded-md border border-input-border bg-background px-4 text-sm outline-none disabled:cursor-not-allowed"
              />
            </div>

            <div className="grid gap-2 rounded-lg bg-background-dark p-2 md:grid-cols-[140px_1fr]">
              <div className="flex min-h-12 items-center justify-center rounded-md bg-background px-4 font-display text-2xl">
                50%
              </div>

              <div className="flex min-h-12 items-center rounded-md bg-background px-4 text-sm">
                Para arrancar el proyecto
              </div>
            </div>

            <div className="mt-2 rounded-xl bg-background-dark p-2">
              {hasItems ? (
                <>
                  <DndContext
                    id={`summary-payment-items-${quote.id}`}
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={items.map(
                        (item) => item.id,
                      )}
                      strategy={
                        verticalListSortingStrategy
                      }
                    >
                      <div className="space-y-2">
                        {items.map(
                          (item, index) => (
                            <PaymentItemRow
                              key={item.id}
                              quoteId={quote.id}
                              item={item}
                              enabled={enabled}
                              percentage={
                                percentages[index]
                              }
                              onDeleted={() =>
                                setItems(
                                  (
                                    currentItems,
                                  ) =>
                                    currentItems.filter(
                                      (
                                        currentItem,
                                      ) =>
                                        currentItem.id !==
                                        item.id,
                                    ),
                                )
                              }
                            />
                          ),
                        )}
                      </div>
                    </SortableContext>
                  </DndContext>

                  <div className="mt-2 flex justify-end">
                    <Button
                      type="button"
                      disabled={!enabled}
                      onClick={handleCreateItem}
                    >
                      <Plus size={14} />
                      Añadir pago
                    </Button>
                  </div>
                </>
              ) : (
                <div className="rounded-lg border border-dashed border-input-border p-6">
                  <div className="flex min-h-24 items-center justify-center gap-8">
                    <p className="text-base text-text-muted">
                      No hay pagos adicionales.
                    </p>

                    <Button
                      type="button"
                      disabled={!enabled}
                      onClick={handleCreateItem}
                    >
                      <Plus size={14} />
                      Añadir pago
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}