import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/sanobuy-logo.png';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <img src={logo} alt="SANOBUY.rw" className="h-10 w-10" />
              <span className="font-display text-lg font-bold text-gradient">SANOBUY.rw</span>
            </div>
            <p className="text-sm text-muted-foreground">{t('footer.aboutText')}</p>
          </div>
          <div>
            <h3 className="mb-3 font-display font-semibold">{t('footer.quickLinks')}</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/" className="transition hover:text-primary">{t('nav.home')}</Link>
              <Link to="/products" className="transition hover:text-primary">{t('nav.products')}</Link>
              <Link to="/orders" className="transition hover:text-primary">{t('nav.orders')}</Link>
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-display font-semibold">{t('nav.categories')}</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/products?category=cement" className="transition hover:text-primary">{t('cat.cement')}</Link>
              <Link to="/products?category=tools" className="transition hover:text-primary">{t('cat.tools')}</Link>
              <Link to="/products?category=safety" className="transition hover:text-primary">{t('cat.safety')}</Link>
              <Link to="/products?category=electrical" className="transition hover:text-primary">{t('cat.electrical')}</Link>
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-display font-semibold">{t('footer.contact')}</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>📧 {t('footer.email')}</span>
              <span>📞 {t('footer.phone')}</span>
              <span>📍 Kigali, Rwanda</span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
