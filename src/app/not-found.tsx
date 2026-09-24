import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main className="page-shell flex min-h-[75vh] flex-col justify-center pt-28">
    <p className="eyebrow">404 · Missing scene</p>
    <h1 className="font-display mt-3 text-5xl sm:text-7xl">This scene isn&apos;t here.</h1>
    <p className="mt-5 max-w-xl text-muted">The page you were looking for could not be found.</p>
    <Link href="/" className="button-secondary mt-8 w-fit"><ArrowLeft size={17} aria-hidden="true" /> Back to Home</Link>
  </main>;
}
