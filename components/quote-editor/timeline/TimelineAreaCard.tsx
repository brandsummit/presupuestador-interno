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
import { GripVertical, Plus } from "lucide-react";

import Button from "@/components/ui/Button";
import CostInput from "@/components/ui/CostInput";

import { TimelineArea } from "../types";

import TimelineItemRow from "./TimelineItemRow";

import {
  createTimelineItem,
  deleteTimelineArea,
  reorderTimelineItems,
  updateTimelineArea,
} from "./actions";

import ConfirmIconDeleteButton from "@/components/ui/ConfirmIconDeleteButton";

type Props = {
  quoteId: number;
  area: TimelineArea;
  enabled: boolean;
  onDeleted: () => void;
  color: string;
};

export default function TimelineAreaCard({
  quoteId,
  area,
  enabled,
  onDeleted,
  color,
}: Props) {
  const [items, setItems] = useState(
  [...(area.timeline_items || [])].sort(
    (a, b) => (a.position || 0) - (b.position || 0),
  ),
);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: area.id,
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
    await updateTimelineArea(quoteId, area.id, value);
  }

  async function handleDeleteArea() {
    await deleteTimelineArea(quoteId, area.id);

    onDeleted();
  }

  async function handleCreateItem() {
    const newItem = await createTimelineItem(quoteId, area.id);

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

    await reorderTimelineItems(
      quoteId,
      newItems.map((item) => item.id),
    );
  }

  const hasItems = Boolean(items.length);

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`flex items-stretch gap-2 rounded-2xl bg-background p-2 ${
        isDragging ? "opacity-60" : ""
      }`}
    >
      <button
        type="button"
          style={{
            backgroundColor: color,
          }}
        disabled={!enabled}
        className="flex w-8 cursor-grab items-center rounded-lg justify-center text-background disabled:cursor-not-allowed"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={18} />
      </button>

      <div className="w-full">
        <div
          className="mb-2 flex items-center gap-3"
        >
          <CostInput
            style={{
              color,
            }}
            defaultValue={area.title || ""}
            placeholder="Area"
            disabled={!enabled}
            onBlur={(event) => handleUpdateTitle(event.target.value)}
          />
        </div>

        <div className="rounded-xl bg-background-dark p-2">
          {hasItems ? (
            <DndContext
              id={`timeline-items-${area.id}`}
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
                    <TimelineItemRow
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
                <p className="text-base text-text-muted">
                  No timeline items yet.
                </p>

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

      <ConfirmIconDeleteButton
        disabled={!enabled}
        onConfirm={handleDeleteArea}
      />
    </article>
  );
}
