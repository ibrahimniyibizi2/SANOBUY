import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';

const CartPage = () => {
  const { t } = useLanguage();
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();
  const deliveryFee = cartTotal > 100000 ? 0 : 3000;

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container flex flex-col items-center py-20">
          <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 font-display text-xl font-bold">{t('cart.empty')}</h2>
          <Link to="/products" className="mt-4 rounded-lg bg-primary px-6 py-2 text-primary-foreground transition hover:opacity-90">
            {t('hero.cta')}
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="mb-6 font-display text-2xl font-bold">{t('cart.title')}</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cart.map(item => (
              <div key={item.product.id} className="flex gap-4 rounded-lg border border-border bg-card p-4">
                <img src={item.product.image} alt={item.product.name} className="h-20 w-20 rounded-lg object-cover" />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link to={`/products/${item.product.id}`} className="font-medium hover:text-primary">{item.product.name}</Link>
                    <p className="text-sm text-primary font-semibold">{item.product.price.toLocaleString()} RWF</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-input">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-muted"><Minus className="h-3 w-3" /></button>
                      <span className="min-w-[30px] text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-muted"><Plus className="h-3 w-3" /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-destructive hover:underline">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 font-display font-semibold">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{t('cart.subtotal')}</span><span>{cartTotal.toLocaleString()} RWF</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{t('cart.delivery')}</span><span>{deliveryFee === 0 ? 'Free' : `${deliveryFee.toLocaleString()} RWF`}</span></div>
              <div className="border-t border-border pt-2">
                <div className="flex justify-between font-display text-lg font-bold"><span>{t('cart.total')}</span><span className="text-primary">{(cartTotal + deliveryFee).toLocaleString()} RWF</span></div>
              </div>
            </div>
            <Link to="/checkout" className="mt-6 flex w-full items-center justify-center rounded-lg bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-90">
              {t('cart.checkout')}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
