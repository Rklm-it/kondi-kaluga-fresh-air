import { POWERS, WALLS, formatRub, scrollToId, useCalc } from "@/lib/calc";
import { useReveal } from "@/lib/reveal";

const EXTRA_WORKS: { label: string; price: string; add?: { id: string; label: string; amount: number } }[] = [
  { label: "Метр кабель-канала 60×60 с монтажом", price: "700 ₽" },
  { label: "Дополнительное отверстие в стене", price: "1 000 ₽" },
  {
    label: "Монтаж в два этапа",
    price: "4 000 ₽",
    add: { id: "dva-etapa", label: "Монтаж в два этапа", amount: 4000 },
  },
  {
    label: "Установка защитного козырька",
    price: "2 000 ₽",
    add: { id: "kozyrek", label: "Установка защитного козырька", amount: 2000 },
  },
  {
    label: "Установка защитной решётки",
    price: "2 000 ₽",
    add: { id: "reshetka", label: "Установка защитной решётки", amount: 2000 },
  },
  { label: "Демонтаж кондиционера", price: "от 3 500 ₽" },
  { label: "Техническое обслуживание", price: "от 3 500 ₽" },
  { label: "Заправка фреоном", price: "400 ₽ за 100 грамм" },
  { label: "Автовышка", price: "от 2 000 до 3 000 ₽ в час, минимум два часа" },
  { label: "Услуги альпиниста", price: "от 7 000 ₽" },
  { label: "Диагностика", price: "от 2 000 ₽" },
];

export function PriceSection() {
  const calc = useCalc();
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section id="price" className="section-pad border-t border-line">
      <div className="wrap" ref={revealRef}>
        <h2 className="h2">Сколько стоит монтаж</h2>
        <p className="small mt-3 text-muted">Стандартный монтаж, трасса до 5 метров</p>

        <div className="mt-10">
          {POWERS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => {
                calc.setPower(p.key);
                scrollToId("raschet");
              }}
              className="price-row grid w-full grid-cols-[minmax(0,1fr)_auto] items-baseline gap-8 border-b border-line py-4 text-left"
            >
              <span className="min-w-0">{p.label}</span>
              <span className="num shrink-0">{formatRub(p.price)}</span>
            </button>
          ))}
        </div>

        <p className="body measure mt-6 text-muted">
          Дальше метр трассы 1 700–3 000 ₽ по мощности, штроба по материалу стены:{" "}
          {WALLS.map((w, i) => (
            <span key={w.key}>
              {i > 0 ? ", " : ""}
              {w.label.toLowerCase()} {w.price.toLocaleString("ru-RU").replace(/\u00A0/g, " ")}
            </span>
          ))}{" "}
          ₽ за метр
        </p>

        <h3 className="h2 mt-16 md:mt-24">Дополнительные работы</h3>

        <ul className="mt-8 grid gap-x-16 md:grid-cols-2">
          {EXTRA_WORKS.map((w) => (
            <li
              key={w.label}
              className="body grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-6 border-b border-line py-4"
            >
              <span className="min-w-0">
                {w.label}
                {w.add && (
                  <button
                    type="button"
                    onClick={() => {
                      calc.toggleExtra(w.add!);
                      scrollToId("raschet");
                    }}
                    className="link small ml-3 whitespace-nowrap"
                  >
                    {calc.hasExtra(w.add.id) ? "убрать из расчёта" : "добавить в расчёт"}
                  </button>
                )}
              </span>
              <span className="num small shrink-0 text-muted md:text-right">{w.price}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 bg-green px-6 py-6 md:mt-24 md:px-12">
        <p className="body on-green mx-auto max-w-[1280px]">
          В стандартный монтаж входит подбор кондиционера, работа монтажников, трасса 5 метров
          и комплект кронштейнов
        </p>
      </div>
    </section>
  );
}
