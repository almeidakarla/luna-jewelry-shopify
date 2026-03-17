import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import {Layout} from '~/components/Layout';
import {shopifyFetch, MENU_QUERY, type MenuResponse, type MenuItem} from '~/lib/shopify';
import './styles/tailwind.css';

export async function loader() {
  try {
    const [headerData, footerData] = await Promise.all([
      shopifyFetch<MenuResponse>(MENU_QUERY, {handle: 'main-menu'}),
      shopifyFetch<MenuResponse>(MENU_QUERY, {handle: 'footer'}),
    ]);

    return {
      headerMenu: headerData.menu?.items || [],
      footerMenu: footerData.menu?.items || [],
    };
  } catch (error) {
    console.error('Failed to fetch menus:', error);
    return {
      headerMenu: [],
      footerMenu: [],
    };
  }
}

export default function App() {
  const {headerMenu, footerMenu} = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
