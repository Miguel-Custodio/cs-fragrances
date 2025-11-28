import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-primary-foreground/80 border-b border-border">
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <div className="logo text-primary font-bold">
          CS Fragrances
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="#fragrances" className="text-primary hover:text-accent transition-colors font-lora">
            Fragrances
          </a>
          <a href="#story" className="text-primary hover:text-accent transition-colors font-lora">
            Our Story
          </a>
          <a href="#contact" className="text-primary hover:text-accent transition-colors font-lora">
            Contact
          </a>
          <button
            onClick={() => setCartOpen(!cartOpen)}
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
            <a
              href="#fragrances"
              className="text-primary hover:text-accent transition-colors font-lora"
              onClick={() => setIsOpen(false)}
            >
              Fragrances
            </a>
            <a
              href="#story"
              className="text-primary hover:text-accent transition-colors font-lora"
              onClick={() => setIsOpen(false)}
            >
              Our Story
            </a>
            <a
              href="#contact"
              className="text-primary hover:text-accent transition-colors font-lora"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <button
              onClick={() => setCartOpen(!cartOpen)}
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
