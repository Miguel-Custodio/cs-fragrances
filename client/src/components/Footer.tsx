import { Mail, MessageCircle, Instagram } from 'lucide-react';
import { COMPANY, WHATSAPP_BASE_URL } from '@shared/company';
import { KITS_ENABLED } from '@/lib/flags';
import { POLICY_LINKS } from '@/data/policies';
import { PUBLIC_BUSINESS_PAGES } from '@/data/business';

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-16 md:py-24">
      <div className="container">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-10 mb-12 md:mb-16">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">CS Fragrances</h3>
            <p className="text-primary-foreground/80 text-base md:text-lg">
              Accessible sophistication with an artisanal heart. Discover the art of fragrance.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="/#fragrances" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Fragrances
                </a>
              </li>
              <li>
                <a href="/shop" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Shop
                </a>
              </li>
              {KITS_ENABLED && (
                <li>
                  <a href="/kits" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    Christmas Kits
                  </a>
                </li>
              )}
              <li>
                <a href="/about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="/business" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  For Business
                </a>
              </li>
              {PUBLIC_BUSINESS_PAGES.map((p) => (
                <li key={p.slug}>
                  <a href={p.path} className="text-primary-foreground/80 hover:text-accent transition-colors">
                    {p.topic}
                  </a>
                </li>
              ))}
              
              <li>
                <a href="/ingredients" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Ingredients
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Policies</h4>
            <ul className="space-y-2 md:space-y-3">
              {POLICY_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-primary-foreground/80 hover:text-accent transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Get in Touch</h4>
            <div className="space-y-3 md:space-y-4">
              {/* Email */}
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Mail size={20} />
                <span>{COMPANY.email}</span>
              </a>

              {/* WhatsApp */}
              <a
                href={WHATSAPP_BASE_URL}
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <MessageCircle size={20} />
                <span>WhatsApp {COMPANY.whatsappDisplay}</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/bycsfragrances"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Instagram size={20} />
                <span>@bycsfragrances</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8 md:pt-12">
          {/* Copyright */}
          <p className="text-center text-primary-foreground/60 text-sm md:text-base">
            © {new Date().getFullYear()} {COMPANY.legalName} All rights reserved. | Crafted with passion and care.
          </p>
        </div>
      </div>
    </footer>
  );
}
