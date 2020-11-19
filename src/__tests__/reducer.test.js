import { listReducer } from '../redux/reducers/listReducer';
import * as actions from '../redux/actions/actionCreators';
import { testData } from '../test-data/testData';
import * as states from '../test-data/states';

describe('List reducer', () => {
  test('Returns the initial state', () => {
    expect(listReducer(undefined, {})).toEqual(states.initialState);
  });

  test('Updates data on fetch success', () => {
    expect(listReducer(states.initialState, actions.fetchSuccess(testData))).toEqual(
      states.loadedState
    );
  });

  test('Updates selected list', () => {
    expect(listReducer(states.loadedState, actions.selectEmployee(testData[0]))).toEqual(
      states.selectedState
    );
  });

  test('Removes from select', () => {
    expect(listReducer(states.loadedState, actions.deselectEmployee(testData[0]))).toEqual(
      states.loadedState
    );
  });
});
