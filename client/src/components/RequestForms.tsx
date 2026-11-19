import { useEffect, useRef, useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import {
  BUSINESS_TYPES,
  CONSENT_TEXT,
  INTERESTS,
  SAMPLE_WAYS,
  SCENT_DIRECTIONS,
  briefingSubject,
  buildBriefingMessage,
  buildQuoteMessage,
  buildSampleMessage,
  mailtoUrl,
  quoteSubject,
  sampleSubject,
  whatsappUrl,
  type BriefingValues,
  type QuoteValues,
  type SampleValues,
} from '@shared/requestMessages';
import { B2B_CONFIG } from '@shared/b2bConfig';
import { COMPANY } from '@shared/company';
import { SCENT_FAMILIES, SCENT_MOODS, SCENT_MARKETING_COPY, SPACE_TYPES } from '@/data/scentMarketingCopy';

export type Tab = 'briefing' | 'quote' | 'samples';

export interface FormPrefill {
  /** One of BUSINESS_TYPES (or a custom list passed in businessTypes). */
  businessType?: string;
  /** One of INTERESTS. */
  interest?: string;
}

const field =
  'w-full rounded-md border border-border bg-white px-4 py-2.5 text-primary focus:outline-none focus:ring-2 focus:ring-ring';
const labelCls = 'block text-sm font-semibold text-primary mb-1';

function Actions({ onWhatsApp, emailLabel }: { onWhatsApp: () => void; emailLabel: string }) {
  return (
    <div className="md:col-span-2 flex flex-wrap items-center gap-3">
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
      >
        <Mail size={18} aria-hidden="true" /> {emailLabel}
      </button>
      <button
        type="button"
        onClick={onWhatsApp}
        className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3 font-semibold text-primary hover:bg-primary/10"
      >
        <MessageCircle size={18} aria-hidden="true" /> Send on WhatsApp
      </button>
    </div>
  );
}

function Consent({ id, checked, onChange }: { id: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="md:col-span-2 flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0"
      />
      <label htmlFor={id} className="text-sm text-primary/90">
        {CONSENT_TEXT} *
      </label>
    </div>
  );
}

function Note() {
  return (
    <p className="md:col-span-2 text-sm text-muted-foreground">
      Both buttons open a message that is ready to send to {COMPANY.email} or on WhatsApp ({B2B_CONFIG.whatsappDisplay}).
      Nothing is stored on this website.
      {B2B_CONFIG.replyTime ? ` We reply ${B2B_CONFIG.replyTime}.` : ' We reply as soon as we can.'}
    </p>
  );
}

/** Quote request. No backend: opens an email or WhatsApp message with all the details. */
export function QuoteRequestForm({
  idPrefix = 'quote',
  prefill = {},
  businessTypes = [...BUSINESS_TYPES],
  interests = [...INTERESTS],
}: {
  idPrefix?: string;
  prefill?: FormPrefill;
  businessTypes?: string[];
  interests?: string[];
}) {
  const ref = useRef<HTMLFormElement>(null);
  const [f, setF] = useState<QuoteValues>({
    name: '',
    business: '',
    email: '',
    phone: '',
    businessType: prefill.businessType ?? businessTypes[0],
    city: '',
    spaceSize: '',
    interest: prefill.interest ?? interests[0],
    quantity: '',
    timing: '',
    message: '',
    consent: false,
  });
  const set =
    (k: keyof QuoteValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setF((p) => ({ ...p, [k]: e.target.value }));
  const body = buildQuoteMessage(f);
  const id = (k: string) => `${idPrefix}-${k}`;

  return (
    <form
      ref={ref}
      aria-label="Request a quote"
      className="grid gap-4 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailtoUrl(quoteSubject(f), body);
      }}
    >
      <div>
        <label className={labelCls} htmlFor={id('name')}>Name *</label>
        <input id={id('name')} required autoComplete="name" className={field} value={f.name} onChange={set('name')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('business')}>Business name *</label>
        <input id={id('business')} required autoComplete="organization" className={field} value={f.business} onChange={set('business')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('email')}>Email *</label>
        <input id={id('email')} type="email" required autoComplete="email" className={field} value={f.email} onChange={set('email')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('phone')}>Phone / WhatsApp</label>
        <input id={id('phone')} type="tel" autoComplete="tel" className={field} value={f.phone} onChange={set('phone')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('type')}>Type of business *</label>
        <select id={id('type')} required className={field} value={f.businessType} onChange={set('businessType')}>
          {businessTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelCls} htmlFor={id('city')}>City *</label>
        <input id={id('city')} required autoComplete="address-level2" className={field} value={f.city} onChange={set('city')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('interest')}>I am interested in *</label>
        <select id={id('interest')} required className={field} value={f.interest} onChange={set('interest')}>
          {interests.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelCls} htmlFor={id('space')}>Size of space (approx. sq ft)</label>
        <input id={id('space')} inputMode="numeric" className={field} value={f.spaceSize} onChange={set('spaceSize')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('quantity')}>Estimated quantity</label>
        <input id={id('quantity')} className={field} placeholder="e.g. units per month" value={f.quantity} onChange={set('quantity')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('timing')}>Preferred timing</label>
        <input id={id('timing')} className={field} placeholder="e.g. next month" value={f.timing} onChange={set('timing')} />
      </div>
      <div className="md:col-span-2">
        <label className={labelCls} htmlFor={id('message')}>Message</label>
        <textarea id={id('message')} rows={4} className={field} value={f.message} onChange={set('message')} />
      </div>
      <Consent id={id('consent')} checked={f.consent} onChange={(consent) => setF((p) => ({ ...p, consent }))} />
      <Actions
        emailLabel="Send quote request by email"
        onWhatsApp={() => {
          if (ref.current?.reportValidity()) window.open(whatsappUrl(body), '_blank', 'noopener,noreferrer');
        }}
      />
      <Note />
    </form>
  );
}

