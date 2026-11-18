import { Hand, Package, Truck, ShieldCheck } from 'lucide-react';

const BENEFITS = [
  { icon: Hand, title: 'Handmade in BC', text: 'Made by hand in British Columbia' },
  { icon: Package, title: 'Small batches', text: 'Crafted with attention to every detail' },
  { icon: Truck, title: 'Ships across Canada & US', text: 'Local pickup also available' },
  { icon: ShieldCheck, title: 'Secure checkout', text: 'Pay safely with Square' },
];

export default function BenefitsBar() {
  return (
    <section aria-label="Why shop with us" className="bg-secondary border-y border-border">
      <ul className="container mx-auto px-4 py-6 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
        {BENEFITS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-3">
            <Icon className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-semibold text-primary leading-tight">{title}</p>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
