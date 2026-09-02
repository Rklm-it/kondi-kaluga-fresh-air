import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type PowerKey =
  | "7"
  | "9"
  | "12"
  | "18"
  | "24"
  | "30"
  | "36"
  | "48"
  | "60";

export type WallKey = "penoblok" | "kirpich" | "beton";

export const POWERS: {
  key: PowerKey;
  label: string;
  price: number;
  /** цена дополнительного метра трассы; null — в прайсе нет */
  extraMeter: number | null;
  extraMeterFrom?: boolean;
}[] = [
  { key: "7", label: "7 (20) 2,0 кВт", price: 12000, extraMeter: 1700 },
  { key: "9", label: "9 (25) 2,5 кВт", price: 12000, extraMeter: 1700 },
  { key: "12", label: "12 (35) 3,5 кВт", price: 13000, extraMeter: 1900 },
  { key: "18", label: "18 (50) 5,1 кВт", price: 14000, extraMeter: 2200 },
  { key: "24", label: "24 (70) 6,5 кВт", price: 16000, extraMeter: 2500 },
  { key: "30", label: "30 (80) 8,0 кВт", price: 17000, extraMeter: 2600 },
  {
    key: "36",
    label: "36 (100) 10,5 кВт",
    price: 19000,
    extraMeter: 3000,
    extraMeterFrom: true,
  },
  { key: "48", label: "48 (140) 14,0 кВт", price: 20000, extraMeter: null },
  { key: "60", label: "60 (160) 16,0 кВт", price: 21500, extraMeter: null },
];

export const WALLS: { key: WallKey; label: string; price: number }[] = [
  { key: "penoblok", label: "Пеноблок", price: 900 },
  { key: "kirpich", label: "Кирпич", price: 1500 },
  { key: "beton", label: "Бетон", price: 2000 },
];

export type CalcLine = {
  id: string;
  label: string;
  /** сумма в рублях; null — цена не определена */
  amount: number | null;
  from?: boolean;
  /** текст вместо суммы */
  note?: string;
};

export type ExtraItem = {
  id: string;
  label: string;
  amount: number | null;
  from?: boolean;
};

type CalcState = {
  power: PowerKey | null;
  routeMeters: number;
  wall: WallKey | null;
  shtrobaMeters: number;
  vyshka: boolean;
  alpinist: boolean;
  demontazh: boolean;
  extras: ExtraItem[];
};

type CalcContextValue = CalcState & {
  setPower: (p: PowerKey) => void;
  setRouteMeters: (m: number) => void;
  setWall: (w: WallKey) => void;
  setShtrobaMeters: (m: number) => void;
  toggle: (key: "vyshka" | "alpinist" | "demontazh") => void;
  toggleExtra: (item: ExtraItem) => void;
  hasExtra: (id: string) => boolean;
  lines: CalcLine[];
  total: number;
  totalFrom: boolean;
  scrollTo: (id: string) => void;
};

const CalcContext = createContext<CalcContextValue | null>(null);

export const formatRub = (n: number) =>
  `${n.toLocaleString("ru-RU").replace(/\u00A0/g, " ")} ₽`;

export function scrollToId(id: string) {
  const el = typeof document !== "undefined" ? document.getElementById(id) : null;
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CalcProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CalcState>({
    power: null,
    routeMeters: 5,
    wall: null,
    shtrobaMeters: 1.5,
    vyshka: false,
    alpinist: false,
    demontazh: false,
    extras: [],
  });

  const setPower = useCallback(
    (power: PowerKey) => setState((s) => ({ ...s, power })),
    [],
  );
  const setRouteMeters = useCallback(
    (routeMeters: number) => setState((s) => ({ ...s, routeMeters })),
    [],
  );
  const setWall = useCallback((wall: WallKey) => setState((s) => ({ ...s, wall })), []);
  const setShtrobaMeters = useCallback(
    (shtrobaMeters: number) => setState((s) => ({ ...s, shtrobaMeters })),
    [],
  );
  const toggle = useCallback(
    (key: "vyshka" | "alpinist" | "demontazh") =>
      setState((s) => ({ ...s, [key]: !s[key] })),
    [],
  );
  const toggleExtra = useCallback(
    (item: ExtraItem) =>
      setState((s) => ({
        ...s,
        extras: s.extras.some((e) => e.id === item.id)
          ? s.extras.filter((e) => e.id !== item.id)
          : [...s.extras, item],
      })),
    [],
  );

  const lines = useMemo<CalcLine[]>(() => {
    const out: CalcLine[] = [];
    const power = POWERS.find((p) => p.key === state.power);

    if (power) {
      out.push({
        id: "power",
        label: `Стандартный монтаж, ${power.label}`,
        amount: power.price,
      });

      const extra = Math.max(0, Math.round((state.routeMeters - 5) * 10) / 10);
      if (extra > 0) {
        if (power.extraMeter === null) {
          out.push({
            id: "route",
            label: `Трасса сверх пяти метров, ${formatMeters(extra)} м`,
            amount: null,
            note: "[уточнить]",
          });
        } else {
          out.push({
            id: "route",
            label: `Трасса сверх пяти метров, ${formatMeters(extra)} м`,
            amount: Math.round(power.extraMeter * extra),
            from: power.extraMeterFrom,
          });
        }
      }
    }

    const wall = WALLS.find((w) => w.key === state.wall);
    if (wall && state.shtrobaMeters > 0) {
      out.push({
        id: "shtroba",
        label: `Штроба в ${wall.label.toLowerCase()}е, ${formatMeters(state.shtrobaMeters)} м`,
        amount: Math.round(wall.price * state.shtrobaMeters),
      });
    }

    if (state.vyshka) {
      out.push({ id: "vyshka", label: "Автовышка, 2 часа", amount: 4000, from: true });
    }
    if (state.alpinist) {
      out.push({ id: "alpinist", label: "Услуги альпиниста", amount: 7000, from: true });
    }
    if (state.demontazh) {
      out.push({
        id: "demontazh",
        label: "Демонтаж кондиционера",
        amount: 3500,
        from: true,
      });
    }

    for (const e of state.extras) {
      out.push({
        id: e.id,
        label: e.label,
        amount: e.amount,
        from: e.from,
        note: e.amount === null ? "[уточнить]" : undefined,
      });
    }

    return out;
  }, [state]);

  const total = useMemo(
    () => lines.reduce((sum, l) => sum + (l.amount ?? 0), 0),
    [lines],
  );
  const totalFrom = useMemo(
    () => lines.some((l) => l.from || l.amount === null),
    [lines],
  );

  const value: CalcContextValue = {
    ...state,
    setPower,
    setRouteMeters,
    setWall,
    setShtrobaMeters,
    toggle,
    toggleExtra,
    hasExtra: (id: string) => state.extras.some((e) => e.id === id),
    lines,
    total,
    totalFrom,
    scrollTo: scrollToId,
  };

  return <CalcContext.Provider value={value}>{children}</CalcContext.Provider>;
}

function formatMeters(n: number) {
  return String(n).replace(".", ",");
}

export function useCalc() {
  const ctx = useContext(CalcContext);
  if (!ctx) throw new Error("useCalc must be used inside CalcProvider");
  return ctx;
}
