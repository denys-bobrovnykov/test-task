import {
  DESELECT_EMPLOYEE,
  STORE_DATA,
  FETCH_FAILURE,
  SELECT_EMPLOYEE,
} from '../actions/actionTypes';
import { compare } from '../../service/date-utils';

export const listReducer = (state = { isLoaded: false, data: [], selected: [] }, action) => {
  switch (action.type) {
    case DESELECT_EMPLOYEE:
      state.selected = state.selected
        // Remove item
        .filter((item) => item.id !== action.payload.id)
        // Sort items by month
        .sort((a, b) => compare(a.dob, b.dob));
      return { ...state };

    case SELECT_EMPLOYEE:
      if (state.selected.findIndex((el) => el.id === action.payload.id) === -1) {
        state.selected.push(action.payload);
        // Sort items by month
        state.selected.sort((a, b) => compare(a.dob, b.dob));
      }
      return { ...state };

    case STORE_DATA:
      return {
        ...state,
        data: action.payload,
        isLoaded: true,
      };

    case FETCH_FAILURE:
      return {
        ...state,
        isLoaded: false,
        errData: action.payload,
      };

    default:
      return state;
  }
};
