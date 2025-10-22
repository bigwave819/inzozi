// components/Footer.tsx
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function Footer() {
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/service' },
        { name: 'Company', path: '/company' },
        { name: 'Industries', path: '/industries' },
        { name: 'Contact', path: '/contact' }
    ];

    const socialLinks = [
        { icon: <Facebook size={20} />, url: 'https://facebook.com' },
        { icon: <Twitter size={20} />, url: 'https://twitter.com' },
        { icon: <Instagram size={20} />, url: 'https://instagram.com' },
        { icon: <Linkedin size={20} />, url: 'https://linkedin.com' }
    ];

    const session = await auth.api.getSession({
        headers: await headers()
    });

    // If there's a session (user is logged in), don't show footer
    if (session) {
        return null;
    }

    return (
        <footer className="w-full text-white" style={{ backgroundColor: '#2B4468' }}>
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Navigation Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.path} className="hover:text-blue-200 transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Mail size={18} className="mt-1 flex-shrink-0" />
                                <span>info@inzozilabs.com</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone size={18} className="mt-1 flex-shrink-0" />
                                <span>+250 798 342 542</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-200 transition-colors"
                                    aria-label={`${social.url.split('//')[1].split('.')[0]} link`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* About/Copyright */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About</h3>
                        <p className="mb-4">
                            We provide innovative solutions to help your business grow and succeed in the digital world.
                        </p>
                    </div>
                </div>
            </div>
            <hr className='mr-20 ml-10' />
            <div className='max-w-5xl flex justify-center'>
                <p className="text-sm opacity-80 mb-5 mt-5">
                    © {new Date().getFullYear()} Inzozi labs. All rights reserved.
                </p>
            </div>
        </footer>
    );
}