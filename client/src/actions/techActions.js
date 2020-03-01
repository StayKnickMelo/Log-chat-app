import axios from 'axios';


import {

  GET_TECHS,
  ADD_TECH,
  TECHS_ERROR,
  SET_LOADING,
  DELETE_TECH,
  CLEAR_ERROR
} from './types';



export const getTechs = () => async (dispatch) => {

  try {
    setLoading();

    const res = await fetch('/api/techs/');

    const resData = await res.json();

    dispatch({
      type: GET_TECHS,
      payload: resData
    });

  } catch (err) {

    dispatch({
      type: TECHS_ERROR,
      // payload: err.response.data.msg
    })

  }

}

// Add tech
export const addTech = (newTech) => async (dispatch) => {
  const config = {
    headers : {'Content-Type': 'application/json'}
  }

  try {
    const res = await axios.post('/api/techs/', newTech, config );

    const resData = await res.json();

    console.log(resData);

    dispatch({
      type: ADD_TECH,
      payload: resData
    })

  } catch (err) {

    console.log(err.response.data.msg);
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.data.msg
    })

  }

}

// export const addTech = (newTech) => async (dispatch) => {

//   try {
//     const res = await fetch('/api/techs/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newTech)
//     });

//     const resData = await res.json();

//     console.log(resData);

//     dispatch({
//       type: ADD_TECH,
//       payload: resData
//     })

//   } catch(err){

//     console.log(err.response);
//     dispatch({
//       type: TECHS_ERROR,
//       payload: err.response.data.msg
//     })

//   }

// }

// Delete Tech
export const deleteTech = (id) => async (dispatch)=> {

  try{
    await fetch(`/api/techs/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_TECH,
      payload: id
    });

  }catch(err){

    dispatch({
      type: TECHS_ERROR,
      // payload: err.response.data.msg
    })

  }
}

export const setLoading = () => (dispatch) => {

  dispatch({
    type: SET_LOADING
  })
}


export const clearError = () => (dispatch)=> {
  
  dispatch({
    type:CLEAR_ERROR
  });
}