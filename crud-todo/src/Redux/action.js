import * as types from "./actionTypes";
import axios from "axios";

const getCountries = (params) => (dispatch) => {
    dispatch({type: types.GET_COUNTRIES_REQUEST})
    return axios.get("http://localhost:8080/countries", params).then(r => {
        dispatch({type: types.GET_COUNTRIES_SUCCESS, payload: r.data})
    })
    .catch(e => {
        dispatch({type: types.GET_COUNTRIES_FAILURE, payload: e})
    })
    // try{
    //  let res = axios.get("http://localhost:8080/countries")
    //  dispatch({type: types.GET_COUNTRIES_SUCCESS, payload: res.data})
    //  console.log(res.data)
    // }catch(e){
    //     dispatch({type: types.GET_COUNTRIES_FAILURE, payload: e})
    // }
}

const updateCountry = (id, payload) => (dispatch) => {
   dispatch({type: types.UPDATE_COUNTRY_REQUEST})
   return axios.patch(`http://localhost:8080/countries/${id}`, payload).then((r) => {
    dispatch({type: types.UPDATE_COUNTRY_SUCCESS, payload: r.data})
   })
   .catch((e) => {
    dispatch({type: types.UPDATE_COUNTRY_FAILURE, payload: e})
   })
}

const deleteProduct = (id) =>(dispatch)=>{
    dispatch({type : types.DELETE_COUNTRY_REQUEST});
    return axios.delete(`http://localhost:8080/countries/${id}`).then((r)=> 
        dispatch({type: types.DELETE_COUNTRY_SUCCESS}))
    .catch((e) =>dispatch({type: types.DELETE_COUNTRY_FAILURE}))
}


export { getCountries, updateCountry, deleteProduct };