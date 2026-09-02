import { useReveal, useRevealGroup } from "@/lib/reveal";

const PHOTOS: { src: string; alt: string; span: string }[] = [
  {
    src: "/rabota-1.jpg",
    alt: "Внутренний блок кондиционера в жилой комнате с подсветкой потолка",
    span: "md:col-span-7 aspect-[4/3]",
  },
  {
    src: "/rabota-2.jpg",
    alt: "Наружный блок кондиционера на стене деревянного дома",
    span: "md:col-span-5 aspect-[3/4]",
  },
  {
    src: "/rabota-3.jpg",
    alt: "Монтажник сверлит стену под трассу кондиционера",
    span: "md:col-span-4 aspect-square",
  },
  {
    src: "/rabota-4.jpg",
    alt: "Внутренний блок кондиционера над окном в светлой комнате",
    span: "md:col-span-8 aspect-[16/10]",
  },
  {
    src: "/rabota-5.jpg",
    alt: "Трасса кондиционера, выведенная через стену наружу",
    span: "md:col-span-5 aspect-[4/3]",
  },
  {
    src: "/rabota-6.jpg",
    alt: "Внутренний блок кондиционера в офисе с вертикальными жалюзи",
    span: "md:col-span-7 aspect-[3/2]",
  },
  {
    src: "/rabota-7.jpg",
    alt: "Два наружных блока кондиционеров на фасаде двухэтажного дома",
    span: "md:col-span-6 aspect-[3/4]",
  },
  {
    src: "/rabota-8.jpg",
    alt: "Заправка кондиционера фреоном: манометры в руках мастера",
    span: "md:col-span-6 aspect-[4/5]",
  },
];

export function WorksSection() {
  const headRef = useReveal<HTMLDivElement>();
  const gridRef = useRevealGroup<HTMLDivElement>();
  const grid2Ref = useRevealGroup<HTMLDivElement>();
  const fasadRef = useReveal<HTMLDivElement>();

  return (
    <section id="works" className="section-pad border-t border-line">
      <div className="wrap" ref={headRef}>
        <h2 className="h2">Наши работы</h2>
      </div>

      <div className="wrap mt-10 md:mt-14" ref={gridRef}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          {PHOTOS.slice(0, 4).map((p) => (
            <figure key={p.src} data-reveal-item className={`m-0 ${p.span}`}>
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="block h-full w-full object-cover"
              />
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-4 md:mt-6" ref={fasadRef}>
        <img
          src="/fasad.jpg"
          alt="Наружный блок кондиционера на кирпичном фасаде дома"
          loading="lazy"
          className="block h-[44vh] w-full object-cover md:h-[70vh]"
        />
      </div>

      <div className="wrap mt-4 md:mt-6" ref={grid2Ref}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          {PHOTOS.slice(4).map((p) => (
            <figure key={p.src} data-reveal-item className={`m-0 ${p.span}`}>
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="block h-full w-full object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
