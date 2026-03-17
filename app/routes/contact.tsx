import {redirect} from '@remix-run/node';

// Redirect /contact to /pages/contact
export function loader() {
  return redirect('/pages/contact');
}
