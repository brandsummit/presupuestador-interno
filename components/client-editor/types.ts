export type ClientQuote = {
  id: number;
  number: string;
  title: string;
  description: string | null;
  status: "draft" | "sent" | "viewed" | "accepted" | "rejected" | null;
  created_at: string | null;
  sent_at: string | null;
  clients?: {
    name: string | null;
  } | null;
};

export type Client = {
  id: number;

  name: string | null;
  email: string | null;
  phone: string | null;

  company: string | null;
  contact_name: string | null;
  contact_position: string | null;

  notes: string | null;
  created_at: string | null;

  quotes?: ClientQuote[];
};