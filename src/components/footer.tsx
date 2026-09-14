import Link from "next/link";
import { CurveMark, Wordmark } from "@/components/logo";

const LINKS = [
  { href: "https://base.org", label: "Base" },
  { href: "https://www.circle.com/usdc", label: "USDC" },
  { href: "https://www.doppler.finance", label: "Doppler" },
  { href: "https://www.avantisfi.com", label: "Avantis" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/80 bg-background/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-sm">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-card glow-lime">
              <CurveMark className="size-6" />
            </span>
            <Wordmark />
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Bonding curve to perpetual{" "}
            <span className="text-lime">alpha</span>. Launch a token on Base.
            Fund an Avantis position.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground md:text-right">
            Perpetuals are risky. This is not financial advice. Demo cards are
            seeded UI, not live positions. Operator opens Avantis from quote
            fees — this app does not auto-trade.
          </p>
        </div>
      </div>
    </footer>
  );
}
