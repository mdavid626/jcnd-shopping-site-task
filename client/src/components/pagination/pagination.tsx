import classnames from 'classnames';
import React from 'react';
import { PageInfo } from '../../types/page-info';
import './pagination.css';

const Pagination: React.FC<{
  pageInfo?: PageInfo;
  goNext: () => void;
  goPrevious: () => void;
  className?: string;
}> = ({ pageInfo, goNext, goPrevious, className }) => {
  const goPreviousEnabled = pageInfo && pageInfo.page > 0;
  const goNextEnabled = pageInfo && pageInfo.page < pageInfo.numberOfPages - 1;
  return (
    <div
      className={classnames('Pagination', className)}
      data-testid="Pagination"
    >
      <div
        onClick={() => goPreviousEnabled && goPrevious()}
        className={classnames('Pagination-arrow', {
          'Pagination-arrow--enabled': goPreviousEnabled,
        })}
        title="Go to previous page"
      >
        «
      </div>
      <div
        onClick={() => goNextEnabled && goNext()}
        className={classnames('Pagination-arrow', {
          'Pagination-arrow--enabled': goNextEnabled,
        })}
        title="Go to next page"
      >
        »
      </div>
    </div>
  );
};

export default Pagination;
