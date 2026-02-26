import React, {useState} from 'react';

interface FacetItemProps {
  name: string;
  count: number;
  checked?: boolean;
  onToggle: () => void;
}

const FacetItem: React.FC<FacetItemProps> = ({name, count, checked = false, onToggle}) => (
  <div className={`facet-item${checked ? ' checked' : ''}`} onClick={onToggle}>
    <div className="facet-check">
      <div className="facet-box" />
      <span className="facet-name">{name}</span>
    </div>
    <span className="facet-count">{count}</span>
  </div>
);

const FacetList: React.FC = () => {
  const [sourceFacets, setSourceFacets] = useState({
    documentation: true,
    knowledgeBase:  false,
    blog:           false,
    apiReference:   false,
  });

  const [dateFacets, setDateFacets] = useState({
    last7:      false,
    last30:     false,
    last6months: false,
    allTime:    true,
  });

  const toggleFacet = <T extends object>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    key: keyof T
  ) => {
    setter((prev) => ({...prev, [key]: !prev[key]}));
  };

  return (
    <aside className="facets">

      <div className="facet-group">
        <p className="facet-title">Source</p>
        <FacetItem name="Documentation" count={104} checked={sourceFacets.documentation} onToggle={() => toggleFacet(setSourceFacets, 'documentation')} />
        <FacetItem name="Knowledge Base" count={58}  checked={sourceFacets.knowledgeBase}  onToggle={() => toggleFacet(setSourceFacets, 'knowledgeBase')} />
        <FacetItem name="Blog"           count={73}  checked={sourceFacets.blog}           onToggle={() => toggleFacet(setSourceFacets, 'blog')} />
        <FacetItem name="API Reference"  count={12}  checked={sourceFacets.apiReference}   onToggle={() => toggleFacet(setSourceFacets, 'apiReference')} />
      </div>

      <div className="facet-group">
        <p className="facet-title">Date Modified</p>
        <FacetItem name="Last 7 days"   count={14}  checked={dateFacets.last7}       onToggle={() => toggleFacet(setDateFacets, 'last7')} />
        <FacetItem name="Last 30 days"  count={41}  checked={dateFacets.last30}      onToggle={() => toggleFacet(setDateFacets, 'last30')} />
        <FacetItem name="Last 6 months" count={98}  checked={dateFacets.last6months} onToggle={() => toggleFacet(setDateFacets, 'last6months')} />
        <FacetItem name="All time"      count={247} checked={dateFacets.allTime}     onToggle={() => toggleFacet(setDateFacets, 'allTime')} />
      </div>

      <div className="facet-group">
        <p className="facet-title">Topic</p>
        <FacetItem name="Configuration" count={34} checked={false} onToggle={() => {}} />
        <FacetItem name="Indexing"      count={29} checked={false} onToggle={() => {}} />
        <FacetItem name="Search UI"     count={21} checked={false} onToggle={() => {}} />
        <FacetItem name="Analytics"     count={18} checked={false} onToggle={() => {}} />
        <span className="facet-show-more">+ Show 6 more</span>
      </div>

    </aside>
  );
};

export default FacetList;
