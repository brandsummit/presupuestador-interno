import { Quote } from "@/components/quote-editor/types";

type Props = {
  quote: Quote;
};

const phases = [
  {
    label: "Construcción",
    description:
      "Definimos y construimos los cimientos de la marca. Incluye la estrategia, el branding y el ecosistema digital, estableciendo una base sólida y coherente sobre la que la marca pueda crecer. Se toman las decisiones clave que dan dirección, consistencia y sentido a todo el sistema de marca.",
  },
  {
    label: "Activación",
    description:
      "Activamos la marca en el mundo real y en los primeros puntos de contacto con su público. Se centra en eventos, lanzamientos y contenidos iniciales, pensados para presentar la marca, generar impacto y empezar a construir reconocimiento y conexión.",
  },
  {
    label: "Gestión",
    description:
      "Acompañamos a la marca en su día a día. Engloba la comunicación continua y las acciones recurrentes necesarias para mantener la coherencia, la relevancia y la presencia de la marca en el tiempo, asegurando que lo construido y activado se sostenga con consistencia.",
  },
];

export default function ProposalPhase({ quote }: Props) {
  if (!quote.show_phases) {
    return null;
  }

  return (
    <section className="flex min-h-screen flex-col gap-40 p-6">
      <div>
        <h2 className="font-display text-3xl uppercase">02 - Fases</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {phases.map((phase, index) => {
          const selected = quote.current_phase === phase.label;

          return (
            <article
              key={phase.label}
              className={`
                flex h-105 flex-col justify-between rounded-[1.75rem] border p-8
                ${index === 1 ? "mt-16" : ""}
                ${index === 2 ? "mt-32" : ""}
                ${
                  selected
                    ? "border-text text-text"
                    : "border-border text-text-muted opacity-70"
                }
              `}
            >
              <div className="space-y-5">
                <h3 className="text-2xl leading-none">{phase.label}</h3>

                <p className="max-w-md text-base leading-snug">
                  {phase.description}
                </p>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <span
                  className={`
                    h-2 w-2 rounded-full
                    ${selected ? "bg-success" : "bg-text"}
                  `}
                />
                <span>Fase {index + 1}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}