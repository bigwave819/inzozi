"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send email via Next.js App Router API
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      await res.json();
      if (res.ok) {
        setForm({ name: "", email: "", message: "" });
        alert("Email sent successfully");
      } else {
        alert("Failed to send email");
      }
    } catch (error) {
      console.error("Email sending error:", error);
      alert("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-5 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <Card className="max-w-3xl w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-900/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-gray-900 dark:text-gray-100">
            Contact Us
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <Label className="text-gray-700 dark:text-gray-300">Names</Label>
              <Input
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-[#2B4468] dark:focus:ring-blue-500"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-gray-700 dark:text-gray-300">Email</Label>
              <Input
                type="email"
                placeholder="Your email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-[#2B4468] dark:focus:ring-blue-500"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-gray-700 dark:text-gray-300">Message</Label>
              <Textarea
                placeholder="Your message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-[#2B4468] dark:focus:ring-blue-500 min-h-[120px]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#2B4468] hover:bg-[#1f324f] dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors duration-200"
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}