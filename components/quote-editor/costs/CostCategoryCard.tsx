"use client";

import { useState } from "react";
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
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2 } from "lucide-react";

import Button from "@/components/ui/Button";
import CostInput from "@/components/ui/CostInput";
import { QuoteSection } from "../types";
import CostItemRow from "./CostItemRow";
import {
  createQuoteCostItem,
  deleteQuoteCostCategory,
  reorderQuoteCostItems,
  updateQuoteCostCategory,
} from "./actions";

type Props = {
  quoteId: number;
  section: QuoteSection;
  enabled: boolean;
  onDeleted: () => void;
};

export default function CostCategoryCard({
  quoteId,
  section,
  enabled,
  onDeleted,
}: Props) {
  const [items, setItems] = useState(section.quote_items || []);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: section.id,
    disabled: !enabled,
  });

  const itemSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  async function handleUpdateTitle(value: string) {
    await updateQuoteCostCategory(quoteId, section.id, value);
  }

  async function handleDeleteCategory() {
    const confirmed = window.confirm(
      "¿Seguro que quieres borrar esta categoría? También se borrarán sus items.",
    );

    if (!confirmed) return;

    await deleteQuoteCostCategory(quoteId, section.id);
    onDeleted();
  }

  async function handleCreateItem() {
    const newItem = await createQuoteCostItem(quoteId, section.id);
    setItems((currentItems) => [...currentItems, newItem]);
  }

  async function handleItemDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newItems = arrayMove(items, oldIndex, newIndex);

    setItems(newItems);

    await reorderQuoteCostItems(
      quoteId,
      newItems.map((item) => item.id),
    );
  }

  const hasItems = Boolean(items.length);

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`flex gap-2 items-stretch rounded-2xl bg-background p-2 ${isDragging ? "opacity-60" : ""}`}
    >
      <button
        type="button"
        disabled={!enabled}
        className="flex w-8 cursor-grab items-center justify-center text-text-muted disabled:cursor-not-allowed"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={18} />
      </button>

      <div className="w-full">
        <div className="mb-2 flex items-center gap-3">
          <CostInput
            defaultValue={section.title || ""}
            placeholder="Categoría"
            disabled={!enabled}
            onBlur={(event) => handleUpdateTitle(event.target.value)}
            className="bg-red"
          />
        </div>

        <div className="rounded-xl bg-background-dark p-2">
          {hasItems ? (
            <DndContext
              id={`cost-items-${section.id}`}
              sensors={itemSensors}
              collisionDetection={closestCenter}
              onDragEnd={handleItemDragEnd}
            >
              <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {items.map((item) => (
                    <CostItemRow
                      key={item.id}
                      quoteId={quoteId}
                      item={item}
                      enabled={enabled}
                      onDeleted={() =>
                        setItems((currentItems) =>
                          currentItems.filter(
                            (currentItem) => currentItem.id !== item.id,
                          ),
                        )
                      }
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <div className="rounded-lg border border-dashed border-input-border p-6">
              <div className="flex min-h-24 items-center justify-center gap-8">
                <p className="text-sm text-text-muted">No cost items yet.</p>

                <Button
                  type="button"
                  disabled={!enabled}
                  onClick={handleCreateItem}
                >
                  <Plus size={14} />
                  Add item
                </Button>
              </div>
            </div>
          )}

          {hasItems && (
            <div className="mt-2 flex justify-end">
              <Button
                type="button"
                disabled={!enabled}
                onClick={handleCreateItem}
              >
                <Plus size={14} />
                Add item
              </Button>
            </div>
          )}
        </div>
      </div>

      <Button
        type="button"
        variant="noBorderDanger"
        disabled={!enabled}
        onClick={handleDeleteCategory}
        className="px-3"
      >
        <Trash2 size={16} />
      </Button>
    </article>
  );
}
