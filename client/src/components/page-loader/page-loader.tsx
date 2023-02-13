import React, { ReactElement } from 'react';
import Spinner from '../../assets/spinner.svg';
import './page-loader.css';

const PageLoader: React.FC<{
  isLoading?: boolean;
  errorMessage?: string;
  children: () => ReactElement | null;
}> = ({ isLoading, errorMessage, children }) => {
  if (errorMessage) {
    return <div className="PageLoader-errorMessage">{errorMessage}</div>;
  }
  if (isLoading) {
    return (
      <img
        src={Spinner}
        className="PageLoader-spinner"
        alt="loading spinner"
        data-testid="PageLoader-spinner"
      />
    );
  }
  return children();
};

export default PageLoader;
