import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useCartUI } from '@/contexts/CartUIContext';
import { KITS_ENABLED } from '@/lib/flags';

const NAV_LINKS = [
  { href: '/#fragrances', label: 'Fragrances' },
  { href: '/shop', label: 'Shop' },
  ...(KITS_ENABLED ? [{ href: '/kits', label: 'Christmas Kits' }] : []),
  { href: '/about', label: 'Our Story' },
  { href: '/business', label: 'For Business' },
  { href: '#contact', label: 'Contact' },
  { href: '/ingredients', label: 'Ingredients' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  const { openCart } = useCartUI();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCartClick = () => {
    openCart();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-primary-foreground/80 border-b border-border">
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <a href="/" className="logo text-primary font-bold">
          CS Fragrances
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 lg:gap-8 items-center text-sm lg:text-base">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-primary hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
          <button
            onClick={handleCartClick}
            className="relative text-primary hover:text-accent transition-colors p-2"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={24} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-primary p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-foreground border-t border-border">
          <div className="container py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-primary hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={handleCartClick}
              className="relative text-primary hover:text-accent transition-colors flex items-center gap-2"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
              {items.length > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
