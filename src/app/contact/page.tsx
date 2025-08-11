import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Airplay, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const contacts = [
  {
    icon: Mail,
    title: "Email",
    value: "waveb6133@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+250 798 342 542",
  },
  {
    icon: Airplay,
    title: "Media",
    value: (
      <div className="flex gap-2 justify-center">
        <Instagram className="p-2 rounded bg-white h-8 w-8 text-pink-400 cursor-pointer" />
        <Linkedin className="p-2 rounded bg-white h-8 w-8 text-blue-400 cursor-pointer" />
      </div>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="w-full flex flex-col items-center p-5">
      {/* Contact Cards */}
      <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contacts.map(({ icon: Icon, title, value }, idx) => (
          <div
            key={idx}
            className="rounded-lg shadow bg-blue-50 p-5 text-center flex flex-col items-center"
          >
            <Icon className="h-20 w-20 text-yellow-500" />
            <h2 className="font-bold text-xl">{title}</h2>
            <p className="text-muted-foreground">{value}</p>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <Card className="max-w-3xl w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5">
            <div className="space-y-3">
              <Label>Names</Label>
              <Input placeholder="Your full name" />
            </div>
            <div className="space-y-3">
              <Label>Email</Label>
              <Input placeholder="Your email address" type="email" />
            </div>
            <div className="space-y-3">
              <Label>Message</Label>
              <Textarea placeholder="Your message" />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#2B4468] cursor-pointer hover:bg-[#1f324f]"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
