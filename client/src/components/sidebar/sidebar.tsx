import classnames from 'classnames';
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

const links: { title: string; path: string }[] = [
  { title: 'Vegetables', path: '/vegetables' },
  { title: 'Fruits', path: '/fruits' },
  { title: 'Cheese', path: '/cheese' },
];

const Sidebar: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const location = useLocation();
  return (
    <div className={classnames('Sidebar', className)}>
      <div className="Sidebar-links">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={classnames('Sidebar-link', {
              'Sidebar-link--selected': link.path === location.pathname,
            })}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="Sidebar-content">{children}</div>
    </div>
  );
};

export default Sidebar;
