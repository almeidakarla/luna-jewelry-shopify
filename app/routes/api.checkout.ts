import type {ActionFunctionArgs} from '@remix-run/node';
import {json, redirect} from '@remix-run/node';
import {createShopifyCart, type CartLineInput} from '~/lib/shopify';

export async function action({request}: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return json({error: 'Method not allowed'}, {status: 405});
  }

  try {
    const body = await request.json();
    const {items} = body as {items: Array<{variantId: string; quantity: number}>};

    if (!items || items.length === 0) {
      return json({error: 'Cart is empty'}, {status: 400});
    }

    // Convert to Shopify cart line format
    const lines: CartLineInput[] = items.map(item => ({
      merchandiseId: item.variantId,
      quantity: item.quantity,
    }));

    // Create Shopify cart and get checkout URL
    const checkoutUrl = await createShopifyCart(lines);

    return json({checkoutUrl});
  } catch (error) {
    console.error('Checkout error:', error);
    return json(
      {error: error instanceof Error ? error.message : 'Failed to create checkout'},
      {status: 500}
    );
  }
}
