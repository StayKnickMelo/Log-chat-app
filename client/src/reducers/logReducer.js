import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  UPDATE_LOG,
  CLEAR_CURRENT,
  SEARCH_LOGS,
  CLEAR_FILTERED
} from '../actions/types'



const initialState = {
  logs: null,
  current: null,
  loading: false,
  filtered: null,
  error: null
}



const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_LOGS:
      return {
        ...state,
        loading: false,
        logs: action.payload
      }
    case ADD_LOG:
      return {
        ...state,
        logs: [action.payload, ...state.logs],
        loading: false

      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map(log => log._id === action.payload._id ? action.payload : log)
      }
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => log._id !== action.payload),
        loading: false
      }
    case SEARCH_LOGS:
      return {
        ...state,
        filtered: state.logs.filter(log => {
          const regEx = new RegExp(action.payload, 'gi');
          return log.message.match(regEx) || log.tech.match(regEx)
        })
      }
    case CLEAR_FILTERED:
      return {
        ...state,
        filtered: null

      }
    case LOGS_ERROR:
      return {
        ...state,
        error: action.payload
      }


    default:
      return state
  }

}

export default logReducer