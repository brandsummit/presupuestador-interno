"use client";

import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";

import CostInput from "@/components/ui/CostInput";
import { TimelineItem } from "../types";
import { updateTimelineItem, deleteTimelineItem } from "./actions";
import ConfirmIconDeleteButton from "@/components/ui/ConfirmIconDeleteButton";

type Props = {
  quoteId: number;
  item: TimelineItem;
  enabled: boolean;
  onDeleted: () => void;
};

export default function TimelineItemRow({
  quoteId,
  item,
  enabled,
  onDeleted,
}: Props) {
  const [type, setType] = useState(item.type || "task");
  const [startWeek, setStartWeek] = useState<number | null>(
    item.start_week ?? null,
  );

  const isMeeting = type === "meeting_online" || type === "meeting_presential";

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
    await deleteTimelineItem(quoteId, item.id);
    onDeleted();
  }

  async function handleUpdateStartWeek(value: number | null) {
    setStartWeek(value);

    await updateTimelineItem(quoteId, item.id, "start_week", value);

    if (isMeeting) {
      await updateTimelineItem(quoteId, item.id, "end_week", value);
    }
  }

  async function handleUpdateType(value: string) {
    setType(value);

    await updateTimelineItem(quoteId, item.id, "type", value);

    if (value === "meeting_online" || value === "meeting_presential") {
      await updateTimelineItem(quoteId, item.id, "end_week", startWeek);
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`grid gap-2 rounded-lg bg-background p-2 ${
        isMeeting
          ? "md:grid-cols-[40px_1fr_208px_180px_auto]"
          : "md:grid-cols-[40px_1fr_100px_100px_180px_auto]"
      } ${isDragging ? "opacity-60" : ""}`}
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

      <CostInput
        defaultValue={item.title || ""}
        placeholder={isMeeting ? "Meeting" : "Task"}
        disabled={!enabled}
        onBlur={(event) =>
          updateTimelineItem(quoteId, item.id, "title", event.target.value)
        }
      />

      <CostInput
        type="number"
        defaultValue={item.start_week ?? ""}
        placeholder={isMeeting ? "Week" : "Start"}
        disabled={!enabled}
        onBlur={(event) => {
          const value = event.target.value;
          handleUpdateStartWeek(value === "" ? null : Number(value));
        }}
      />

      {!isMeeting && (
        <CostInput
          type="number"
          defaultValue={item.end_week ?? ""}
          placeholder="End"
          disabled={!enabled}
          onBlur={(event) => {
            const value = event.target.value;

            updateTimelineItem(
              quoteId,
              item.id,
              "end_week",
              value === "" ? null : Number(value),
            );
          }}
        />
      )}

      <select
        value={type}
        disabled={!enabled}
        className="rounded-lg border border-input-border bg-background px-3 text-base"
        onChange={(event) => setType(event.target.value)}
        onBlur={(event) => handleUpdateType(event.target.value)}
      >
        <option value="task">Task</option>
        <option value="meeting_online">Online Meeting</option>
        <option value="meeting_presential">Presential Meeting</option>
      </select>

      <ConfirmIconDeleteButton disabled={!enabled} onConfirm={handleDelete} />
    </div>
  );
}