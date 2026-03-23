import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Bell, Menu, X, Search, User, Globe, LogOut, Shield } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import logo from '@/assets/sanobuy-logo.png';

const Header = () => {
  const { lang, setLang, t } = useLanguage();
  const { cartCount, unreadCount, isLoggedIn, isAdmin, user, logout } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-1 text-xs">
          <span>📞 +250 788 000 000 | 📧 info@sanobuy.rw</span>
          <button
            onClick={() => setLang(lang === 'en' ? 'rw' : 'en')}
            className="flex items-center gap-1 rounded px-2 py-0.5 transition hover:bg-primary-foreground/10"
          >
            <Globe className="h-3 w-3" />
            {lang === 'en' ? 'Kinyarwanda' : 'English'}
          </button>
        </div>
      </div>

      {/* Main nav */}
      <div className="container flex items-center justify-between gap-4 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img src={logo} alt="SANOBUY.rw" className="h-10 w-10 object-contain" />
          <span className="hidden font-display text-lg font-bold text-gradient sm:block">SANOBUY.rw</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden max-w-md flex-1 md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('nav.search')}
              className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-ring"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link to="/wishlist" className="relative rounded-lg p-2 transition hover:bg-muted">
            <Heart className="h-5 w-5" />
          </Link>
          <Link to="/notifications" className="relative rounded-lg p-2 transition hover:bg-muted">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative rounded-lg p-2 transition hover:bg-muted">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="hidden items-center gap-2 md:flex">
              {isAdmin && (
                <Link to="/admin" className="rounded-lg p-2 transition hover:bg-muted" title="Admin">
                  <Shield className="h-5 w-5 text-secondary" />
                </Link>
              )}
              <Link to="/orders" className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-muted">
                <User className="h-4 w-4" />
                {user?.name}
              </Link>
              <button onClick={logout} className="rounded-lg p-2 transition hover:bg-muted">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 md:block">
              {t('nav.login')}
            </Link>
          )}

          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 transition hover:bg-muted md:hidden">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Category nav */}
      <nav className="hidden border-t border-border md:block">
        <div className="container flex items-center gap-6 py-2 text-sm">
          <Link to="/" className="font-medium transition hover:text-primary">{t('nav.home')}</Link>
          <Link to="/products" className="transition hover:text-primary">{t('nav.products')}</Link>
          <Link to="/products?category=cement" className="transition hover:text-primary">{t('cat.cement')}</Link>
          <Link to="/products?category=tools" className="transition hover:text-primary">{t('cat.tools')}</Link>
          <Link to="/products?category=safety" className="transition hover:text-primary">{t('cat.safety')}</Link>
          <Link to="/products?category=electrical" className="transition hover:text-primary">{t('cat.electrical')}</Link>
          <Link to="/products?category=plumbing" className="transition hover:text-primary">{t('cat.plumbing')}</Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute left-0 top-full w-full border-b border-border bg-card p-4 shadow-lg md:hidden animate-slide-in">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('nav.search')}
                className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm outline-none"
              />
            </div>
          </form>
          <div className="flex flex-col gap-2">
            <Link to="/" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 transition hover:bg-muted">{t('nav.home')}</Link>
            <Link to="/products" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 transition hover:bg-muted">{t('nav.products')}</Link>
            <Link to="/orders" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 transition hover:bg-muted">{t('nav.orders')}</Link>
            <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 transition hover:bg-muted">{t('nav.wishlist')}</Link>
            {isAdmin && <Link to="/admin" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-secondary transition hover:bg-muted">{t('nav.admin')}</Link>}
            {isLoggedIn ? (
              <button onClick={() => { logout(); setMobileOpen(false); }} className="rounded-lg px-3 py-2 text-left text-destructive transition hover:bg-muted">{t('nav.logout')}</button>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="rounded-lg bg-primary px-3 py-2 text-center text-primary-foreground">{t('nav.login')}</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
