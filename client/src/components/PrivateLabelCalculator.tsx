import { useId, useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { KG_STEP, LOSS_RATE, MIN_KG, cleanUnits, computeBatch, privateLabelMailto, privateLabelWhatsapp } from '@shared/privateLabelCalc';
import { hasUnconfirmedListed, listedProducts } from '@shared/privateLabelFormulas';
import { B2B_CONFIG } from '@shared/b2bConfig';

const field =
  'rounded-md border border-border bg-white px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-ring';
const g = (n: number) => `${Number.isInteger(n) ? n : n.toFixed(1)} g`;

/**
 * Private label batch calculator. The client enters kg of fragrance, 10% is counted as loss, and the
 * usable grams are filled with any mix of products. No prices, no backend: the quote buttons open an
 * email or WhatsApp message with the selection. Formulas: shared/privateLabelFormulas.ts.
 */
export default function PrivateLabelCalculator({ headingLevel = 2, idPrefix = 'plc' }: { headingLevel?: 2 | 3; idPrefix?: string }) {
  const uid = useId();
  const [kgText, setKgText] = useState('1');
  const [qty, setQty] = useState<Record<string, string>>({});
  const [turnkey, setTurnkey] = useState(false);
  const [fragrances, setFragrances] = useState('');
  const products = listedProducts();
  const kg = Number(kgText);
  const r = computeBatch(kg, qty);
  const extras = { turnkey, fragrances };
  const H = `h${headingLevel}` as 'h2' | 'h3';
  const canRequest = r.kgValid && r.totalUnits > 0 && r.status !== 'over';
  const kgBad = kgText.trim() !== '' && !r.kgValid;

  const setKg = (v: number) => setKgText(String(Math.max(MIN_KG, Math.round(v * 100) / 100)));
  const barColor = r.status === 'over' ? 'bg-red-600' : r.status === 'complete' ? 'bg-green-700' : 'bg-primary';

  return (
    <div id={idPrefix} className="rounded-xl border border-border bg-card p-5 md:p-8 shadow-sm">
      <H className="text-2xl md:text-3xl text-primary mb-2">Plan your private label batch</H>
      <p className="text-primary/85 mb-6">
        The minimum is {MIN_KG} kg of fragrance per batch. Enter how many kilograms you want, then choose any mix of our
        products until the batch is used up. {Math.round(LOSS_RATE * 100)}% of the fragrance is counted as production loss.
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
            <button type="button" aria-label="Less fragrance" className={`${field} px-3`} onClick={() => setKg((r.kgValid ? kg : MIN_KG) - KG_STEP)}>−</button>
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
            <button type="button" aria-label="More fragrance" className={`${field} px-3`} onClick={() => setKg((r.kgValid ? kg : MIN_KG) + KG_STEP)}>+</button>
          </div>
        </div>
        <p id={`${uid}-kg-help`} className={`text-sm ${kgBad ? 'text-red-700 font-semibold' : 'text-muted-foreground'}`}>
          {kgBad ? `The minimum is ${MIN_KG} kg of fragrance.` : `Minimum ${MIN_KG} kg. Steps of ${KG_STEP} kg work best.`}
        </p>
      </div>

      <dl className="mb-6 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-secondary p-3">
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">Production loss ({Math.round(LOSS_RATE * 100)}%)</dt>
          <dd className="text-lg font-semibold text-primary">{g(r.loss)}</dd>
        </div>
        <div className="rounded-lg bg-secondary p-3">
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">Usable fragrance</dt>
          <dd className="text-lg font-semibold text-primary" data-testid="usable">{g(r.usable)}</dd>
        </div>
        <div className="rounded-lg bg-secondary p-3">
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">Used so far</dt>
          <dd className="text-lg font-semibold text-primary" data-testid="used">{g(r.used)}</dd>
        </div>
      </dl>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <caption className="sr-only">Products, quantities and fragrance used</caption>
          <thead>
            <tr className="border-b border-border text-sm text-muted-foreground">
              <th scope="col" className="py-2 pr-3 font-semibold">Product</th>
              <th scope="col" className="py-2 pr-3 font-semibold">Quantity</th>
              <th scope="col" className="py-2 pr-3 font-semibold text-right">Fragrance used</th>
              <th scope="col" className="py-2 font-semibold text-right">Still fits</th>
            </tr>
          </thead>
          <tbody>
            {r.lines.map((l) => {
              const p = products.find((x) => x.id === l.id)!;
              return (
                <tr key={l.id} className="border-b border-border/60 align-middle">
                  <th scope="row" className="py-3 pr-3 font-normal text-primary">
                    <span className="font-semibold">{l.name}</span> <span className="text-muted-foreground">({l.unit})</span>
                    <span className="block text-xs text-muted-foreground">
                      {g(l.gramsPerUnit)} of fragrance per unit{!p.confirmed ? ' (example value)' : ''}
                      {p.note ? ` · ${p.note}` : ''}
                    </span>
                  </th>
                  <td className="py-3 pr-3">
                    <label className="sr-only" htmlFor={`${uid}-${l.id}`}>Units of {l.name}</label>
                    <input
                      id={`${uid}-${l.id}`}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={1}
                      className={`${field} w-24`}
                      value={qty[l.id] ?? ''}
                      placeholder="0"
                      onChange={(e) => setQty((q) => ({ ...q, [l.id]: e.target.value }))}
                    />
                  </td>
                  <td className="py-3 pr-3 text-right text-primary">{l.units > 0 ? g(l.grams) : '–'}</td>
                  <td className="py-3 text-right text-sm text-primary/80">
                    {r.kgValid && r.status !== 'over' ? `${l.moreFit} more` : '–'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <div className="mb-1 flex items-baseline justify-between text-sm text-primary">
          <span className="font-semibold">Batch filled</span>
          <span data-testid="percent">{r.percent}%</span>
        </div>
        <div
          role="progressbar"
          aria-label="Batch filled"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={r.percent}
          className="h-4 w-full overflow-hidden rounded-full bg-secondary"
        >
          <div className={`h-full ${barColor} transition-all`} style={{ width: `${r.percent}%` }} />
        </div>
        <p aria-live="polite" className={`mt-3 text-base font-semibold ${r.status === 'over' ? 'text-red-700' : 'text-primary'}`} data-testid="status">
          {r.status === 'invalid' && `Enter at least ${MIN_KG} kg of fragrance to start.`}
          {r.status === 'empty' && `Add quantities above. Your batch has ${g(r.usable)} of usable fragrance to fill.`}
          {r.status === 'incomplete' && `${g(r.remaining)} remaining to complete your batch. The order needs to use up the batch.`}
          {r.status === 'complete' && `Your batch is complete. The ${g(r.remaining)} left is less than one more unit of any product.`}
          {r.status === 'over' && `Over capacity by ${g(r.over)}. Remove some units or add more fragrance.`}
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
            href={canRequest ? privateLabelMailto(r, extras) : undefined}
            aria-disabled={!canRequest}
            className={`inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold ${canRequest ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'pointer-events-none bg-primary/30 text-primary-foreground'}`}
          >
            <Mail size={18} aria-hidden="true" /> Request a private label quote
          </a>
          <a
            href={canRequest ? privateLabelWhatsapp(r, extras) : undefined}
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
