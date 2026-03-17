import {Link, useLoaderData} from '@remix-run/react';
import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node';

// Minimalist gold jewelry - no stones, no pearls, just pure gold
const MOCK_PRODUCTS = [
  {
    id: 'snake-chain-necklace',
    name: 'Snake Chain Necklace',
    price: '$185',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
    category: 'Necklaces',
  },
  {
    id: 'herringbone-chain',
    name: 'Herringbone Chain',
    price: '$225',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80',
    category: 'Necklaces',
  },
  {
    id: 'layered-chains',
    name: 'Layered Chain Set',
    price: '$265',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80',
    category: 'Necklaces',
  },
  {
    id: 'stackable-rings',
    name: 'Minimalist Ring Set',
    price: '$145',
    image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600&q=80',
    category: 'Rings',
  },
  {
    id: 'thin-band-ring',
    name: 'Thin Band Ring',
    price: '$85',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
    category: 'Rings',
  },
  {
    id: 'chain-link-ring',
    name: 'Chain Link Ring',
    price: '$125',
    image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80',
    category: 'Rings',
  },
  {
    id: 'gold-hoops',
    name: 'Classic Gold Hoops',
    price: '$125',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80',
    category: 'Earrings',
  },
  {
    id: 'twisted-hoops',
    name: 'Twisted Gold Hoops',
    price: '$155',
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&q=80',
    category: 'Earrings',
  },
  {
    id: 'chain-bracelet',
    name: 'Delicate Chain Bracelet',
    price: '$95',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
    category: 'Bracelets',
  },
  {
    id: 'cuff-bracelet',
    name: 'Gold Cuff Bracelet',
    price: '$175',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80',
    category: 'Bracelets',
  },
];

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `${data?.collectionTitle || 'Collection'} | Luna Jewelry`}];
};

export async function loader({params}: LoaderFunctionArgs) {
  const handle = params.handle || 'all';

  const collectionMap: Record<string, string> = {
    all: 'All Jewelry',
    necklaces: 'Necklaces',
    rings: 'Rings',
    bracelets: 'Bracelets',
    earrings: 'Earrings',
  };

  const collectionTitle = collectionMap[handle] || 'Collection';

  const products = handle === 'all'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === handle);

  return {
    handle,
    collectionTitle,
    products,
  };
}

export default function Collection() {
  const {collectionTitle, products} = useLoaderData<typeof loader>();

  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <header className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl tracking-wider text-charcoal mb-4">
            {collectionTitle}
          </h1>
          <p className="text-warm-gray font-light">
            Timeless gold pieces crafted with intention
          </p>
        </header>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-center text-warm-gray py-16">
            No products found in this collection.
          </p>
        )}
      </div>
    </div>
  );
}

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

function ProductCard({product, index}: {product: Product; index: number}) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="product-card group animate-fade-up"
      style={{animationDelay: `${index * 50}ms`}}
    >
      <div className="aspect-square overflow-hidden bg-cream mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <p className="text-xs text-warm-gray tracking-wider mb-1">{product.category}</p>
      <h3 className="font-heading text-lg text-charcoal mb-1">{product.name}</h3>
      <p className="text-sm text-charcoal">{product.price}</p>
    </Link>
  );
}
