// Gate for the /me area: spinner while the session loads, sign-in page (in
// the reader's language) when signed out. No text in the spinner on purpose:
// it shows for a fraction of a second and would need 12 translations.

import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLocalePath } from '../../i18n/useLang';

interface Props {
  children: ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const { loading, user } = useAuth();
  const location = useLocation();
  const to = useLocalePath();

  if (loading) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center" role="status" aria-busy="true">
        <div className="w-7 h-7 border-2 border-pink border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Local layout check only: `npm run dev` + ?esikatselu shows the signed-in
  // pages without an account (nothing can be saved: there is no session).
  // import.meta.env.DEV is false in every production build, so this branch
  // is removed from the bundle.
  if (!user && import.meta.env.DEV && new URLSearchParams(location.search).has('esikatselu')) {
    return <>{children}</>;
  }

  if (!user) {
    return <Navigate to={to('/signin')} replace state={{ from: location.pathname + location.search }} />;
  }

  return <>{children}</>;
}
