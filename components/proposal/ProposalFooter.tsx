import Image from "next/image";

export default function ProposalFooter() {
  return (
    <footer className="px-10 pb-10">
      <div className="grid gap-16 md:grid-cols-2">
        <div />

        <div>
          <h2 className="font-display text-6xl font-bold">Contacto</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <p className="text-base leading-snug md:col-span-2">
              Estamos disponibles para resolver cualquier duda sobre esta
              propuesta y acompañarte durante los siguientes pasos del proyecto.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            <a
              href="tel:+34677485946"
              className="flex min-h-16 items-center justify-center rounded-md bg-prop-text px-6 text-center text-base text-prop-background transition hover:opacity-85"
            >
              tlf: +34 677 48 59 46
            </a>

            <a
              href="mailto:david@brandsummit.es"
              className="flex min-h-16 items-center justify-center rounded-md bg-prop-text px-6 text-center text-base text-prop-background transition hover:opacity-85"
            >
              david@brandsummit.es
            </a>
          </div>
        </div>
      </div>

      <div className="mt-60 grid items-start gap-16 md:grid-cols-2">
        <div>
          <Image
            src="/brandsummit-logo-slogan.svg"
            alt="Brandsummit — Food Design Thinkers"
            width={420}
            height={110}
            className="h-auto w-full max-w-[320px]"
          />
        </div>

        <p className="max-w-4xl text-4xl leading-[1.18] md:text-5xl xl:text-6xl">
          No es lo que ves, es lo que hay detrás. No es cada persona, es todo el
          equipo. No es lo que quieres, es el camino para llegar. No es solo que
          gusta, es que también funciona. No es el qué, es el porqué. No es lo
          que dices, es lo que piensas. No es solo una idea brillante, es un
          trabajo de esfuerzo, orden y tiempo.
        </p>
      </div>
    </footer>
  );
}