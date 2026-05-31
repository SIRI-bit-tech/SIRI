"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@siridev.me");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          result.error === "CredentialsSignin"
            ? "Invalid email or password."
            : result.error
        );
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-canvas text-ink flex items-center justify-center">
      <div className="w-full max-w-sm px-8">
        <div className="mb-12">
          <div className="wordmark text-center mb-8">SIRITECH</div>
          <h1 className="display-md text-center mb-2">ADMIN PORTAL</h1>
          <p className="caption-uppercase text-muted text-center">SECURE ACCESS</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="caption-uppercase text-muted block mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-surface-card border-b border-hairline-strong py-3 text-ink placeholder-muted focus:outline-none focus:border-ink transition-colors"
              placeholder="admin@siritech.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="caption-uppercase text-muted block mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-surface-card border-b border-hairline-strong py-3 text-ink placeholder-muted focus:outline-none focus:border-ink transition-colors"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="bg-surface-card border-l-2 border-warning p-4">
              <p className="body-sm text-warning">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {isLoading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>
      </div>
    </main>
  );
}
