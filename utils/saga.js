import { call, put, takeEvery } from 'redux-saga/effects';
import fetchData from './api.js';
import * as actions from '../store/actions.js';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* getGridData() {
  try {
    const data = yield call(fetchData);
    yield put({ type: actions.FETCH_DATA_SUCCESSFUL, payload: data });
  } catch (e) {
    // here we could use another action for the error handling
    console.error(e);
  }
}

function* getGridDataAsync() {
  yield delay(1000);
  const data = yield call(fetchData);
  yield put({ type: actions.FETCH_DATA_SUCCESSFUL, payload: data });
}

function* applyFilterGender(action) {
  yield put({ type: actions.FILTER_GENDER, payload: action.gender });
}

function* removeFilterGender() {
  yield put({ type: actions.REMOVE_FILTER_GENDER });
}

function* mySaga() {
  // when the action 'FETCH_DATA_REQUESTED' is dispatched run getGridData()
  yield takeEvery(actions.FETCH_DATA_REQUESTED, getGridData);
  yield takeEvery(actions.FETCH_DATA_DEBOUNCED, getGridDataAsync);
  yield takeEvery(actions.APPLY_FILTER_GENDER, applyFilterGender);
  yield takeEvery(actions.APPLY_REMOVE_FILTER_GENDER, removeFilterGender);
}

export default mySaga;
