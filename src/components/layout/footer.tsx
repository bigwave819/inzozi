import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' }
    ];

    const socialLinks = [
        { icon: <Facebook size={20} />, url: 'https://facebook.com', label: "Facebook" },
        { icon: <Twitter size={20} />, url: 'https://twitter.com', label: "Twitter" },
        { icon: <Instagram size={20} />, url: 'https://instagram.com', label: "Instagram" },
        { icon: <Linkedin size={20} />, url: 'https://linkedin.com', label: "LinkedIn" }
    ];

    return (
        <footer className="w-full text-white bg-[#1e3a5f] dark:bg-gray-950 transition-colors duration-200 border-t border-[#2a4d7a] dark:border-gray-800">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold tracking-tight text-white">Inzozi Labs</h3>
                        <p className="opacity-80 text-sm leading-relaxed max-w-xs">
                            We build modern, scalable software solutions that drive growth and innovation for forward-thinking startups and enterprises.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Company</h3>
                        <ul className="space-y-3">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.path} className="text-sm opacity-80 hover:opacity-100 hover:text-blue-300 transition-colors duration-200">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Contact Us</h3>
                        <div className="space-y-4 text-sm opacity-80">
                            <div className="flex items-start gap-3 hover:text-blue-300 transition-colors duration-200">
                                <Mail size={18} className="mt-0.5 flex-shrink-0" />
                                <span>info@inzozilabs.com</span>
                            </div>
                            <div className="flex items-start gap-3 hover:text-blue-300 transition-colors duration-200">
                                <Phone size={18} className="mt-0.5 flex-shrink-0" />
                                <span>+250 798 342 542</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                                <span>Kigali, Rwanda</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-white/10 hover:bg-blue-500 hover:scale-110 transition-all duration-200"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm opacity-60">
                        © {new Date().getFullYear()} Inzozi labs. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-sm opacity-60">
                        <span className="hover:opacity-100 cursor-pointer">Privacy Policy</span>
                        <span className="hover:opacity-100 cursor-pointer">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}