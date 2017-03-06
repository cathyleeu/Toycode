import axios from 'axios';
const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090';
/*-----   types -----*/


export const FETCH_INFO_FOR_ISSUED = 'FETCH_INFO_FOR_ISSUED';



/*-------------------*/


/*----- actions -----*/




export const fetchInfoForIssued = (parentId, name) => (dispatch) => {
  axios.get(`${ROOT_URL}/branch/${parentId}/${name}`)
       .then((response) => {
         dispatch({
           type: FETCH_INFO_FOR_ISSUED,
           recordedInfo: response.data[0]
         })
       })
}

export const isRegisteredNames = ( parentId, kinderId, classId, className, students ) => (dispatch) => {
  const loginCont = { parentId, kinderId, classId, className, students }
  axios.post(`${ROOT_URL}/login`, loginCont)
      .then(res => {
        alert('등록이 완료 되었습니다.')
      })
}




/*-------------------*/
