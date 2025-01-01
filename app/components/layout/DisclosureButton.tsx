import { Link } from 'react-router-dom';
import { forwardRef } from 'react';

interface DisclosureButtonProps {
  href: string;
  className?: string;
  'aria-current'?: 'page' | undefined;
  children: React.ReactNode;
}

export const DisclosureButton = forwardRef<HTMLAnchorElement, DisclosureButtonProps>(
  ({ href, className, children, ...props }, ref) => {
    return (
      <Link
        to={href}
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

DisclosureButton.displayName = 'DisclosureButton';