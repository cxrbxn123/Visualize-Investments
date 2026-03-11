'use client';

import { useMemo, useState } from 'react';

type ViewMode = 'home' | 'whatif' | 'portfolio';

type Point = {
  label: string;
  value: number;
};

function LineChart({
  data,
  height = 260,
}: {
  data: Point[];
  height?: number;
}) {
  const width = 720;
  const padding = 24;

  const { points, areaPoints, minValue, maxValue } = useMemo(() => {
    const values = data.map((d) => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = Math.max(maxValue - minValue, 1);

    const points = data
      .map((point, index) => {
        const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
        const y = height - padding - ((point.value - minValue) / range) * (height - padding * 2);
        return `${x},${y}`;
      })
      .join(' ');

    const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

    return { points, areaPoints, minValue, maxValue };
  }, [data, height]);

  return (
    <div className="rounded-[28px] border border-white/10 bg-zinc-950 p-5">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-64 w-full">
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(52,211,153,0.35)" />
            <stop offset="100%" stopColor="rgba(52,211,153,0.02)" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((i) => {
          const y = padding + (i * (height - padding * 2)) / 3;
          return (
            <line
              key={i}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          );
        })}

        <polygon points={areaPoints} fill="url(#lineFill)" />
        <polyline
          fill="none"
          stroke="rgb(52,211,153)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />

        {data.map((point, index) => {
          const range = Math.max(maxValue - minValue, 1);
          const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
          const y = height - padding - ((point.value - minValue) / range) * (height - padding * 2);
          return <circle key={point.label} cx={x} cy={y} r="4" fill="white" />;
        })}
      </svg>

      <div className="mt-4 flex justify-between gap-2 overflow-hidden text-xs text-zinc-500">
        {data.map((point) => (
          <span key={point.label} className="truncate">
            {point.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<ViewMode>('home');
  const [whatIfCompare, setWhatIfCompare] = useState(false);
  const [portfolioCompare, setPortfolioCompare] = useState(false);

  const previewData = [
    { label: 'Jan', value: 500 },
    { label: 'Mar', value: 900 },
    { label: 'May', value: 1600 },
    { label: 'Jul', value: 3000 },
    { label: 'Sep', value: 5200 },
    { label: 'Nov', value: 9100 },
    { label: 'Today', value: 12840 },
  ];

  const whatIfData = [
    { label: '2018', value: 1000 },
    { label: '2019', value: 1450 },
    { label: '2020', value: 2200 },
    { label: '2021', value: 5100 },
    { label: '2022', value: 3900 },
    { label: '2023', value: 6200 },
    { label: '2024', value: 8400 },
    { label: '2025', value: 10350 },
  ];

  const portfolioData = [
    { label: 'Jan', value: 18200 },
    { label: 'Feb', value: 18840 },
    { label: 'Mar', value: 19310 },
    { label: 'Apr', value: 18900 },
    { label: 'May', value: 20150 },
    { label: 'Jun', value: 21420 },
    { label: 'Jul', value: 22880 },
    { label: 'Aug', value: 23560 },
    { label: 'Sep', value: 24610 },
    { label: 'Oct', value: 25980 },
    { label: 'Nov', value: 27140 },
    { label: 'Dec', value: 28420 },
  ];

  const compareData = [
    { label: 'Jan', value: 17000 },
    { label: 'Feb', value: 17600 },
    { label: 'Mar', value: 18500 },
    { label: 'Apr', value: 18000 },
    { label: 'May', value: 19100 },
    { label: 'Jun', value: 19900 },
    { label: 'Jul', value: 21000 },
    { label: 'Aug', value: 21500 },
    { label: 'Sep', value: 22000 },
    { label: 'Oct', value: 23000 },
    { label: 'Nov', value: 24100 },
    { label: 'Dec', value: 25200 },
  ];

  const detailCards = [
    {
      title: 'Historical simulations',
      desc: 'Test one-time investments across stocks, crypto, ETFs, and other supported assets using custom date ranges.',
    },
    {
      title: 'Real portfolio tracking',
      desc: 'View a portfolio over time with line charts, allocation summaries, and performance metrics in one place.',
    },
    {
      title: 'Side-by-side comparison',
      desc: 'Switch between what-if scenarios and real portfolio views with a clean compare action built into each page.',
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button onClick={() => setView('home')} className="text-left">
            <p className="text-lg font-semibold tracking-wide">Investment Visualization</p>
            <p className="text-sm text-zinc-400">What-if investing and portfolio growth, visualized.</p>
          </button>

          <nav className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 md:flex">
            <button
              onClick={() => setView('home')}
              className={`rounded-xl px-4 py-2 text-sm transition ${view === 'home' ? 'bg-emerald-400 font-medium text-black' : 'text-zinc-300 hover:bg-white/5'
                }`}
            >
              Start
            </button>
            <button
              onClick={() => setView('whatif')}
              className={`rounded-xl px-4 py-2 text-sm transition ${view === 'whatif' ? 'bg-emerald-400 font-medium text-black' : 'text-zinc-300 hover:bg-white/5'
                }`}
            >
              What-If Portfolio
            </button>
            <button
              onClick={() => setView('portfolio')}
              className={`rounded-xl px-4 py-2 text-sm transition ${view === 'portfolio' ? 'bg-emerald-400 font-medium text-black' : 'text-zinc-300 hover:bg-white/5'
                }`}
            >
              Real Portfolio
            </button>
          </nav>
        </div>
      </header>

      {view === 'home' && (
        <>
          <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_35%)]">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:items-center">
              <div>
                <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
                  Start Page
                </span>
                <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                  Visualize what-if investments and real portfolio growth over time. (Temporary frontend design to plan out backend)
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                  Investment Visualization makes it easy to test past investment ideas, view portfolio growth with line charts, and compare simulated outcomes against real holdings in a clean interface.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => setView('whatif')}
                    className="rounded-2xl bg-emerald-400 px-6 py-3 font-medium text-black transition hover:opacity-90"
                  >
                    Open What-If Portfolio
                  </button>
                  <button
                    onClick={() => setView('portfolio')}
                    className="rounded-2xl border border-white/10 px-6 py-3 font-medium text-white transition hover:bg-white/5"
                  >
                    Open Real Portfolio
                  </button>
                  <a
                    href="#details"
                    className="rounded-2xl border border-white/10 px-6 py-3 font-medium text-zinc-300 transition hover:bg-white/5"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl">
                <div className="rounded-[28px] border border-white/10 bg-zinc-900 p-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="text-sm text-zinc-400">Example Visual</p>
                      <h2 className="mt-1 text-2xl font-semibold">$1,000 into BTC</h2>
                    </div>
                    <div className="rounded-2xl bg-emerald-400/10 px-3 py-2 text-sm text-emerald-300">
                      Growth Preview
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-zinc-400">Start</p>
                      <p className="mt-2 text-2xl font-semibold">$1,000</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-zinc-400">End Value</p>
                      <p className="mt-2 text-2xl font-semibold text-emerald-300">$12,840</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-zinc-400">Return</p>
                      <p className="mt-2 text-2xl font-semibold text-emerald-300">+1,184%</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <LineChart data={previewData} height={250} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="details" className="mx-auto max-w-7xl px-6 py-20">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold">More in-depth</h2>
              <p className="mt-4 leading-8 text-zinc-300">
                The top section introduces the product quickly with a clean title, a short explanation, and a visual example. Scrolling down reveals a more detailed breakdown of the two main modes: what-if portfolio analysis and real portfolio tracking. Both are designed around line graphs so performance over time is easier to read and compare.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {detailCards.map((card) => (
                <div key={card.title} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-300">{card.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {view === 'whatif' && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
                What-If Portfolio Page
              </span>
              <h1 className="mt-5 text-4xl font-bold">Test how an investment would have performed.</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
                Select an asset, choose an amount, set a start date and end date, and view the simulated growth with a line chart and summary metrics.
              </p>
            </div>

            <button
              onClick={() => {
                setWhatIfCompare(true);
                setView('portfolio');
              }}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Compare to Real Portfolio
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-semibold">Simulation Inputs</h2>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">Asset</label>
                  <div className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3">BTC</div>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">Starting Amount</label>
                  <div className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3">$1,000</div>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">Start Date</label>
                  <div className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3">2018-01-01</div>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">End Date</label>
                  <div className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3">Today</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-zinc-400">Ending Value</p>
                  <p className="mt-2 text-3xl font-semibold text-emerald-300">$10,350</p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-zinc-400">Total Return</p>
                  <p className="mt-2 text-3xl font-semibold text-emerald-300">+935%</p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-zinc-400">Annualized</p>
                  <p className="mt-2 text-3xl font-semibold">39.2%</p>
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">Growth Over Time</h2>
                    <p className="mt-1 text-zinc-400">Simulated portfolio value shown as a line graph.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 px-3 py-2 text-sm text-zinc-300">Custom Range</div>
                </div>
                <div className="mt-6">
                  <LineChart data={whatIfData} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {view === 'portfolio' && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
                Real Portfolio Page
              </span>
              <h1 className="mt-5 text-4xl font-bold">Track a real portfolio with clean performance visuals.</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
                View current value, total profit and loss, allocation, and historical growth with a simple line-based layout.
              </p>
            </div>

            <button
              onClick={() => {
                setPortfolioCompare(true);
                setView('whatif');
              }}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Compare to What-If Portfolio
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Portfolio Growth</h2>
                  <p className="mt-1 text-zinc-400">Total value displayed over time with a line graph.</p>
                </div>
                <div className="inline-flex rounded-2xl border border-white/10 bg-zinc-900 p-1 text-sm">
                  <button className="rounded-xl bg-emerald-400 px-4 py-2 font-medium text-black">Total</button>
                  <button className="rounded-xl px-4 py-2 text-zinc-300">P/L</button>
                </div>
              </div>
              <div className="mt-6">
                <LineChart data={portfolioData} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-zinc-400">Current Value</p>
                  <p className="mt-2 text-3xl font-semibold">$28,420</p>
                  <p className="mt-2 text-sm text-emerald-300">+12.8% YTD</p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-zinc-400">Total P/L</p>
                  <p className="mt-2 text-3xl font-semibold text-emerald-300">+$6,280</p>
                  <p className="mt-2 text-sm text-zinc-400">Across all tracked holdings</p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-zinc-400">Top Contributor</p>
                  <p className="mt-2 text-3xl font-semibold">NVDA</p>
                  <p className="mt-2 text-sm text-emerald-300">+28.1%</p>
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
                <h2 className="text-2xl font-semibold">Allocation</h2>
                <div className="mt-5 space-y-3">
                  {[
                    ['Stocks', '46%'],
                    ['ETFs', '24%'],
                    ['Crypto', '22%'],
                    ['Cash', '8%'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-300">{label}</span>
                        <span className="font-medium text-white">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {(whatIfCompare || portfolioCompare) && (
            <div className="mt-8 rounded-[30px] border border-emerald-400/20 bg-emerald-400/10 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Comparison View</h2>
                  <p className="mt-2 max-w-2xl text-zinc-200">
                    A clean compare section can sit directly below either page so switching between simulated and real performance stays simple and obvious.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setWhatIfCompare(false);
                    setPortfolioCompare(false);
                  }}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white transition hover:bg-black/30"
                >
                  Hide Compare
                </button>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-5">
                  <p className="text-sm text-zinc-400">What-If Portfolio</p>
                  <p className="mt-2 text-2xl font-semibold text-emerald-300">$10,350</p>
                  <p className="mt-1 text-sm text-zinc-400">Simulated ending value</p>
                  <div className="mt-5">
                    <LineChart data={whatIfData} height={220} />
                  </div>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-5">
                  <p className="text-sm text-zinc-400">Real Portfolio</p>
                  <p className="mt-2 text-2xl font-semibold">$28,420</p>
                  <p className="mt-1 text-sm text-zinc-400">Tracked portfolio value</p>
                  <div className="mt-5">
                    <LineChart data={compareData} height={220} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