/** Scent briefing (first step of scent marketing). No backend: opens an email or WhatsApp message. */
export function ScentBriefingForm({ idPrefix = 'briefing' }: { idPrefix?: string }) {
  const ref = useRef<HTMLFormElement>(null);
  const [f, setF] = useState<BriefingValues>({
    name: '',
    business: '',
    email: '',
    phone: '',
    city: '',
    spaceType: SPACE_TYPES[0],
    families: [],
    likes: '',
    dislikes: '',
    moods: [],
    spaceSize: '',
    message: '',
    consent: false,
  });
  const set =
    (k: keyof BriefingValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setF((p) => ({ ...p, [k]: e.target.value }));
  const toggle = (k: 'families' | 'moods', value: string) =>
    setF((p) => ({ ...p, [k]: p[k].includes(value) ? p[k].filter((x) => x !== value) : [...p[k], value] }));
  const body = buildBriefingMessage(f);
  const id = (k: string) => `${idPrefix}-${k}`;

  return (
    <form
      ref={ref}
      aria-label="Scent briefing"
      className="grid gap-4 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailtoUrl(briefingSubject(f), body);
      }}
    >
      <fieldset className="md:col-span-2">
        <legend className={labelCls}>Scent families you like</legend>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {SCENT_FAMILIES.map((s) => (
            <label key={s} className="inline-flex items-center gap-2 text-primary/90">
              <input type="checkbox" checked={f.families.includes(s)} onChange={() => toggle('families', s)} className="h-4 w-4" /> {s}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label className={labelCls} htmlFor={id('likes')}>Scents or notes you like</label>
        <textarea id={id('likes')} rows={3} className={field} placeholder="e.g. lavender, vanilla, fresh linen" value={f.likes} onChange={set('likes')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('dislikes')}>Scents or notes you dislike</label>
        <textarea id={id('dislikes')} rows={3} className={field} placeholder="e.g. too sweet, heavy musk" value={f.dislikes} onChange={set('dislikes')} />
      </div>
      <fieldset className="md:col-span-2">
        <legend className={labelCls}>Mood you want guests to feel</legend>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {SCENT_MOODS.map((s) => (
            <label key={s} className="inline-flex items-center gap-2 text-primary/90">
              <input type="checkbox" checked={f.moods.includes(s)} onChange={() => toggle('moods', s)} className="h-4 w-4" /> {s}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label className={labelCls} htmlFor={id('space')}>Type of space *</label>
        <select id={id('space')} required className={field} value={f.spaceType} onChange={set('spaceType')}>
          {SPACE_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelCls} htmlFor={id('size')}>Approximate size (sq ft), optional</label>
        <input id={id('size')} inputMode="numeric" className={field} value={f.spaceSize} onChange={set('spaceSize')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('name')}>Name *</label>
        <input id={id('name')} required autoComplete="name" className={field} value={f.name} onChange={set('name')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('business')}>Business name *</label>
        <input id={id('business')} required autoComplete="organization" className={field} value={f.business} onChange={set('business')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('email')}>Email *</label>
        <input id={id('email')} type="email" required autoComplete="email" className={field} value={f.email} onChange={set('email')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('phone')}>Phone / WhatsApp</label>
        <input id={id('phone')} type="tel" autoComplete="tel" className={field} value={f.phone} onChange={set('phone')} />
      </div>
      <div className="md:col-span-2">
        <label className={labelCls} htmlFor={id('city')}>City *</label>
        <input id={id('city')} required autoComplete="address-level2" className={field} value={f.city} onChange={set('city')} />
      </div>
      <div className="md:col-span-2">
        <label className={labelCls} htmlFor={id('message')}>Anything else we should know</label>
        <textarea id={id('message')} rows={3} className={field} value={f.message} onChange={set('message')} />
      </div>
      <Consent id={id('consent')} checked={f.consent} onChange={(consent) => setF((p) => ({ ...p, consent }))} />
      <Actions
        emailLabel="Send briefing by email"
        onWhatsApp={() => {
          if (ref.current?.reportValidity()) window.open(whatsappUrl(body), '_blank', 'noopener,noreferrer');
        }}
      />
      <Note />
    </form>
  );
}

/** Sample / scent-test request. No backend: opens an email or WhatsApp message with all the details. */
export function SampleRequestForm({
  idPrefix = 'samples',
  prefill = {},
  businessTypes = [...BUSINESS_TYPES],
}: {
  idPrefix?: string;
  prefill?: FormPrefill;
  businessTypes?: string[];
}) {
  const ref = useRef<HTMLFormElement>(null);
  const [f, setF] = useState<SampleValues>({
    name: '',
    business: '',
    email: '',
    phone: '',
    businessType: prefill.businessType ?? businessTypes[0],
    city: '',
    sampleWay: SAMPLE_WAYS[0],
    scentDirections: [],
    spaceSize: '',
    timing: '',
    message: '',
    consent: false,
  });
  const set =
    (k: keyof SampleValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setF((p) => ({ ...p, [k]: e.target.value }));
  const toggleScent = (s: string) =>
    setF((p) => ({
      ...p,
      scentDirections: p.scentDirections.includes(s) ? p.scentDirections.filter((x) => x !== s) : [...p.scentDirections, s],
    }));
  const body = buildSampleMessage(f);
  const id = (k: string) => `${idPrefix}-${k}`;

  return (
    <form
      ref={ref}
      aria-label="Request samples"
      className="grid gap-4 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailtoUrl(sampleSubject(f), body);
      }}
    >
      <div>
        <label className={labelCls} htmlFor={id('name')}>Name *</label>
        <input id={id('name')} required autoComplete="name" className={field} value={f.name} onChange={set('name')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('business')}>Business name *</label>
        <input id={id('business')} required autoComplete="organization" className={field} value={f.business} onChange={set('business')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('email')}>Email *</label>
        <input id={id('email')} type="email" required autoComplete="email" className={field} value={f.email} onChange={set('email')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('phone')}>Phone / WhatsApp</label>
        <input id={id('phone')} type="tel" autoComplete="tel" className={field} value={f.phone} onChange={set('phone')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('type')}>Type of business *</label>
        <select id={id('type')} required className={field} value={f.businessType} onChange={set('businessType')}>
          {businessTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelCls} htmlFor={id('city')}>City *</label>
        <input id={id('city')} required autoComplete="address-level2" className={field} value={f.city} onChange={set('city')} />
      </div>
      <div>
        <label className={labelCls} htmlFor={id('way')}>What would you like? *</label>
        <select id={id('way')} required className={field} value={f.sampleWay} onChange={set('sampleWay')}>
          {SAMPLE_WAYS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelCls} htmlFor={id('space')}>Size of space (approx. sq ft)</label>
        <input id={id('space')} inputMode="numeric" className={field} value={f.spaceSize} onChange={set('spaceSize')} />
      </div>
      <fieldset className="md:col-span-2">
        <legend className={labelCls}>Scent directions you like</legend>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {SCENT_DIRECTIONS.map((s) => (
            <label key={s} className="inline-flex items-center gap-2 text-primary/90">
              <input type="checkbox" checked={f.scentDirections.includes(s)} onChange={() => toggleScent(s)} className="h-4 w-4" /> {s}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="md:col-span-2">
        <label className={labelCls} htmlFor={id('timing')}>Preferred timing</label>
        <input id={id('timing')} className={field} placeholder="e.g. in the next two weeks" value={f.timing} onChange={set('timing')} />
      </div>
      <div className="md:col-span-2">
        <label className={labelCls} htmlFor={id('message')}>Message</label>
        <textarea id={id('message')} rows={3} className={field} value={f.message} onChange={set('message')} />
      </div>
      <Consent id={id('consent')} checked={f.consent} onChange={(consent) => setF((p) => ({ ...p, consent }))} />
      <Actions
        emailLabel="Send sample request by email"
        onWhatsApp={() => {
          if (ref.current?.reportValidity()) window.open(whatsappUrl(body), '_blank', 'noopener,noreferrer');
        }}
      />
      <Note />
    </form>
  );
}

/**
 * Two separate forms in tabs. Links to #quote or #samples open the matching tab. Both forms are in
 * the HTML (the inactive one is hidden), so nothing depends on JavaScript for crawlers.
 */
const TAB_LABEL: Record<Tab, string> = {
  briefing: SCENT_MARKETING_COPY.briefingTab,
  quote: 'Request a quote',
  samples: 'Request samples',
};

export default function RequestForms({
  tabs = ['quote', 'samples'],
  initialTab = tabs[0],
  prefill,
  businessTypes,
  interests,
  idPrefix = 'req',
  heading = 'Let’s find the scent of your business',
  intro,
}: {
  /** Which forms to offer, in tab order. */
  tabs?: Tab[];
  initialTab?: Tab;
  prefill?: FormPrefill;
  businessTypes?: string[];
  interests?: string[];
  idPrefix?: string;
  heading?: string;
  intro?: string;
}) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const apply = (scroll: boolean) => {
      const h = window.location.hash.replace('#', '');
      if ((h === 'briefing' || h === 'quote' || h === 'samples') && tabs.includes(h)) {
        setTab(h);
        if (scroll) sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    apply(false);
    const onHash = () => apply(true);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabCls = (active: boolean) =>
    `rounded-full px-6 py-2.5 font-semibold transition-colors ${
      active ? 'bg-primary text-primary-foreground' : 'border border-primary/30 text-primary hover:bg-primary/10'
    }`;

  return (
    <section ref={sectionRef} className="bg-secondary py-14 md:py-20 scroll-mt-20" aria-labelledby={`${idPrefix}-title`}>
      {tabs.map((t) => (
        <span key={t} id={t} className="block" aria-hidden="true" />
      ))}
      <div className="container max-w-3xl mx-auto px-4">
        <h2 id={`${idPrefix}-title`} className="text-2xl md:text-3xl text-primary mb-2 text-center">{heading}</h2>
        <p className="text-center text-primary/80 mb-8">
          {intro ??
            `A scent test in your space, no obligation${B2B_CONFIG.freeSamples ? ', free of charge' : ''}. Then a tailored quote, and a real person who answers.`}
        </p>
        <div role="tablist" aria-label="Type of request" className="flex flex-wrap justify-center gap-3 mb-8">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${t}`}
              aria-selected={tab === t}
              aria-controls={`${idPrefix}-panel-${t}`}
              className={tabCls(tab === t)}
              onClick={() => setTab(t)}
            >
              {TAB_LABEL[t]}
            </button>
          ))}
        </div>
        {tabs.map((t) => (
          <div key={t} role="tabpanel" id={`${idPrefix}-panel-${t}`} aria-labelledby={`${idPrefix}-tab-${t}`} hidden={tab !== t}>
            {t === 'briefing' && <ScentBriefingForm idPrefix={`${idPrefix}-b`} />}
            {t === 'quote' && <QuoteRequestForm idPrefix={`${idPrefix}-q`} prefill={prefill} businessTypes={businessTypes} interests={interests} />}
            {t === 'samples' && <SampleRequestForm idPrefix={`${idPrefix}-s`} prefill={prefill} businessTypes={businessTypes} />}
          </div>
        ))}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Or write to us at <a className="underline" href={`mailto:${B2B_CONFIG.email}`}>{B2B_CONFIG.email}</a> or on{' '}
          <a className="underline" href={`https://wa.me/${B2B_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
            WhatsApp {B2B_CONFIG.whatsappDisplay}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
