import React, {useEffect, useState} from 'react';
import {buildPager} from '@coveo/headless';
import {useEngine} from '../common/engineContext';

const Pager: React.FC = () => {
  const engine = useEngine();
  const [controller] = useState(() => buildPager(engine));
  const [pagerState, setPagerState] = useState(controller.state);

  useEffect(() => {
    const unsubscribe = controller.subscribe(() => {
      setPagerState(controller.state);
    });
    return unsubscribe;
  }, [controller]);

    if (pagerState.currentPages.length === 0) {
        return null;
    }

  return (
    <div className="pagination">
      <button
        className="page-btn wide"
        onClick={() => controller.previousPage()}
        disabled={!pagerState.hasPreviousPage}
      >
        ← Prev
      </button>

      {pagerState.currentPages.map((page) => (
        <button
          key={page}
          className={`page-btn${pagerState.currentPage === page ? ' active' : ''}`}
          onClick={() => controller.selectPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="page-btn wide"
        onClick={() => controller.nextPage()}
        disabled={!pagerState.hasNextPage}
      >
        Next →
      </button>
    </div>
  );
};

export default Pager;
