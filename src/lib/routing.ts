import { useEffect, useState } from 'react';

export function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function getPathname(): string {
  return normalizePath(window.location.pathname);
}

export function navigate(to: string): void {
  const url = new URL(to, window.location.origin);
  const path = normalizePath(url.pathname);
  const next = `${path}${url.search}${url.hash}`;
  const current = `${getPathname()}${window.location.search}${window.location.hash}`;

  if (next === current) {
    scrollToHashOrTop(url.hash);
    return;
  }

  window.history.pushState({}, '', next);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function scrollToHashOrTop(hash: string): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth';
  const id = hash.replace('#', '');
  if (id) {
    document.getElementById(id)?.scrollIntoView({ behavior });
    return;
  }
  window.scrollTo({ top: 0, behavior });
}

export function usePathname(): string {
  const [path, setPath] = useState(getPathname);

  useEffect(() => {
    const onPop = () => setPath(getPathname());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return path;
}
