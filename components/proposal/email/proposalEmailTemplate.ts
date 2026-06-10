type Props = {
  clientName?: string | null;
  quoteTitle?: string | null;
  message?: string | null;
  proposalUrl: string;
};

export function proposalEmailTemplate({
  clientName,
  quoteTitle,
  message,
  proposalUrl,
}: Props) {
  const safeClient = clientName || "Hola";
  const safeTitle = quoteTitle || "Propuesta";

  return `
  <!doctype html>
  <html>
    <body style="margin:0;padding:0;background:#3b3b3b;font-family:Arial,Helvetica,sans-serif;color:#cacaca;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#3b3b3b;padding:40px 20px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#4c4c4c;border-radius:24px;overflow:hidden;">
              <tr>
                <td style="padding:40px 40px 24px 40px;">
                  <p style="margin:0 0 40px 0;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:#7f7f7f;">
                    Brandsummit
                  </p>

                  <h1 style="margin:0;font-size:36px;line-height:0.95;font-weight:400;color:#cacaca;">
                    ${safeTitle}
                  </h1>
                </td>
              </tr>

              <tr>
                <td style="padding:0 40px 40px 40px;">
                  <p style="margin:0 0 20px 0;font-size:18px;line-height:1.35;color:#cacaca;">
                    ${safeClient},
                  </p>

                  <p style="margin:0 0 28px 0;font-size:18px;line-height:1.35;color:#cacaca;">
                    ${
                      message ||
                      "Te compartimos la propuesta que hemos preparado. Puedes revisarla desde el siguiente enlace."
                    }
                  </p>

                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="border-radius:12px;background:#cacaca;">
                        <a href="${proposalUrl}" target="_blank" style="display:inline-block;padding:14px 22px;font-size:14px;line-height:1;text-decoration:none;color:#3b3b3b;font-weight:bold;">
                          Ver propuesta
                        </a>
                      </td>
                    </tr>
                  </table>

                  <p style="margin:40px 0 0 0;font-size:14px;line-height:1.45;color:#7f7f7f;">
                    Si el botón no funciona, copia este enlace en tu navegador:<br />
                    <a href="${proposalUrl}" style="color:#cacaca;text-decoration:underline;">${proposalUrl}</a>
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:28px 40px;border-top:1px solid #5c5c5c;">
                  <p style="margin:0;font-size:16px;line-height:1.35;color:#cacaca;">
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