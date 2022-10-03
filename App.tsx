import React, { useEffect, useState } from 'react';

import './style.css';
import DataGrid from './components/DataGrid/DataGrid';
import ShowGridButton from './components/ShowGridButton/ShowGridButton';
import FetchDataButton from './components/FetchDataButton/FetchDataButton';
import useDebounce from './utils/hooks';
import { fetchData } from './utils/api';

const App: React.FC = () => {
  const [baseData, setBaseData] = useState([]);
  const [gridData, setGridData] = useState([]);

  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [fetchFlag, setFetchFlag] = useState<boolean>(true);
  const debouncedFlag = useDebounce<boolean>(fetchFlag, 500);

  const handleClickShow = () => {
    setShowGrid(!showGrid);
  };

  const handleClickFetchData = () => {
    setFetchFlag(!fetchFlag);
  };

  // filter the data based on Gender button
  const filterGender = (args: any) => {
    let filtered = [];

    switch (args.item.id) {
      case 'filterMale':
        filtered = baseData.filter((i) => i.Gender === 'Male');

        break;
      case 'filterFemale':
        filtered = baseData.filter((i) => i.Gender === 'Female');

        break;
      default:
        filtered = baseData;
        break;
    }

    setGridData(filtered);
  };

  const handleCleanUp = () => {
    setBaseData([]);
    setGridData([]);
  };

  // whenever the debounced flag changes value, fetch the data again
  // this will work also on the first render
  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setBaseData(data);
      setGridData(data);
    };

    getData();

    return () => {
      handleCleanUp();
    };
  }, [debouncedFlag]);

  return (
    <div>
      <div className="btnBarContainer">
        <ShowGridButton showGrid={showGrid} handleClick={handleClickShow} />
        <FetchDataButton handleClick={handleClickFetchData} />
      </div>
      {showGrid && <DataGrid data={gridData} filterGender={filterGender} />}
    </div>
  );
};

export default App;
