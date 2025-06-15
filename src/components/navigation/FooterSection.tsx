import { Dumbbell, Mail, Phone } from "lucide-react";
import Link from "next/link";
const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about#team" },
      { label: "Blog", href: "/blog" },
    ],
    legal: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
    resources: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
    ],
  };
  return (
    <footer className="bg-card/60 backdrop-blur-sm py-16">
      <div className="container mx-auto px-4 lg:px-20 pb-8 text-center">
        <Link href="/" className="flex items-center gap-2 justify-center mb-4">
          <div className="rounded-full p-2.5 bg-primary/20">
            <Dumbbell className="w-10 h-10 text-primary" />
          </div>
          <span className="text-5xl font-bold">LightWeight</span>
        </Link>
        <p className="text-md text-muted-foreground">
          Transform your fitness journey with personalized AI-powered workout
          plans and nutrition guidance.
        </p>
      </div>
      {}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-16"></div>
      <div className="container mx-auto px-4 lg:px-20">
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            {}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-full bg-muted/50">
                  <Mail size={14} className="text-muted-foreground" />
                </div>
                <span className="text-sm">contact@lightweight.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-full bg-muted/50">
                  <Phone size={14} className="text-muted-foreground" />
                </div>
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
        {}
        <div className="h-px w-full bg-border my-8"></div>
        {}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} LightWeight • All rights reserved
          </p>
          {}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="p-2 rounded-full bg-muted/50 hover:bg-primary/20 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-muted/50 hover:bg-primary/20 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-muted/50 hover:bg-primary/20 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-muted/50 hover:bg-primary/20 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default FooterSection;
