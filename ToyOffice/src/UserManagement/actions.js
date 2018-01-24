import axios from 'axios'


export const REQUEST_PAGE = 'REQUEST_PAGE'


const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'

export const requestPage = (size,page) => (dispatch, getState) => {
  axios.get(`${ROOT_URL}/user/${size}/${page}`)
       .then( res => {
         let { filterUser, totalSize } = res.data,
             pageRange = Math.ceil(totalSize/size); //11
         dispatch({ type: REQUEST_PAGE, filterUser, totalSize, pageRange })
       })
}
