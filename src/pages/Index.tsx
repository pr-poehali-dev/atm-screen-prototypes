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

function ATMShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e8e8e4] p-4">
      <div
        className="relative w-full max-w-sm bg-[#1c1c1e] rounded-[2rem] shadow-2xl overflow-hidden"
        style={{ minHeight: 680 }}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00a86b]" />
            <span className="text-[11px] text-[#5a5a60] font-mono-atm tracking-wider uppercase">
              В сети
            </span>
          </div>
          <span className="text-[11px] text-[#5a5a60] font-mono-atm tracking-wider">
            {new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        <div
          className="mx-4 mb-4 rounded-[1.25rem] overflow-hidden bg-[var(--atm-bg)]"
          style={{ minHeight: 600 }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col h-full min-h-[600px] p-8 animate-fade-in">
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-xs font-mono-atm text-[var(--atm-ink-faint)] tracking-[0.2em] uppercase mb-6 animate-slide-up">
          Добро пожаловать
        </p>
        <h1
          className="text-[2.6rem] font-semibold text-[var(--atm-ink)] leading-[1.1] mb-3 animate-slide-up stagger-1"
          style={{ fontFamily: "IBM Plex Sans", letterSpacing: "-0.03em" }}
        >
          Банкомат
        </h1>
        <p className="text-[var(--atm-ink-muted)] text-sm leading-relaxed animate-slide-up stagger-2">
          Быстро, безопасно, удобно
        </p>
        <div className="mt-10 animate-slide-up stagger-3">
          <div className="h-px bg-[var(--atm-border)] mb-8" />
          <p className="text-xs text-[var(--atm-ink-faint)] font-mono-atm mb-1">Обслуживает банк</p>
          <p className="text-sm font-semibold text-[var(--atm-ink)]">ООО «ФинТех Банк»</p>
        </div>
      </div>
      <button
        onClick={onNext}
        className="w-full bg-[var(--atm-ink)] text-white py-4 rounded-xl text-sm font-semibold tracking-wide hover:bg-[#2a2a2a] active:scale-[0.98] transition-all animate-slide-up stagger-4"
      >
        Начать
      </button>
    </div>
  );
}

function InsertCardScreen({ onNext }: { onNext: () => void }) {
  const [inserted, setInserted] = useState(false);

  function handleInsert() {
    setInserted(true);
    setTimeout(onNext, 1200);
  }

  return (
    <div className="flex flex-col h-full min-h-[600px] p-8 animate-fade-in">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div
          className={`w-52 h-32 rounded-2xl mb-8 flex flex-col justify-between p-5 transition-all duration-500 ${
            inserted
              ? "bg-[var(--atm-ink)] scale-105"
              : "bg-[var(--atm-border)] border-2 border-dashed border-[var(--atm-ink-faint)]"
          }`}
        >
          <div className="flex justify-between items-start">
            <div
              className={`w-8 h-6 rounded-md ${inserted ? "bg-[#f0c040]" : "bg-[var(--atm-ink-faint)]"}`}
            />
            {inserted && (
              <Icon name="Wifi" size={16} className="text-white opacity-60" />
            )}
          </div>
          <div>
            <p
              className={`font-mono-atm text-xs tracking-widest ${
                inserted ? "text-white" : "text-[var(--atm-ink-faint)]"
              }`}
            >
              {inserted ? MOCK_CARD : "•••• •••• •••• ••••"}
            </p>
            {inserted && (
              <p className="font-mono-atm text-[10px] text-[#ffffff80] mt-1">{MOCK_OWNER}</p>
            )}
          </div>
        </div>
        {inserted ? (
          <div className="animate-scale-in">
            <p className="text-sm font-semibold text-[var(--atm-ink)]">Карта принята</p>
            <p className="text-xs text-[var(--atm-ink-muted)] mt-1">Переход к вводу ПИН...</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-[var(--atm-ink)] mb-2">Вставьте карту</h2>
            <p className="text-sm text-[var(--atm-ink-muted)] leading-relaxed">
              Или нажмите кнопку, чтобы<br />симулировать вставку карты
            </p>
          </>
        )}
      </div>
      {!inserted && (
        <button
          onClick={handleInsert}
          className="w-full bg-[var(--atm-ink)] text-white py-4 rounded-xl text-sm font-semibold hover:bg-[#2a2a2a] active:scale-[0.98] transition-all"
        >
          Вставить карту
        </button>
      )}
    </div>
  );
}

function PinScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  function handleKey(val: string) {
    if (pin.length < 4) {
      const next = pin + val;
      setPin(next);
      if (next.length === 4) {
        setTimeout(() => {
          if (next === "1234") {
            onNext();
          } else {
            setError(true);
            setTimeout(() => { setError(false); setPin(""); }, 1000);
          }
        }, 300);
      }
    }
  }

  function handleDel() {
    setPin(pin.slice(0, -1));
    setError(false);
  }

  const keys = ["1","2","3","4","5","6","7","8","9","","0","⌫"];

  return (
    <div className="flex flex-col h-full min-h-[600px] p-8 animate-fade-in">
      <button
        onClick={onBack}
        className="self-start text-xs text-[var(--atm-ink-muted)] font-mono-atm mb-6 flex items-center gap-1 hover:text-[var(--atm-ink)] transition-colors"
      >
        <Icon name="ChevronLeft" size={14} /> Назад
      </button>
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-xs font-mono-atm text-[var(--atm-ink-faint)] tracking-[0.2em] uppercase mb-2">
          Карта принята
        </p>
        <h2 className="text-2xl font-semibold text-[var(--atm-ink)] mb-8">Введите ПИН-код</h2>
        <div className="flex gap-4 mb-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                error
                  ? "bg-[var(--atm-danger)]"
                  : i < pin.length
                  ? "bg-[var(--atm-ink)] scale-110"
                  : "bg-[var(--atm-border)] border border-[var(--atm-ink-faint)]"
              }`}
            />
          ))}
        </div>
        {error && (
          <p className="text-xs text-[var(--atm-danger)] mb-4 animate-fade-in">
            Неверный ПИН. Попробуйте ещё раз
          </p>
        )}
        <p className="text-[10px] text-[var(--atm-ink-faint)] font-mono-atm mt-1 mb-8">
          Подсказка: 1234
        </p>
        <div className="grid grid-cols-3 gap-3">
          {keys.map((k, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (k === "⌫") handleDel();
                else if (k !== "") handleKey(k);
              }}
              disabled={k === ""}
              className={`h-14 rounded-xl text-lg font-semibold transition-all active:scale-95 ${
                k === ""
                  ? "invisible"
                  : k === "⌫"
                  ? "bg-[var(--atm-border)] text-[var(--atm-ink-muted)] hover:bg-[#ddd] font-mono-atm"
                  : "bg-[var(--atm-keypad)] text-[var(--atm-ink)] hover:bg-[#e4e4e0]"
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

function MenuScreen({ onAction, onBack }: { onAction: (s: Screen) => void; onBack: () => void }) {
  const items = [
    { label: "Пополнить счёт", sub: "Через карту или кошелёк", icon: "ArrowDownCircle", screen: "topup-method" as Screen, accent: true },
    { label: "Снять наличные", sub: "С карты или счёта", icon: "Banknote", screen: "withdraw-amount" as Screen, accent: false },
    { label: "Перевод", sub: "На карту или по номеру", icon: "ArrowRightLeft", screen: "transfer" as Screen, accent: false },
    { label: "Баланс", sub: "Проверить остаток", icon: "Eye", screen: "balance" as Screen, accent: false },
    { label: "История", sub: "Последние операции", icon: "ClipboardList", screen: "history" as Screen, accent: false },
  ];

  return (
    <div className="flex flex-col h-full min-h-[600px] p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] font-mono-atm text-[var(--atm-ink-faint)] tracking-widest uppercase">
            {MOCK_CARD}
          </p>
          <h2 className="text-xl font-semibold text-[var(--atm-ink)] mt-0.5">Главное меню</h2>
        </div>
        <button
          onClick={onBack}
          className="text-xs text-[var(--atm-ink-muted)] font-mono-atm flex items-center gap-1 hover:text-[var(--atm-danger)] transition-colors"
        >
          Выход
        </button>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {items.map((item, i) => (
          <button
            key={item.screen}
            onClick={() => onAction(item.screen)}
            className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all active:scale-[0.98] animate-slide-up ${
              item.accent
                ? "bg-[var(--atm-ink)] text-white hover:bg-[#2a2a2a]"
                : "bg-white border border-[var(--atm-border)] text-[var(--atm-ink)] hover:border-[var(--atm-ink-muted)]"
            }`}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                item.accent ? "bg-white/10" : "bg-[var(--atm-keypad)]"
              }`}
            >
              <Icon
                name={item.icon}
                size={18}
                className={item.accent ? "text-white" : "text-[var(--atm-ink)]"}
              />
            </div>
            <div>
              <p className={`text-sm font-semibold ${item.accent ? "text-white" : "text-[var(--atm-ink)]"}`}>
                {item.label}
              </p>
              <p className={`text-[11px] mt-0.5 ${item.accent ? "text-white/60" : "text-[var(--atm-ink-faint)]"}`}>
                {item.sub}
              </p>
            </div>
            <Icon
              name="ChevronRight"
              size={16}
              className={`ml-auto ${item.accent ? "text-white/40" : "text-[var(--atm-ink-faint)]"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function TopupMethodScreen({ onSelect, onBack }: { onSelect: (m: string) => void; onBack: () => void }) {
  const methods = [
    { id: "card", label: "Банковская карта", sub: "Visa, Mastercard, Мир", icon: "CreditCard" },
    { id: "wallet", label: "Мобильный кошелёк", sub: "СБП, ЮMoney, QIWI", icon: "Smartphone" },
    { id: "cash", label: "Наличными", sub: "Вставьте купюры в приёмник", icon: "Banknote" },
  ];

  return (
    <div className="flex flex-col h-full min-h-[600px] p-8 animate-fade-in">
      <button
        onClick={onBack}
        className="self-start text-xs text-[var(--atm-ink-muted)] font-mono-atm mb-6 flex items-center gap-1 hover:text-[var(--atm-ink)] transition-colors"
      >
        <Icon name="ChevronLeft" size={14} /> Назад
      </button>
      <p className="text-xs font-mono-atm text-[var(--atm-ink-faint)] tracking-[0.2em] uppercase mb-2">
        Пополнение счёта
      </p>
      <h2 className="text-2xl font-semibold text-[var(--atm-ink)] mb-8">Выберите способ</h2>
      <div className="flex flex-col gap-3 flex-1">
        {methods.map((m, i) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className="flex items-center gap-4 p-5 bg-white border border-[var(--atm-border)] rounded-xl text-left hover:border-[var(--atm-ink)] hover:shadow-sm transition-all active:scale-[0.98] animate-slide-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="w-11 h-11 rounded-xl bg-[var(--atm-keypad)] flex items-center justify-center flex-shrink-0">
              <Icon name={m.icon} size={20} className="text-[var(--atm-ink)]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--atm-ink)]">{m.label}</p>
              <p className="text-xs text-[var(--atm-ink-faint)] mt-0.5">{m.sub}</p>
            </div>
            <Icon name="ChevronRight" size={16} className="ml-auto text-[var(--atm-ink-faint)]" />
          </button>
        ))}
      </div>
    </div>
  );
}

function AmountScreen({
  title,
  subtitle,
  onConfirm,
  onBack,
  confirmLabel = "Подтвердить",
}: {
  title: string;
  subtitle: string;
  onConfirm: (amount: number) => void;
  onBack: () => void;
  confirmLabel?: string;
}) {
  const [amount, setAmount] = useState("");
  const presets = ["500", "1000", "3000", "5000"];

  function handleKey(val: string) {
    if (val === "⌫") {
      setAmount((a) => a.slice(0, -1));
    } else if (val === "." && amount.includes(".")) {
      return;
    } else if (amount.length < 7) {
      setAmount((a) => a + val);
    }
  }

  const parsed = parseFloat(amount) || 0;
  const keys = ["1","2","3","4","5","6","7","8","9",".","0","⌫"];

  return (
    <div className="flex flex-col h-full min-h-[600px] p-8 animate-fade-in">
      <button
        onClick={onBack}
        className="self-start text-xs text-[var(--atm-ink-muted)] font-mono-atm mb-6 flex items-center gap-1 hover:text-[var(--atm-ink)] transition-colors"
      >
        <Icon name="ChevronLeft" size={14} /> Назад
      </button>
      <p className="text-xs font-mono-atm text-[var(--atm-ink-faint)] tracking-[0.2em] uppercase mb-1">
        {subtitle}
      </p>
      <h2 className="text-2xl font-semibold text-[var(--atm-ink)] mb-6">{title}</h2>
      <div className="bg-[var(--atm-keypad)] rounded-xl px-5 py-4 mb-4">
        <p className="text-[10px] font-mono-atm text-[var(--atm-ink-faint)] mb-1 tracking-widest uppercase">Сумма (₽)</p>
        <p className="font-mono-atm text-3xl font-semibold text-[var(--atm-ink)] tracking-tight">
          {amount ? `${Number(amount).toLocaleString("ru-RU")}` : "0"}
          <span className="text-[var(--atm-ink-faint)]"> ₽</span>
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-5">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => setAmount(p)}
            className={`py-2 rounded-lg text-xs font-semibold font-mono-atm transition-all ${
              amount === p
                ? "bg-[var(--atm-ink)] text-white"
                : "bg-white border border-[var(--atm-border)] text-[var(--atm-ink-muted)] hover:border-[var(--atm-ink)]"
            }`}
          >
            {Number(p).toLocaleString("ru-RU")}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-5">
        {keys.map((k, idx) => (
          <button
            key={idx}
            onClick={() => handleKey(k)}
            className="h-12 rounded-xl text-base font-semibold bg-[var(--atm-keypad)] text-[var(--atm-ink)] hover:bg-[#e4e4e0] active:scale-95 transition-all font-mono-atm"
          >
            {k}
          </button>
        ))}
      </div>
      <button
        disabled={parsed <= 0}
        onClick={() => onConfirm(parsed)}
        className="w-full bg-[var(--atm-ink)] text-white py-4 rounded-xl text-sm font-semibold hover:bg-[#2a2a2a] active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {confirmLabel}
      </button>
    </div>
  );
}

function ProcessingScreen({ label = "Обрабатываем операцию..." }: { label?: string }) {
  return (
    <div className="flex flex-col h-full min-h-[600px] p-8 items-center justify-center animate-fade-in">
      <div className="flex gap-2 mb-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-[var(--atm-ink)] animate-pulse-dot"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
      <p className="text-sm text-[var(--atm-ink-muted)] font-mono-atm tracking-wide">{label}</p>
    </div>
  );
}

function SuccessScreen({ amount, label, onDone }: { amount: number; label: string; onDone: () => void }) {
  return (
    <div className="flex flex-col h-full min-h-[600px] p-8 animate-fade-in">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--atm-success-light)] flex items-center justify-center mb-6 animate-scale-in">
          <Icon name="Check" size={28} className="text-[var(--atm-success)]" />
        </div>
        <p className="text-xs font-mono-atm text-[var(--atm-success)] tracking-[0.2em] uppercase mb-2 animate-slide-up">
          Успешно
        </p>
        <h2 className="text-2xl font-semibold text-[var(--atm-ink)] mb-2 animate-slide-up stagger-1">{label}</h2>
        <p className="font-mono-atm text-3xl font-semibold text-[var(--atm-ink)] mb-6 animate-slide-up stagger-2">
          {amount.toLocaleString("ru-RU")} ₽
        </p>
        <div className="w-full bg-[var(--atm-keypad)] rounded-xl p-4 text-left animate-slide-up stagger-3">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-[var(--atm-ink-faint)] font-mono-atm">Карта</span>
            <span className="text-[var(--atm-ink)] font-mono-atm">{MOCK_CARD}</span>
          </div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-[var(--atm-ink-faint)] font-mono-atm">Дата</span>
            <span className="text-[var(--atm-ink)] font-mono-atm">{new Date().toLocaleDateString("ru-RU")}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[var(--atm-ink-faint)] font-mono-atm">Статус</span>
            <span className="text-[var(--atm-success)] font-semibold font-mono-atm">Выполнено</span>
          </div>
        </div>
      </div>
      <button
        onClick={onDone}
        className="w-full bg-[var(--atm-ink)] text-white py-4 rounded-xl text-sm font-semibold hover:bg-[#2a2a2a] active:scale-[0.98] transition-all"
      >
        В главное меню
      </button>
    </div>
  );
}

function BalanceScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full min-h-[600px] p-8 animate-fade-in">
      <button
        onClick={onBack}
        className="self-start text-xs text-[var(--atm-ink-muted)] font-mono-atm mb-6 flex items-center gap-1 hover:text-[var(--atm-ink)] transition-colors"
      >
        <Icon name="ChevronLeft" size={14} /> Назад
      </button>
      <p className="text-xs font-mono-atm text-[var(--atm-ink-faint)] tracking-[0.2em] uppercase mb-2">
        Остаток по счёту
      </p>
      <h2 className="text-2xl font-semibold text-[var(--atm-ink)] mb-8">Баланс</h2>
      <div className="flex-1 flex flex-col justify-center">
        <div className="bg-[var(--atm-ink)] rounded-2xl p-7 mb-4 animate-scale-in">
          <p className="text-xs font-mono-atm text-white/50 tracking-widest uppercase mb-1">Доступно</p>
          <p className="font-mono-atm text-4xl font-semibold text-white tracking-tight">
            {MOCK_BALANCE.toLocaleString("ru-RU", { minimumFractionDigits: 2 })}
            <span className="text-white/50 text-2xl"> ₽</span>
          </p>
          <div className="h-px bg-white/10 my-4" />
          <div className="flex justify-between">
            <div>
              <p className="text-[10px] text-white/40 font-mono-atm uppercase tracking-widest">Карта</p>
              <p className="text-xs text-white/80 font-mono-atm mt-0.5">{MOCK_CARD}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/40 font-mono-atm uppercase tracking-widest">Владелец</p>
              <p className="text-xs text-white/80 font-mono-atm mt-0.5">{MOCK_OWNER}</p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--atm-keypad)] rounded-xl p-4 animate-slide-up stagger-1">
          <div className="flex justify-between text-xs mb-3">
            <span className="text-[var(--atm-ink-faint)] font-mono-atm">Кредитный лимит</span>
            <span className="text-[var(--atm-ink)] font-mono-atm">100 000 ₽</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[var(--atm-ink-faint)] font-mono-atm">Последнее пополнение</span>
            <span className="text-[var(--atm-ink)] font-mono-atm">07.06.2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryScreen({ onBack }: { onBack: () => void }) {
  const ops = [
    { icon: "ArrowDownCircle", label: "Пополнение", date: "08.06.2026", amount: "+5 000", color: "text-[#00a86b]" },
    { icon: "ArrowUpCircle", label: "Снятие", date: "07.06.2026", amount: "−2 000", color: "text-[#e53935]" },
    { icon: "ArrowRightLeft", label: "Перевод", date: "06.06.2026", amount: "−1 500", color: "text-[#e53935]" },
    { icon: "ArrowDownCircle", label: "Пополнение", date: "05.06.2026", amount: "+10 000", color: "text-[#00a86b]" },
    { icon: "ArrowUpCircle", label: "Снятие", date: "04.06.2026", amount: "−3 000", color: "text-[#e53935]" },
  ];

  return (
    <div className="flex flex-col h-full min-h-[600px] p-8 animate-fade-in">
      <button
        onClick={onBack}
        className="self-start text-xs text-[var(--atm-ink-muted)] font-mono-atm mb-6 flex items-center gap-1 hover:text-[var(--atm-ink)] transition-colors"
      >
        <Icon name="ChevronLeft" size={14} /> Назад
      </button>
      <p className="text-xs font-mono-atm text-[var(--atm-ink-faint)] tracking-[0.2em] uppercase mb-2">
        {MOCK_CARD}
      </p>
      <h2 className="text-2xl font-semibold text-[var(--atm-ink)] mb-6">История</h2>
      <div className="flex flex-col gap-2 flex-1">
        {ops.map((op, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 bg-white border border-[var(--atm-border)] rounded-xl animate-slide-up"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--atm-keypad)] flex items-center justify-center flex-shrink-0">
              <Icon name={op.icon} size={18} className="text-[var(--atm-ink)]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[var(--atm-ink)]">{op.label}</p>
              <p className="text-[11px] text-[var(--atm-ink-faint)] font-mono-atm mt-0.5">{op.date}</p>
            </div>
            <p className={`font-mono-atm text-sm font-semibold ${op.color}`}>{op.amount} ₽</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransferScreen({ onBack, onNext }: { onBack: () => void; onNext: (num: string) => void }) {
  const [phone, setPhone] = useState("");
  const keys = ["1","2","3","4","5","6","7","8","9","","0","⌫"];

  function handleKey(k: string) {
    if (k === "⌫") setPhone((p) => p.slice(0, -1));
    else if (phone.length < 10) setPhone((p) => p + k);
  }

  const formatted = phone.length > 0
    ? `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8, 10)}`
    : "";

  return (
    <div className="flex flex-col h-full min-h-[600px] p-8 animate-fade-in">
      <button
        onClick={onBack}
        className="self-start text-xs text-[var(--atm-ink-muted)] font-mono-atm mb-6 flex items-center gap-1 hover:text-[var(--atm-ink)] transition-colors"
      >
        <Icon name="ChevronLeft" size={14} /> Назад
      </button>
      <p className="text-xs font-mono-atm text-[var(--atm-ink-faint)] tracking-[0.2em] uppercase mb-2">Перевод</p>
      <h2 className="text-2xl font-semibold text-[var(--atm-ink)] mb-6">Номер получателя</h2>
      <div className="bg-[var(--atm-keypad)] rounded-xl px-5 py-4 mb-6">
        <p className="text-[10px] font-mono-atm text-[var(--atm-ink-faint)] mb-1 tracking-widest uppercase">Телефон</p>
        <p className="font-mono-atm text-xl font-semibold text-[var(--atm-ink)]">
          {formatted || "+7 (___) ___-__-__"}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-6 flex-1">
        {keys.map((k, idx) => (
          <button
            key={idx}
            onClick={() => k !== "" && handleKey(k)}
            disabled={k === ""}
            className={`h-14 rounded-xl text-lg font-semibold transition-all active:scale-95 ${
              k === ""
                ? "invisible"
                : "bg-white border border-[var(--atm-border)] text-[var(--atm-ink)] hover:border-[var(--atm-ink-muted)] font-mono-atm"
            }`}
          >
            {k}
          </button>
        ))}
      </div>
      <button
        disabled={phone.length < 10}
        onClick={() => onNext(phone)}
        className="w-full bg-[var(--atm-ink)] text-white py-4 rounded-xl text-sm font-semibold hover:bg-[#2a2a2a] active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Продолжить
      </button>
    </div>
  );
}

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
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [screen]);

  function renderScreen() {
    switch (screen) {
      case "welcome":
        return <WelcomeScreen onNext={() => setScreen("insert-card")} />;
      case "insert-card":
        return <InsertCardScreen onNext={() => setScreen("pin")} />;
      case "pin":
        return <PinScreen onBack={() => setScreen("insert-card")} onNext={() => setScreen("menu")} />;
      case "menu":
        return <MenuScreen onBack={() => setScreen("welcome")} onAction={(s) => setScreen(s)} />;
      case "topup-method":
        return <TopupMethodScreen onBack={() => setScreen("menu")} onSelect={() => setScreen("topup-amount")} />;
      case "topup-amount":
        return (
          <AmountScreen
            title="Сумма пополнения"
            subtitle="Пополнение счёта"
            confirmLabel="Пополнить"
            onBack={() => setScreen("topup-method")}
            onConfirm={(a) => { setOpAmount(a); setScreen("topup-processing"); }}
          />
        );
      case "topup-processing":
        return <ProcessingScreen label="Зачисляем средства..." />;
      case "topup-success":
        return <SuccessScreen amount={opAmount} label="Счёт пополнен" onDone={() => setScreen("menu")} />;
      case "withdraw-amount":
        return (
          <AmountScreen
            title="Сумма снятия"
            subtitle="Снятие наличных"
            confirmLabel="Снять"
            onBack={() => setScreen("menu")}
            onConfirm={(a) => { setOpAmount(a); setScreen("withdraw-processing"); }}
          />
        );
      case "withdraw-processing":
        return <ProcessingScreen label="Выдаём наличные..." />;
      case "withdraw-success":
        return <SuccessScreen amount={opAmount} label="Наличные выданы" onDone={() => setScreen("menu")} />;
      case "transfer":
        return (
          <TransferScreen
            onBack={() => setScreen("menu")}
            onNext={(p) => { setTransferPhone(p); setScreen("transfer-amount"); }}
          />
        );
      case "transfer-amount":
        return (
          <AmountScreen
            title="Сумма перевода"
            subtitle={`Перевод на +7${transferPhone}`}
            confirmLabel="Перевести"
            onBack={() => setScreen("transfer")}
            onConfirm={(a) => { setOpAmount(a); setScreen("transfer-processing"); }}
          />
        );
      case "transfer-processing":
        return <ProcessingScreen label="Выполняем перевод..." />;
      case "transfer-success":
        return <SuccessScreen amount={opAmount} label="Перевод выполнен" onDone={() => setScreen("menu")} />;
      case "balance":
        return <BalanceScreen onBack={() => setScreen("menu")} />;
      case "history":
        return <HistoryScreen onBack={() => setScreen("menu")} />;
      default:
        return null;
    }
  }

  return <ATMShell>{renderScreen()}</ATMShell>;
}
