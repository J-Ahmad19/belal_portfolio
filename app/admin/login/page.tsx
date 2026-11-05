"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/keystatic";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter the admin password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Incorrect password. Please try again.");
        setLoading(false);
        return;
      }

      // Successfully authenticated
      router.push(nextUrl);
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg border border-[#242422] bg-[#171716] p-6 sm:p-8 shadow-2xl">
      {/* Header Branding */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full ring-2 ring-[#FFE202] ring-offset-4 ring-offset-[#171716]">
          <Image
            src="/belal-profile.jpg"
            alt="Md Belal Ashraf"
            width={128}
            height={128}
            priority
            className="h-full w-full object-cover"
          />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#242422] bg-[#0C0C0C] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#FFE202]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFE202]" />
          Keystatic CMS Admin
        </div>

        <h1 className="mt-4 text-2xl font-black tracking-tight text-[#F7F7F5]">
          Admin Portal Access
        </h1>
        <p className="mt-2 text-xs text-[#A1A19C]">
          Enter your admin password to manage your CV, credentials, and portfolio content.
        </p>
      </div>

      {/* Error notification */}
      {error && (
        <div className="mt-6 rounded border border-red-500/30 bg-red-950/40 px-3.5 py-2.5 text-xs font-medium text-red-200">
          {error}
        </div>
      )}

      {/* Password Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="admin-password"
            className="block text-xs font-bold uppercase tracking-wider text-[#A1A19C]"
          >
            Admin Password
          </label>
          <div className="relative mt-2">
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Enter admin password"
              autoFocus
              className="w-full rounded border border-[#242422] bg-[#0C0C0C] px-3.5 py-2.5 pr-10 text-sm text-[#F7F7F5] placeholder-[#4E4E4A] outline-none transition-colors focus:border-[#FFE202] focus:ring-1 focus:ring-[#FFE202]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-[#A1A19C] hover:text-[#F7F7F5]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded bg-[#FFE202] px-4 py-2.5 text-sm font-bold text-[#111110] transition-all hover:bg-[#F2D700] active:scale-[0.99] disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Unlock Admin Panel →"}
        </button>
      </form>

      {/* Footer Link */}
      <div className="mt-8 border-t border-[#242422] pt-4 text-center">
        <a
          href="/"
          className="text-xs font-medium text-[#A1A19C] transition-colors hover:text-[#FFE202]"
        >
          ← Return to Public Portfolio
        </a>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0C0C0C] px-4 py-12 text-[#F7F7F5]">
      <Suspense fallback={<div className="text-xs text-[#A1A19C]">Loading authentication...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
