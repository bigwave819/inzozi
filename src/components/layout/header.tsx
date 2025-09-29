import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/service" },
    { name: "Company", path: "/company" },
    { name: "Industries", path: "/industries" },
    { name: "Contact", path: "/contact" },
  ];

  return (
        <NavbarClient session={session} navItems={navItems} />
  );
}
