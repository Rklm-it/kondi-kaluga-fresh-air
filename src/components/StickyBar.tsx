import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { formatRub, scrollToId, useCalc } from "@/lib/calc";

/**
 * Полоса, которая приезжает сверху, когда первый экран уехал: телефон, текущий
 * итог расчёта и кнопка. Это единственное место, где библиотека анимации
 * действительно нужна — появление и уход элемента, которого в разметке ещё нет.
 *
 * Первого экрана не касается: пока он в кадре, полосы нет вовсе, LCP не трогаем.
 */
export function StickyBar() {
  const calc = useCalc();
  const [vidno, setVidno] = useState(false);
  const tiho = useReducedMotion();

  useEffect(() => {
    const naProkrutku = () => setVidno(window.scrollY > window.innerHeight * 0.9);
    naProkrutku();
    window.addEventListener("scroll", naProkrutku, { passive: true });
    return () => window.removeEventListener("scroll", naProkrutku);
  }, []);

  const itog = `${calc.totalFrom ? "от " : ""}${formatRub(calc.total)}`;

  return (
    <AnimatePresence>
      {vidno && (
        <motion.div
          initial={tiho ? false : { y: -64 }}
          animate={{ y: 0 }}
          exit={tiho ? undefined : { y: -64 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[color:var(--background)]/95 backdrop-blur"
        >
          <div className="wrap flex items-center gap-4 py-3 md:gap-8">
            <span className="body font-semibold hidden sm:inline">Конди-Калуга</span>

            <span className="num small text-muted hidden md:inline">
              монтаж под ключ&nbsp;— <span className="text-ink">{itog}</span>
            </span>

            <a className="link small ml-auto whitespace-nowrap" href="tel:+74842400998">
              +7 (4842) 400-998
            </a>

            <button
              type="button"
              onClick={() => scrollToId("raschet")}
              className="btn h-11 px-5 text-[15px] whitespace-nowrap"
            >
              Рассчитать
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
