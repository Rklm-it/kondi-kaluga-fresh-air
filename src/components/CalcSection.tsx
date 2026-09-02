import { useEffect, useRef, useState } from "react";
import { POWERS, WALLS, formatRub, scrollToId, useCalc } from "@/lib/calc";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="small block text-muted">{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

function Check({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="body flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="check mt-1 shrink-0"
      />
      <span className="min-w-0">{children}</span>
    </label>
  );
}

export function CalcSection() {
  const calc = useCalc();
  const sectionRef = useRef<HTMLElement>(null);
  const [barVisible, setBarVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setBarVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hasLines = calc.lines.length > 0;
  const totalText = `${calc.totalFrom ? "от " : ""}${formatRub(calc.total)}`;

  return (
    <section id="raschet" ref={sectionRef} className="section-pad border-t border-line">
      <div className="wrap">
        <h2 className="h2">Посчитаем при вас</h2>

        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-2 md:gap-16">
          {/* Поля */}
          <div className="grid gap-8">
            <Field label="Мощность">
              <select
                className="input"
                value={calc.power ?? ""}
                onChange={(e) => calc.setPower(e.target.value as never)}
              >
                <option value="" disabled>
                  Выберите мощность
                </option>
                {POWERS.map((p) => (
                  <option key={p.key} value={p.key}>
                    {p.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Трасса, метров (до 5 входит в цену)">
              <input
                type="number"
                min={5}
                step={0.5}
                className="input"
                value={calc.routeMeters}
                onChange={(e) =>
                  calc.setRouteMeters(Math.max(5, Number(e.target.value) || 5))
                }
              />
            </Field>

            <Field label="Стена">
              <select
                className="input"
                value={calc.wall ?? ""}
                onChange={(e) => calc.setWall(e.target.value as never)}
              >
                <option value="" disabled>
                  Выберите материал
                </option>
                {WALLS.map((w) => (
                  <option key={w.key} value={w.key}>
                    {w.label} — {formatRub(w.price)} за метр штробы
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Метров штробы">
              <input
                type="number"
                min={0}
                step={0.5}
                className="input"
                value={calc.shtrobaMeters}
                onChange={(e) =>
                  calc.setShtrobaMeters(Math.max(0, Number(e.target.value) || 0))
                }
              />
            </Field>

            <div className="grid gap-4 border-t border-line pt-8">
              <Check checked={calc.vyshka} onChange={() => calc.toggle("vyshka")}>
                Высоко — нужна автовышка, от 2 000 ₽ в час, минимум два часа
              </Check>
              <Check checked={calc.alpinist} onChange={() => calc.toggle("alpinist")}>
                Нет доступа с вышки — услуги альпиниста
              </Check>
              <Check checked={calc.demontazh} onChange={() => calc.toggle("demontazh")}>
                Снять старый кондиционер
              </Check>
            </div>
          </div>

          {/* Расчёт */}
          <div>
            {hasLines ? (
              <div className="grid gap-3">
                {calc.lines.map((l) => (
                  <div
                    key={l.id}
                    className="body grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-6"
                  >
                    <span className="min-w-0 text-muted">{l.label}</span>
                    <span className="num shrink-0">
                      {l.note ?? `${l.from ? "от " : ""}${formatRub(l.amount ?? 0)}`}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="body measure text-muted">
                Выберите мощность и стену — расчёт появится здесь построчно.
              </p>
            )}

            <div className="mt-8 border-t border-line pt-8">
              <p className="small text-muted">Итог</p>
              <p className="total mt-2 text-green">{hasLines ? totalText : "—"}</p>
              <button
                type="button"
                className="btn mt-8"
                onClick={() => scrollToId("zayavka")}
              >
                Отправить расчёт мастеру
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильная полоса с итогом — только внутри этой секции */}
      {hasLines && barVisible && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background px-6 py-3 md:hidden">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <span className="small min-w-0 truncate text-muted">Итог</span>
            <span className="num shrink-0 text-green" style={{ fontWeight: 600 }}>
              {totalText}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
