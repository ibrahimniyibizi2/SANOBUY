import { useState } from 'react';
import { BarChart3, Package, ShoppingCart, Users, Plus, Pencil, Trash2, TrendingUp } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import { mockProducts } from '@/data/mockData';

const AdminPage = () => {
  const { t } = useLanguage();
  const { orders } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: t('admin.totalSales'), value: '2,450,000 RWF', icon: TrendingUp, change: '+12%' },
    { label: t('admin.totalOrders'), value: orders.length.toString(), icon: ShoppingCart, change: '+8%' },
    { label: t('admin.totalProducts'), value: mockProducts.length.toString(), icon: Package, change: '+3' },
    { label: t('admin.totalCustomers'), value: '156', icon: Users, change: '+24' },
  ];

  const tabs = [
    { id: 'dashboard', label: t('admin.dashboard'), icon: BarChart3 },
    { id: 'products', label: t('admin.products'), icon: Package },
    { id: 'orders', label: t('admin.orders'), icon: ShoppingCart },
  ];

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="mb-6 font-display text-2xl font-bold">{t('nav.admin')}</h1>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'}`}
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(stat => (
                <div key={stat.label} className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="mt-2 font-display text-2xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-xs text-success">{stat.change} this month</p>
                </div>
              ))}
            </div>
            {/* Simple chart placeholder */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-display font-semibold">{t('admin.analytics')}</h3>
              <div className="flex h-48 items-end gap-2">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div className="w-full rounded-t bg-primary/80 transition-all hover:bg-primary" style={{ height: `${h}%` }} />
                    <span className="text-[10px] text-muted-foreground">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Management */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{mockProducts.length} products</span>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                <Plus className="h-4 w-4" /> {t('admin.addProduct')}
              </button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Product</th>
                    <th className="px-4 py-3 text-left font-medium">Category</th>
                    <th className="px-4 py-3 text-left font-medium">Price</th>
                    <th className="px-4 py-3 text-left font-medium">Stock</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProducts.map(product => (
                    <tr key={product.id} className="border-b border-border transition hover:bg-muted/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt="" className="h-8 w-8 rounded object-cover" />
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 capitalize text-muted-foreground">{product.category}</td>
                      <td className="px-4 py-3">{product.price.toLocaleString()} RWF</td>
                      <td className="px-4 py-3">
                        <span className={product.stock < 10 ? 'text-destructive font-medium' : ''}>{product.stock}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="rounded p-1.5 transition hover:bg-muted"><Pencil className="h-3.5 w-3.5" /></button>
                          <button className="rounded p-1.5 text-destructive transition hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="rounded-lg border border-border bg-card p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-display font-bold">{order.id}</span>
                    <span className="ml-3 text-sm text-muted-foreground">{order.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <select defaultValue={order.status} className="rounded border border-input bg-background px-2 py-1 text-xs">
                      <option value="pending">Pending</option>
                      <option value="delivering">Delivering</option>
                      <option value="completed">Completed</option>
                    </select>
                    <span className="font-medium text-primary">{order.total.toLocaleString()} RWF</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{order.items.length} {t('orders.items')} • {order.paymentMethod} • {order.deliveryType}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminPage;
