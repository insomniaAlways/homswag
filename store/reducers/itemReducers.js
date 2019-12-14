import { FETCH_ITEMS } from '../actionTypes';
import { items } from '../intialValues';

const itemReducers = (state = items, action) => {
  switch(action.type) {
    case FETCH_ITEMS : {
      return {
        ...state,
        items:items
      }
    }
    default : return state;
  }
}

export default itemReducers;