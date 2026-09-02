import { useReveal } from "@/lib/reveal";

/**
 * Текстовая часть страницы. До неё сайт состоял из цифр и фотографий и
 * читался как пустой: ни слова о том, что за компания и что она делает.
 * Все формулировки — из выгрузки старого сайта (clients/kondi-kaluga.ru/
 * ТЕКСТЫ.md), их собственные. Ничего не придумано.
 */
export function SluzhbaSection() {
  const vhoditRef = useReveal<HTMLDivElement>();
  const servisRef = useReveal<HTMLDivElement>();
  const oNasRef = useReveal<HTMLDivElement>();

  return (
    <>
      <section id="vhodit" className="section-pad border-t border-line">
        <div className="wrap" ref={vhoditRef}>
          <h2 className="h2">Что входит в монтаж</h2>

          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-16">
            <ul className="grid gap-4">
              {[
                "Подбор кондиционера под помещение",
                "Работа монтажников",
                "Трасса 5 метров: медная труба, межблочный кабель, дренажный шланг, теплоизоляция",
                "Комплект кронштейнов",
              ].map((t) => (
                <li
                  key={t}
                  className="body grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-b border-line pb-4"
                >
                  <span aria-hidden className="text-green">
                    —
                  </span>
                  <span className="min-w-0">{t}</span>
                </li>
              ))}
            </ul>

            <div className="body measure text-muted grid gap-5">
              <p>
                Место установки зависит от формы помещения, расположения мебели и рабочих мест.
                Главное — кондиционер не должен быть направлен туда, где человек находится
                постоянно.
              </p>
              <p>
                Идеальное время для установки — ремонт: коммуникации прячутся под потолок или в
                стену. Тогда монтаж делается в два этапа — сначала трасса и наружный блок, а
                внутренний вешается после обоев.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="servis" className="section-pad border-t border-line">
        <div className="wrap" ref={servisRef}>
          <h2 className="h2">Обслуживание, ремонт, гарантия</h2>

          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-3 md:gap-12">
            <div>
              <h3 className="body font-semibold">Техническое обслуживание</h3>
              <p className="body mt-4 text-muted">
                Кондиционер проходит обслуживание как минимум раз в год, и внутренний блок, и
                наружный: чистка испарителя, дренажа и поддона, чистка вентилятора, чистка
                конденсатора и проверка давления фреона.
              </p>
              <p className="num small mt-4">от 3 500 ₽</p>
            </div>

            <div>
              <h3 className="body font-semibold">Ремонт</h3>
              <p className="body mt-4 text-muted">
                Ремонтируем климатическую технику в Калуге и Калужской области. Диагностика —
                от 2 000 ₽, заправка фреоном — 400 ₽ за 100 грамм.
              </p>
              <p className="num small mt-4">диагностика от 2 000 ₽</p>
            </div>

            <div>
              <h3 className="body font-semibold">Гарантия</h3>
              <p className="body mt-4 text-muted">
                На технику — срок из гарантийного талона. На монтажные работы — один год.
                Условие гарантии одно: техническое обслуживание с периодичностью из инструкции.
              </p>
              <p className="num small mt-4">1 год на монтаж</p>
            </div>
          </div>
        </div>
      </section>

      <section id="o-kompanii" className="section-pad border-t border-line">
        <div className="wrap grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-16" ref={oNasRef}>
          <div>
            <h2 className="h2">О компании</h2>
            <p className="body measure mt-8 text-muted">
              «Конди-Калуга» работает на рынке климатической техники с 2004 года. Продажа,
              установка, сервисное и гарантийное обслуживание бытовых кондиционеров и сложной
              климатической техники — Калуга, Калужская и соседние области.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-12 gap-y-6 md:grid-cols-1">
            <div>
              <dt className="small text-muted">На рынке</dt>
              <dd className="total mt-1">с 2004</dd>
            </div>
            <div>
              <dt className="small text-muted">Гарантия на монтаж</dt>
              <dd className="total mt-1">1 год</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
