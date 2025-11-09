import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

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
          </div>
        </div>
      )}
    </nav>
  );
}
