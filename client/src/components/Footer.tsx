import { Mail, MessageCircle, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-16 md:py-24">
      <div className="container">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12 md:mb-16">
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
                <a href="#fragrances" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Fragrances
                </a>
              </li>
              <li>
                <a href="#story" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Get in Touch</h4>
            <div className="space-y-3 md:space-y-4">
              {/* Email */}
              <a
                href="mailto:hello@csfragrances.com"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Mail size={20} />
                <span>hello@csfragrances.com</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/1234567890"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <MessageCircle size={20} />
                <span>WhatsApp</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/csfragrances"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Instagram size={20} />
                <span>@csfragrances</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8 md:pt-12">
          {/* Copyright */}
          <p className="text-center text-primary-foreground/60 text-sm md:text-base">
            © 2025 CS Fragrances Inc. All rights reserved. | Crafted with passion and care.
          </p>
        </div>
      </div>
    </footer>
  );
}
