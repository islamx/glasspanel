import React from 'react';
import styles from './NavLink.module.scss';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, active }) => (
  <a
    href={href}
    className={`${styles.link}${active ? ' ' + styles.active : ''}`}
  >
    {children}
  </a>
);

export default NavLink; 