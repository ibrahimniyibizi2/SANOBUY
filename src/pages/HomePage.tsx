import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock, Star, ChevronRight } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockProducts, categories } from '@/data/mockData';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import banner1 from '@/assets/banner-1.jpg';
import banner2 from '@/assets/banner-2.jpg';
import promoDelivery from '@/assets/promo-delivery.jpg';
import promoNew from '@/assets/promo-new.jpg';
import adSlide1 from '@/assets/ad-slide-1.jpg';
import adSlide2 from '@/assets/ad-slide-2.jpg';
import adSlide3 from '@/assets/ad-slide-3.jpg';

const HomePage = () => {
  const { t } = useLanguage();
  const featured = mockProducts.filter(p => p.featured);

  return (
    <Layout>
      {/* Alibaba-style Hero: 3-column layout */}
      <section className="bg-muted py-4">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr_220px]">
            {/* Left: Category Sidebar */}
            <div className="hidden rounded-lg bg-card shadow-sm md:block">
              <nav className="flex flex-col py-2">
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    className="flex items-center justify-between px-4 py-2.5 text-sm transition hover:bg-accent hover:text-accent-foreground"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-lg">{cat.icon}</span>
                      <span className="font-medium">{t(`cat.${cat.id}`)}</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center: Banner Carousel */}
            <div className="overflow-hidden rounded-lg">
              <Carousel
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
                className="h-full"
              >
                <CarouselContent className="h-full">
                  {[
                    { img: banner1, title: t('hero.title'), sub: t('hero.subtitle'), link: '/products' },
                    { img: banner2, title: 'Safety Equipment', sub: 'Helmets, gloves & protective gear', link: '/products?category=safety' },
                  ].map((slide, i) => (
                    <CarouselItem key={i} className="h-full">
                      <Link to={slide.link} className="relative block h-full min-h-[280px] md:min-h-[340px]">
                        <img
                          src={slide.img}
                          alt={slide.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 z-10">
                          <h2 className="mb-1 font-display text-2xl font-bold text-white md:text-3xl drop-shadow-lg">
                            {slide.title}
                          </h2>
                          <p className="text-sm text-white/80 drop-shadow">{slide.sub}</p>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            {/* Right: Promo Cards */}
            <div className="hidden flex-col gap-4 md:flex">
              <Link
                to="/products"
                className="group relative flex-1 overflow-hidden rounded-lg"
              >
                <img src={promoDelivery} alt="Free delivery" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sm font-bold text-white drop-shadow">Free Delivery</p>
                  <p className="text-xs text-white/80">Orders over 50K RWF</p>
                </div>
              </Link>
              <Link
                to="/products"
                className="group relative flex-1 overflow-hidden rounded-lg"
              >
                <img src={promoNew} alt="New arrivals" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sm font-bold text-white drop-shadow">New Arrivals</p>
                  <p className="text-xs text-white/80">Latest tools & gear</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Ads Banner */}
      <section className="bg-muted pb-4">
        <div className="container">
          <Carousel
            opts={{ loop: true, align: 'start' }}
            plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
          >
            <CarouselContent className="-ml-3">
              {[
                { img: adSlide1, link: '/products?category=tools', alt: 'Mega Sale on Power Tools' },
                { img: adSlide2, link: '/products?category=cement', alt: 'Buy 2 Get 1 Free Cement' },
                { img: adSlide3, link: '/products?category=safety', alt: 'New Season Safety Equipment' },
              ].map((ad, i) => (
                <CarouselItem key={i} className="basis-full pl-3 md:basis-1/2 lg:basis-1/3">
                  <Link to={ad.link} className="block overflow-hidden rounded-lg">
                    <img
                      src={ad.img}
                      alt={ad.alt}
                      className="h-[140px] w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-border bg-card py-6">
        <div className="container grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: Truck, text: 'Fast Delivery', sub: 'Kigali & Beyond' },
            { icon: Shield, text: 'Quality Guaranteed', sub: '100% Authentic' },
            { icon: Clock, text: '24/7 Support', sub: 'Always Available' },
            { icon: Star, text: 'Best Prices', sub: 'Competitive Rates' },
          ].map(({ icon: Icon, text, sub }) => (
            <div key={text} className="flex items-center gap-3 text-center md:text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                <Icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">{text}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold md:text-3xl">{t('cat.title')}</h2>
            <Link to="/products" className="flex items-center gap-1 text-sm font-medium text-primary transition hover:underline">
              {t('general.viewAll')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-7">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition hover:border-primary hover:shadow-md"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs font-medium">{t(`cat.${cat.id}`)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold md:text-3xl">{t('products.title')}</h2>
            <Link to="/products" className="flex items-center gap-1 text-sm font-medium text-primary transition hover:underline">
              {t('general.viewAll')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="gradient-primary rounded-2xl p-8 text-center text-primary-foreground md:p-12">
            <h2 className="mb-4 font-display text-2xl font-bold md:text-3xl">Ready to Build?</h2>
            <p className="mb-6 opacity-90">Join thousands of builders who trust SANOBUY for quality materials.</p>
            <Link to="/register" className="inline-flex rounded-lg bg-card px-6 py-3 font-semibold text-foreground transition hover:shadow-lg">
              {t('auth.register')}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
