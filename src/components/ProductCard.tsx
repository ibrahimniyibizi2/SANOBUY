import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import { Product } from '@/data/mockData';

const ProductCard = ({ product }: { product: Product }) => {
  const { lang, t } = useLanguage();
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const isWished = wishlist.includes(product.id);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg">
      {discount > 0 && (
        <span className="absolute left-3 top-3 z-10 rounded-md bg-destructive px-2 py-0.5 text-xs font-bold text-destructive-foreground">
          -{discount}% {t('products.discount')}
        </span>
      )}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute right-3 top-3 z-10 rounded-full bg-card/80 p-1.5 backdrop-blur transition hover:scale-110"
      >
        <Heart className={`h-4 w-4 ${isWished ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
      </button>
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="mb-1 line-clamp-1 font-medium transition hover:text-primary">
            {lang === 'rw' ? product.nameRw : product.name}
          </h3>
        </Link>
        <div className="mb-2 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
        </div>
        <div className="mb-3 flex items-center gap-2">
          <span className="font-display text-lg font-bold text-primary">{product.price.toLocaleString()} RWF</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          <ShoppingCart className="h-4 w-4" />
          {product.stock > 0 ? t('products.addToCart') : t('products.outOfStock')}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
