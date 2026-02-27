import React, {useEffect, useState} from 'react';
import {buildFacet, Facet, FacetState} from '@coveo/headless';
import {useEngine} from '../common/engineContext';

// ── Single Facet Group ─────────────────────────────────────

interface FacetGroupProps {
  title: string;
  controller: Facet;
}

const FacetGroup: React.FC<FacetGroupProps> = ({title, controller}) => {
  const [state, setState] = useState<FacetState>(controller.state);

  useEffect(() => {
    const unsubscribe = controller.subscribe(() => {
      setState(controller.state);
    });
    return unsubscribe;
  }, [controller]);

  if (state.values.length === 0) return null;

  return (
    <div className="facet-group">
      <p className="facet-title">{title}</p>
      {state.values.map((value) => {
        const isChecked = controller.isValueSelected(value);
        return (
          <div
            key={value.value}
            className={`facet-item${isChecked ? ' checked' : ''}`}
            onClick={() => controller.toggleSelect(value)}
          >
            <div className="facet-check">
              <div className="facet-box" />
              <span className="facet-name">{value.value}</span>
            </div>
            <span className="facet-count">{value.numberOfResults}</span>
          </div>
        );
      })}
      {state.canShowMoreValues && (
        <span className="facet-show-more" onClick={() => controller.showMoreValues()}>
          + Show more
        </span>
      )}
      {state.canShowLessValues && (
        <span className="facet-show-more" onClick={() => controller.showLessValues()}>
          - Show less
        </span>
      )}
    </div>
  );
};

// ── Facet List ─────────────────────────────────────────────

const FacetList: React.FC = () => {
  const engine = useEngine();

  const [typeFacet] = useState(() =>
    buildFacet(engine, {
      options: {field: 'pokemon_type', facetId: 'pokemon_type'},
    })
  );

  const [generationFacet] = useState(() =>
    buildFacet(engine, {
      options: {field: 'pokemon_generation', facetId: 'pokemon_generation'},
    })
  );

  return (
    <aside className="facets">
      <FacetGroup title="Type" controller={typeFacet} />
      <FacetGroup title="Generation" controller={generationFacet} />
    </aside>
  );
};

export default FacetList;
