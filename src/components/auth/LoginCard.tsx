"use client";

import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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

      router.push("/admin/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl w-2xl shadow-xl p-8 space-y-6 bg-white rounded-lg">
        {/* Title */}
        <div className="text-center">
          <h1 className="font-extrabold text-4xl text-[#2B4468]">Sign Up</h1>
          <hr className="mt-3 border-t-2 border-[#2B4468]/30 w-16 mx-auto" />
        </div>

        {/* Show error */}
        {error && (
          <p className="text-red-600 text-sm text-center font-medium">{error}</p>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSignUp}>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#2B4468] focus:outline-none bg-blue-50 px-4 py-2 text-gray-700 placeholder-gray-400 rounded"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#2B4468] focus:outline-none bg-blue-50 px-4 py-2 text-gray-700 placeholder-gray-400 rounded"
              placeholder="* * * * * * * *"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#2B4468] cursor-pointer text-white font-semibold hover:bg-[#1f3350] transition disabled:opacity-50 rounded"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
