import { Bell, Check } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';

const NotificationsPage = () => {
  const { t, lang } = useLanguage();
  const { notifications, markNotificationRead } = useStore();

  return (
    <Layout>
      <div className="container max-w-2xl py-8">
        <h1 className="mb-6 font-display text-2xl font-bold">{t('notif.title')}</h1>
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center py-20">
            <Bell className="mb-4 h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">{t('notif.empty')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(n => (
              <div
                key={n.id}
                className={`flex items-start gap-3 rounded-lg border p-4 transition ${n.read ? 'border-border bg-card' : 'border-primary/20 bg-accent'}`}
              >
                <div className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-muted-foreground' : 'bg-primary'}`} />
                <div className="flex-1">
                  <p className="text-sm">{lang === 'rw' ? n.messageRw : n.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.date}</p>
                </div>
                {!n.read && (
                  <button onClick={() => markNotificationRead(n.id)} className="rounded p-1 text-muted-foreground transition hover:bg-muted">
                    <Check className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NotificationsPage;
