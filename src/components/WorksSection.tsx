const PHOTOS: { src: string; alt: string; span: string }[] = [
  {
    src: "/rabota-1.jpg",
    alt: "Внутренний блок кондиционера над окном в светлой гостиной",
    span: "md:col-span-7 aspect-[4/3]",
  },
  {
    src: "/rabota-2.jpg",
    alt: "Наружный блок кондиционера на балконе многоэтажного дома",
    span: "md:col-span-5 aspect-[3/4]",
  },
  {
    src: "/rabota-3.jpg",
    alt: "Монтажник закрепляет кронштейны для наружного блока на стене",
    span: "md:col-span-4 aspect-square",
  },
  {
    src: "/rabota-4.jpg",
    alt: "Кондиционер в спальне над изголовьем кровати",
    span: "md:col-span-8 aspect-[16/10]",
  },
  {
    src: "/rabota-5.jpg",
    alt: "Трасса кондиционера в кабель-канале вдоль стены",
    span: "md:col-span-5 aspect-[4/3]",
  },
  {
    src: "/rabota-6.jpg",
    alt: "Внутренний блок кондиционера в офисном помещении",
    span: "md:col-span-7 aspect-[3/2]",
  },
  {
    src: "/rabota-7.jpg",
    alt: "Наружный блок кондиционера с защитным козырьком",
    span: "md:col-span-6 aspect-[3/4]",
  },
  {
    src: "/rabota-8.jpg",
    alt: "Установленный кондиционер в квартире после монтажа и уборки",
    span: "md:col-span-6 aspect-[4/5]",
  },
];

export function WorksSection() {
  return (
    <section id="works" className="section-pad border-t border-line">
      <div className="wrap">
        <h2 className="h2">Наши работы</h2>
      </div>

      <div className="wrap mt-10 md:mt-14">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          {PHOTOS.slice(0, 4).map((p) => (
            <figure key={p.src} className={`m-0 ${p.span}`}>
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

      <div className="mt-4 md:mt-6">
        <img
          src="/fasad.jpg"
          alt="Наружный блок кондиционера на кирпичном фасаде дома"
          loading="lazy"
          className="block h-[44vh] w-full object-cover md:h-[70vh]"
        />
      </div>

      <div className="wrap mt-4 md:mt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          {PHOTOS.slice(4).map((p) => (
            <figure key={p.src} className={`m-0 ${p.span}`}>
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
