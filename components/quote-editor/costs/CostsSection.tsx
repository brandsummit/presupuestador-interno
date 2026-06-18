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

import { Quote, QuoteSection } from "../types";
import SectionHeader from "../SectionHeader";
import Button from "@/components/ui/Button";
import CostCategoryCard from "./CostCategoryCard";
import { createQuoteCostCategory, reorderQuoteCostCategories } from "./actions";

type Props = {
  quote: Quote;
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

export default function CostsSection({ quote, enabled, onToggle }: Props) {
  const [sections, setSections] = useState<QuoteSection[]>(
    quote.quote_sections || [],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  async function handleCreateCategory() {
    const newSection = await createQuoteCostCategory(quote.id);
    setSections((currentSections) => [...currentSections, newSection]);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((section) => section.id === active.id);
    const newIndex = sections.findIndex((section) => section.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newSections = arrayMove(sections, oldIndex, newIndex);

    setSections(newSections);

    await reorderQuoteCostCategories(
      quote.id,
      newSections.map((section) => section.id),
    );
  }

  const hasCategories = Boolean(sections.length);

  return (
    <section className="rounded-lg bg-background-light p-6">
      <SectionHeader title="Costes" enabled={enabled} onToggle={onToggle} />
      <div className={!enabled ? "opacity-50 cursor-not-allowed" : ""}>
        <div className={!enabled ? "pointer-events-none" : ""}>
          {hasCategories ? (
            <div className="space-y-8 rounded-lg mt-5">
              <DndContext
                id={`cost-categories-${quote.id}`}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sections.map((section) => section.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-8">
                    {sections.map((section) => (
                      <CostCategoryCard
                        key={section.id}
                        quoteId={quote.id}
                        section={section}
                        enabled={enabled}
                        onDeleted={() =>
                          setSections((currentSections) =>
                            currentSections.filter(
                              (currentSection) =>
                                currentSection.id !== section.id,
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
                  onClick={handleCreateCategory}
                >
                  <Plus size={14} />
                  Add category
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-input-border p-6">
              <div className="flex min-h-36 items-center justify-center gap-8">
                <p className="text-base text-text-muted">No categories yet.</p>

                <Button
                  type="button"
                  disabled={!enabled}
                  onClick={handleCreateCategory}
                >
                  <Plus size={14} />
                  Add category
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
