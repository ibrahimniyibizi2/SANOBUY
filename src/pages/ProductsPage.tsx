import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockProducts, categories } from '@/data/mockData';

const ProductsPage = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);
  const [sortBy, setSortBy] = useState('');

  const filtered = useMemo(() => {
    let result = mockProducts;
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.nameRw.toLowerCase().includes(q));
    }
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="mb-6 font-display text-2xl font-bold md:text-3xl">{t('products.all')}</h1>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setSelectedCategory('')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${!selectedCategory ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${selectedCategory === cat.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'}`}
            >
              {cat.icon} {t(`cat.${cat.id}`)}
            </button>
          ))}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="ml-auto rounded-lg border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {searchQuery && (
          <p className="mb-4 text-sm text-muted-foreground">
            Results for "<span className="font-medium text-foreground">{searchQuery}</span>" ({filtered.length})
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">No products found.</div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
