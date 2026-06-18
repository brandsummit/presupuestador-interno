import { supabase } from "@/lib/supabase";
import SectionHeader from "../SectionHeader";
import { PROCESS_GROUPS } from "./process-config";
import ProcessItemRow from "./ProcessItemRow";

type Props = {
  quoteId: number;
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

export default async function ProcessSection({
  quoteId,
  enabled,
  onToggle,
}: Props) {
  const processDefinitions = PROCESS_GROUPS.flatMap((group) =>
    group.items.flatMap((item) => [
      {
        key: item.key,
        title: item.title,
        parentKey: null,
      },
      ...(item.children ?? []).map((child) => ({
        key: child.key,
        title: child.title,
        parentKey: item.key,
      })),
    ]),
  ).map((item, index) => ({
    ...item,
    position: index,
  }));

  const { data: existingItems, error: existingItemsError } = await supabase
    .from("quote_process_items")
    .select("*")
    .eq("quote_id", quoteId)
    .order("position", { ascending: true });

  if (existingItemsError) {
    throw new Error(existingItemsError.message);
  }

  const existingKeys = new Set(
    existingItems?.map((item) => item.item_key) ?? [],
  );

  const missingItems = processDefinitions
    .filter((item) => !existingKeys.has(item.key))
    .map((item) => ({
      quote_id: quoteId,
      title: item.title,
      item_key: item.key,
      parent_key: item.parentKey,
      enabled: true,
      position: item.position,
    }));

  if (missingItems.length > 0) {
    const { error: insertError } = await supabase
      .from("quote_process_items")
      .insert(missingItems);

    if (insertError) {
      throw new Error(insertError.message);
    }
  }

  const { data: items, error: itemsError } = await supabase
    .from("quote_process_items")
    .select("*")
    .eq("quote_id", quoteId)
    .order("position", { ascending: true });

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  const processItems = items ?? [];

  return (
    <section className="rounded-lg bg-background-light p-6">
      <SectionHeader
        title="Process"
        enabled={enabled}
        onToggle={onToggle}
      />

      <div
        className={`mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5 ${
          !enabled ? "opacity-50" : ""
        }`}
      >
        {PROCESS_GROUPS.map((group) => {
          const groupDefinitions = group.items.flatMap((item) => [
            {
              key: item.key,
              parentKey: null,
            },
            ...(item.children ?? []).map((child) => ({
              key: child.key,
              parentKey: item.key,
            })),
          ]);

          return (
            <div
              key={group.title}
              className="rounded-lg border border-input-border p-4"
            >
              <h3 className="mb-3 text-xs font-medium text-text-muted">
                {group.title}
              </h3>

              <div className="space-y-2">
                {groupDefinitions.map((definition) => {
                  const item = processItems.find(
                    (processItem) =>
                      processItem.item_key === definition.key,
                  );

                  if (!item) return null;

                  const parent = definition.parentKey
                    ? processItems.find(
                        (processItem) =>
                          processItem.item_key === definition.parentKey,
                      )
                    : null;

                  const parentDisabled = Boolean(
                    parent && !parent.enabled,
                  );

                  return (
                    <ProcessItemRow
                      key={item.id}
                      quoteId={quoteId}
                      item={item}
                      disabled={!enabled || parentDisabled}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}