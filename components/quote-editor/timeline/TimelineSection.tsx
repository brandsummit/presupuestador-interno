"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
} from "@dnd-kit/sortable";

import { Quote, TimelineArea } from "../types";
import SectionHeader from "../SectionHeader";
import Button from "@/components/ui/Button";

import TimelineAreaCard from "./TimelineAreaCard";

import { createTimelineArea, reorderTimelineAreas } from "./actions";

const TIMELINE_COLORS = [
  "#AD7BDE",
  "#7BB8DE",
  "#DE7B7B",
  "#83CF98",
  "#8397CF",
  "#E09E5F",
];

type Props = {
  quote: Quote;
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

export default function TimelineSection({ quote, enabled, onToggle }: Props) {
  const [areas, setAreas] = useState<TimelineArea[]>(
    quote.timeline_areas || [],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  async function handleCreateArea() {
    const newArea = await createTimelineArea(quote.id);

    setAreas((currentAreas) => [...currentAreas, newArea]);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = areas.findIndex((area) => area.id === active.id);

    const newIndex = areas.findIndex((area) => area.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newAreas = arrayMove(areas, oldIndex, newIndex);

    setAreas(newAreas);

    await reorderTimelineAreas(
      quote.id,
      newAreas.map((area) => area.id),
    );
  }

  const hasAreas = Boolean(areas.length);

  return (
    <section className="rounded-lg bg-background-light p-6">
      <SectionHeader title="Timeline" enabled={enabled} onToggle={onToggle} />

      <div className={!enabled ? "opacity-50 cursor-not-allowed" : ""}>
        <div className={!enabled ? "pointer-events-none" : ""}>
          {hasAreas ? (
            <div className="mt-5 space-y-8 rounded-lg">
              <DndContext
                id={`timeline-areas-${quote.id}`}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={areas.map((area) => area.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-8">
                    {areas.map((area, index) => (
                      <TimelineAreaCard
                        key={area.id}
                        quoteId={quote.id}
                        area={area}
                        enabled={enabled}
                        color={TIMELINE_COLORS[index % TIMELINE_COLORS.length]}
                        onDeleted={() =>
                          setAreas((currentAreas) =>
                            currentAreas.filter(
                              (currentArea) => currentArea.id !== area.id,
                            ),
                          )
                        }
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              <div className="flex justify-end">
                <Button
                  type="button"
                  disabled={!enabled}
                  onClick={handleCreateArea}
                >
                  <Plus size={14} />
                  Add area
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-input-border p-6">
              <div className="flex min-h-36 items-center justify-center gap-8">
                <p className="text-sm text-text-muted">No areas yet.</p>

                <Button
                  type="button"
                  disabled={!enabled}
                  onClick={handleCreateArea}
                >
                  <Plus size={14} />
                  Add area
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
