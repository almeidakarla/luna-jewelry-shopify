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
        {/* Newsletter Section */}
        <div className="border-b border-cream/10 pb-12 mb-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-heading text-2xl tracking-wider text-cream mb-3">Join Our World</h3>
            <p className="text-sm text-cream/60 mb-6">
              Be the first to discover new collections and exclusive offers
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold"
              />
              <button type="submit" className="px-8 py-3 bg-gold text-charcoal font-body text-sm tracking-wider hover:bg-gold-light transition-colors">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-heading text-3xl tracking-widest text-cream mb-4">LUNA</h3>
            <p className="text-sm leading-relaxed text-cream/70 max-w-sm">
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

          <div>
            <h4 className="footer-heading">Contact</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>hello@lunajewelry.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-gold transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-gold transition-colors" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-gold transition-colors" aria-label="Pinterest">
                <PinterestIcon />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-gold transition-colors" aria-label="TikTok">
                <TikTokIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Cards & Copyright */}
        <div className="border-t border-cream/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <p className="text-xs text-cream/50">
                &copy; {new Date().getFullYear()} Luna Jewelry. All rights reserved.
              </p>
              <Link to="/privacy" className="text-xs text-cream/50 hover:text-gold transition-colors">
                Your Privacy Choices
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <PaymentAmex />
              <PaymentElo />
              <PaymentHiper />
              <PaymentHipercard />
              <PaymentMastercard />
              <PaymentVisa />
            </div>
          </div>
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

// Social Media Icons
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}

// Payment Card Icons
function PaymentAmex() {
  return (
    <div className="w-10 h-6 bg-[#006FCF] rounded flex items-center justify-center">
      <span className="text-white text-[8px] font-bold">AMEX</span>
    </div>
  );
}

function PaymentElo() {
  return (
    <div className="w-10 h-6 bg-black rounded flex items-center justify-center">
      <span className="text-yellow-400 text-[8px] font-bold">elo</span>
    </div>
  );
}

function PaymentHiper() {
  return (
    <div className="w-10 h-6 bg-white rounded flex items-center justify-center border border-gray-200">
      <span className="text-orange-500 text-[7px] font-bold">Hiper</span>
    </div>
  );
}

function PaymentHipercard() {
  return (
    <div className="w-10 h-6 bg-[#822124] rounded flex items-center justify-center">
      <span className="text-white text-[6px] font-bold">Hipercard</span>
    </div>
  );
}

function PaymentMastercard() {
  return (
    <div className="w-10 h-6 bg-white rounded flex items-center justify-center border border-gray-200">
      <div className="flex">
        <div className="w-3 h-3 bg-red-500 rounded-full" />
        <div className="w-3 h-3 bg-yellow-500 rounded-full -ml-1.5" />
      </div>
    </div>
  );
}

function PaymentVisa() {
  return (
    <div className="w-10 h-6 bg-white rounded flex items-center justify-center border border-gray-200">
      <span className="text-[#1A1F71] text-[9px] font-bold italic">VISA</span>
    </div>
  );
}
