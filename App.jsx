import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import DataGrid from './components/DataGrid/DataGrid';
import ShowGridButton from './components/ShowGridButton/ShowGridButton';
import FetchDataButton from './components/FetchDataButton/FetchDataButton';
import * as actions from './store/actions';

const App = () => {
  const dispatch = useDispatch();

  const storeData = useSelector((state) => {
    return state;
  });

  const [showGrid, setShowGrid] = useState(true);

  const handleClickShow = () => {
    setShowGrid(!showGrid);
  };

  const onFetchData = () => {
    dispatch({ type: actions.FETCH_DATA_REQUESTED });
  };

  const handleDebouncedFetch = () => {
    dispatch({ type: actions.FETCH_DATA_DEBOUNCED });
  };

  const handleFilterGender = (gender) => {
    dispatch({ type: actions.APPLY_FILTER_GENDER, gender });
  };

  const handleRemoveGenderFilter = () => {
    dispatch({ type: actions.APPLY_REMOVE_FILTER_GENDER });
  };

  const handleClickFetchData = () => {
    handleDebouncedFetch();
  };

  // filter the data based on Gender button
  const filterGender = (args) => {
    switch (args.item.id) {
      case 'filterMale':
      case 'filterFemale':
        const gender = args.item.id === 'filterMale' ? 'Male' : 'Female';
        handleFilterGender(gender);

        break;

      default:
        handleRemoveGenderFilter();
        break;
    }
  };

  // whenever the debounced flag changes value, fetch the data again
  // this will work also on the first render
  useEffect(() => {
    onFetchData();

    return () => {
      // here we could write a clenaup function
    };
  }, []);

  return (
    <div>
      <div className="btnBarContainer">
        <ShowGridButton showGrid={showGrid} handleClick={handleClickShow} />
        <FetchDataButton handleClick={handleClickFetchData} />
      </div>
      {showGrid && (
        <DataGrid data={storeData.gridData} filterGender={filterGender} />
      )}
    </div>
  );
};

export default App;
