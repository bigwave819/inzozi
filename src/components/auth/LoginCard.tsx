"use client";

import { signUp, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

// 🔹 Validation schema with Zod
const signUpSchema = z.object({
  // name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function LoginCard() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // ✅ Validate before sending to API
    const parsed = signUpSchema.safeParse({ name, email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      await signIn.email({
        email,
        password,
      });
      router.push("/admin/dashboard")
      console.log("Signup success!");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full shadow-xl p-8 space-y-6 bg-white mx-auto mt-20">
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
          <label className="text-sm font-medium text-gray-700">User name</label>
          <input
            name="name"
            type="text"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-[#2B4468] focus:outline-none bg-blue-50 px-4 py-2 text-gray-700 placeholder-gray-400"
            placeholder="Your name"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-[#2B4468] focus:outline-none bg-blue-50 px-4 py-2 text-gray-700 placeholder-gray-400"
            placeholder="Your Email"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-[#2B4468] focus:outline-none bg-blue-50 px-4 py-2 text-gray-700 placeholder-gray-400"
            placeholder="********"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-[#2B4468] cursor-pointer text-white font-semibold hover:bg-[#1f3350] transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default LoginCard;
