import {
    CREATE_BREED,
    GET_BREEDS,
    GET_BREEDS_BY_NAME,
    GET_SORT_BREEDS,
    GET_TEMPERAMENTS,
    FAILURE_BREED,
    SUCCESS_BREED,
    SHOW_LOADER,
    HIDE_LOADER
} from "./types";
  
import BreedDataService  from '../utils/API';
  
  export const createBreed = (inputs,history) => async (dispatch) => {
    try {
      const res = await BreedDataService.create(inputs);
      dispatch({
        type: CREATE_BREED,
        payload: res.data,
      });
      
      history.push('/success')
      dispatch(successBreed())
    } catch (err) {
      dispatch(failureBreed(inputs.name))
     
    }
  };
  
  export const getAllBreeds = (name) => async (dispatch) => {
    try {
      dispatch(showLoader())
      const res = await BreedDataService.getBreeds(name);
      dispatch({
        type: GET_BREEDS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
    dispatch(hideLoader())
  };

  export const getBreedByName = (name) => async (dispatch) => {
    try {
      dispatch(showLoader())
      const res = await BreedDataService.getByName(name);
  
      dispatch({
        type: GET_SORT_BREEDS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_SORT_BREEDS,
        payload: [],
      });
    }
    dispatch(hideLoader())
  };

  export const getBreedSort = (data) => async (dispatch) => {
    console.log('',data);
    try {
      dispatch(showLoader())
      const res = await BreedDataService.getBySort(data);
  
      dispatch({
        type: GET_BREEDS_BY_NAME,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
    dispatch(hideLoader())
  };

  export const getTemperaments = (data) => async (dispatch) => {
    try {
      
      const res = await BreedDataService.getTemperaments(data);
  
      dispatch({
        type: GET_TEMPERAMENTS,
        payload: res.data,
      });
      
    } catch (err) {
      console.log(err);
    }
  };

  export const failureBreed = payload => ({
    type: FAILURE_BREED,
    payload
  });

  export const successBreed = () => dispatch => {
    dispatch({
      type: SUCCESS_BREED,
    })
    dispatch(getAllBreeds())
  };

  export const showLoader = () => dispatch => {
    dispatch({
      type: SHOW_LOADER,
    })
  }

  export const hideLoader = () => dispatch => {
    dispatch({
      type: HIDE_LOADER,
    })
  }
      

  // export const sortByName = payload => ({
  //   type: SORT_BREEDS_BY_NAME,
  //   payload
  // });
  // export const sortByWeight = payload => ({
  //   type: SORT_BREEDS_BY_WEIGHT,
  //   payload
  // });
