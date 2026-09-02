import { useState } from "react";
import { formatRub, useCalc } from "@/lib/calc";
import { useReveal } from "@/lib/reveal";

export function RequestSection() {
  const calc = useCalc();
  const revealRef = useReveal<HTMLDivElement>();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [when, setWhen] = useState("");

  const hasLines = calc.lines.length > 0;
  const totalText = `${calc.totalFrom ? "от " : ""}${formatRub(calc.total)}`;

  return (
    <section id="zayavka" className="section-pad border-t border-line">
      <div className="wrap" ref={revealRef}>
        <h2 className="h2">Отправить расчёт мастеру</h2>

        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-2 md:gap-16">
          <div>
            {hasLines ? (
              <>
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
                <div className="mt-8 border-t border-line pt-8">
                  <p className="small text-muted">Итог</p>
                  <p className="total mt-2 text-green">
                <span key={totalText} className="total-fade inline-block">
                  {totalText}
                </span>
              </p>
                </div>
              </>
            ) : (
              <p className="body measure text-muted">
                Выберите мощность и стену выше — расчёт появится здесь, и мы приедем с готовой ценой
              </p>
            )}
          </div>

          <div>
            {sent ? (
              <p className="body">Заявка отправлена, перезвоним</p>
            ) : (
              <form
                className="grid gap-8"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (sending) return;
                  setSending(true);
                  await new Promise((r) => setTimeout(r, 600));
                  setSending(false);
                  setSent(true);
                }}
              >
                <label className="block">
                  <span className="small block text-muted">Имя</span>
                  <input
                    className="input mt-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </label>

                <label className="block">
                  <span className="small block text-muted">Телефон</span>
                  <input
                    className="input mt-2"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                  />
                </label>

                <label className="block">
                  <span className="small block text-muted">Когда удобно приехать</span>
                  <select
                    className="input mt-2"
                    value={when}
                    onChange={(e) => setWhen(e.target.value)}
                  >
                    <option value="" disabled>
                      Выберите срок
                    </option>
                    <option value="На этой неделе">На этой неделе</option>
                    <option value="На следующей">На следующей</option>
                    <option value="Пока просто узнаю цену">Пока просто узнаю цену</option>
                  </select>
                </label>

                <div>
                  <button type="submit" className="btn" disabled={sending}>
                    {sending ? "Отправляем…" : "Отправить"}
                  </button>
                  <p className="small mt-4 text-muted">
                    Перезвоним в рабочее время. Данные никуда не передаём
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
