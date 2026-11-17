import { KITS, findKit, type KitDef } from '@shared/kits';
import { products, type Product } from './products';

export { KITS, type KitDef };

/** Cart `Product` for a kit (id is `kitId` or `kitId:optionValueId`). Null if the kit has no online price yet. */
export function kitToCartProduct(kit: KitDef, optionValueId?: string): Product | null {
  if (kit.priceCents === null) return null;
  let id = kit.id;
  let name = `${kit.name} Gift Kit`;
  if (kit.option) {
    const v = kit.option.values.find((x) => x.id === optionValueId);
    if (!v) return null;
    id = `${kit.id}:${v.id}`;
    name = `${name} - ${v.label}`;
  }
  return {
    id,
    name,
    category: 'kit',
    price: kit.priceCents / 100,
    description: kit.contents,
    images: kit.image ? [kit.image] : [],
    gender: 'unissex',
  };
}

/** Rebuilds a cart product from its id, always with CURRENT prices (never trusts localStorage). */
export function resolveCartProduct(id: string): Product | null {
  const p = products.find((x) => x.id === id);
  if (p) return p;
  const [kitId, variantId] = id.split(':');
  const kit = findKit(kitId);
  return kit ? kitToCartProduct(kit, variantId) : null;
}
