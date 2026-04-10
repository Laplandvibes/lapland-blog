// Top navigation for the admin. Dark navy + pink to match the public site.

import { Link, useLocation } from 'react-router-dom';
import { LogOut, PenLine, LayoutDashboard, ExternalLink } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function AdminNav() {
  const { user, signOut } = useAuth();
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-night/95 backdrop-blur border-b border-purple/25">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink animate-pulse" />
            <span className="font-display text-lg text-snow tracking-tight">
              Lapland.blog <span className="text-pink">admin</span>
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <Link
              to="/admin"
              className={`inline-flex items-center gap-1.5 transition-colors ${
                pathname === '/admin'
                  ? 'text-pink'
                  : 'text-slate-300 hover:text-snow'
              }`}
            >
              <LayoutDashboard size={14} />
              Dashboard
            </Link>
            <Link
              to="/admin/posts/new"
              className={`inline-flex items-center gap-1.5 transition-colors ${
                pathname === '/admin/posts/new'
                  ? 'text-pink'
                  : 'text-slate-300 hover:text-snow'
              }`}
            >
              <PenLine size={14} />
              New post
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-aurora-blue transition-colors"
            >
              <ExternalLink size={14} />
              View site
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-xs text-slate-400">
            {user?.email}
          </span>
          <button
            type="button"
            onClick={() => {
              void signOut();
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-pink transition-colors"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
