import React from 'react';

interface AppLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onNavigate?: (href: string) => void;
  onClick?: () => void;
  id?: string;
  ariaCurrent?: 'page' | undefined;
}

export const AppLink: React.FC<AppLinkProps> = ({
  href,
  className,
  children,
  onNavigate,
  onClick,
  id,
  ariaCurrent,
}) => {
  const isAppRoute = href.startsWith('/') && !href.startsWith('//');

  return (
    <a
      href={href}
      id={id}
      className={className}
      aria-current={ariaCurrent}
      onClick={(event) => {
        onClick?.();
        if (!isAppRoute || !onNavigate) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
          return;
        }
        event.preventDefault();
        onNavigate(href);
      }}
    >
      {children}
    </a>
  );
};
