import { axiosService } from '../../service/axiosService';
import { URL } from '../../service/url';
import { STORE_DATA, FETCH_FAILURE, SELECT_EMPLOYEE, DESELECT_EMPLOYEE } from './actionTypes';

export const fetchData = (service = axiosService) => async (dispatch) => {
  try {
    const response = await service(URL);
    dispatch(fetchSuccess(response.data));
  } catch (err) {
    dispatch(fetchFailure(err));
  }
};

export const fetchSuccess = (body) => {
  return {
    type: STORE_DATA,
    payload: body,
  };
};

export const fetchFailure = (err) => {
  return {
    type: FETCH_FAILURE,
    payload: err,
  };
};

export const selectEmployee = (employee) => {
  return {
    type: SELECT_EMPLOYEE,
    payload: employee,
  };
};

export const deselectEmployee = (employee) => {
  return {
    type: DESELECT_EMPLOYEE,
    payload: employee,
  };
};
