import { useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { COMPANY, WHATSAPP_BASE_URL } from '@shared/company';

interface Props {
  /** Shown in the subject / WhatsApp message, e.g. "Private label". */
  topic: string;
  businessTypes: string[];
  idPrefix?: string;
}

const COUNTRIES = ['Canada', 'United States', 'Other'];

/**
 * Quote / sample request. No backend: "Send by email" opens a pre-filled email to info@csfragrances.ca
 * and the WhatsApp button opens a ready message. Nothing is stored on the site.
 */
export default function QuoteForm({ topic, businessTypes, idPrefix = 'quote' }: Props) {
  const [f, setF] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: COUNTRIES[0],
    type: businessTypes[0] ?? '',
    volume: '',
    message: '',
  });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const lines = [
    `Hello CS Fragrances! I would like a quote or samples: ${topic}.`,
    '',
    `Name: ${f.name || '-'}`,
    `Company: ${f.company || '-'}`,
    `Email: ${f.email || '-'}`,
    `Phone: ${f.phone || '-'}`,
    `Country: ${f.country}`,
    `Type of business: ${f.type || '-'}`,
    `Estimated volume: ${f.volume || '-'}`,
    '',
    `Message: ${f.message || '-'}`,
  ].join('\n');
  const subject = `Business inquiry: ${topic}${f.company ? ` (${f.company})` : ''}`;
  const mailto = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
  const whatsapp = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(lines)}`;

  const field = 'w-full rounded-md border border-border bg-white px-4 py-2.5 text-primary focus:outline-none focus:ring-2 focus:ring-ring';
  const label = 'block text-sm font-semibold text-primary mb-1';
  const id = (k: string) => `${idPrefix}-${k}`;

  return (
    <form
      id="quote"
      className="grid gap-4 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailto;
      }}
    >
      <div>
        <label className={label} htmlFor={id('name')}>Name *</label>
        <input id={id('name')} required autoComplete="name" className={field} value={f.name} onChange={set('name')} />
      </div>
      <div>
        <label className={label} htmlFor={id('company')}>Company *</label>
        <input id={id('company')} required autoComplete="organization" className={field} value={f.company} onChange={set('company')} />
      </div>
      <div>
        <label className={label} htmlFor={id('email')}>Email *</label>
        <input id={id('email')} type="email" required autoComplete="email" className={field} value={f.email} onChange={set('email')} />
      </div>
      <div>
        <label className={label} htmlFor={id('phone')}>Phone</label>
        <input id={id('phone')} type="tel" autoComplete="tel" className={field} value={f.phone} onChange={set('phone')} />
      </div>
      <div>
        <label className={label} htmlFor={id('country')}>Country</label>
        <select id={id('country')} className={field} value={f.country} onChange={set('country')}>
          {COUNTRIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={label} htmlFor={id('type')}>Type of business</label>
        <select id={id('type')} className={field} value={f.type} onChange={set('type')}>
          {businessTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className={label} htmlFor={id('volume')}>Estimated volume</label>
        <input
          id={id('volume')}
          className={field}
          placeholder="e.g. units per month, or size of your space"
          value={f.volume}
          onChange={set('volume')}
        />
      </div>
      <div className="md:col-span-2">
        <label className={label} htmlFor={id('message')}>Message</label>
        <textarea id={id('message')} rows={4} className={field} value={f.message} onChange={set('message')} />
      </div>
      <div className="md:col-span-2 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Mail size={18} /> Send by email
        </button>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3 font-semibold text-primary hover:bg-primary/10"
        >
          <MessageCircle size={18} /> Send on WhatsApp
        </a>
      </div>
      <p className="md:col-span-2 text-sm text-muted-foreground">
        The email button opens your email app with your request ready to send to {COMPANY.email}. We
        reply with a quote or samples as soon as we can.
      </p>
    </form>
  );
}
