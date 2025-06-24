import {
  COMPANY_CREATE_REQUEST,
  COMPANY_CREATE_SUCCESS,
  COMPANY_CREATE_FAIL,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_SUCCESS,
  COMPANY_DETAILS_FAIL,
  COMPANY_UPDATE_REQUEST,
  COMPANY_UPDATE_SUCCESS,
  COMPANY_UPDATE_FAIL,
} from "../constants/companyConstants";

export const companyReducer = (state = { company: null }, action) => {
  switch (action.type) {
    case COMPANY_CREATE_REQUEST:
    case COMPANY_DETAILS_REQUEST:
    case COMPANY_UPDATE_REQUEST:
      return { ...state, loading: true };

    case COMPANY_CREATE_SUCCESS:
    case COMPANY_DETAILS_SUCCESS:
    case COMPANY_UPDATE_SUCCESS:
      return { ...state, loading: false, company: action.payload };

    case COMPANY_CREATE_FAIL:
    case COMPANY_DETAILS_FAIL:
    case COMPANY_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
