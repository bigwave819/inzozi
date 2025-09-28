"use client";

import { signIn } from "@/lib/auth-client";

function LoginCard() {
  const handleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
      });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="w-xl max-w-xl rounded-lg shadow-lg flex flex-col p-5 space-y-5 justify-center items-center bg-white">
      <h1 className="text-2xl font-bold text-[#2B4468]">Log In</h1>
      <p>Login to unlock more features</p>
      <button
        className="uppercase w-full py-3 bg-[#2B4468] rounded-lg text-white font-bold"
        onClick={handleSignIn}
      >
        SIGN IN with Google
      </button>
    </div>
  );
}

export default LoginCard;
