import React, {useEffect, useState} from 'react';
import {buildSort, buildRelevanceSortCriterion, buildDateSortCriterion, SortOrder} from '@coveo/headless';
import {useEngine} from '../common/engineContext';

// Define the sort options
const SORT_OPTIONS = [
  {label: 'Relevance',     criterion: buildRelevanceSortCriterion()},
  {label: 'Date (newest)', criterion: buildDateSortCriterion(SortOrder.Descending)},
  {label: 'Date (oldest)', criterion: buildDateSortCriterion(SortOrder.Ascending)},
];

const Sort: React.FC = () => {
  const engine = useEngine();
  const [controller] = useState(() =>
    buildSort(engine, {
      initialState: {criterion: SORT_OPTIONS[0].criterion},
    })
  );
  const [sortState, setSortState] = useState(controller.state);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = controller.subscribe(() => {
      setSortState(controller.state);
    });
    return unsubscribe;
  }, [controller]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = Number(e.target.value);
    setSelectedIndex(index);
    controller.sortBy(SORT_OPTIONS[index].criterion);
  };

  return (
    <div className="sort-wrap">
      <span className="sort-label">Sort by</span>
      <select className="sort-select" value={selectedIndex} onChange={handleChange}>
        {SORT_OPTIONS.map((option, i) => (
          <option key={i} value={i}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Sort;
