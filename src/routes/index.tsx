import { createFileRoute } from "@tanstack/react-router";
import { CalcProvider } from "@/lib/calc";
import { CalcSection } from "@/components/CalcSection";
import { PriceSection } from "@/components/PriceSection";
import { WorksSection } from "@/components/WorksSection";
import { RequestSection } from "@/components/RequestSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Конди-Калуга — установка кондиционеров в Калуге" },
      {
        name: "description",
        content:
          "Установка и продажа кондиционеров в Калуге и области с 2004 года. Стандартный монтаж девятки — 12 000 ₽, всё включено.",
      },
      { property: "og:title", content: "Конди-Калуга — установка кондиционеров в Калуге" },
      {
        property: "og:description",
        content:
          "Ставим кондиционеры в Калуге и области двадцать первый год. Приезжаем с готовой ценой.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Section({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className="section-pad border-t border-line">
      <div className="wrap">
        <h2 className="h2">{title}</h2>
      </div>
    </section>
  );
}

function Index() {
  return (
    <CalcProvider>
      <Content />
    </CalcProvider>
  );
}

function Content() {
  return (
    <div className="bg-background text-ink">
      <header className="min-h-screen flex flex-col md:flex-row">
        <div className="order-1 md:order-2 md:w-[60%] h-[44vh] md:h-auto">
          <img
            src="/komnata.jpg"
            alt="Комната с кондиционером на стене"
            className="w-full h-full object-cover block"
          />
        </div>

        <div className="order-2 md:order-1 md:w-[40%] flex flex-col justify-between px-6 py-8 md:px-12 md:py-12">
          <div className="small flex flex-wrap gap-x-4 gap-y-1 text-muted">
            <span>Конди-Калуга, Калуга</span>
            <a href="tel:+74842400998" className="link">
              +7 (4842) 400-998
            </a>
          </div>

          <div className="mt-10 md:mt-0">
            <h1 className="h1">
              Дома <span className="text-green">+24</span>,
              <br />
              когда за окном
              <br />
              <span className="text-green">+35</span>
            </h1>

            <p className="body measure mt-8 text-muted">
              Ставим кондиционеры в Калуге и области двадцать первый год. Приезжаем с готовой
              ценой: стандартный монтаж девятки — 12 000 ₽, всё включено
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a href="#raschet" className="btn">
                Рассчитать монтаж
              </a>
              <a href="tel:+74842400998" className="link body">
                Позвонить: 400-998
              </a>
            </div>
          </div>

          <p className="small text-muted mt-10 md:mt-0">
            Трасса 5 метров, кронштейны и работа монтажников — в цене
          </p>
        </div>
      </header>

      <main>
        <CalcSection />
        <PriceSection />
        <WorksSection />
        <RequestSection />
      </main>

      <footer className="section-pad border-t border-line">
        <div className="wrap grid gap-4 md:grid-cols-2">
          <div className="body">
            <p>
              <a href="tel:+74842400998" className="link">
                +7 (4842) 400-998
              </a>
            </p>
            <p className="mt-2">
              <a href="mailto:kondi-kaluga@mail.ru" className="link">
                kondi-kaluga@mail.ru
              </a>
            </p>
          </div>
          <div className="body text-muted">
            <p>г. Калуга, пер. Баррикад, д. 2а, офис 205-2</p>
            <p className="small mt-2">Работаем с 2004 года</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
