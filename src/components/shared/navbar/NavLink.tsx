import React from 'react';
import styles from './NavLink.module.scss';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, active, className }) => (
  <a
    href={href}
    className={[
      styles.link,
      active ? styles.active : '',
      className || ''
    ].filter(Boolean).join(' ')}
  >
    {children}
  </a>
);

export default NavLink; 