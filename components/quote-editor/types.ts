export type QuoteStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "rejected";

export type Client = {
  id: number;
  name: string | null;
  email?: string | null;
};

export type QuoteItem = {
  id: number;
  position?: number | null;
  title?: string | null;
  description?: string | null;
  price?: number | null;
};

export type QuoteSection = {
  id: number;
  position?: number | null;
  title?: string | null;
  quote_items?: QuoteItem[];
};

export type TimelineItem = {
  id: number;
  position?: number | null;
  title?: string | null;
  start_week?: number | null;
  end_week?: number | null;
  type?: string | null;
  visible?: boolean | null;
};

export type TimelineArea = {
  id: number;
  position?: number | null;
  title?: string | null;
  color?: string | null;
  visible?: boolean | null;
  timeline_items?: TimelineItem[];
};

export type QuoteProcessItem = {
  id: number;
  position?: number | null;
  title?: string | null;
  item_key?: string | null;
  parent_key?: string | null;
  enabled?: boolean | null;
};

export type SummaryPaymentItem = {
  id: number;
  quote_id: number;
  label: string;
  position: number;
  created_at?: string | null;
  updated_at?: string | null;
};

export type Quote = {
  id: number;

  number: string | null;
  title: string | null;
  description: string | null;

  status: QuoteStatus | null;

  token: string | null;

  created_at: string | null;
  sent_at: string | null;

  objective: string | null;
  current_phase: string | null;

  start_at: string | null;
  duration: string | null;
  payment_terms: string | null;
  next_steps: string | null;

  client_id: number | null;

  clients?: Client | null;

  quote_sections?: QuoteSection[];

  timeline_areas?: TimelineArea[];

  quote_process_items?: QuoteProcessItem[];

  summary_payment_items?: SummaryPaymentItem[];

  show_objective?: boolean | null;
  show_phases?: boolean | null;
  show_process?: boolean | null;
  show_costs?: boolean | null;
  show_timeline?: boolean | null;
  show_summary?: boolean | null;
  show_actions?: boolean | null;

  language: "es" | "en";
};