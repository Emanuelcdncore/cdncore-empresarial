import { useNavigate } from '@tanstack/react-router';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { formatEUR } from '@/lib/products-format';
import { useTranslation } from 'react-i18next';

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, remove, setQty, totalItems, totalCents, clear } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] z-50 flex flex-col transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-[110%]'}`}
        style={{ background: 'linear-gradient(180deg, #0e0818 0%, #0a0610 100%)', borderLeft: '1px solid rgba(139,92,246,0.2)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-purple-400" />
            <span className="font-semibold text-white products-depot-font">
              {t('cart_title')}
            </span>
            {totalItems > 0 && (
              <span className="ml-1 bg-purple-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {totalItems}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <button
                onClick={clear}
                className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
              >
                {t('cart_clear')}
              </button>
            )}
            <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-500">
              <ShoppingCart className="h-12 w-12 opacity-20" />
              <p className="text-sm">{t('cart_empty')}</p>
              <button
                onClick={() => { onClose(); navigate({ to: '/products' }); }}
                className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
              >
                {t('cart_browse')} →
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.productId}-${item.variantId}`} className="flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                {/* Image */}
                <div
                  className="w-16 h-16 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center flex-shrink-0 cursor-pointer"
                  onClick={() => { onClose(); navigate({ to: '/products/$handle', params: { handle: item.handle } }); }}
                >
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain p-1.5" />
                  ) : (
                    <ShoppingCart className="h-5 w-5 text-zinc-600" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium text-white leading-snug line-clamp-2 cursor-pointer hover:text-purple-300 transition-colors"
                    onClick={() => { onClose(); navigate({ to: '/products/$handle', params: { handle: item.handle } }); }}
                  >
                    {item.title}
                  </p>
                  {item.variantTitle && item.variantTitle !== 'Default Title' && (
                    <p className="text-xs text-zinc-500 mt-0.5">{item.variantTitle}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    {/* Qty controls */}
                    <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setQty(item.productId, item.variantId, item.qty - 1)}
                        className="px-2 py-1 text-zinc-400 hover:text-white transition-colors text-sm"
                      >−</button>
                      <span className="px-2.5 py-1 text-xs font-medium text-white min-w-[1.75rem] text-center">{item.qty}</span>
                      <button
                        onClick={() => setQty(item.productId, item.variantId, item.qty + 1)}
                        className="px-2 py-1 text-zinc-400 hover:text-white transition-colors text-sm"
                      >+</button>
                    </div>
                    {/* Line total */}
                    <span className="text-sm font-semibold text-white products-depot-font">
                      {formatEUR(item.price_cents * item.qty)}
                    </span>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => remove(item.productId, item.variantId)}
                  className="text-zinc-600 hover:text-red-400 transition-colors flex-shrink-0 self-start mt-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">{totalItems} {totalItems !== 1 ? t('cart_items') : t('cart_item')}</span>
              <div className="text-right">
                <div className="text-xs text-zinc-500 mb-0.5">{t('cart_total')}</div>
                <div className="text-2xl font-bold text-white products-depot-font">{formatEUR(totalCents)}</div>
              </div>
            </div>
            <button
              onClick={() => { onClose(); navigate({ to: '/contact' }); }}
              className="w-full btn-violet"
            >
              {t('cart_request_quote')} →
            </button>
            <button
              onClick={() => { onClose(); navigate({ to: '/products' }); }}
              className="w-full text-sm text-zinc-400 hover:text-white transition-colors py-2"
            >
              {t('cart_continue')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
