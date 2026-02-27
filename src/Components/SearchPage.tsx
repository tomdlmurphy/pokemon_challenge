import React, {useEffect} from 'react';
import {SearchEngine} from '@coveo/headless';
import {EngineProvider} from '../common/engineContext';
import Sidebar from './Sidebar';
import SearchBox from './SearchBox_2';
import FacetList from './FacetList_2';
import QuerySummary from './QuerySummary_2';
import Sort from './Sort_2';
import ResultList from './ResultList_2';
import Pager from './Pager_2';
import './SearchPage.css';

interface ISearchPageProps {
  engine: SearchEngine;
}

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
  const {engine} = props;

  useEffect(() => {
    engine.executeFirstSearch();
  }, [engine]);

  return (
    <EngineProvider value={engine}>
      <div style={{display: 'flex', minHeight: '100vh'}}>

        <Sidebar />

        <div className="main">
          <SearchBox />

          <div className="body">
            <FacetList />

            <section className="results-area">
              <div className="results-toolbar">
                <QuerySummary />
                <Sort />
              </div>
              <ResultList />
              <Pager />
            </section>
          </div>
        </div>

      </div>
    </EngineProvider>
  );
};

export default SearchPage;
