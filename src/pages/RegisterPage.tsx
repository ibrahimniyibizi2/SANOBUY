import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import logo from '@/assets/sanobuy-logo.png';

const RegisterPage = () => {
  const { t } = useLanguage();
  const { register } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) return;
    register(form.name, form.email, form.password);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center">
          <img src={logo} alt="SANOBUY" className="mb-3 h-16 w-16" />
          <h1 className="font-display text-2xl font-bold">{t('auth.createAccount')}</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder={t('auth.name')} value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
          <input required type="email" placeholder={t('auth.email')} value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
          <input required type="password" placeholder={t('auth.password')} value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
          <input required type="password" placeholder={t('auth.confirmPassword')} value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
          <button type="submit" className="w-full rounded-lg bg-primary py-2.5 font-medium text-primary-foreground transition hover:opacity-90">{t('auth.register')}</button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {t('auth.hasAccount')} <Link to="/login" className="font-medium text-primary hover:underline">{t('auth.login')}</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
