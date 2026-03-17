import {Link, useNavigate} from '@remix-run/react';
import {useState, type ReactNode} from 'react';
import {shopifyUrlToPath, type MenuItem} from '~/lib/shopify';

interface LayoutProps {
  children: ReactNode;
  headerMenu: MenuItem[];
  footerMenu: MenuItem[];
}

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="nav-header">
      <nav className="nav-container">
        <Link to="/" className="nav-logo">LUNA</Link>

        {searchOpen ? (
          <form onSubmit={handleSearch} className="flex-1 mx-8 flex items-center gap-4">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for jewelry..."
              autoFocus
              className="input-search"
            />
            <button
              type="button"
              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
              className="nav-icon"
              aria-label="Close search"
            >
              <CloseIcon />
            </button>
          </form>
        ) : (
          <div className="nav-menu">
            {menuItems.map((item) => (
              <Link key={item.id} to={shopifyUrlToPath(item.url)} className="nav-link">
                {item.title}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center gap-6">
          {!searchOpen && (
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="nav-icon">
              <SearchIcon />
            </button>
          )}
          <Link to="/cart" aria-label="Cart" className="nav-icon">
            <CartIcon />
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Footer({menuItems}: {menuItems: MenuItem[]}) {
  return (
    <footer className="footer">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="font-heading text-3xl tracking-widest text-cream mb-4">LUNA</h3>
            <p className="text-sm leading-relaxed max-w-sm">
              Timeless elegance crafted with intention. Each piece tells a story of refined beauty and modern sophistication.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Shop</h4>
            <ul className="space-y-2 text-sm">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link to={shopifyUrlToPath(item.url)} className="footer-link">{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Info</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="footer-link">Our Story</Link></li>
              <li><Link to="/care" className="footer-link">Jewelry Care</Link></li>
              <li><Link to="/shipping" className="footer-link">Shipping</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
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

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
