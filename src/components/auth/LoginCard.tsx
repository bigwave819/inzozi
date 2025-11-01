"use client";

import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { z } from "zod";

// 🔹 Validation schema with Zod
const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginCard() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";

    // ✅ Validate before sending to API
    const parsed = signUpSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      const res = await signIn.email({ email, password });
      if (res.error) {
        setError(res.error.message || "Invalid credentials");
        return;
      }

      window.location.href='/admin/dashboard';
    } catch (err) {
      console.error("Signup error:", err);
      setError("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="max-w-xl w-2xl shadow-xl p-8 space-y-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        {/* Title */}
        <div className="text-center">
          <h1 className="font-extrabold text-4xl text-[#2B4468] dark:text-blue-400">Sign Up</h1>
          <hr className="mt-3 border-t-2 border-[#2B4468]/30 dark:border-blue-400/30 w-16 mx-auto" />
        </div>

        {/* Show error */}
        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm text-center font-medium">{error}</p>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSignUp}>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#2B4468] dark:focus:ring-blue-400 focus:outline-none bg-blue-50 dark:bg-gray-800 px-4 py-2 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 rounded transition-colors"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#2B4468] dark:focus:ring-blue-400 focus:outline-none bg-blue-50 dark:bg-gray-800 px-4 py-2 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 rounded transition-colors"
              placeholder="* * * * * * * *"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#2B4468] dark:bg-blue-600 cursor-pointer text-white font-semibold hover:bg-[#1f3350] dark:hover:bg-blue-700 transition disabled:opacity-50 rounded"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
  );
}