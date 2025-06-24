import axios from "../api/axios.js";
import {
  COMPANY_CREATE_SUCCESS,
  COMPANY_CREATE_REQUEST,
  COMPANY_CREATE_FAIL,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_SUCCESS,
  COMPANY_DETAILS_FAIL,
  COMPANY_UPDATE_REQUEST,
  COMPANY_UPDATE_SUCCESS,
  COMPANY_UPDATE_FAIL,
} from "../constants/companyConstants";

export const getCompanyDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPANY_DETAILS_REQUEST,
    });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const { data } = await axios.get("/api/companies/me", config);
    dispatch({ type: COMPANY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMPANY_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createCompany = (companyData) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPANY_CREATE_REQUEST });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/companies", companyData, config);
    dispatch({ type: COMPANY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMPANY_CREATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateCompany =
  (id, updatedData) => async (dispatch, getState) => {
    try {
      dispatch({ type: COMPANY_UPDATE_REQUEST });

      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/companies/${id}`,
        updatedData,
        config
      );
      dispatch({ type: COMPANY_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: COMPANY_UPDATE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
