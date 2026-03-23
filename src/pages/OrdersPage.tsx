import { Package, Truck, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';

const statusConfig = {
  pending: { icon: Package, color: 'text-warning', bg: 'bg-warning/10' },
  delivering: { icon: Truck, color: 'text-info', bg: 'bg-info/10' },
  completed: { icon: CheckCircle, color: 'text-success', bg: 'bg-accent' },
};

const OrdersPage = () => {
  const { t, lang } = useLanguage();
  const { orders } = useStore();

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="mb-6 font-display text-2xl font-bold">{t('orders.title')}</h1>
        {orders.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">{t('orders.empty')}</div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => {
              const { icon: Icon, color, bg } = statusConfig[order.status];
              return (
                <div key={order.id} className="rounded-lg border border-border bg-card p-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-display font-bold">{t('orders.orderNumber')}{order.id}</span>
                      <span className="ml-3 text-sm text-muted-foreground">{order.date}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${bg} ${color}`}>
                      <Icon className="h-3.5 w-3.5" />
                      {t(`orders.${order.status}`)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order.items.map(item => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <img src={item.product.image} alt="" className="h-10 w-10 rounded object-cover" />
                        <span className="flex-1 text-sm">{lang === 'rw' ? item.product.nameRw : item.product.name} x{item.quantity}</span>
                        <span className="text-sm font-medium">{(item.product.price * item.quantity).toLocaleString()} RWF</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-sm text-muted-foreground">{order.deliveryType === 'delivery' ? `📍 ${order.address}` : '🏪 Pickup'} • {order.paymentMethod}</span>
                    <span className="font-display font-bold text-primary">{order.total.toLocaleString()} RWF</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage;
