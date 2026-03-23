import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft, Star, Truck, Shield } from 'lucide-react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import { mockProducts } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { lang, t } = useLanguage();
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [qty, setQty] = useState(1);

  const product = mockProducts.find(p => p.id === id);
  if (!product) return <Layout><div className="container py-20 text-center">Product not found.</div></Layout>;

  const related = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const isWished = wishlist.includes(product.id);

  return (
    <Layout>
      <div className="container py-8">
        <Link to="/products" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> {t('general.back')}
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl bg-muted">
            <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
          </div>

          <div>
            <h1 className="mb-2 font-display text-2xl font-bold md:text-3xl">
              {lang === 'rw' ? product.nameRw : product.name}
            </h1>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-primary">{product.price.toLocaleString()} RWF</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">{product.originalPrice.toLocaleString()} RWF</span>
              )}
            </div>
            <p className="mb-6 text-muted-foreground">
              {lang === 'rw' ? product.descriptionRw : product.description}
            </p>
            <div className="mb-4">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${product.stock > 0 ? 'bg-accent text-accent-foreground' : 'bg-destructive/10 text-destructive'}`}>
                {product.stock > 0 ? `${t('products.inStock')} (${product.stock})` : t('products.outOfStock')}
              </span>
            </div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex items-center rounded-lg border border-input">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 transition hover:bg-muted">-</button>
                <span className="min-w-[40px] text-center font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2 transition hover:bg-muted">+</button>
              </div>
              <button
                onClick={() => addToCart(product, qty)}
                disabled={product.stock === 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
              >
                <ShoppingCart className="h-4 w-4" /> {t('products.addToCart')}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="rounded-lg border border-input p-3 transition hover:bg-muted"
              >
                <Heart className={`h-5 w-5 ${isWished ? 'fill-destructive text-destructive' : ''}`} />
              </button>
            </div>
            <div className="flex gap-4 rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2 text-sm"><Truck className="h-4 w-4 text-primary" /> Free delivery over 100,000 RWF</div>
              <div className="flex items-center gap-2 text-sm"><Shield className="h-4 w-4 text-primary" /> Quality guaranteed</div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-display text-xl font-bold">Related Products</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
