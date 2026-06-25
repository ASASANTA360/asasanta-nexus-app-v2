const contractPackageHash =
  "dcc0ba60b15e82e5d3cada693f5ece98cb825faa1314dd7d81dee90fad180d05";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_34%),radial-gradient(circle_at_80%_20%,_rgba(99,102,241,0.16),_transparent_30%)]" />

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300 text-lg font-black text-slate-950">
              A
            </span>
            <span>
              Asasanta <span className="text-cyan-300">Trust Agent</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
            <a href="#how-it-works" className="transition hover:text-white">How it works</a>
            <a href="#casper" className="transition hover:text-white">Casper proof</a>
            <a href="#guardrails" className="transition hover:text-white">MVP guardrails</a>
            <a
              href="/trust-agent"
              className="rounded-xl bg-cyan-300 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Launch demo
            </a>
          </div>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-28">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 text-sm text-cyan-100">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            Casper Agentic Buildathon MVP · Casper Testnet
          </div>

          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Trust decisions that are easier to explain and harder to alter.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            Asasanta Trust Agent is an AI-assisted verification prototype for structured risk review,
            explainable trust scoring, and tamper-evident proof records on Casper Testnet.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="/trust-agent"
              className="rounded-2xl bg-cyan-300 px-6 py-4 text-center font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200"
            >
              Launch Trust Agent
            </a>
            <a
              href="https://github.com/ASASANTA360/asasanta-nexus-app-v2"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/15 px-6 py-4 text-center font-semibold text-white transition hover:border-white/35 hover:bg-white/5"
            >
              View source code
            </a>
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-400">
            Built as a demonstration of AI-assisted review and on-chain evidence. It is not a live
            identity provider or a substitute for regulatory KYC/compliance processes.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="relative rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-cyan-950/30 sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-slate-400">Verification preview</p>
                <h2 className="mt-1 text-xl font-bold">Trust review result</h2>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                REVIEWED
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/5 p-5">
                <p className="text-sm text-slate-400">Trust score</p>
                <p className="mt-3 text-6xl font-black text-cyan-200">84</p>
                <p className="mt-1 text-sm text-slate-300">out of 100</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-slate-400">Decision summary</p>
                <p className="mt-3 text-lg font-semibold">Low-risk demo profile</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2"><span className="text-cyan-300">✓</span> Structured input review</li>
                  <li className="flex gap-2"><span className="text-cyan-300">✓</span> Explainable risk signals</li>
                  <li className="flex gap-2"><span className="text-cyan-300">✓</span> Optional Casper proof step</li>
                </ul>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Casper evidence layer</p>
                  <p className="mt-1 text-sm text-slate-400">Store only a minimal verification reference and result metadata.</p>
                </div>
                <span className="shrink-0 rounded-lg border border-cyan-200/20 px-2.5 py-1 text-xs text-cyan-200">TESTNET</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-white/10 bg-black/15 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Workflow</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">A focused verification flow for a hackathon MVP.</h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["01", "Submit demo inputs", "Enter only the minimum demo information required for a structured trust review."],
              ["02", "Review AI-assisted result", "Inspect the score, risk level, decision rationale, and supporting signals before proceeding."],
              ["03", "Anchor a proof record", "Record non-sensitive result metadata on Casper Testnet for a tamper-evident audit reference."],
            ].map(([number, title, description]) => (
              <article key={number} className="rounded-3xl border border-white/10 bg-slate-900/70 p-7">
                <span className="text-sm font-bold text-cyan-300">{number}</span>
                <h3 className="mt-8 text-2xl font-bold">{title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {[
            ["Explainable output", "Show the score, risk level, and key signals together so a reviewer can understand the recommendation."],
            ["Human review first", "The agent supports a decision workflow; it should not be presented as an autonomous legal or compliance authority."],
            ["Practical demo scope", "Keep the prototype clear: a secure-looking workflow, transparent limitations, and verifiable testnet evidence."],
          ].map(([title, description]) => (
            <article key={title} className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7">
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="casper" className="px-6 pb-24">
        <div className="mx-auto max-w-7xl rounded-3xl border border-cyan-200/15 bg-cyan-200/[0.04] p-7 sm:p-10">
          <div className="grid gap-9 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Casper integration</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight">Make the evidence layer visible.</h2>
              <p className="mt-5 max-w-xl leading-7 text-slate-300">
                The MVP references a Casper Testnet contract package for recording verification result metadata.
                A production version should use a privacy-preserving reference or hash, never raw government ID values.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
              <p className="text-sm text-slate-400">Contract package hash</p>
              <code className="mt-3 block break-all rounded-xl bg-black/40 p-4 text-sm leading-6 text-cyan-100">{contractPackageHash}</code>
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <span className="rounded-lg border border-white/10 px-3 py-2 text-slate-300">Network: Casper Testnet</span>
                <span className="rounded-lg border border-white/10 px-3 py-2 text-slate-300">Entry point: register_user</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="guardrails" className="border-t border-white/10 bg-black/15 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">MVP guardrails</p>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/[0.05] p-7">
              <h2 className="text-2xl font-bold text-amber-100">Do not put raw identity data on-chain</h2>
              <p className="mt-3 leading-7 text-slate-300">
                Use a generated verification ID or a privacy-preserving hash instead of NIN, BVN, email, phone number, or other personal data.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-7">
              <h2 className="text-2xl font-bold">Keep claims accurate</h2>
              <p className="mt-3 leading-7 text-slate-300">
                Present this as a testnet prototype. Avoid unverified user counts, lending claims, fake testimonials, or claims of official KYC approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-200/10 to-indigo-400/10 p-10 text-center sm:p-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Ready for the demo</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Review a trust score. Then anchor the proof on Casper.</h2>
          <a href="/trust-agent" className="mt-9 inline-flex rounded-2xl bg-white px-6 py-4 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100">
            Open the Trust Agent
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-9">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Asasanta Trust Agent · Casper Testnet prototype</p>
          <a className="transition hover:text-white" href="https://github.com/ASASANTA360/asasanta-nexus-app-v2" target="_blank" rel="noreferrer">
            GitHub repository
          </a>
        </div>
      </footer>
    </main>
  );
}
