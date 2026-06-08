import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Screen =
  | "welcome"
  | "insert-card"
  | "pin"
  | "menu"
  | "topup-method"
  | "topup-amount"
  | "topup-processing"
  | "topup-success"
  | "balance"
  | "withdraw-amount"
  | "withdraw-processing"
  | "withdraw-success"
  | "transfer"
  | "transfer-amount"
  | "transfer-processing"
  | "transfer-success"
  | "history";

const MOCK_BALANCE = 84_320.5;
const MOCK_CARD = "**** **** **** 4821";
const MOCK_OWNER = "ИВАНОВ АЛЕКСЕЙ";

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-mono-atm text-[#4a4a50] text-sm tracking-widest">
      {time.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </span>
  );
}

/* ── Shell: fullscreen 16:9 monitor frame ── */
function ATMShell({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#2b2b2e] flex items-center justify-center p-6">
      {/* Monitor bezel */}
      <div className="w-full max-w-[1100px] bg-[#1a1a1c] rounded-[1.75rem] shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden border border-[#333336]">
        {/* Status bar */}
        <div className="flex items-center justify-between px-10 py-3 border-b border-[#2a2a2e] bg-[#111113]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00a86b] shadow-[0_0_6px_#00a86b]" />
            <span className="font-mono-atm text-[#3a3a40] text-xs tracking-[0.25em] uppercase">В сети</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono-atm text-[#3a3a40] text-xs tracking-widest">ООО «ФинТех Банк»</span>
            <Clock />
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex" style={{ minHeight: 580 }}>
          {/* LEFT panel — context / branding */}
          <div className="w-[340px] flex-shrink-0 bg-[#111113] border-r border-[#222226] flex flex-col p-10">
            {left}
          </div>

          {/* RIGHT panel — main action area */}
          <div className="flex-1 bg-[#f5f5f2] flex flex-col">
            {right}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-10 py-3 border-t border-[#2a2a2e] bg-[#111113]">
          <span className="font-mono-atm text-[#2a2a30] text-[10px] tracking-[0.3em] uppercase">
            ATM · v2.4.1
          </span>
          <span className="font-mono-atm text-[#2a2a30] text-[10px] tracking-[0.3em] uppercase">
            Защищено · TLS 1.3
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Left panel variants ── */
function LeftBrand() {
  return (
    <div className="flex flex-col h-full justify-between animate-fade-in">
      <div>
        <div className="w-10 h-10 rounded-xl bg-[#1e1e22] border border-[#333336] flex items-center justify-center mb-8">
          <Icon name="Landmark" size={20} className="text-[#5a5a66]" />
        </div>
        <p className="font-mono-atm text-[#3a3a44] text-xs tracking-[0.3em] uppercase mb-4">Добро пожаловать</p>
        <h1 className="text-white text-5xl font-semibold leading-[1.05]" style={{ letterSpacing: "-0.03em" }}>
          Банко<br />мат
        </h1>
        <p className="text-[#4a4a54] text-sm mt-5 leading-relaxed">
          Быстро, безопасно,<br />удобно
        </p>
      </div>
      <div>
        <div className="h-px bg-[#222226] mb-5" />
        <p className="font-mono-atm text-[#2e2e36] text-[10px] tracking-widest uppercase mb-1">Оператор</p>
        <p className="text-[#5a5a66] text-sm">ООО «ФинТех Банк»</p>
      </div>
    </div>
  );
}

function LeftCard({ screen }: { screen: string }) {
  const labels: Record<string, { title: string; hint: string }> = {
    "insert-card": { title: "Шаг 1", hint: "Вставьте карту" },
    pin: { title: "Шаг 2", hint: "Подтверждение" },
    menu: { title: "Главное", hint: "меню" },
    "topup-method": { title: "Пополнение", hint: "Выбор способа" },
    "topup-amount": { title: "Пополнение", hint: "Введите сумму" },
    "topup-processing": { title: "Пополнение", hint: "Обработка..." },
    "topup-success": { title: "Пополнение", hint: "Выполнено" },
    "withdraw-amount": { title: "Снятие", hint: "Введите сумму" },
    "withdraw-processing": { title: "Снятие", hint: "Обработка..." },
    "withdraw-success": { title: "Снятие", hint: "Выполнено" },
    transfer: { title: "Перевод", hint: "Номер получателя" },
    "transfer-amount": { title: "Перевод", hint: "Введите сумму" },
    "transfer-processing": { title: "Перевод", hint: "Обработка..." },
    "transfer-success": { title: "Перевод", hint: "Выполнено" },
    balance: { title: "Баланс", hint: "Остаток по счёту" },
    history: { title: "История", hint: "Операций" },
  };

  const info = labels[screen] || { title: "", hint: "" };

  return (
    <div className="flex flex-col h-full justify-between animate-fade-in">
      <div>
        <div className="w-10 h-10 rounded-xl bg-[#1e1e22] border border-[#333336] flex items-center justify-center mb-8">
          <Icon name="Landmark" size={20} className="text-[#5a5a66]" />
        </div>
        <p className="font-mono-atm text-[#3a3a44] text-xs tracking-[0.3em] uppercase mb-3">{info.title}</p>
        <h2 className="text-white text-4xl font-semibold leading-[1.1]" style={{ letterSpacing: "-0.02em" }}>
          {info.hint}
        </h2>
      </div>

      {screen !== "insert-card" && screen !== "pin" && screen !== "welcome" && (
        <div className="bg-[#1a1a1e] border border-[#2a2a30] rounded-2xl p-5">
          <p className="font-mono-atm text-[#2e2e38] text-[10px] tracking-widest uppercase mb-2">Карта</p>
          <p className="font-mono-atm text-[#5a5a66] text-sm tracking-widest">{MOCK_CARD}</p>
          <div className="h-px bg-[#222226] my-3" />
          <p className="font-mono-atm text-[#2e2e38] text-[10px] tracking-widest uppercase mb-1">Владелец</p>
          <p className="font-mono-atm text-[#5a5a66] text-sm">{MOCK_OWNER}</p>
        </div>
      )}

      {(screen === "insert-card" || screen === "pin") && (
        <div>
          <div className="h-px bg-[#222226] mb-5" />
          <p className="font-mono-atm text-[#2e2e36] text-[10px] tracking-widest uppercase mb-1">Безопасность</p>
          <p className="text-[#3a3a44] text-xs leading-relaxed">Никогда не сообщайте ПИН-код третьим лицам</p>
        </div>
      )}
    </div>
  );
}

/* ── Screens (right panel) ── */
function WelcomeRight({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col h-full p-12 animate-fade-in">
      <div className="flex-1 flex flex-col justify-center max-w-lg">
        <p className="font-mono-atm text-[#a0a09a] text-xs tracking-[0.3em] uppercase mb-6 animate-slide-up">
          Для начала работы
        </p>
        <h2 className="text-[var(--atm-ink)] text-4xl font-semibold mb-4 leading-tight animate-slide-up stagger-1" style={{ letterSpacing: "-0.02em" }}>
          Нажмите кнопку<br />для входа
        </h2>
        <p className="text-[var(--atm-ink-muted)] text-base leading-relaxed animate-slide-up stagger-2">
          Или вставьте карту в картоприёмник.
          Поддерживаются карты Visa, Mastercard, Мир.
        </p>
      </div>
      <div className="flex gap-4 animate-slide-up stagger-3">
        <button
          onClick={onNext}
          className="flex items-center gap-3 bg-[var(--atm-ink)] text-white px-10 py-5 rounded-2xl text-base font-semibold hover:bg-[#2a2a2a] active:scale-[0.98] transition-all"
        >
          <Icon name="CreditCard" size={20} />
          Начать работу
        </button>
      </div>
    </div>
  );
}

function InsertCardRight({ onNext }: { onNext: () => void }) {
  const [inserted, setInserted] = useState(false);
  function handleInsert() {
    setInserted(true);
    setTimeout(onNext, 1200);
  }
  return (
    <div className="flex flex-col h-full p-12 animate-fade-in">
      <div className="flex-1 flex flex-col justify-center items-start">
        {/* Large card illustration */}
        <div
          className={`w-80 h-48 rounded-3xl mb-10 flex flex-col justify-between p-8 transition-all duration-500 ${
            inserted ? "bg-[var(--atm-ink)] scale-105" : "bg-[#e8e8e4] border-2 border-dashed border-[#ccc]"
          }`}
        >
          <div className="flex justify-between items-start">
            <div className={`w-12 h-8 rounded-lg ${inserted ? "bg-[#f0c040]" : "bg-[#c0c0bc]"}`} />
            {inserted && <Icon name="Wifi" size={20} className="text-white opacity-50" />}
          </div>
          <div>
            <p className={`font-mono-atm text-base tracking-[0.2em] mb-1 ${inserted ? "text-white" : "text-[#aaa]"}`}>
              {inserted ? MOCK_CARD : "•••• •••• •••• ••••"}
            </p>
            {inserted && (
              <p className="font-mono-atm text-xs text-white/60">{MOCK_OWNER}</p>
            )}
          </div>
        </div>
        {inserted ? (
          <div className="animate-scale-in">
            <p className="text-2xl font-semibold text-[var(--atm-ink)] mb-1">Карта принята</p>
            <p className="text-[var(--atm-ink-muted)]">Переходим к вводу ПИН-кода...</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-[var(--atm-ink)] mb-3">Вставьте карту</h2>
            <p className="text-[var(--atm-ink-muted)] text-base mb-8">
              Поднесите карту к картоприёмнику или нажмите кнопку ниже для демонстрации
            </p>
            <button
              onClick={handleInsert}
              className="flex items-center gap-3 bg-[var(--atm-ink)] text-white px-10 py-5 rounded-2xl text-base font-semibold hover:bg-[#2a2a2a] active:scale-[0.98] transition-all"
            >
              <Icon name="CreditCard" size={20} />
              Вставить карту
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function PinRight({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  function handleKey(val: string) {
    if (pin.length < 4) {
      const next = pin + val;
      setPin(next);
      if (next.length === 4) {
        setTimeout(() => {
          if (next === "1234") { onNext(); }
          else { setError(true); setTimeout(() => { setError(false); setPin(""); }, 1000); }
        }, 300);
      }
    }
  }

  function handleDel() { setPin(pin.slice(0, -1)); setError(false); }

  const keys = ["1","2","3","4","5","6","7","8","9","","0","⌫"];

  return (
    <div className="flex h-full p-12 gap-16 animate-fade-in">
      {/* Left: info */}
      <div className="flex flex-col justify-center flex-1">
        <button
          onClick={onBack}
          className="self-start flex items-center gap-2 text-[var(--atm-ink-muted)] text-sm font-mono-atm hover:text-[var(--atm-ink)] transition-colors mb-10"
        >
          <Icon name="ChevronLeft" size={16} /> Назад
        </button>
        <h2 className="text-4xl font-semibold text-[var(--atm-ink)] mb-6" style={{ letterSpacing: "-0.02em" }}>
          Введите<br />ПИН-код
        </h2>
        <div className="flex gap-5 mb-3">
          {[0,1,2,3].map((i) => (
            <div
              key={i}
              className={`w-5 h-5 rounded-full transition-all duration-200 ${
                error ? "bg-[var(--atm-danger)]"
                : i < pin.length ? "bg-[var(--atm-ink)] scale-110"
                : "border-2 border-[#ccc]"
              }`}
            />
          ))}
        </div>
        {error && <p className="text-[var(--atm-danger)] text-sm mt-2 animate-fade-in">Неверный ПИН-код</p>}
        <p className="font-mono-atm text-[#b0b0aa] text-xs mt-4">Подсказка: 1234</p>
      </div>

      {/* Right: keypad */}
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-3 gap-3 w-64">
          {keys.map((k, idx) => (
            <button
              key={idx}
              onClick={() => { if (k === "⌫") handleDel(); else if (k !== "") handleKey(k); }}
              disabled={k === ""}
              className={`h-16 rounded-2xl text-xl font-semibold transition-all active:scale-95 ${
                k === "" ? "invisible"
                : k === "⌫" ? "bg-[#e8e8e4] text-[var(--atm-ink-muted)] hover:bg-[#ddd] font-mono-atm"
                : "bg-[var(--atm-keypad)] text-[var(--atm-ink)] hover:bg-[#e2e2de]"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MenuRight({ onAction, onBack }: { onAction: (s: Screen) => void; onBack: () => void }) {
  const items = [
    { label: "Пополнить счёт", sub: "Через карту или кошелёк", icon: "ArrowDownCircle", screen: "topup-method" as Screen, accent: true },
    { label: "Снять наличные", sub: "С карты или счёта", icon: "Banknote", screen: "withdraw-amount" as Screen, accent: false },
    { label: "Перевод", sub: "На карту или по номеру", icon: "ArrowRightLeft", screen: "transfer" as Screen, accent: false },
    { label: "Баланс", sub: "Проверить остаток на счёте", icon: "Eye", screen: "balance" as Screen, accent: false },
    { label: "История", sub: "Последние операции", icon: "ClipboardList", screen: "history" as Screen, accent: false },
  ];

  return (
    <div className="flex flex-col h-full p-10 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-[var(--atm-ink)]">Выберите операцию</h2>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[var(--atm-ink-muted)] font-mono-atm hover:text-[var(--atm-danger)] transition-colors"
        >
          <Icon name="LogOut" size={14} /> Завершить сеанс
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1 content-start">
        {/* First item — full width, accent */}
        <button
          onClick={() => onAction("topup-method")}
          className="col-span-2 flex items-center gap-5 p-6 rounded-2xl bg-[var(--atm-ink)] text-white hover:bg-[#2a2a2a] active:scale-[0.98] transition-all animate-slide-up"
        >
          <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <Icon name="ArrowDownCircle" size={26} className="text-white" />
          </div>
          <div>
            <p className="text-lg font-semibold">Пополнить счёт</p>
            <p className="text-white/50 text-sm mt-0.5">Через карту или кошелёк</p>
          </div>
          <Icon name="ChevronRight" size={20} className="ml-auto text-white/30" />
        </button>

        {items.slice(1).map((item, i) => (
          <button
            key={item.screen}
            onClick={() => onAction(item.screen)}
            className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-[var(--atm-border)] hover:border-[#aaa] hover:shadow-sm active:scale-[0.98] transition-all animate-slide-up"
            style={{ animationDelay: `${(i + 1) * 0.07}s` }}
          >
            <div className="w-11 h-11 rounded-xl bg-[var(--atm-keypad)] flex items-center justify-center flex-shrink-0">
              <Icon name={item.icon} size={20} className="text-[var(--atm-ink)]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--atm-ink)]">{item.label}</p>
              <p className="text-[11px] text-[var(--atm-ink-faint)] mt-0.5">{item.sub}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TopupMethodRight({ onSelect, onBack }: { onSelect: (m: string) => void; onBack: () => void }) {
  const methods = [
    { id: "card", label: "Банковская карта", sub: "Visa, Mastercard, Мир", icon: "CreditCard" },
    { id: "wallet", label: "Мобильный кошелёк", sub: "СБП, ЮMoney, QIWI", icon: "Smartphone" },
    { id: "cash", label: "Наличными", sub: "Вставьте купюры в приёмник", icon: "Banknote" },
  ];
  return (
    <div className="flex flex-col h-full p-12 animate-fade-in">
      <button
        onClick={onBack}
        className="self-start flex items-center gap-2 text-[var(--atm-ink-muted)] text-sm font-mono-atm hover:text-[var(--atm-ink)] transition-colors mb-8"
      >
        <Icon name="ChevronLeft" size={16} /> Назад
      </button>
      <h2 className="text-3xl font-semibold text-[var(--atm-ink)] mb-8" style={{ letterSpacing: "-0.02em" }}>
        Выберите способ<br />пополнения
      </h2>
      <div className="flex flex-col gap-4">
        {methods.map((m, i) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className="flex items-center gap-5 p-6 bg-white border border-[var(--atm-border)] rounded-2xl hover:border-[var(--atm-ink)] hover:shadow-md active:scale-[0.98] transition-all animate-slide-up"
            style={{ animationDelay: `${i * 0.09}s` }}
          >
            <div className="w-14 h-14 rounded-2xl bg-[var(--atm-keypad)] flex items-center justify-center flex-shrink-0">
              <Icon name={m.icon} size={24} className="text-[var(--atm-ink)]" />
            </div>
            <div>
              <p className="text-base font-semibold text-[var(--atm-ink)]">{m.label}</p>
              <p className="text-sm text-[var(--atm-ink-faint)] mt-0.5">{m.sub}</p>
            </div>
            <Icon name="ChevronRight" size={18} className="ml-auto text-[var(--atm-ink-faint)]" />
          </button>
        ))}
      </div>
    </div>
  );
}

function AmountRight({
  title,
  confirmLabel,
  onConfirm,
  onBack,
}: {
  title: string;
  confirmLabel: string;
  onConfirm: (a: number) => void;
  onBack: () => void;
}) {
  const [amount, setAmount] = useState("");
  const presets = ["500", "1 000", "3 000", "5 000", "10 000", "15 000"];

  function handleKey(val: string) {
    if (val === "⌫") { setAmount((a) => a.slice(0, -1)); return; }
    if (val === "." && amount.includes(".")) return;
    if (amount.replace(".", "").length < 7) setAmount((a) => a + val);
  }

  const parsed = parseFloat(amount) || 0;
  const keys = ["1","2","3","4","5","6","7","8","9",".","0","⌫"];

  return (
    <div className="flex h-full p-12 gap-12 animate-fade-in">
      {/* Left col */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[var(--atm-ink-muted)] text-sm font-mono-atm hover:text-[var(--atm-ink)] transition-colors mb-8"
          >
            <Icon name="ChevronLeft" size={16} /> Назад
          </button>
          <h2 className="text-3xl font-semibold text-[var(--atm-ink)] mb-8" style={{ letterSpacing: "-0.02em" }}>
            {title}
          </h2>
          {/* Amount display */}
          <div className="bg-[var(--atm-keypad)] rounded-2xl px-7 py-6 mb-6">
            <p className="font-mono-atm text-[#a0a09a] text-xs tracking-widest uppercase mb-2">Сумма</p>
            <p className="font-mono-atm text-5xl font-semibold text-[var(--atm-ink)] tracking-tight">
              {amount ? Number(amount).toLocaleString("ru-RU") : "0"}
              <span className="text-[#c0c0bc] text-3xl ml-2">₽</span>
            </p>
          </div>
          {/* Presets */}
          <div className="grid grid-cols-3 gap-2">
            {presets.map((p) => {
              const raw = p.replace(/\s/g, "");
              return (
                <button
                  key={p}
                  onClick={() => setAmount(raw)}
                  className={`py-3 rounded-xl text-sm font-semibold font-mono-atm transition-all ${
                    amount === raw
                      ? "bg-[var(--atm-ink)] text-white"
                      : "bg-white border border-[var(--atm-border)] text-[var(--atm-ink-muted)] hover:border-[var(--atm-ink)]"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>
        <button
          disabled={parsed <= 0}
          onClick={() => onConfirm(parsed)}
          className="w-full bg-[var(--atm-ink)] text-white py-5 rounded-2xl text-base font-semibold hover:bg-[#2a2a2a] active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {confirmLabel}
        </button>
      </div>

      {/* Right col: keypad */}
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-3 gap-3 w-64">
          {keys.map((k, idx) => (
            <button
              key={idx}
              onClick={() => handleKey(k)}
              className="h-16 rounded-2xl text-xl font-semibold bg-[var(--atm-keypad)] text-[var(--atm-ink)] hover:bg-[#e2e2de] active:scale-95 transition-all font-mono-atm"
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProcessingRight({ label }: { label: string }) {
  return (
    <div className="flex flex-col h-full items-center justify-center animate-fade-in gap-6">
      <div className="flex gap-3">
        {[0,1,2].map((i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full bg-[var(--atm-ink)] animate-pulse-dot"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
      <p className="font-mono-atm text-[var(--atm-ink-muted)] text-base tracking-widest">{label}</p>
    </div>
  );
}

function SuccessRight({ amount, label, onDone }: { amount: number; label: string; onDone: () => void }) {
  return (
    <div className="flex flex-col h-full p-12 animate-fade-in">
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-[var(--atm-success-light)] flex items-center justify-center animate-scale-in">
            <Icon name="Check" size={30} className="text-[var(--atm-success)]" />
          </div>
          <div>
            <p className="font-mono-atm text-[var(--atm-success)] text-xs tracking-[0.3em] uppercase animate-slide-up">Успешно</p>
            <h2 className="text-3xl font-semibold text-[var(--atm-ink)] animate-slide-up stagger-1" style={{ letterSpacing: "-0.02em" }}>
              {label}
            </h2>
          </div>
        </div>

        <div className="bg-[var(--atm-keypad)] rounded-2xl p-8 mb-8 animate-slide-up stagger-2">
          <p className="font-mono-atm text-[#a0a09a] text-xs tracking-widest uppercase mb-2">Сумма операции</p>
          <p className="font-mono-atm text-5xl font-semibold text-[var(--atm-ink)] mb-6">
            {amount.toLocaleString("ru-RU")} <span className="text-[#c0c0bc] text-3xl">₽</span>
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-mono-atm text-[#a0a09a] text-xs uppercase tracking-wider mb-1">Карта</p>
              <p className="font-mono-atm text-[var(--atm-ink-muted)] text-xs">{MOCK_CARD}</p>
            </div>
            <div>
              <p className="font-mono-atm text-[#a0a09a] text-xs uppercase tracking-wider mb-1">Дата</p>
              <p className="font-mono-atm text-[var(--atm-ink-muted)] text-xs">{new Date().toLocaleDateString("ru-RU")}</p>
            </div>
            <div>
              <p className="font-mono-atm text-[#a0a09a] text-xs uppercase tracking-wider mb-1">Статус</p>
              <p className="font-mono-atm text-[var(--atm-success)] text-xs font-semibold">Выполнено</p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={onDone}
        className="w-full bg-[var(--atm-ink)] text-white py-5 rounded-2xl text-base font-semibold hover:bg-[#2a2a2a] active:scale-[0.98] transition-all animate-slide-up stagger-3"
      >
        В главное меню
      </button>
    </div>
  );
}

function BalanceRight({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full p-12 animate-fade-in">
      <button
        onClick={onBack}
        className="self-start flex items-center gap-2 text-[var(--atm-ink-muted)] text-sm font-mono-atm hover:text-[var(--atm-ink)] transition-colors mb-8"
      >
        <Icon name="ChevronLeft" size={16} /> Назад
      </button>
      <div className="flex-1 flex flex-col justify-center">
        <div className="bg-[var(--atm-ink)] rounded-3xl p-10 mb-6 animate-scale-in">
          <p className="font-mono-atm text-white/40 text-xs tracking-[0.3em] uppercase mb-3">Доступный остаток</p>
          <p className="font-mono-atm text-6xl font-semibold text-white tracking-tight mb-1">
            {MOCK_BALANCE.toLocaleString("ru-RU", { minimumFractionDigits: 2 })}
          </p>
          <p className="font-mono-atm text-white/30 text-2xl">рублей</p>
          <div className="h-px bg-white/10 my-6" />
          <div className="flex justify-between">
            <div>
              <p className="font-mono-atm text-white/30 text-[10px] uppercase tracking-widest mb-1">Номер карты</p>
              <p className="font-mono-atm text-white/70 text-sm tracking-widest">{MOCK_CARD}</p>
            </div>
            <div className="text-right">
              <p className="font-mono-atm text-white/30 text-[10px] uppercase tracking-widest mb-1">Владелец</p>
              <p className="font-mono-atm text-white/70 text-sm">{MOCK_OWNER}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 animate-slide-up stagger-1">
          <div className="bg-white border border-[var(--atm-border)] rounded-2xl p-5">
            <p className="font-mono-atm text-[#a0a09a] text-xs uppercase tracking-widest mb-2">Кредитный лимит</p>
            <p className="font-mono-atm text-xl font-semibold text-[var(--atm-ink)]">100 000 ₽</p>
          </div>
          <div className="bg-white border border-[var(--atm-border)] rounded-2xl p-5">
            <p className="font-mono-atm text-[#a0a09a] text-xs uppercase tracking-widest mb-2">Посл. пополнение</p>
            <p className="font-mono-atm text-xl font-semibold text-[var(--atm-ink)]">07.06.2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryRight({ onBack }: { onBack: () => void }) {
  const ops = [
    { icon: "ArrowDownCircle", label: "Пополнение счёта", date: "08.06.2026  14:32", amount: "+5 000", color: "text-[#00a86b]" },
    { icon: "ArrowUpCircle", label: "Снятие наличных", date: "07.06.2026  09:15", amount: "−2 000", color: "text-[#e53935]" },
    { icon: "ArrowRightLeft", label: "Перевод", date: "06.06.2026  17:44", amount: "−1 500", color: "text-[#e53935]" },
    { icon: "ArrowDownCircle", label: "Пополнение счёта", date: "05.06.2026  11:20", amount: "+10 000", color: "text-[#00a86b]" },
    { icon: "ArrowUpCircle", label: "Снятие наличных", date: "04.06.2026  08:05", amount: "−3 000", color: "text-[#e53935]" },
  ];
  return (
    <div className="flex flex-col h-full p-12 animate-fade-in">
      <button
        onClick={onBack}
        className="self-start flex items-center gap-2 text-[var(--atm-ink-muted)] text-sm font-mono-atm hover:text-[var(--atm-ink)] transition-colors mb-8"
      >
        <Icon name="ChevronLeft" size={16} /> Назад
      </button>
      <h2 className="text-2xl font-semibold text-[var(--atm-ink)] mb-6">Последние операции</h2>
      <div className="flex flex-col gap-3 flex-1">
        {ops.map((op, i) => (
          <div
            key={i}
            className="flex items-center gap-5 p-5 bg-white border border-[var(--atm-border)] rounded-2xl animate-slide-up"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div className="w-12 h-12 rounded-2xl bg-[var(--atm-keypad)] flex items-center justify-center flex-shrink-0">
              <Icon name={op.icon} size={20} className="text-[var(--atm-ink)]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[var(--atm-ink)]">{op.label}</p>
              <p className="font-mono-atm text-xs text-[var(--atm-ink-faint)] mt-0.5">{op.date}</p>
            </div>
            <p className={`font-mono-atm text-base font-semibold ${op.color}`}>{op.amount} ₽</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransferRight({ onBack, onNext }: { onBack: () => void; onNext: (p: string) => void }) {
  const [phone, setPhone] = useState("");
  const keys = ["1","2","3","4","5","6","7","8","9","","0","⌫"];
  function handleKey(k: string) {
    if (k === "⌫") setPhone((p) => p.slice(0, -1));
    else if (phone.length < 10) setPhone((p) => p + k);
  }
  const formatted = phone.length > 0
    ? `+7 (${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6,8)}-${phone.slice(8,10)}`
    : "";

  return (
    <div className="flex h-full p-12 gap-12 animate-fade-in">
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[var(--atm-ink-muted)] text-sm font-mono-atm hover:text-[var(--atm-ink)] transition-colors mb-8"
          >
            <Icon name="ChevronLeft" size={16} /> Назад
          </button>
          <h2 className="text-3xl font-semibold text-[var(--atm-ink)] mb-8" style={{ letterSpacing: "-0.02em" }}>
            Номер телефона<br />получателя
          </h2>
          <div className="bg-[var(--atm-keypad)] rounded-2xl px-7 py-6">
            <p className="font-mono-atm text-[#a0a09a] text-xs tracking-widest uppercase mb-2">Телефон</p>
            <p className="font-mono-atm text-3xl font-semibold text-[var(--atm-ink)]">
              {formatted || "+7 (___) ___-__-__"}
            </p>
          </div>
        </div>
        <button
          disabled={phone.length < 10}
          onClick={() => onNext(phone)}
          className="w-full bg-[var(--atm-ink)] text-white py-5 rounded-2xl text-base font-semibold hover:bg-[#2a2a2a] active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Продолжить
        </button>
      </div>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-3 gap-3 w-64">
          {keys.map((k, idx) => (
            <button
              key={idx}
              onClick={() => k !== "" && handleKey(k)}
              disabled={k === ""}
              className={`h-16 rounded-2xl text-xl font-semibold transition-all active:scale-95 ${
                k === "" ? "invisible"
                : "bg-[var(--atm-keypad)] text-[var(--atm-ink)] hover:bg-[#e2e2de] font-mono-atm"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Root ── */
export default function Index() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [opAmount, setOpAmount] = useState(0);
  const [transferPhone, setTransferPhone] = useState("");

  useEffect(() => {
    if (screen === "topup-processing" || screen === "withdraw-processing" || screen === "transfer-processing") {
      const t = setTimeout(() => {
        if (screen === "topup-processing") setScreen("topup-success");
        if (screen === "withdraw-processing") setScreen("withdraw-success");
        if (screen === "transfer-processing") setScreen("transfer-success");
      }, 2400);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const leftPanel = screen === "welcome" ? <LeftBrand /> : <LeftCard screen={screen} />;

  function renderRight() {
    switch (screen) {
      case "welcome":
        return <WelcomeRight onNext={() => setScreen("insert-card")} />;
      case "insert-card":
        return <InsertCardRight onNext={() => setScreen("pin")} />;
      case "pin":
        return <PinRight onBack={() => setScreen("insert-card")} onNext={() => setScreen("menu")} />;
      case "menu":
        return <MenuRight onBack={() => setScreen("welcome")} onAction={(s) => setScreen(s)} />;
      case "topup-method":
        return <TopupMethodRight onBack={() => setScreen("menu")} onSelect={() => setScreen("topup-amount")} />;
      case "topup-amount":
        return <AmountRight title="Сумма пополнения" confirmLabel="Пополнить счёт" onBack={() => setScreen("topup-method")} onConfirm={(a) => { setOpAmount(a); setScreen("topup-processing"); }} />;
      case "topup-processing":
        return <ProcessingRight label="Зачисляем средства..." />;
      case "topup-success":
        return <SuccessRight amount={opAmount} label="Счёт пополнен" onDone={() => setScreen("menu")} />;
      case "withdraw-amount":
        return <AmountRight title="Сумма снятия" confirmLabel="Снять наличные" onBack={() => setScreen("menu")} onConfirm={(a) => { setOpAmount(a); setScreen("withdraw-processing"); }} />;
      case "withdraw-processing":
        return <ProcessingRight label="Выдаём наличные..." />;
      case "withdraw-success":
        return <SuccessRight amount={opAmount} label="Наличные выданы" onDone={() => setScreen("menu")} />;
      case "transfer":
        return <TransferRight onBack={() => setScreen("menu")} onNext={(p) => { setTransferPhone(p); setScreen("transfer-amount"); }} />;
      case "transfer-amount":
        return <AmountRight title="Сумма перевода" confirmLabel="Перевести" onBack={() => setScreen("transfer")} onConfirm={(a) => { setOpAmount(a); setScreen("transfer-processing"); }} />;
      case "transfer-processing":
        return <ProcessingRight label="Выполняем перевод..." />;
      case "transfer-success":
        return <SuccessRight amount={opAmount} label="Перевод выполнен" onDone={() => setScreen("menu")} />;
      case "balance":
        return <BalanceRight onBack={() => setScreen("menu")} />;
      case "history":
        return <HistoryRight onBack={() => setScreen("menu")} />;
      default:
        return null;
    }
  }

  return <ATMShell left={leftPanel} right={renderRight()} />;
}
