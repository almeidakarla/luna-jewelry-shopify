import {Link} from '@remix-run/react';
import type {ReactNode} from 'react';
import {shopifyUrlToPath, type MenuItem} from '~/lib/shopify';

interface LayoutProps {
  children: ReactNode;
  headerMenu: MenuItem[];
  footerMenu: MenuItem[];
}

// Default menu items as fallback
const defaultHeaderMenu = [
  {id: '1', title: 'Shop', url: '/collections/all', items: []},
  {id: '2', title: 'Necklaces', url: '/collections/necklaces', items: []},
  {id: '3', title: 'Earrings', url: '/collections/earrings', items: []},
  {id: '4', title: 'Rings', url: '/collections/rings', items: []},
  {id: '5', title: 'Bracelets', url: '/collections/bracelets', items: []},
];

const defaultFooterShopMenu = [
  {id: '1', title: 'All Jewelry', url: '/collections/all', items: []},
  {id: '2', title: 'Necklaces', url: '/collections/necklaces', items: []},
  {id: '3', title: 'Earrings', url: '/collections/earrings', items: []},
  {id: '4', title: 'Rings', url: '/collections/rings', items: []},
  {id: '5', title: 'Bracelets', url: '/collections/bracelets', items: []},
];

export function Layout({children, headerMenu, footerMenu}: LayoutProps) {
  const navItems = headerMenu.length > 0 ? headerMenu : defaultHeaderMenu;
  const footerItems = footerMenu.length > 0 ? footerMenu : defaultFooterShopMenu;

  return (
    <div className="min-h-screen flex flex-col">
      <Header menuItems={navItems} />
      <main className="flex-1">{children}</main>
      <Footer menuItems={footerItems} />
    </div>
  );
}

function Header({menuItems}: {menuItems: MenuItem[]}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-gold/10">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-heading text-2xl tracking-widest text-charcoal">
          LUNA
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {menuItems.map((item) => (
            <NavLink key={item.id} to={shopifyUrlToPath(item.url)}>
              {item.title}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Link to="/search" aria-label="Search" className="text-charcoal hover:text-gold transition-colors">
            <SearchIcon />
          </Link>
          <Link to="/cart" aria-label="Cart" className="text-charcoal hover:text-gold transition-colors">
            <CartIcon />
          </Link>
        </div>
      </nav>
    </header>
  );
}

function NavLink({to, children}: {to: string; children: ReactNode}) {
  return (
    <Link
      to={to}
      className="link-underline text-sm font-body tracking-wider text-warm-gray hover:text-charcoal transition-colors"
    >
      {children}
    </Link>
  );
}

function Footer({menuItems}: {menuItems: MenuItem[]}) {
  return (
    <footer className="bg-charcoal text-cream/80 py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="font-heading text-3xl tracking-widest text-cream mb-4">LUNA</h3>
            <p className="text-sm leading-relaxed max-w-sm">
              Timeless elegance crafted with intention. Each piece tells a story of refined beauty and modern sophistication.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-body tracking-wider mb-4 text-cream">Shop</h4>
            <ul className="space-y-2 text-sm">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link to={shopifyUrlToPath(item.url)} className="hover:text-gold transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-body tracking-wider mb-4 text-cream">Info</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-gold transition-colors">Our Story</Link></li>
              <li><Link to="/care" className="hover:text-gold transition-colors">Jewelry Care</Link></li>
              <li><Link to="/shipping" className="hover:text-gold transition-colors">Shipping</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 text-center text-xs text-cream/50">
          <p>&copy; {new Date().getFullYear()} Luna Jewelry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
