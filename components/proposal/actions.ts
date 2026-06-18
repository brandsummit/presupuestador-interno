"use server";

import { revalidatePath } from "next/cache";
import { Resend } from "resend";

import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAILS = [
  //"david@brandsummit.es",
  "fran@brandsummit.es",
];

type AcceptProposalInput = {
  quoteId: number;
  token: string;
};

type ClientData = {
  name?: string | null;
  email?: string | null;
};

function escapeHtml(value?: string | null) {
  return (value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getClient(
  clients: ClientData | ClientData[] | null,
): ClientData | null {
  if (Array.isArray(clients)) {
    return clients[0] || null;
  }

  return clients || null;
}

function clientEmailTemplate({
  clientName,
  quoteTitle,
}: {
  clientName: string;
  quoteTitle: string;
}) {
  return `
    <!doctype html>
    <html lang="es">
      <body style="margin:0;padding:0;background:#3b3b3b;font-family:Arial,Helvetica,sans-serif;color:#cacaca;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;background:#3b3b3b;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;overflow:hidden;border-radius:24px;background:#4c4c4c;">
                <tr>
                  <td style="padding:40px;">
                    <p style="margin:0 0 40px;font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#7f7f7f;">
                      Brandsummit
                    </p>

                    <h1 style="margin:0 0 40px;font-size:36px;line-height:1;font-weight:400;color:#cacaca;">
                      Propuesta aceptada
                    </h1>

                    <p style="margin:0 0 20px;font-size:18px;line-height:1.4;">
                      Hola ${escapeHtml(clientName)},
                    </p>

                    <p style="margin:0 0 20px;font-size:18px;line-height:1.4;">
                      Hemos recibido la aceptación de la propuesta
                      <strong>${escapeHtml(quoteTitle)}</strong>.
                    </p>

                    <p style="margin:0;font-size:18px;line-height:1.4;">
                      Gracias por confiar en Brandsummit. Nos pondremos en
                      contacto contigo cuanto antes para continuar con los
                      siguientes pasos.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:28px 40px;border-top:1px solid #5c5c5c;">
                    <p style="margin:0;font-size:16px;line-height:1.4;">
                      David Baldoví<br />
                      Strategy &amp; Management<br />
                      Brandsummit
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function adminEmailTemplate({
  clientName,
  clientEmail,
  quoteTitle,
  quoteNumber,
}: {
  clientName: string;
  clientEmail: string | null;
  quoteTitle: string;
  quoteNumber: string;
}) {
  return `
    <!doctype html>
    <html lang="es">
      <body style="margin:0;padding:40px;background:#3b3b3b;font-family:Arial,Helvetica,sans-serif;color:#cacaca;">
        <div style="max-width:640px;margin:auto;padding:40px;border-radius:24px;background:#4c4c4c;">
          <p style="margin:0 0 32px;font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#7f7f7f;">
            Brandsummit
          </p>

          <h1 style="margin:0 0 36px;font-size:36px;font-weight:400;">
            Nueva propuesta aceptada
          </h1>

          <p style="margin:0 0 12px;font-size:17px;line-height:1.5;">
            <strong>Propuesta:</strong>
            ${escapeHtml(quoteNumber)} — ${escapeHtml(quoteTitle)}
          </p>

          <p style="margin:0 0 12px;font-size:17px;line-height:1.5;">
            <strong>Cliente:</strong> ${escapeHtml(clientName)}
          </p>

          <p style="margin:0;font-size:17px;line-height:1.5;">
            <strong>Email:</strong>
            ${escapeHtml(clientEmail || "No disponible")}
          </p>
        </div>
      </body>
    </html>
  `;
}

export async function acceptProposal({
  quoteId,
  token,
}: AcceptProposalInput) {
  if (!quoteId || !token) {
    return {
      ok: false,
      error: "No se ha podido identificar la propuesta.",
    };
  }

  const { data: quote, error } = await supabase
    .from("quotes")
    .select(`
      id,
      number,
      title,
      status,
      token,
      clients (
        name,
        email
      )
    `)
    .eq("id", quoteId)
    .eq("token", token)
    .single();

  if (error || !quote) {
    return {
      ok: false,
      error: "La propuesta no existe o el enlace no es válido.",
    };
  }

  if (quote.status === "accepted") {
    return {
      ok: true,
      alreadyAccepted: true,
    };
  }

  const { error: updateError } = await supabase
    .from("quotes")
    .update({
      status: "accepted",
    })
    .eq("id", quoteId)
    .eq("token", token);

  if (updateError) {
    return {
      ok: false,
      error: "No se ha podido aceptar la propuesta.",
    };
  }

  const client = getClient(
    quote.clients as ClientData | ClientData[] | null,
  );

  const clientName = client?.name || "cliente";
  const clientEmail = client?.email || null;
  const quoteNumber = quote.number || String(quote.id);
  const quoteTitle = quote.title || `Propuesta ${quoteNumber}`;

  if (process.env.RESEND_API_KEY) {
    const from =
      process.env.PROPOSAL_EMAIL_FROM ||
      "Brandsummit <onboarding@resend.dev>";

    const adminResult = await resend.emails.send({
      from,
      to: ADMIN_EMAILS,
      subject: `Propuesta aceptada · ${quoteNumber} · ${clientName}`,
      html: adminEmailTemplate({
        clientName,
        clientEmail,
        quoteTitle,
        quoteNumber,
      }),
      text: `
Nueva propuesta aceptada

Propuesta: ${quoteNumber} — ${quoteTitle}
Cliente: ${clientName}
Email: ${clientEmail || "No disponible"}
      `,
    });

    if (adminResult.error) {
      console.error(
        "Error enviando notificación al equipo:",
        adminResult.error,
      );
    }

    if (clientEmail) {
      const clientResult = await resend.emails.send({
        from,
        to: clientEmail,
        subject: `Hemos recibido tu aceptación · ${quoteTitle}`,
        html: clientEmailTemplate({
          clientName,
          quoteTitle,
        }),
        text: `
Hola ${clientName},

Hemos recibido la aceptación de la propuesta "${quoteTitle}".

Gracias por confiar en Brandsummit. Nos pondremos en contacto contigo cuanto antes para continuar con los siguientes pasos.

David Baldoví
Strategy & Management
Brandsummit
        `,
      });

      if (clientResult.error) {
        console.error(
          "Error enviando confirmación al cliente:",
          clientResult.error,
        );
      }
    }
  } else {
    console.error("RESEND_API_KEY no está configurada.");
  }

  revalidatePath(`/proposal/${token}`);

  return {
    ok: true,
    alreadyAccepted: false,
  };
}