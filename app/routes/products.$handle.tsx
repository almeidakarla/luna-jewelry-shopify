import {Link, useLoaderData} from '@remix-run/react';
import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node';
import {useState} from 'react';

// Minimalist gold jewelry products
const PRODUCTS: Record<string, Product> = {
  'snake-chain-necklace': {
    id: 'snake-chain-necklace',
    name: 'Snake Chain Necklace',
    price: 185,
    description: 'A sleek, fluid snake chain that drapes elegantly around the neck. This timeless piece catches light beautifully with its smooth, rounded links.',
    details: ['18k Gold Plated', '16" length with 2" extender', 'Lobster clasp closure', 'Tarnish resistant'],
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80',
    ],
    category: 'Necklaces',
  },
  'herringbone-chain': {
    id: 'herringbone-chain',
    name: 'Herringbone Chain',
    price: 225,
    description: 'The classic herringbone pattern creates a stunning flat chain that lies perfectly against the skin. A statement piece with understated elegance.',
    details: ['14k Gold Filled', '18" length', 'Flat lay design', 'Handcrafted finish'],
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80',
    ],
    category: 'Necklaces',
  },
  'layered-chains': {
    id: 'layered-chains',
    name: 'Layered Chain Set',
    price: 265,
    description: 'Three delicate chains designed to be worn together or separately. The perfect set for creating your own layered look.',
    details: ['18k Gold Plated', '14", 16", 18" lengths', 'Set of 3 chains', 'Mix and match styling'],
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80',
    ],
    category: 'Necklaces',
  },
  'stackable-rings': {
    id: 'stackable-rings',
    name: 'Minimalist Ring Set',
    price: 145,
    description: 'A curated set of thin, stackable rings designed to be mixed and matched. Wear one for understated elegance or stack all for a bolder statement.',
    details: ['14k Gold Filled', 'Set of 3 rings', 'Sizes 5-9 available', 'Comfort fit design'],
    images: [
      'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    ],
    category: 'Rings',
  },
  'thin-band-ring': {
    id: 'thin-band-ring',
    name: 'Thin Band Ring',
    price: 85,
    description: 'The essence of minimalism. A delicate thin band that adds a subtle touch of gold to any finger.',
    details: ['14k Gold Filled', 'Sizes 5-9 available', '1mm band width', 'Hypoallergenic'],
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
      'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80',
    ],
    category: 'Rings',
  },
  'chain-link-ring': {
    id: 'chain-link-ring',
    name: 'Chain Link Ring',
    price: 125,
    description: 'A modern take on the classic chain, reimagined as a sculptural ring. Each link is carefully crafted for a fluid, comfortable fit.',
    details: ['18k Gold Plated', 'Sizes 5-9 available', 'Flexible chain design', 'Statement piece'],
    images: [
      'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    ],
    category: 'Rings',
  },
  'gold-hoops': {
    id: 'gold-hoops',
    name: 'Classic Gold Hoops',
    price: 125,
    description: 'Timeless gold hoops with a modern, lightweight construction. The perfect everyday earring that transitions seamlessly from day to night.',
    details: ['14k Gold Filled', '25mm diameter', 'Hinged closure', 'Lightweight design'],
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80',
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&q=80',
    ],
    category: 'Earrings',
  },
  'twisted-hoops': {
    id: 'twisted-hoops',
    name: 'Twisted Gold Hoops',
    price: 155,
    description: 'Sculptural twisted hoops that catch the light from every angle. A modern interpretation of a classic silhouette.',
    details: ['18k Gold Plated', '30mm diameter', 'Hinged closure', 'Textured finish'],
    images: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80',
    ],
    category: 'Earrings',
  },
  'chain-bracelet': {
    id: 'chain-bracelet',
    name: 'Delicate Chain Bracelet',
    price: 95,
    description: 'A whisper-thin chain bracelet that adds a delicate touch of gold to the wrist. Perfect for layering or wearing alone.',
    details: ['14k Gold Filled', '7" length with extender', 'Lobster clasp', 'Adjustable fit'],
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80',
    ],
    category: 'Bracelets',
  },
  'cuff-bracelet': {
    id: 'cuff-bracelet',
    name: 'Gold Cuff Bracelet',
    price: 175,
    description: 'A sculptural open cuff that wraps elegantly around the wrist. Adjustable for the perfect fit.',
    details: ['18k Gold Plated', 'One size fits most', 'Open cuff design', 'Adjustable'],
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    ],
    category: 'Bracelets',
  },
};

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  images: string[];
  category: string;
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `${data?.product?.name || 'Product'} | Luna Jewelry`}];
};

export async function loader({params}: LoaderFunctionArgs) {
  const handle = params.handle || '';
  const product = PRODUCTS[handle];

  if (!product) {
    throw new Response('Product not found', {status: 404});
  }

  return {product};
}

export default function ProductPage() {
  const {product} = useLoaderData<typeof loader>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-warm-gray mb-8">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/collections/all" className="hover:text-charcoal transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden bg-cream">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover animate-fade-up"
              />
            </div>
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-gold' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-fade-up" style={{animationDelay: '100ms'}}>
            <p className="text-sm text-warm-gray tracking-wider mb-2">{product.category}</p>
            <h1 className="font-heading text-4xl text-charcoal mb-4">{product.name}</h1>
            <p className="text-2xl text-charcoal mb-6">${product.price}</p>

            <p className="text-warm-gray leading-relaxed mb-8">{product.description}</p>

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-sm tracking-wider text-charcoal block mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-charcoal/20 flex items-center justify-center hover:border-charcoal transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-charcoal/20 flex items-center justify-center hover:border-charcoal transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full py-4 bg-charcoal text-cream text-sm tracking-widest hover:bg-gold transition-colors mb-4">
              ADD TO CART — ${product.price * quantity}
            </button>

            <Link
              to="/cart"
              className="block w-full py-4 border border-charcoal text-center text-sm tracking-widest hover:bg-charcoal hover:text-cream transition-all"
            >
              BUY NOW
            </Link>

            {/* Details */}
            <div className="mt-12 pt-8 border-t border-charcoal/10">
              <h3 className="text-sm tracking-wider text-charcoal mb-4">Details</h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="text-warm-gray text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-gold rounded-full" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="mt-8 pt-8 border-t border-charcoal/10">
              <div className="flex items-center gap-3 text-sm text-warm-gray">
                <ShippingIcon />
                <span>Free shipping on orders over $150</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShippingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16,8 20,8 23,11 23,16 16,16" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}
