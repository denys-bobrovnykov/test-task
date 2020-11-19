import { testData } from './testData';

export const initialState = {
  data: [],
  isLoaded: false,
  selected: [],
};

export const loadedState = {
  data: testData,
  isLoaded: true,
  selected: [],
};

export const selectedState = {
  data: testData,
  isLoaded: true,
  selected: [...loadedState.selected, testData[0]],
};

export const selectedFebruary = {
  data: testData,
  isLoaded: true,
  selected: [...loadedState.selected, testData[0], testData[2]],
};
