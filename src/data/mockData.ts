export interface Product {
  id: string;
  name: string;
  nameRw: string;
  description: string;
  descriptionRw: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  status: 'pending' | 'delivering' | 'completed';
  date: string;
  deliveryType: 'delivery' | 'pickup';
  address?: string;
  paymentMethod: string;
}

export interface Notification {
  id: string;
  message: string;
  messageRw: string;
  date: string;
  read: boolean;
}

export const categories = [
  { id: 'cement', icon: '🏗️', color: 'bg-accent' },
  { id: 'tools', icon: '🔧', color: 'bg-accent' },
  { id: 'safety', icon: '🦺', color: 'bg-accent' },
  { id: 'electrical', icon: '⚡', color: 'bg-accent' },
  { id: 'plumbing', icon: '🔩', color: 'bg-accent' },
  { id: 'bbq', icon: '🔥', color: 'bg-accent' },
  { id: 'clothing', icon: '👷', color: 'bg-accent' },
];

export const mockProducts: Product[] = [
  { id: '1', name: 'Portland Cement 50kg', nameRw: 'Sima ya Portland 50kg', description: 'High-quality Portland cement for all construction needs. Excellent for foundations, walls, and flooring.', descriptionRw: 'Sima ya Portland y\'ubwiza bwiza ku bikenewe byose byo kubaka.', price: 12500, originalPrice: 14000, category: 'cement', image: 'https://images.unsplash.com/photo-1518005068251-37900150dfca?w=400&h=400&fit=crop', stock: 250, rating: 4.8, reviews: 124, featured: true },
  { id: '2', name: 'Professional Hammer', nameRw: 'Inyundo y\'Umwuga', description: 'Heavy-duty steel hammer with ergonomic rubber grip. Perfect for professional construction work.', descriptionRw: 'Inyundo y\'icyuma ikomeye ifite agafata ka rubber.', price: 8500, category: 'tools', image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=400&fit=crop', stock: 85, rating: 4.5, reviews: 67, featured: true },
  { id: '3', name: 'Safety Helmet - Yellow', nameRw: 'Ingofero yo Kwirinda - Umuhondo', description: 'OSHA-approved safety helmet with adjustable chin strap. Essential for construction site safety.', descriptionRw: 'Ingofero yo kwirinda yemewe na OSHA.', price: 5500, category: 'safety', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop', stock: 150, rating: 4.7, reviews: 89, featured: true },
  { id: '4', name: 'Electrical Wire 100m Roll', nameRw: 'Umugozi w\'Amashanyarazi 100m', description: 'Premium copper electrical wire, 2.5mm², suitable for residential and commercial installations.', descriptionRw: 'Umugozi w\'amashanyarazi w\'umwaka mwiza.', price: 35000, originalPrice: 40000, category: 'electrical', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop', stock: 60, rating: 4.6, reviews: 45, featured: true },
  { id: '5', name: 'PVC Pipe 4 inch', nameRw: 'Ituyobo rya PVC 4 inch', description: 'Durable PVC pipe for plumbing, drainage and sewage systems.', descriptionRw: 'Ituyobo rya PVC rirambye.', price: 15000, category: 'plumbing', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=400&fit=crop', stock: 200, rating: 4.4, reviews: 32, featured: false },
  { id: '6', name: 'BBQ Grill Portable', nameRw: 'BBQ Grill Ijyanwa', description: 'Portable charcoal BBQ grill, perfect for outdoor events and construction site meals.', descriptionRw: 'BBQ grill ijyanwa ahantu hose.', price: 45000, originalPrice: 55000, category: 'bbq', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop', stock: 25, rating: 4.3, reviews: 18, featured: true },
  { id: '7', name: 'Work Boots - Steel Toe', nameRw: 'Inkweto z\'Akazi - Icyuma', description: 'Steel-toe work boots with slip-resistant soles. Waterproof and durable.', descriptionRw: 'Inkweto z\'akazi zifite icyuma ku ntoki.', price: 28000, category: 'clothing', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', stock: 40, rating: 4.6, reviews: 56, featured: true },
  { id: '8', name: 'Tape Measure 5m', nameRw: 'Metero 5m', description: 'Professional 5-meter tape measure with magnetic tip and belt clip.', descriptionRw: 'Metero y\'umwuga ya metero 5.', price: 3500, category: 'tools', image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop', stock: 120, rating: 4.2, reviews: 78, featured: false },
  { id: '9', name: 'Safety Vest - High Vis', nameRw: 'Umwambaro wo Kwirinda', description: 'High-visibility reflective safety vest. Essential for construction site workers.', descriptionRw: 'Umwambaro wo kwirinda ugaragara neza.', price: 4500, category: 'safety', image: 'https://images.unsplash.com/photo-1618517048289-82ff22e001a0?w=400&h=400&fit=crop', stock: 200, rating: 4.5, reviews: 34, featured: false },
  { id: '10', name: 'Cement Mixer Machine', nameRw: 'Imashini yo Kuvanga Sima', description: 'Electric cement mixer with 180L drum capacity. Heavy-duty motor for professional use.', descriptionRw: 'Imashini yo kuvanga sima ifite ubushobozi bwa litiro 180.', price: 450000, originalPrice: 520000, category: 'cement', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop', stock: 8, rating: 4.9, reviews: 12, featured: true },
  { id: '11', name: 'LED Bulb Pack (10)', nameRw: 'Amatara ya LED (10)', description: 'Energy-efficient LED bulbs, 12W, warm white. Pack of 10.', descriptionRw: 'Amatara ya LED akoresha ingufu nke.', price: 12000, category: 'electrical', image: 'https://images.unsplash.com/photo-1532007924-32e52e59754e?w=400&h=400&fit=crop', stock: 300, rating: 4.4, reviews: 92, featured: false },
  { id: '12', name: 'Pipe Wrench 18"', nameRw: 'Igikinisho cy\'Amazi 18"', description: 'Heavy-duty pipe wrench for plumbing work. Drop-forged steel construction.', descriptionRw: 'Igikinisho cy\'amazi gikomeye.', price: 18000, category: 'plumbing', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop', stock: 45, rating: 4.3, reviews: 23, featured: false },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    items: [
      { product: mockProducts[0], quantity: 10 },
      { product: mockProducts[2], quantity: 5 },
    ],
    total: 152500,
    deliveryFee: 5000,
    status: 'delivering',
    date: '2026-03-20',
    deliveryType: 'delivery',
    address: 'KG 123 St, Kigali',
    paymentMethod: 'Mobile Money',
  },
  {
    id: 'ORD-002',
    items: [
      { product: mockProducts[1], quantity: 2 },
    ],
    total: 17000,
    deliveryFee: 0,
    status: 'completed',
    date: '2026-03-18',
    deliveryType: 'pickup',
    paymentMethod: 'Card',
  },
];

export const mockNotifications: Notification[] = [
  { id: '1', message: 'Your order ORD-001 is out for delivery!', messageRw: 'Ibyo wasabye ORD-001 birimo koherezwa!', date: '2026-03-21', read: false },
  { id: '2', message: 'New discount on cement products - 15% OFF!', messageRw: 'Igiciro gishya kuri sima - 15% kugabanya!', date: '2026-03-20', read: false },
  { id: '3', message: 'Order ORD-002 has been completed.', messageRw: 'Ibyo wasabye ORD-002 byarangiye.', date: '2026-03-19', read: true },
];
