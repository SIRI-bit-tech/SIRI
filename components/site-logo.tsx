import Link from "next/link";

export function SiteLogo({ className = "h-28 w-28 md:h-20 md:w-20" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center justify-center transform translate-y-6 md:translate-y-0 ${className}`}>
      <span className="sr-only">SiriTech</span>
      <div className="relative h-full w-full p-1 overflow-hidden rounded-full bg-slate-900/70 ring-1 ring-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.45)] flex items-center justify-center">
        <img
          src="/SIRITECH.png"
          alt="SiriTech logo"
          className="h-full w-full object-cover rounded-full transform scale-110"
          style={{ objectPosition: 'center' }}
        />
      </div>
    </Link>
  );
}
