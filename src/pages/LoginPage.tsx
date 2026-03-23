import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import logo from '@/assets/sanobuy-logo.png';

const LoginPage = () => {
  const { t } = useLanguage();
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center">
          <img src={logo} alt="SANOBUY" className="mb-3 h-16 w-16" />
          <h1 className="font-display text-2xl font-bold">{t('auth.welcome')}</h1>
          <p className="text-sm text-muted-foreground">Sign in to SANOBUY.rw</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required type="email" placeholder={t('auth.email')} value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
          <input required type="password" placeholder={t('auth.password')} value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
          <button type="submit" className="w-full rounded-lg bg-primary py-2.5 font-medium text-primary-foreground transition hover:opacity-90">{t('auth.login')}</button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {t('auth.noAccount')} <Link to="/register" className="font-medium text-primary hover:underline">{t('auth.register')}</Link>
        </p>
        <p className="mt-2 text-center text-xs text-muted-foreground">Demo: use admin@sanobuy.rw for admin access</p>
      </div>
    </div>
  );
};

export default LoginPage;
