import axios from 'axios';
const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090';

/*-----   types -----*/


export const FETCH_INFO_FOR_ISSUED = 'FETCH_INFO_FOR_ISSUED';
export const IS_REGISTER_NAMES = 'IS_REGISTER_NAMES';
export const IS_FETCHED_NAMES = 'IS_FETCHED_NAMES';
export const IS_EDITED_NAMES = 'EDITED_NAMES'

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
      dispatch({ type: IS_REGISTER_NAMES, names: loginCont.className, students: loginCont.students})
      alert('등록이 완료 되었습니다.')
    })
}

export const isEditingNames = (classId, students) => (dispatch) => {
  console.log(students);
  axios.put(`${ROOT_URL}/login/update/${classId}`, students)
    .then(res => {
      console.log(res);
      dispatch({type: IS_EDITED_NAMES})
    })
}


export const isFetchedNamesByClass = (classId) => (dispatch) => {
  axios.get(`${ROOT_URL}/login/${classId}`)
    .then(res => {
      dispatch({ type: IS_FETCHED_NAMES, names:res.data[0].className , students:res.data[0].students })
      // console.log(res.data[0]);
    })
}






/*-------------------*/
