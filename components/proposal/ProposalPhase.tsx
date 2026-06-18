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
    <section className="px-10">
      <h2 className="font-display text-6xl font-bold">Fases</h2>
      <div className="mt-8 gap-4 grid md:grid-cols-3">
        <p className="text-base leading-snug">
          Toda marca atraviesa diferentes etapas a lo largo de su desarrollo. Aunque cada proyecto tiene necesidades y ritmos distintos, en Brandsummit entendemos la construcción de marca como un proceso continuo que va desde la definición de sus fundamentos hasta su activación y gestión en el tiempo. Para facilitar la comprensión del alcance del proyecto, estructuramos nuestro trabajo en tres grandes fases que abarcan el ciclo completo y necesidades de una marca. El alcance de esta propuesta trata de las fases activadas a continuación.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {phases.map((phase, index) => {
          const selected = quote.current_phase === phase.label;

          const borderRadius =
            index === 0
              ? "rounded-l-[36px] rounded-r-xl"
              : index === phases.length - 1
                ? "rounded-l-xl rounded-r-[36px]"
                : "rounded-xl";

          return (
            <article
              key={phase.label}
              className={`
                flex min-h-110 flex-col justify-between border p-10
                ${borderRadius}
                ${
                  selected
                    ? "border-prop-text bg-prop-text text-prop-background"
                    : "border-prop-text/25 text-prop-text/30"
                }
              `}
            >
              <div>
                <h3 className="text-2xl leading-none">{phase.label}</h3>

                <p className="mt-6 max-w-md text-base leading-snug">
                  {phase.description}
                </p>
              </div>

              <div className="flex items-center gap-3 text-base">
                <span
                  className={`
                    h-3 w-3 rounded-full border
                    ${
                      selected
                        ? "border-prop-background bg-success"
                        : "border-prop-text/30"
                    }
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
