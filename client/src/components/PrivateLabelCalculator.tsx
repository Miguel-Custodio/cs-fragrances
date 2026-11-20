import { useEffect, useId, useRef, useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import {
  KG_STEP,
  MIN_KG,
  hasUnconfirmedListed,
  listedProducts,
  privateLabelMailto,
  privateLabelWhatsapp,
  type PublicBatchResult,
} from '@shared/privateLabelCatalog';
import { B2B_CONFIG } from '@shared/b2bConfig';

const field =
  'rounded-md border border-border bg-white px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-ring';

const toUnits = (v: string | undefined) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
};

/**
 * Private label batch calculator. The numbers are worked out by the server function /api/private-label-calc,
 * so the browser only receives rounded results (percent of the batch, "about N more"). No gram figures, no
 * prices. The quote buttons open an email or WhatsApp message with the selection.
 */
export default function PrivateLabelCalculator({ headingLevel = 2, idPrefix = 'plc' }: { headingLevel?: 2 | 3; idPrefix?: string }) {
  const uid = useId();
  const [kgText, setKgText] = useState('1');
  const [qty, setQty] = useState<Record<string, string>>({});
  const [turnkey, setTurnkey] = useState(false);
  const [fragrances, setFragrances] = useState('');
  const [result, setResult] = useState<PublicBatchResult | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const seq = useRef(0);
  const products = listedProducts();
  const kg = Number(kgText);
  const kgValid = Number.isFinite(kg) && kg >= MIN_KG;
  const units: Record<string, number> = Object.fromEntries(products.map((p) => [p.id, toUnits(qty[p.id])]));
  const totalUnits = Object.values(units).reduce((a, b) => a + b, 0);
  const H = `h${headingLevel}` as 'h2' | 'h3';

  // Ask the server (debounced). The request carries only kg and unit counts.
  const key = JSON.stringify([kgText, units]);
  useEffect(() => {
    const mine = ++seq.current;
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch('/api/private-label-calc', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ kg: Number.isFinite(kg) ? kg : 0, quantities: units }),
          signal: ctrl.signal,
        });
        const data = await res.json();
        if (mine !== seq.current) return;
        if (data?.ok && data.result) {
          setResult(data.result as PublicBatchResult);
          setUnavailable(false);
        } else setUnavailable(true);
      } catch (e) {
        if ((e as Error)?.name !== 'AbortError' && mine === seq.current) setUnavailable(true);
      }
    }, 200);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const status = !kgValid ? 'invalid' : (result?.status ?? 'empty');
  const percent = kgValid ? (result?.percent ?? 0) : 0;
  const moreFit = (id: string) => result?.lines.find((l) => l.id === id)?.moreFit;
  const extras = { turnkey, fragrances };
  const canRequest = kgValid && totalUnits > 0 && status !== 'over';
  const kgBad = kgText.trim() !== '' && !kgValid;
  const barColor = status === 'over' ? 'bg-red-600' : status === 'complete' ? 'bg-green-700' : 'bg-primary';
  const setKg = (v: number) => setKgText(String(Math.max(MIN_KG, Math.round(v * 100) / 100)));
  const sendKg = kgValid ? kg : MIN_KG;

  return (
    <div id={idPrefix} className="rounded-xl border border-border bg-card p-5 md:p-8 shadow-sm">
      <H className="text-2xl md:text-3xl text-primary mb-2">Plan your private label batch</H>
      <p className="text-primary/85 mb-6">
        The minimum is {MIN_KG} kg of fragrance per batch. Enter how many kilograms you want, then choose any mix of our
        products until the batch is used up. The calculator gives you an idea of how many products fit in your batch.
      </p>

      {hasUnconfirmedListed() && (
        <p role="note" className="mb-6 rounded-md border border-amber-500/50 bg-amber-50 px-4 py-2 text-sm text-amber-900">
          Example values — formulas pending confirmation.
        </p>
      )}

      <div className="mb-6 flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor={`${uid}-kg`} className="block text-sm font-semibold text-primary mb-1">Fragrance for the batch (kg)</label>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Less fragrance" className={`${field} px-3`} onClick={() => setKg(sendKg - KG_STEP)}>−</button>
            <input
              id={`${uid}-kg`}
              type="number"
              inputMode="decimal"
              min={MIN_KG}
              step={KG_STEP}
              className={`${field} w-28 text-center`}
              value={kgText}
              onChange={(e) => setKgText(e.target.value)}
              aria-invalid={kgBad}
              aria-describedby={`${uid}-kg-help`}
            />
            <button type="button" aria-label="More fragrance" className={`${field} px-3`} onClick={() => setKg(sendKg + KG_STEP)}>+</button>
          </div>
        </div>
        <p id={`${uid}-kg-help`} className={`text-sm ${kgBad ? 'text-red-700 font-semibold' : 'text-muted-foreground'}`}>
          {kgBad ? `The minimum is ${MIN_KG} kg of fragrance.` : `Minimum ${MIN_KG} kg. Steps of ${KG_STEP} kg work best.`}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <caption className="sr-only">Products, quantities and how many more fit</caption>
          <thead>
            <tr className="border-b border-border text-sm text-muted-foreground">
              <th scope="col" className="py-2 pr-3 font-semibold">Product</th>
              <th scope="col" className="py-2 pr-3 font-semibold">Quantity</th>
              <th scope="col" className="py-2 font-semibold text-right">You can still add</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const more = moreFit(p.id);
              return (
                <tr key={p.id} className="border-b border-border/60 align-middle">
                  <th scope="row" className="py-3 pr-3 font-normal text-primary">
                    <span className="font-semibold">{p.name}</span> <span className="text-muted-foreground">({p.unit})</span>
                    {!p.confirmed && <span className="block text-xs text-muted-foreground">Example value</span>}
                  </th>
                  <td className="py-3 pr-3">
                    <label className="sr-only" htmlFor={`${uid}-${p.id}`}>Units of {p.name}</label>
                    <input
                      id={`${uid}-${p.id}`}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={1}
                      className={`${field} w-24`}
                      value={qty[p.id] ?? ''}
                      placeholder="0"
                      onChange={(e) => setQty((q) => ({ ...q, [p.id]: e.target.value }))}
                    />
                  </td>
                  <td className="py-3 text-right text-sm text-primary/80">
                    {kgValid && status !== 'over' && more !== undefined ? `about ${more} more` : '–'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <div className="mb-1 flex items-baseline justify-between text-sm text-primary">
          <span className="font-semibold">Batch filled ({kgValid ? kg : MIN_KG} kg)</span>
          <span data-testid="percent">{percent}%</span>
        </div>
        <div
          role="progressbar"
          aria-label="Batch filled"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          className="h-4 w-full overflow-hidden rounded-full bg-secondary"
        >
          <div className={`h-full ${barColor} transition-all`} style={{ width: `${percent}%` }} />
        </div>
        <p aria-live="polite" className={`mt-3 text-base font-semibold ${status === 'over' ? 'text-red-700' : 'text-primary'}`} data-testid="status">
          {unavailable && 'The calculator is not available right now. You can still send your selection and we will check it for you.'}
          {!unavailable && status === 'invalid' && `Enter at least ${MIN_KG} kg of fragrance to start.`}
          {!unavailable && status === 'empty' && 'Add quantities above to see how much of your batch they fill.'}
          {!unavailable && status === 'incomplete' && `Your batch is ${percent}% filled. The order needs to use up the batch: add more products to complete it.`}
          {!unavailable && status === 'complete' && 'Your batch is complete.'}
          {!unavailable && status === 'over' && 'Over capacity. Remove some units or add more fragrance.'}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          A kilogram of fragrance is a production batch: we ask you to use it up across your products, in any mix.
        </p>
      </div>

      <div className="mt-8 grid gap-4 border-t border-border pt-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="inline-flex items-center gap-2 text-primary">
            <input type="checkbox" className="h-4 w-4" checked={turnkey} onChange={(e) => setTurnkey(e.target.checked)} />
            I would like the turnkey service (we create the artwork, labels and boxes with your approval)
          </label>
        </div>
        <div className="md:col-span-2">
          <label htmlFor={`${uid}-frag`} className="block text-sm font-semibold text-primary mb-1">Fragrances you have in mind (optional)</label>
          <input id={`${uid}-frag`} className={`${field} w-full`} value={fragrances} onChange={(e) => setFragrances(e.target.value)} placeholder="e.g. vanilla, fresh citrus, a scent you already like" />
        </div>
        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <a
            href={canRequest ? privateLabelMailto(sendKg, units, unavailable ? null : result, extras) : undefined}
            aria-disabled={!canRequest}
            className={`inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold ${canRequest ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'pointer-events-none bg-primary/30 text-primary-foreground'}`}
          >
            <Mail size={18} aria-hidden="true" /> Request a private label quote
          </a>
          <a
            href={canRequest ? privateLabelWhatsapp(sendKg, units, unavailable ? null : result, extras) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!canRequest}
            className={`inline-flex items-center gap-2 rounded-full border px-7 py-3 font-semibold ${canRequest ? 'border-primary/40 text-primary hover:bg-primary/10' : 'pointer-events-none border-primary/20 text-primary/40'}`}
          >
            <MessageCircle size={18} aria-hidden="true" /> Send on WhatsApp
          </a>
        </div>
        <p className="md:col-span-2 text-sm text-muted-foreground">
          {canRequest
            ? `This opens a message with your selection, ready to send to ${B2B_CONFIG.email} or on WhatsApp (${B2B_CONFIG.whatsappDisplay}). No prices here: we quote your project individually. Samples are free.`
            : 'Choose at least one product, within the capacity of your batch, to request a quote.'}
        </p>
      </div>
    </div>
  );
}
