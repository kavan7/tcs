"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================================================
   Page
   ========================================================= */
export default function Home() {
  const navigateTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    if (typeof window !== "undefined") history.replaceState(null, "", `#${id}`);
  }, []);

  const [activeTab, setActiveTab] =
    useState<"home" | "scan" | "order" | "gift" | "offers">("home");
  const [popoverOpen, setPopoverOpen] = useState(false);

  const setAndNav = (tab: typeof activeTab) => {
    setActiveTab(tab);
    navigateTo(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05261d] via-[#0b3f2e] to-[#0a2c23] flex items-center justify-center p-6">
      {/* iPhone frame */}
      <div className="relative w-[390px] h-[844px] rounded-[56px] bg-black shadow-[0_30px_120px_rgba(0,0,0,0.7)] ring-1 ring-black/40">
        {/* side buttons (decorative) */}
        <div className="absolute -left-1 top-24 h-24 w-0.5 rounded-full bg-black/60" />
        <div className="absolute -right-1 top-36 h-16 w-0.5 rounded-full bg-black/60" />
        <div className="absolute -right-1 top-60 h-10 w-0.5 rounded-full bg-black/60" />

        {/* Screen */}
        <div className="absolute inset-2 m-2 rounded-[44px] overflow-hidden bg-white">
          {/* Dynamic island */}
          <div className="pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-[22px] bg-black/90 px-8 py-2 backdrop-blur">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-16 rounded-full bg-zinc-800" />
              <span className="h-2 w-2 rounded-full bg-zinc-800" />
            </div>
          </div>

          <StatusBar />

          {/* scrollable app */}
          <div className="absolute inset-x-0 top-12 bottom-24 overflow-auto">
            {/* HOME */}
            <section id="home" className="px-5 pt-3 pb-6">
              <Header />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <StarSummary balance={38} />
              </motion.div>

              <PromoCardModern />

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
                className="mt-4"
              >
                <button
                  onClick={() => setPopoverOpen(true)}
                  className="w-full py-4 rounded-2xl bg-[#203a31] text-white text-lg font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.15)] hover:brightness-[1.03] active:scale-[0.995] transition"
                >
                  Vote Bundles
                </button>
              </motion.div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <GhostBig onClick={() => setAndNav("order")} label="Start order" />
                <GhostBig onClick={() => setAndNav("rewards" as any)} label="Rewards" />
              </div>

              <section id="order" className="px-5 py-6 border-t border-zinc-100">
                <SectionTitle
                  title="Order"
                  subtitle="Pick a store, choose your drink, customize, and check out."
                />
                <PickupBanner />
                <CategoryPills />
                <MenuList />
              </section>

              <section id="scan" className="px-5 py-6 border-t border-zinc-100">
                <SectionTitle title="Scan" subtitle="Pay quickly and earn Stars." />
                <ScanCard />
              </section>

              <section id="gift" className="px-5 py-6 border-t border-zinc-100">
                <SectionTitle
                  title="Gift"
                  subtitle="Send e-gifts and seasonal cards to friends."
                />
                <GiftGrid />
              </section>

              <section id="offers" className="px-5 py-6 border-t border-zinc-100">
                <SectionTitle
                  title="Offers"
                  subtitle="Personalized promotions and limited-time deals."
                />
                <OffersList />
              </section>

              <section id="rewards" className="px-5 py-6 border-t border-zinc-100">
                <RewardsDetail />
              </section>
            </section>
          </div>

          {/* bottom tabs */}
          <div className="absolute bottom-6 left-4 right-4">
            <div className="rounded-2xl bg-white/90 backdrop-blur border border-zinc-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between px-4 py-2">
                <NavItem label="Home" active={activeTab === "home"} onClick={() => setAndNav("home")} />
                <NavItem label="Scan" active={activeTab === "scan"} onClick={() => setAndNav("scan")} />
                <NavItem label="Order" active={activeTab === "order"} onClick={() => setAndNav("order")} />
                <NavItem label="Gift" active={activeTab === "gift"} onClick={() => setAndNav("gift")} />
                <NavItem label="Offers" active={activeTab === "offers"} onClick={() => setAndNav("offers")} />
              </div>
            </div>
            <div className="mt-2 flex justify-center">
              <div className="h-1 w-28 rounded-full bg-zinc-300" />
            </div>
          </div>
        </div>

        {/* Voting modal */}
        <AnimatePresence>
          {popoverOpen && (
            <VotingModal onClose={() => setPopoverOpen(false)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* =========================================================
   Top Bar / Header
   ========================================================= */
function StatusBar() {
  return (
    <div className="px-5 pt-5 pb-3 flex items-center justify-between text-sm text-zinc-600">
      <div className="font-medium">9:50</div>
      <div className="flex items-center gap-3 text-xs">
        <div className="flex items-center px-2 py-1 rounded-md bg-zinc-100">
          <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
            <rect x="1" y="6" width="3" height="5" rx="0.8" fill="#374151" />
            <rect x="6" y="4" width="3" height="7" rx="0.8" fill="#374151" />
            <rect x="11" y="2" width="3" height="9" rx="0.8" fill="#374151" />
            <rect x="16" y="0" width="3" height="11" rx="0.8" fill="#374151" />
          </svg>
        </div>
        <div className="flex items-center px-2 py-1 rounded-md bg-zinc-100">
          <svg width="34" height="16" viewBox="0 0 34 16" fill="none">
            <rect x="1" y="3" width="26" height="10" rx="2" stroke="#374151" strokeWidth="1.2" fill="none" />
            <rect x="28.5" y="5" width="3" height="6" rx="0.8" fill="#374151" />
            <rect x="3" y="4" width="20" height="8" rx="1" fill="#374151" style={{ opacity: 0.9 }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-[34px] leading-[1.05] font-bold text-zinc-900">Good morning,</h1>
        <div className="mt-1 text-[34px] leading-[1.05] font-extrabold text-zinc-900 flex items-center gap-2">
          Heidi
          <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-[#e8f6ef]">
            <CupIcon fill="#0b3f2e" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   Cards + Content
   ========================================================= */

function StarSummary({ balance }: { balance: number }) {
  const animBalance = useAnimatedNumber(balance, 500);

  return (
    <div className="mt-5 rounded-[28px] border border-zinc-200 bg-white p-4 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between gap-4">
        {/* left */}
        <div className="shrink min-w-[160px]">
          <div className="text-xs text-zinc-500">Star balance</div>
          <div className="mt-1 flex items-baseline gap-2">
            <div className="text-[56px] leading-none font-extrabold text-[#103a2c] tabular-nums">
              {animBalance}
            </div>
            <div className="text-2xl text-[#f2c14e] -mt-1">★</div>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="px-4 py-2 rounded-full border border-zinc-200 text-sm font-medium text-zinc-600 bg-zinc-50">
              Details
            </button>
            <button className="px-5 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-zinc-900 transition">
              Redeem
            </button>
          </div>
        </div>
        {/* right */}
        <div className="flex-1 shrink-0">
          <div className="flex items-center justify-between text-sm text-zinc-500">
            <span>Rewards options</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M7 10l5 5 5-5" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="mt-2 w-[120px] ml-auto">
            <RewardsPill current={balance} stops={[25, 50, 150, 200]} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RewardsPill({ current, stops }: { current: number; stops: number[] }) {
  const reachedIdx =
    current >= stops[stops.length - 1]
      ? stops.length
      : stops.findIndex((s) => current < s);
  const progressRatio =
    reachedIdx < 0 ? 1 : Math.max(0, Math.min(1, reachedIdx / stops.length));

  return (
    <div className="select-none">
      <div className="relative h-10 w-full rounded-full bg-white ring-1 ring-inset ring-zinc-200 px-3 flex items-center justify-between overflow-visible">
        {/* gold track behind */}
        <div className="absolute left-1.5 right-1.5 top-1/2 -translate-y-1/2 h-7 rounded-full bg-[#e8c468]/60" />
        <motion.div
          className="absolute left-1.5 top-1/2 -translate-y-1/2 h-7 rounded-l-full bg-[#e8c468]"
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(0, progressRatio * 100)}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          style={{ maxWidth: "calc(100% - 12px)" }}
        />
        {/* dots */}
        <div className="relative z-[1] grid w-full grid-cols-4 place-items-center">
          {stops.map((s, i) => {
            const filled = current >= s;
            return (
              <div key={s} className="relative">
                <div
                  className={[
                    "h-3 w-3 rounded-full grid place-items-center ring-2 transition-colors",
                    filled ? "bg-[#103a2c] ring-[#103a2c]" : "bg-white ring-zinc-300",
                  ].join(" ")}
                >
                  <div className={filled ? "h-2.5 w-2.5 rounded-full bg-white/85" : "h-2.5 w-2.5 rounded-full bg-zinc-300"} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* labels */}
      <div className="mt-1 grid grid-cols-4 text-[11px] text-zinc-600">
        {stops.map((s) => (
          <div key={s} className="text-center">
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

function PromoCardModern() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mt-5 rounded-3xl border border-[#dfeee6] bg-gradient-to-br from-[#eff8f3] via-white to-[#eef7f2] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden relative"
    >
      <div className="pointer-events-none absolute -top-6 -right-4 h-24 w-24 rounded-full bg-[#c7efd9] opacity-30 blur-2xl" />
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="text-xs font-semibold tracking-wide text-zinc-600">
            Collect up to
          </div>
          <div className="mt-1 text-2xl font-semibold text-zinc-900">
            50 Bonus Stars
          </div>
          <div className="mt-1 text-xs text-zinc-500">This week · 7–11 a.m.</div>
          <div className="mt-3 flex items-center gap-2">
            <button className="rounded-full bg-[#0b3f2e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a3627] transition">
              Activate
            </button>
            <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-[#0b3f2e] hover:bg-white transition">
              Details
            </button>
          </div>
        </div>
        <motion.div
          initial={{ rotate: -8, scale: 0.95, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.08 }}
          className="grid h-20 w-20 place-items-center rounded-2xl bg-[#e3f3ea] ring-1 ring-[#d6eee3]"
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="drop-shadow-sm">
            <path d="M12 2l2.6 6.9L21 10l-5.1 3.7L17 21l-5-3.3L7 21l1.1-7.3L3 10l6.4-.9L12 2z" fill="#0b3f2e" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   Voting Modal (no persistence = resets on reload)
   ========================================================= */
function VotingModal({ onClose }: { onClose: () => void }) {
  type Item = { id: string; label: string; img: string };
  type Bundle = { id: string; title: string; color: string; foods: Item[]; drinks: Item[] };

  const bundles: Bundle[] = [
    {
      id: "Classic",
      title: "Classic Bundle",
      color: "#0b3f2e",
      foods: [
        { id: "croissant", label: "Butter Croissant", img: "/images/foods/croissant.jpg" },
        { id: "muffin", label: "Blueberry Muffin", img: "/images/foods/muffin.jpg" },
        { id: "sandwich", label: "Ham & Cheese", img: "/images/foods/sandwich.jpg" },
      ],
      drinks: [
        { id: "latte", label: "Caffè Latte", img: "/images/drinks/latte.jpg" },
        { id: "americano", label: "Americano", img: "/images/drinks/americano.jpg" },
        { id: "icedtea", label: "Iced Tea", img: "/images/drinks/iced-tea.jpg" },
      ],
    },
    {
      id: "Brunch",
      title: "Brunch Bundle",
      color: "#0e684e",
      foods: [
        { id: "bagel", label: "Everything Bagel", img: "/images/foods/bagel.jpg" },
        { id: "oat", label: "Oatmeal", img: "/images/foods/oatmeal.jpg" },
        { id: "quiche", label: "Mini Quiche", img: "/images/foods/quiche.jpg" },
      ],
      drinks: [
        { id: "flatwhite", label: "Flat White", img: "/images/drinks/flat-white.jpg" },
        { id: "coldbrew", label: "Cold Brew", img: "/images/drinks/cold-brew.jpg" },
        { id: "matcha", label: "Matcha", img: "/images/drinks/matcha.jpg" },
      ],
    },
    {
      id: "Spring",
      title: "Spring Picks",
      color: "#148f6b",
      foods: [
        { id: "biscuit", label: "Herb Biscuit", img: "/images/foods/biscuit.jpg" },
        { id: "parfait", label: "Fruit Parfait", img: "/images/foods/parfait.jpg" },
        { id: "salad", label: "Spring Salad", img: "/images/foods/salad.jpg" },
      ],
      drinks: [
        { id: "frapp", label: "Strawberry Frapp", img: "/images/drinks/frapp.jpg" },
        { id: "lemontea", label: "Lemon Tea", img: "/images/drinks/lemon-tea.jpg" },
        { id: "spark", label: "Sparkling Refresher", img: "/images/drinks/refresher.jpg" },
      ],
    },
  ];

  // reset on reload: do NOT persist anywhere
  const [userVoted, setUserVoted] = useState(false);

  // votes start + drift
  const [totalVotes, setTotalVotes] = useState<number>(53156);
  const [bundleVotes, setBundleVotes] = useState<Record<string, number>>({
    Classic: 21000,
    Brunch: 18000,
    Spring: 14156,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setTotalVotes((v) => v + 1 + Math.floor(Math.random() * 3));
      setBundleVotes((b) => {
        const copy = { ...b };
        const keys = Object.keys(copy);
        const k = keys[Math.floor(Math.random() * keys.length)];
        copy[k] += 1;
        return copy;
      });
    }, 1500 + Math.random() * 1000);
    return () => clearInterval(id);
  }, []);

  const [activeBundle, setActiveBundle] = useState<string>("Classic");
  const [selections, setSelections] = useState<Record<string, { food?: string; drink?: string }>>({});
  const canVote = !userVoted && !!(selections[activeBundle]?.food && selections[activeBundle]?.drink);

  const castVote = () => {
    if (!canVote) return;
    setUserVoted(true);
    setTotalVotes((v) => v + 1);
    setBundleVotes((b) => ({ ...b, [activeBundle]: (b[activeBundle] ?? 0) + 1 }));
  };

  const deadline = useRef(Date.now() + 1000 * 60 * 60 * 4);
  const cd = useCountdown(deadline.current);
  const dist: Record<string, number> = Object.fromEntries(
    Object.entries(bundleVotes).map(([k, v]) => [k, Math.round((v / totalVotes) * 100)])
  ) as Record<string, number>;

  return (
    <motion.div
      className="absolute inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ y: 24, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 24, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="absolute left-1/2 top-1/2 w-[360px] max-h-[86vh] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl bg-white shadow-2xl p-5"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-green-900">Vote: Pick a bundle</div>
            <div className="text-sm text-zinc-500">Choose one food + one drink — live results below</div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">✕</button>
        </div>

        {/* tabs */}
        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
          {bundles.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveBundle(b.id)}
              className={`rounded-full px-4 py-2 text-sm ring-1 ring-inset transition ${
                activeBundle === b.id ? "text-white" : "text-zinc-700"
              }`}
              style={{ backgroundColor: activeBundle === b.id ? b.color : "white", borderColor: "#e5e7eb" }}
            >
              {b.title}
            </button>
          ))}
        </div>

        {/* selections */}
        {bundles.map((b) => (
          <div key={b.id} className={activeBundle === b.id ? "block" : "hidden"}>
            <div className="mt-4">
              <div className="text-xs font-semibold text-zinc-500 mb-2">Food</div>
              <div className="grid grid-cols-3 gap-3">
                {b.foods.map((f) => {
                  const selected = selections[b.id]?.food === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelections((s) => ({ ...s, [b.id]: { ...s[b.id], food: f.id } }))}
                      className={`group rounded-xl overflow-hidden border ${
                        selected ? "border-[#0b3f2e] ring-2 ring-[#a7f3d0]" : "border-zinc-200"
                      } bg-white`}
                    >
                      <Img src={f.img} alt={f.label} className="h-24 w-full object-cover" />
                      <div className="p-2 text-xs font-medium text-zinc-800 group-hover:text-[#0b3f2e]">{f.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs font-semibold text-zinc-500 mb-2">Drink</div>
              <div className="grid grid-cols-3 gap-3">
                {b.drinks.map((d) => {
                  const selected = selections[b.id]?.drink === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setSelections((s) => ({ ...s, [b.id]: { ...s[b.id], drink: d.id } }))}
                      className={`group rounded-xl overflow-hidden border ${
                        selected ? "border-[#0b3f2e] ring-2 ring-[#a7f3d0]" : "border-zinc-200"
                      } bg-white`}
                    >
                      <Img src={d.img} alt={d.label} className="h-24 w-full object-cover" />
                      <div className="p-2 text-xs font-medium text-zinc-800 group-hover:text-[#0b3f2e]">{d.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* tally */}
        <div className="mt-5 rounded-xl border border-zinc-200 p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500">Live votes</div>
              <motion.div
                key={totalVotes}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-2xl font-extrabold text-zinc-900 tracking-tight"
              >
                {totalVotes.toLocaleString()}
              </motion.div>
            </div>
            <div className="text-right">
              <div className="text-xs text-zinc-500">Voting closes in</div>
              <div className={`text-sm font-semibold ${cd.soon ? "text-rose-600" : "text-zinc-900"}`}>
                {cd.hours}h {cd.minutes}m {cd.seconds}s
              </div>
              {cd.soon && <div className="text-[10px] text-rose-600 mt-1">Closing soon</div>}
            </div>
          </div>
          <div className="mt-3 space-y-2">
            {Object.keys(bundleVotes).map((k) => (
              <div key={k}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{k}</span>
                  <span className="text-zinc-600">
                    {bundleVotes[k].toLocaleString()} • {dist[k]}%
                  </span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(3, dist[k])}%` }}
                    transition={{ duration: 0.35 }}
                    className="h-2 rounded-full"
                    style={{
                      background: k === "Classic" ? "#0b3f2e" : k === "Brunch" ? "#0e684e" : "#148f6b",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={castVote}
            disabled={!canVote}
            className={`flex-1 py-3 rounded-md text-white font-medium transition ${
              userVoted
                ? "bg-[#0b3f2e]" // stay green after vote
                : canVote
                ? "bg-[#0b3f2e] hover:bg-[#0a3627]"
                : "bg-zinc-400"
            }`}
          >
            {userVoted ? "Thanks for voting" : "Vote for selected bundle"}
          </button>
          <button onClick={onClose} className="px-3 py-2 rounded-md border border-zinc-200 hover:bg-zinc-50">
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   Misc content sections (kept concise)
   ========================================================= */
function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>}
    </div>
  );
}

function PickupBanner() {
  return (
    <button className="mt-4 w-full flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-3 text-left text-sm ring-1 ring-inset ring-zinc-200 hover:bg-white transition">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0b3f2e] text-white">
          <MapPinIcon />
        </div>
        <div>
          <div className="font-semibold">Pickup • Front &amp; Bay</div>
          <div className="text-xs text-zinc-500">0.2 km · Ready in ~5–10 min</div>
        </div>
      </div>
      <ChevronRightIcon />
    </button>
  );
}

function CategoryPills() {
  const pills = ["Featured", "Hot Coffees", "Cold Coffees", "Teas", "Food", "Bakery"];
  const [active, setActive] = useState("Featured");
  return (
    <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-2">
      {pills.map((p) => (
        <button
          key={p}
          onClick={() => setActive(p)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ring-1 ring-inset transition ${
            active === p ? "bg-[#0b3f2e] text-white ring-[#0b3f2e]" : "bg-white text-zinc-700 ring-zinc-200 hover:bg-zinc-50"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

function MenuList() {
  const items = [
    { id: "1", name: "Iced Vanilla Latte", desc: "Espresso, milk, vanilla over ice", price: 5.45 },
    { id: "2", name: "Cappuccino", desc: "Rich foam, bold espresso", price: 4.95 },
    { id: "3", name: "Chai Tea Latte", desc: "Spiced black tea with milk", price: 4.65 },
  ];
  const [cart, setCart] = useState<Record<string, number>>({});
  const cartCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);
  const cartTotal = useMemo(
    () => Object.entries(cart).reduce((s, [id, q]) => s + ((items.find((i) => i.id === id)?.price ?? 0) * q), 0),
    [cart]
  );

  function inc(id: string) { setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 })); }
  function dec(id: string) {
    setCart((c) => {
      const n = { ...c };
      if (!n[id]) return n;
      n[id] = Math.max(0, n[id] - 1);
      if (!n[id]) delete n[id];
      return n;
    });
  }

  return (
    <div className="mt-3">
      <div className="grid grid-cols-1 gap-3">
        {items.map((p) => (
          <article key={p.id} className="flex gap-4 rounded-2xl bg-white p-3 ring-1 ring-zinc-200 hover:bg-zinc-50 transition">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-zinc-200">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#e7f3ed,transparent_60%)]" />
              <div className="grid h-full place-items-center text-[#0b3f2e]">
                <CupIcon />
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold leading-tight">{p.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-zinc-500">{p.desc}</p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm font-medium">${p.price.toFixed(2)}</div>
                <div className="flex items-center gap-2">
                  <IconButton onClick={() => dec(p.id)} disabled={!cart[p.id]} ariaLabel="Decrease"><MinusIcon /></IconButton>
                  <span className="w-6 text-center text-sm tabular-nums">{cart[p.id] ?? 0}</span>
                  <IconButton onClick={() => inc(p.id)} ariaLabel="Increase"><PlusIcon /></IconButton>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {cartCount > 0 && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky bottom-2 z-10 mt-4 flex items-center justify-between rounded-2xl bg-[#0b3f2e] px-4 py-3 text-white shadow-lg"
        >
          <div>
            <div className="font-semibold">
              {cartCount} item{cartCount > 1 ? "s" : ""}
            </div>
            <div className="text-sm opacity-90">Subtotal ${cartTotal.toFixed(2)}</div>
          </div>
          <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#0b3f2e] hover:bg-zinc-50">
            Checkout
          </button>
        </motion.div>
      )}
    </div>
  );
}

function ScanCard() {
  return (
    <div className="mt-6 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 text-white ring-1 ring-zinc-800">
      <div className="flex items-center gap-3">
        <QrIcon />
        <h3 className="text-lg font-semibold">Scan to pay &amp; earn</h3>
      </div>
      <div className="mt-4 grid place-items-center">
        <div className="h-44 w-44 rounded-2xl bg-white p-4">
          <div className="h-full w-full bg-[repeating-linear-gradient(45deg,black,black_6px,white_6px,white_12px)]" />
        </div>
      </div>
      <p className="mt-4 text-sm text-zinc-300">
        Link a payment method to zip through checkout and collect Stars on every purchase.
      </p>
    </div>
  );
}

function GiftGrid() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {["Birthday", "Congrats", "Thank you", "Holiday"].map((t, i) => (
        <div key={i} className="rounded-xl border border-zinc-200 bg-white p-3">
          <div className="h-24 rounded-lg bg-gradient-to-br from-[#e9f4ef] to-white grid place-items-center">
            <GiftIcon />
          </div>
          <div className="mt-2 text-sm font-medium">{t}</div>
        </div>
      ))}
    </div>
  );
}

function OffersList() {
  return (
    <div className="mt-4 space-y-3">
      {[1, 2, 3].map((n) => (
        <article key={n} className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-semibold">Limited-time offer #{n}</h3>
            <span className="text-xs text-zinc-500">Just now</span>
          </div>
          <p className="mt-1 text-sm text-zinc-600">Earn extra Stars when you try something new today. Tap to view details.</p>
        </article>
      ))}
    </div>
  );
}

function RewardsDetail() {
  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-zinc-200">
      <div className="flex items-center gap-3">
        <StarIcon />
        <h2 className="text-lg font-semibold">Your Rewards</h2>
      </div>
      <div className="mt-4 h-2 w-full rounded-full bg-zinc-100">
        <div className="h-2 w-[74%] rounded-full bg-[#0b3f2e]" />
      </div>
      <div className="mt-2 text-sm text-zinc-500">74 / 150 Stars</div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {[25, 50, 150, 200].map((tier) => (
          <div key={tier} className="rounded-2xl border border-dashed border-zinc-300 p-4 text-center">
            <div className="text-2xl font-bold text-[#0b3f2e]">{tier}</div>
            <div className="mt-1 text-xs text-zinc-500">Stars</div>
            <div className="mt-2 text-sm font-medium">Unlock a treat</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   Small UI bits
   ========================================================= */
function GhostBig({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-14 rounded-2xl bg-white ring-1 ring-zinc-200 text-lg font-semibold text-[#203a31] hover:bg-zinc-50 transition"
    >
      {label}
    </button>
  );
}

function Img(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, className } = props;
  const [ok, setOk] = useState(true);
  return ok ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} onError={() => setOk(false)} alt={alt ?? ""} className={className} loading="lazy" decoding="async" />
  ) : (
    <div className={`grid place-items-center bg-zinc-50 ${className}`}>
      <span className="text-xs text-zinc-400">Image</span>
    </div>
  );
}

function IconButton({ children, onClick, disabled, ariaLabel }: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="rounded-full p-2 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-100 disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function NavItem({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  const id = label.toLowerCase();
  return (
    <button onClick={onClick} className={`flex flex-col items-center text-xs ${active ? "text-[#0b3f2e] font-semibold" : "text-zinc-500"}`}>
      <div className={`w-9 h-9 rounded-xl grid place-items-center ${active ? "bg-[#dff3ea]" : "bg-transparent"}`}>
        <Icon name={id} active={active} />
      </div>
      <div className="mt-1">{label}</div>
    </button>
  );
}

function Icon({ name, active }: { name: string; active?: boolean }) {
  const stroke = active ? "#0b3f2e" : "#6b7280";
  const fill = active ? "#0b3f2e" : "none";
  switch (name) {
    case "home":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 11.5L12 4l9 7.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 20h14a1 1 0 0 0 1-1V11H4v8a1 1 0 0 0 1 1z" stroke={stroke} strokeWidth="1.4" fill={fill} />
        </svg>
      );
    case "scan":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="6" width="18" height="2" rx="0.5" fill={stroke} />
          <rect x="3" y="10" width="12" height="2" rx="0.5" fill={stroke} />
          <rect x="3" y="14" width="8" height="2" rx="0.5" fill={stroke} />
        </svg>
      );
    case "order":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M6 7h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7z" stroke={stroke} strokeWidth="1.4" fill={fill} />
          <path d="M9 7a3 3 0 0 1 6 0" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "gift":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="8" width="18" height="10" stroke={stroke} strokeWidth="1.4" fill={fill} />
          <path d="M12 8v10" stroke={stroke} strokeWidth="1.4" />
          <path d="M12 8c2-3 5-3 6 0" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "offers":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20.6 13.4L10.6 3.4a2 2 0 0 0-2.8 0l-4 4a2 2 0 0 0 0 2.8l10 10a2 2 0 0 0 2.8 0l4-4a2 2 0 0 0 0-2.8z" stroke={stroke} strokeWidth="1.2" fill={fill} />
          <circle cx="7.5" cy="7.5" r="1" fill={stroke} />
        </svg>
      );
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke={stroke} strokeWidth="1.2" />
        </svg>
      );
  }
}

/* =========================================================
   Icons
   ========================================================= */
function CupIcon({ fill = "#0b3f2e" }: { fill?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 7h14v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V7z" fill={fill} />
      <path d="M17 9h2a3 3 0 0 1 0 6h-2" stroke={fill} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 22s7-5.1 7-11a7 7 0 10-14 0c0 5.9 7 11 7 11z" stroke="#fff" strokeWidth="1.6" />
      <circle cx="12" cy="11" r="2.5" fill="#fff" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QrIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" stroke="#fff" strokeWidth="1.6" />
      <path d="M14 14h3v3m3-3h-3v6" stroke="#fff" strokeWidth="1.6" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="8" width="18" height="10" stroke="#0b3f2e" strokeWidth="1.4" />
      <path d="M12 8v10" stroke="#0b3f2e" strokeWidth="1.4" />
      <path d="M12 8c2-3 5-3 6 0" stroke="#0b3f2e" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l2.4 5 5.6.8-4 3.9.9 5.6L12 16l-4.9 2.3.9-5.6-4-3.9 5.6-.8L12 3z" fill="#fbbf24" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="#0b3f2e" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14" stroke="#0b3f2e" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* =========================================================
   Hooks
   ========================================================= */
function useAnimatedNumber(value: number, duration = 700) {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef<number | null>(null);
  const fromRef = useRef(display);

  useEffect(() => {
    const from = fromRef.current ?? display;
    const to = value;
    const start = performance.now();
    const end = start + duration;
    let cancelled = false;

    const step = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / duration);
      const cur = Math.floor(from + (to - from) * t);
      setDisplay(cur);
      if (now < end) rafRef.current = requestAnimationFrame(step);
      else {
        setDisplay(to);
        fromRef.current = to;
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration, display]);

  useEffect(() => {
    fromRef.current = display;
  }, [display]);

  return display;
}

function useCountdown(deadlineMs: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, deadlineMs - now);
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const soon = diff > 0 && diff <= 1000 * 60 * 10;
  return { diff, hours, minutes, seconds, soon };
}
