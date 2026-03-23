import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Smartphone, Package } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';

const CheckoutPage = () => {
  const { t } = useLanguage();
  const { cart, cartTotal, clearCart, addOrder } = useStore();
  const navigate = useNavigate();
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState('mobileMoney');
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: 'Kigali' });
  const deliveryFee = deliveryType === 'pickup' ? 0 : cartTotal > 100000 ? 0 : 3000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      items: cart,
      total: cartTotal + deliveryFee,
      deliveryFee,
      status: 'pending' as const,
      date: new Date().toISOString().split('T')[0],
      deliveryType,
      address: deliveryType === 'delivery' ? `${form.address}, ${form.city}` : undefined,
      paymentMethod,
    };
    addOrder(order);
    clearCart();
    navigate('/orders');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="mb-6 font-display text-2xl font-bold">{t('checkout.title')}</h1>
        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Delivery Type */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-display font-semibold">Delivery Method</h3>
              <div className="grid grid-cols-2 gap-3">
                {(['delivery', 'pickup'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setDeliveryType(type)}
                    className={`flex items-center gap-2 rounded-lg border-2 p-4 text-sm font-medium transition ${deliveryType === type ? 'border-primary bg-accent' : 'border-border hover:border-muted-foreground'}`}
                  >
                    {type === 'delivery' ? <MapPin className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                    {t(`checkout.${type}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Address */}
            {deliveryType === 'delivery' && (
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 font-display font-semibold">{t('checkout.address')}</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required placeholder={t('checkout.name')} value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
                  <input required placeholder={t('checkout.phone')} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
                  <input required placeholder={t('checkout.address')} value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="col-span-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
                  <input required placeholder={t('checkout.city')} value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
                </div>
              </div>
            )}

            {/* Payment */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-display font-semibold">{t('checkout.payment')}</h3>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setPaymentMethod('mobileMoney')}
                  className={`flex items-center gap-2 rounded-lg border-2 p-4 text-sm font-medium transition ${paymentMethod === 'mobileMoney' ? 'border-primary bg-accent' : 'border-border hover:border-muted-foreground'}`}>
                  <Smartphone className="h-4 w-4" /> {t('checkout.mobileMoney')}
                </button>
                <button type="button" onClick={() => setPaymentMethod('card')}
                  className={`flex items-center gap-2 rounded-lg border-2 p-4 text-sm font-medium transition ${paymentMethod === 'card' ? 'border-primary bg-accent' : 'border-border hover:border-muted-foreground'}`}>
                  <CreditCard className="h-4 w-4" /> {t('checkout.card')}
                </button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Payment integration placeholder — no real charges.</p>
            </div>
          </div>

          {/* Summary */}
          <div className="h-fit rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 font-display font-semibold">Order Summary</h3>
            <div className="mb-4 space-y-2">
              {cart.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span>{item.product.name} x{item.quantity}</span>
                  <span>{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-border pt-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{t('cart.subtotal')}</span><span>{cartTotal.toLocaleString()} RWF</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{t('cart.delivery')}</span><span>{deliveryFee === 0 ? 'Free' : `${deliveryFee.toLocaleString()} RWF`}</span></div>
              <div className="flex justify-between border-t border-border pt-2 font-display text-lg font-bold"><span>{t('cart.total')}</span><span className="text-primary">{(cartTotal + deliveryFee).toLocaleString()} RWF</span></div>
            </div>
            <button type="submit" className="mt-6 w-full rounded-lg bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-90">
              {t('checkout.placeOrder')}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
