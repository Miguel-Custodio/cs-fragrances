import { useState } from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { COMPANY, WHATSAPP_BASE_URL } from '@shared/company';

/** Newsletter + WhatsApp. No paid backend: "Subscribe" opens the visitor's email app with a pre-filled message. */
export default function StayInTouch() {
  const [email, setEmail] = useState('');
  const subject = encodeURIComponent('Please add me to the CS Fragrances list');
  const body = encodeURIComponent(`Hello CS Fragrances! Please add me to your list.\n\nMy email: ${email}`);
  const waText = encodeURIComponent('Hello CS Fragrances! I would like to know more about your products.');

  return (
    <section id="stay-in-touch" className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl text-primary mb-3">Stay in touch</h2>
        <p className="text-lg text-primary/80 mb-8">
          New scents, holiday markets and offers, straight from our studio.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
          }}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Your email
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 rounded-full border border-border bg-white px-5 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="rounded-full bg-primary text-primary-foreground font-semibold px-7 py-3 hover:bg-primary/90"
          >
            Join the list
          </button>
        </form>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={`${WHATSAPP_BASE_URL}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2 text-primary hover:bg-primary/10"
          >
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
          <a
            href="https://instagram.com/bycsfragrances"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2 text-primary hover:bg-primary/10"
          >
            <Instagram size={18} /> {COMPANY.instagram}
          </a>
        </div>
      </div>
    </section>
  );
}
