import axios from 'axios'


export const REQUEST_PAGE = 'REQUEST_PAGE'
export const REQUEST_AUTOCOMPLETE = 'REQUEST_AUTOCOMPLETE'


const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'

export const requestPage = (size, page, customerType) => (dispatch, getState) => {
  // axios.get(`${ROOT_URL}/user/${size}/${page}/${customerType}`)
  customerType = "all";
  axios.get(`${ROOT_URL}/user/${size}/${page}/${customerType}`)
       .then( res => {
         let { filterUser, totalSize } = res.data,
             pageRange = Math.ceil(totalSize/size); //11
         dispatch({ type: REQUEST_PAGE, filterUser, totalSize, pageRange })
       })
}

export const requestAutocomplete = (searchText) => (dispatch) => {
  axios.post(`${ROOT_URL}/user/search/${searchText}`)
       .then( res => {
         dispatch({type: REQUEST_AUTOCOMPLETE, autocomplete: res.data})
       })
}

// export const requestPage
