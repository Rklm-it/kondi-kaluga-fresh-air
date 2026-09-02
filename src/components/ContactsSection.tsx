import { useReveal } from "@/lib/reveal";

/**
 * Адрес и как доехать. Добавлено по подсказке из локальной базы UX
 * (/ui-ux-pro-max, шаблон лендинга местного бизнеса): в антипаттернах у него
 * прямым текстом «No map + Hidden reviews» — для местной услуги отсутствие
 * адреса на карте бьёт по доверию сильнее, чем любая вёрстка.
 *
 * Отзывов здесь сознательно нет: настоящих в выгрузке старого сайта не
 * нашлось, а выдуманные клиент опознает первым.
 */
const ADRES = "г. Калуга, пер. Баррикад, д. 2а, офис 205-2";

export function ContactsSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="kontakty" className="section-pad border-t border-line">
      <div className="wrap grid gap-10 md:grid-cols-2 md:gap-16" ref={ref}>
        <div>
          <h2 className="h2">Где нас найти</h2>
          <p className="body measure mt-8 text-muted">
            Приезжаем по Калуге и области. Замер и расчёт — на месте, цену называем до начала
            работ.
          </p>
        </div>

        <dl className="grid gap-6">
          <div>
            <dt className="small text-muted">Адрес</dt>
            <dd className="body mt-1">{ADRES}</dd>
            <dd className="mt-2">
              <a
                className="link body"
                href={`https://yandex.ru/maps/?text=${encodeURIComponent(ADRES)}`}
                target="_blank"
                rel="noreferrer"
              >
                Посмотреть на карте
              </a>
            </dd>
          </div>
          <div>
            <dt className="small text-muted">Телефон</dt>
            <dd className="body mt-1">
              <a className="link" href="tel:+74842400998">
                +7 (4842) 400-998
              </a>
            </dd>
          </div>
          <div>
            <dt className="small text-muted">Почта</dt>
            <dd className="body mt-1">
              <a className="link" href="mailto:kondi-kaluga@mail.ru">
                kondi-kaluga@mail.ru
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
