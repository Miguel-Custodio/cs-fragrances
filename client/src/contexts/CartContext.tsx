import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { resolveCartProduct } from '@/data/kits';
import { DEFAULT_DELIVERY_OPTION, getDeliveryRule, type DeliveryOption } from '@shared/shipping';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  /** Merchandise subtotal in CAD (before shipping/tax). */
  total: number;
  itemCount: number;
  deliveryOption: DeliveryOption;
  setDeliveryOption: (option: DeliveryOption) => void;
  city: string;
  setCity: (city: string) => void;
}

/** Loads the saved cart, re-reading every product (and price) from the current catalog. */
function loadSavedItems(): CartItem[] {
  try {
    const saved = JSON.parse(localStorage.getItem('cart') || '[]') as Array<{
      product?: { id?: string };
      quantity?: number;
    }>;
    return saved.flatMap((entry) => {
      const product = entry.product?.id ? resolveCartProduct(entry.product.id) : null;
      const quantity = Number(entry.quantity);
      return product && Number.isInteger(quantity) && quantity > 0 ? [{ product, quantity }] : [];
    });
  } catch {
    return [];
  }
}

function loadSavedDelivery(): { option: DeliveryOption; city: string } {
  try {
    const saved = JSON.parse(localStorage.getItem('cart-delivery') || '{}');
    return {
      option: getDeliveryRule(saved.option) ? saved.option : DEFAULT_DELIVERY_OPTION,
      city: typeof saved.city === 'string' ? saved.city.slice(0, 80) : '',
    };
  } catch {
    return { option: DEFAULT_DELIVERY_OPTION, city: '' };
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadSavedItems);
  const [delivery, setDelivery] = useState(loadSavedDelivery);

  useEffect(() => {
    localStorage.setItem('cart-delivery', JSON.stringify(delivery));
  }, [delivery]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
    } else {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        deliveryOption: delivery.option,
        setDeliveryOption: (option) => setDelivery((d) => ({ ...d, option })),
        city: delivery.city,
        setCity: (city) => setDelivery((d) => ({ ...d, city })),
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
