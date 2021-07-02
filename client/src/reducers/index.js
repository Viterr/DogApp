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
} from "../actions/types";

  
  const initialState = {
    data:[],
    temperaments:[],
    fullbreeds: [],
    totalItems:0,
    error:'',
    loading:false
  };
  
  function tutorialReducer(breeds = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {

      case CREATE_BREED:
        if(breeds.data.length>=8) breeds.data.pop()
        return {
          ...breeds,
          data:[...payload.data , ...breeds.data]
        }

      case GET_SORT_BREEDS:
        return {
          ...breeds,
          data:payload.data,
          totalItems:payload.totalItems
        }
      
      case GET_BREEDS:
        
        return {
          ...breeds,
          data:payload.data,
          totalItems:payload.totalItems,
          fullbreeds: payload.fullbreeds
        }

      case GET_TEMPERAMENTS:
        return {
          ...breeds,
          temperaments:payload,
          error:''
        }  
        
      case GET_BREEDS_BY_NAME:
        return {
          ...breeds,
          data:payload.data,
          totalItems:payload.totalItems
        }
      case FAILURE_BREED :
        return {
          ...breeds,
          error: `Breed name "${payload}" already exist`
        }
      case SUCCESS_BREED:
        return {
          ...breeds,
          error: ''
        }  
      case SHOW_LOADER:
        return {
          ...breeds,
          loading: true
        }
      case HIDE_LOADER:
        return {
          ...breeds,
          loading: false
      }   
      default:
        return breeds;
    }
  };
  
export default tutorialReducer;
