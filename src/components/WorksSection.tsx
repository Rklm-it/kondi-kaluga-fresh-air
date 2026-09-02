import { useReveal, useRevealGroup } from "@/lib/reveal";

const PHOTOS: { src: string; alt: string }[] = [
  {
    src: "/rabota-1.jpg",
    alt: "Внутренний блок кондиционера в жилой комнате с подсветкой потолка",
  },
  {
    src: "/rabota-2.jpg",
    alt: "Наружный блок кондиционера на стене деревянного дома",
  },
  {
    src: "/rabota-3.jpg",
    alt: "Монтажник сверлит стену под трассу кондиционера",
  },
  {
    src: "/rabota-4.jpg",
    alt: "Внутренний блок кондиционера над окном в светлой комнате",
  },
  {
    src: "/rabota-5.jpg",
    alt: "Трасса кондиционера, выведенная через стену наружу",
  },
  {
    src: "/rabota-6.jpg",
    alt: "Внутренний блок кондиционера в офисе с вертикальными жалюзи",
  },
  {
    src: "/rabota-7.jpg",
    alt: "Два наружных блока кондиционеров на фасаде двухэтажного дома",
  },
  {
    src: "/rabota-8.jpg",
    alt: "Заправка кондиционера фреоном: манометры в руках мастера",
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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {PHOTOS.slice(0, 3).map((p) => (
            <figure key={p.src} data-reveal-item className="foto m-0 aspect-[4/3] overflow-hidden">
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
          className="block h-[38vh] w-full object-cover md:h-[52vh]"
        />
      </div>

      <div className="wrap mt-4 md:mt-6" ref={grid2Ref}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {PHOTOS.slice(3).map((p) => (
            <figure key={p.src} data-reveal-item className="foto m-0 aspect-[4/3] overflow-hidden">
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
