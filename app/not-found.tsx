import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0C0C0C] px-6 text-center text-[#F7F7F5]">
      <h1 className="text-6xl font-black text-[#FFE202]">404</h1>
      <p className="mt-4 text-lg font-bold">Page Not Found</p>
      <p className="mt-2 text-sm text-[#A1A19C]">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded bg-[#FFE202] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#111110] transition-colors hover:bg-[#E5CB00]"
      >
        Return to Home
      </Link>
    </div>
  );
}

