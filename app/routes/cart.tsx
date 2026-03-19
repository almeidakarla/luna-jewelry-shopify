import {Link} from '@remix-run/react';
import type {MetaFunction} from '@remix-run/node';
import {useCart} from '~/contexts/CartContext';

export const meta: MetaFunction = () => {
  return [{title: 'Shopping Cart | Luna Jewelry'}];
};

export default function Cart() {
  const {items: cartItems, updateQuantity, removeFromCart, subtotal} = useCart();

  const shipping = subtotal > 250 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-heading text-4xl tracking-wider text-charcoal mb-12 text-center">
          Your Cart
        </h1>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex gap-6 pb-6 border-b border-charcoal/10 animate-fade-up"
                >
                  <Link to={`/products/${item.handle}`} className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover"
                    />
                  </Link>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <Link
                        to={`/products/${item.handle}`}
                        className="font-heading text-lg text-charcoal hover:text-gold transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-warm-gray hover:text-charcoal transition-colors"
                        aria-label="Remove item"
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <p className="text-charcoal mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-charcoal/20 flex items-center justify-center text-sm hover:border-charcoal transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-charcoal/20 flex items-center justify-center text-sm hover:border-charcoal transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-cream p-6 border border-charcoal/10">
                <h2 className="font-heading text-xl tracking-wider text-charcoal mb-6">
                  Order Summary
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Subtotal</span>
                    <span className="text-charcoal">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Shipping</span>
                    <span className="text-charcoal">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-warm-gray">
                      Free shipping on orders over $250
                    </p>
                  )}
                  <div className="pt-4 border-t border-charcoal/10 flex justify-between font-medium">
                    <span className="text-charcoal">Total</span>
                    <span className="text-charcoal">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full mt-6 py-4 bg-charcoal text-cream text-sm tracking-widest hover:bg-gold transition-colors">
                  CHECKOUT
                </button>
                <Link
                  to="/collections/all"
                  className="block text-center mt-4 text-sm text-warm-gray hover:text-charcoal transition-colors link-underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="text-center py-16 animate-fade-up">
      <div className="mb-6">
        <CartIcon />
      </div>
      <h2 className="font-heading text-2xl text-charcoal mb-4">Your cart is empty</h2>
      <p className="text-warm-gray mb-8">
        Discover our collection of handcrafted jewelry
      </p>
      <Link
        to="/collections/all"
        className="inline-block border border-charcoal px-10 py-4 text-sm tracking-widest hover:bg-charcoal hover:text-cream transition-all"
      >
        SHOP NOW
      </Link>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto text-warm-gray">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
