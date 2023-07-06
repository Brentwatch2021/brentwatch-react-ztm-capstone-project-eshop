import USER_ACTION_TYPES from './user.types';

export const USER_INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error:null,
}

// the root reducer runs through all the reducer actions 
// hence why at the end of each reducer we should by default 
// return the original state
export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch (type)
    {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
        return { ...state,currentUser: payload };
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return { ...state,isLoading:false,currentUser:payload }
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {...state, currentUser: null};
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
            return {...state, error: payload }
        default:
            return state;

    }
}