import { supabase } from "@/lib/supabase";
import SectionHeader from "../SectionHeader";
import { PROCESS_GROUPS, PROCESS_ITEMS } from "./process-config";
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
  const { data: existingItems, error: existingItemsError } = await supabase
    .from("quote_process_items")
    .select("*")
    .eq("quote_id", quoteId)
    .order("position", { ascending: true });

  if (existingItemsError) {
    throw new Error(existingItemsError.message);
  }

  if (!existingItems?.length) {
    const itemsToInsert = PROCESS_ITEMS.map((item, index) => ({
      quote_id: quoteId,
      title: item.title,
      item_key: item.key,
      parent_key: item.parentKey || null,
      enabled: true,
      position: index,
    }));

    const { error: insertError } = await supabase
      .from("quote_process_items")
      .insert(itemsToInsert);

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

  const processItems = items || [];

  return (
    <section className="rounded-lg bg-background-light p-6">
      <SectionHeader title="Process" enabled={enabled} onToggle={onToggle} />

      <div
        className={`mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5 ${
          !enabled ? "opacity-50" : ""
        }`}
      >
        {PROCESS_GROUPS.map((group) => {
          const groupItems = group.itemKeys
            .map((key) => processItems.find((item) => item.item_key === key))
            .filter(Boolean);

          return (
            <div key={group.key} className="p-4 rounded-lg border border-input-border">
              <h3 className="mb-1 text-xs font-medium text-text-muted">
                {group.title}
              </h3>

              <div className="space-y-3">
                {groupItems.map((item) => {
                  const parent =
                    item.parent_key &&
                    processItems.find(
                      (processItem) => processItem.item_key === item.parent_key,
                    );

                  const parentDisabled = parent && !parent.enabled;

                  return (
                    <ProcessItemRow
                      key={item.id}
                      quoteId={quoteId}
                      item={item}
                      disabled={!enabled || Boolean(parentDisabled)}
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
