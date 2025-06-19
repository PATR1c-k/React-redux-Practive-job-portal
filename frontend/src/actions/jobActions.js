import axios from "../api/axios";
import {
  JOB_CREATE_REQUEST,
  JOB_CREATE_SUCCESS,
  JOB_CREATE_FAIL,
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_LIST_FAIL,
  JOB_DELETE_REQUEST,
  JOB_DELETE_SUCCESS,
  JOB_DELETE_FAIL,
} from "../constants/jobConstants";

export const createJob = (jobData) => async (dispatch, getState) => {
  try {
    dispatch({ type: JOB_CREATE_REQUEST });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/jobs", jobData, config);

    dispatch({ type: JOB_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: JOB_CREATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const listJobs = () => async (dispatch) => {
  try {
    dispatch({ type: JOB_LIST_REQUEST });

    const { data } = await axios.get("/api/jobs");

    dispatch({ type: JOB_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: JOB_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteJob = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: JOB_DELETE_REQUEST });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/jobs/${id}`, config);

    dispatch({ type: JOB_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: JOB_DELETE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
