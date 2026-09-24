import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}

export function SectionHeading({ eyebrow, title, description, href, linkLabel = "Browse all" }: SectionHeadingProps) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4 border-b border-border pb-5 sm:mb-8">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="font-display mt-2 text-[clamp(2rem,3.8vw,3.2rem)] leading-none tracking-[-.025em] text-foreground">{title}</h2>
        {description && <p className="mt-3 max-w-lg text-sm text-muted">{description}</p>}
      </div>
      {href && <Link href={href} className="mb-1 inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-gold transition-colors hover:text-foreground sm:text-sm">{linkLabel}<ArrowUpRight size={15} aria-hidden="true" /></Link>}
    </div>
  );
}
