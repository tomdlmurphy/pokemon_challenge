import React, {useState} from 'react';

const Pager: React.FC = () => {
  const [activePage, setActivePage] = useState(1);

  return (
    <div className="pagination">
      <button className="page-btn wide">← Prev</button>
      {[1, 2, 3, 4].map((page) => (
        <button
          key={page}
          className={`page-btn${activePage === page ? ' active' : ''}`}
          onClick={() => setActivePage(page)}
        >
          {page}
        </button>
      ))}
      <span style={{color: 'var(--text-muted)', fontSize: '.8rem'}}>…</span>
      <button className="page-btn">25</button>
      <button className="page-btn wide">Next →</button>
    </div>
  );
};

export default Pager;
