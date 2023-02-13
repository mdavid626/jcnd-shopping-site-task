import classnames from 'classnames';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={classnames('Sidebar', className)}>
      <div className="Sidebar-links">
        <Link to="/vegetables">Vegetables</Link>
        <Link to="/fruits">Fruits</Link>
        <Link to="/cheese">Cheese</Link>
      </div>
      <div className="Sidebar-content">{children}</div>
    </div>
  );
};

export default Sidebar;
