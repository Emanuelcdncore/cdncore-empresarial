import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export type CartItem = {
  productId: string;
  handle: string;
  variantId: string;
  title: string;
  variantTitle: string | null;
  price_cents: number;
  image: string | null;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, 'qty'>, qty: number) => void;
  remove: (productId: string, variantId: string) => void;
  setQty: (productId: string, variantId: string, qty: number) => void;
  clear: () => void;
  totalItems: number;
  totalCents: number;
};

const CartContext = createContext<CartCtx | null>(null);

const STORAGE_KEY = 'cdncore-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback((item: Omit<CartItem, 'qty'>, qty: number) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.productId === item.productId && i.variantId === item.variantId,
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { ...item, qty }];
    });
  }, []);

  const remove = useCallback((productId: string, variantId: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.variantId === variantId)));
  }, []);

  const setQty = useCallback((productId: string, variantId: string, qty: number) => {
    if (qty <= 0) {
      remove(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.variantId === variantId ? { ...i, qty } : i,
      ),
    );
  }, [remove]);

  const clear = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((n, i) => n + i.qty, 0);
  const totalCents = items.reduce((n, i) => n + i.price_cents * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, totalItems, totalCents }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
