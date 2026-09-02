import { useEffect, useRef } from "react";

const REDUCED = "(prefers-reduced-motion: reduce)";

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia(REDUCED).matches;
}

/**
 * Появление блока при прокрутке. Класс «reveal» ставится скриптом,
 * поэтому без JS секция остаётся видимой.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;

    el.classList.add("reveal");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

/**
 * Появление детей лесенкой: шаг 60 мс, не больше пяти шагов.
 */
export function useRevealGroup<T extends HTMLElement>(selector = "[data-reveal-item]") {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReduced()) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(selector));
    items.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${Math.min(i, 4) * 60}ms`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);

  return ref;
}
