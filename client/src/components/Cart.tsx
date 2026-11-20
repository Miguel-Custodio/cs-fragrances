import { useCart } from '@/contexts/CartContext';
import { useCartUI } from '@/contexts/CartUIContext';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { parsePostalCode, resolveDestination, ShippingError, type ShippingSelection } from '@shared/shipping';
import { formatCad } from '@shared/catalog';
import { buildWhatsAppOrderUrl } from '@shared/whatsapp';
import { quoteForCart, startCheckout } from '@/lib/checkout';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, shippingMethod, setShippingMethod, postalCode, setPostalCode, city, setCity } =
    useCart();
  const { isCartOpen, closeCart } = useCartUI();
  const [busy, setBusy] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);
  const [fallbackReason, setFallbackReason] = useState<string | null>(null);

  const selection: ShippingSelection =
    shippingMethod === 'pickup' ? { method: 'pickup' } : { method: 'ship', postalCode };
  const quote = quoteForCart(items, selection);
  let dest = null;
  let destError: string | null = null;
  if (shippingMethod === 'ship') {
    if (!postalCode.trim()) {
      destError = 'Enter a Canadian postal code (A1A 1A1) or a US ZIP code (12345) to calculate shipping.';
    } else {
      try {
        dest = resolveDestination(selection);
      } catch (err) {
        destError = err instanceof ShippingError ? err.message : 'Invalid postal code.';
      }
    }
  } else {
    dest = resolveDestination({ method: 'pickup' });
  }

  const handleCheckout = async () => {
    if (!quote) return;
    setBusy(true);
    setWhatsAppUrl(null);
    setFallbackReason(null);
    const result = await startCheckout(items, selection, city);
    if (result.kind === 'redirect') {
      window.location.href = result.url; // Square-hosted payment page
      return;
    }
    // Online payment unavailable -> offer the pre-filled WhatsApp order instead.
    setFallbackReason(result.reason);
    setWhatsAppUrl(buildWhatsAppOrderUrl(quote, city));
    setBusy(false);
  };

  if (!isCartOpen) {
    return null;
  }

  return (
    <>
      {/* Cart Drawer */}
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 transition-opacity"
          onClick={closeCart}
        />

        {/* Cart Panel */}
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-primary">Shopping Cart</h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-600 text-lg">Your cart is empty</p>
                <p className="text-gray-500 text-sm mt-2">Add products to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    {/* Product Image */}
                    <img
                      src={item.product.images[0] ?? '/favicon.svg'}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">{item.product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {formatCad(Math.round(item.product.price * 100))}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                          aria-label="Remove item"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-6 space-y-4 max-h-[65vh] overflow-y-auto">
              {/* Total */}
              {/* Delivery */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-primary">Delivery</p>
                <div className="flex flex-col gap-2 text-sm">
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="delivery-method"
                      checked={shippingMethod === 'pickup'}
                      onChange={() => {
                        setShippingMethod('pickup');
                        setWhatsAppUrl(null);
                      }}
                      className="mt-1"
                    />
                    <span>
                      <span className="font-medium">Local pickup (free)</span>
                      <span className="block text-xs text-gray-500">
                        Pickup location and time are confirmed by email/WhatsApp after your order.
                      </span>
                    </span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="delivery-method"
                      checked={shippingMethod === 'ship'}
                      onChange={() => {
                        setShippingMethod('ship');
                        setWhatsAppUrl(null);
                      }}
                      className="mt-1"
                    />
                    <span className="font-medium">Ship to an address</span>
                  </label>
                </div>
                {shippingMethod === 'ship' && (
                  <>
                    <label htmlFor="postal-code" className="text-sm font-medium text-primary">
                      Postal / ZIP code
                    </label>
                    <input
                      id="postal-code"
                      type="text"
                      value={postalCode}
                      onChange={(e) => {
                        setPostalCode(e.target.value);
                        setWhatsAppUrl(null);
                      }}
                      maxLength={12}
                      placeholder="V6B 1A1 or 90210"
                      autoComplete="postal-code"
                      aria-invalid={Boolean(postalCode.trim() && destError)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                    />
                    {destError && <p className="text-xs text-red-600">{destError}</p>}
                    {dest && !destError && (
                      <p className="text-xs text-gray-500">
                        {dest.rule.label}. {dest.rule.hint}
                        {parsePostalCode(postalCode) ? ` Code: ${dest.postal?.normalized}.` : ''}
                      </p>
                    )}
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      maxLength={80}
                      placeholder="City (optional)"
                      aria-label="City"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                    />
                  </>
                )}
              </div>

              {/* Totals */}
              {quote && (
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCad(quote.subtotalCents)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{quote.shippingFree ? 'Free' : formatCad(quote.shippingCents)}</span>
                  </div>
                  {quote.taxes.map((t) => (
                    <div key={t.id} className="flex justify-between">
                      <span>
                        {t.name} ({t.percentage}%)
                      </span>
                      <span>{formatCad(t.amountCents)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center text-lg font-bold pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-primary">{formatCad(quote.totalCents)}</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <Button
                onClick={handleCheckout}
                disabled={busy || !quote || Boolean(destError)}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {busy ? 'Redirecting to secure payment...' : 'Proceed to Checkout'}
              </Button>

              {whatsAppUrl && (
                <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 space-y-2">
                  <p>
                    Online payment isn&apos;t available right now. You can send your order by WhatsApp and
                    we&apos;ll confirm it with you.
                  </p>
                  {fallbackReason && <p className="text-xs text-amber-700/70">Code: {fallbackReason}</p>}
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold py-2 transition-colors"
                  >
                    Order via WhatsApp
                  </a>
                </div>
              )}

              <Button
                onClick={() => clearCart()}
                variant="outline"
                className="w-full"
              >
                Clear Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
