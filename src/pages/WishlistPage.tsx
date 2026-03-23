import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import { mockProducts } from '@/data/mockData';

const WishlistPage = () => {
  const { t } = useLanguage();
  const { wishlist } = useStore();
  const products = mockProducts.filter(p => wishlist.includes(p.id));

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="mb-6 font-display text-2xl font-bold">{t('wishlist.title')}</h1>
        {products.length === 0 ? (
          <div className="flex flex-col items-center py-20">
            <Heart className="mb-4 h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">{t('wishlist.empty')}</p>
            <Link to="/products" className="mt-4 rounded-lg bg-primary px-6 py-2 text-primary-foreground">{t('hero.cta')}</Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;
