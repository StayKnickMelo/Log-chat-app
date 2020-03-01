import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SEARCH_LOGS,
  SET_CURRENT,
  UPDATE_LOG,
  CLEAR_CURRENT,
  CLEAR_FILTERED
} from './types';



export const getLogs = () => async (dispatch) => {

  try {
    setLoading();

    const res = await fetch('/api/logs/');

    const logs = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: logs
    });

  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      // payload: err.response.data
      // payload: err.response.data.msg
    })

  }

}

// Add Logs 
export const addLog = (log) => async (dispatch) => {

  try {

    setLoading()

    const res = await fetch('/api/logs/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log)
    });

    const resData = await res.json();


    dispatch({
      type: ADD_LOG,
      payload: resData
    })



  } catch (err) {

    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data.msg
    })

  }


}

// Delete Log
export const deleteLog = (id) => async (dispatch) => {

  try {

    setLoading();

    await fetch(`/api/logs/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_LOG,
      payload: id
    })

  } catch (err) {

    dispatch({
      type: LOGS_ERROR,
      dispatch: err.response.data.msg
    })

  }

}

// Set Current
export const setCurrent = (current) => (dispatch) => {

  dispatch({
    type: SET_CURRENT,
    payload: current
  })

}

// Clear Current
export const clearCurrent = () => (dispatch) => {

  dispatch({
    type: CLEAR_CURRENT
  })

}

// Update Log
export const updateLog = (id, logToEdit) => async (dispatch) => {

  try {
    const res = await fetch(`/api/logs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logToEdit)
    });

    const resData = await res.json();

    dispatch({
      type: UPDATE_LOG,
      payload: resData
    })


  } catch (err) {

    dispatch({
      type: LOGS_ERROR,
      dispatch: err.response.data.msg
    })

  }

}

// Search Logs
export const searchLogs = (text) => (dispatch) => {

  dispatch({
    type: SEARCH_LOGS,
    payload: text
  })
}

// Clear filtered
export const clearFiltered = () => (dispatch) => {

  dispatch({
    type: CLEAR_FILTERED
  })
}




// Set loading 
export const setLoading = () => {
  return {
    type: SET_LOADING
  }
}

