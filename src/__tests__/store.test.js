import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../redux/actions/actionCreators';
import * as types from '../redux/actions/actionTypes';
import { testData } from '../test-data/testData';

const response = {
  data: testData,
};

const mockStore = configureStore([thunk]);
// Create mock of axios fetch service
const mockServiceCreator = (body, succeeds = true) => () =>
  new Promise((resolve, reject) => {
    setTimeout(() => (succeeds ? resolve(body) : reject(body)), 10);
  });

describe('Async actions creator creates', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => (store = null));

  test('STORE_DATA', () => {
    const expectedActions = [
      {
        type: types.STORE_DATA,
        payload: response.data,
      },
    ];
    return store
      .dispatch(actions.fetchData(mockServiceCreator(response)))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  test('FETCH_FAILURE', () => {
    const expectedActions = [
      {
        type: types.FETCH_FAILURE,
      },
    ];
    return store
      .dispatch(actions.fetchData(mockServiceCreator(undefined, false)))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});

describe('Sync creators create', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => (store = null));

  test('SELECT_EMPLOYEE', () => {
    const expectedActions = [
      {
        type: types.SELECT_EMPLOYEE,
        payload: response.data[0],
      },
    ];
    store.dispatch(actions.selectEmployee(response.data[0]));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('DESELECT_EMPLOYEE', () => {
    const expectedActions = [
      {
        type: types.DESELECT_EMPLOYEE,
        payload: response.data[0],
      },
    ];
    store.dispatch(actions.deselectEmployee(response.data[0]));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
