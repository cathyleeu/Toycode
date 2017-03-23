import axios from 'axios';
const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090';

/*-----   types -----*/


export const FETCH_INFO_FOR_ISSUED = 'FETCH_INFO_FOR_ISSUED';
export const IS_REGISTER_NAMES = 'IS_REGISTER_NAMES';
export const IS_FETCHED_NAMES = 'IS_FETCHED_NAMES';
export const IS_EDITED_NAMES = 'IS_EDITED_NAMES'
export const IS_WRITING_NAMES = 'IS_WRITING_NAMES'
export const IS_REGISTERED_FIRST_TIME = 'IS_REGISTERED_FIRST_TIME'

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


export const isEditingNames = (classId, students, kclassName) => (dispatch) => {
  console.log(students, classId);
  axios.put(`${ROOT_URL}/login/update/${classId}/${kclassName}`, {students, kclassName})
    .then(res => {
      console.log(res);
      alert('수정이 완료 되었습니다.')
      dispatch({type: IS_EDITED_NAMES, students, kclassName})
    })
}

export const isWritingNames = (kclassName, students) => {
  console.log(kclassName, students);
  return({ type: IS_WRITING_NAMES, kclassName, students})}

export const isFetchedNamesByClass = (classId, kclassName) => (dispatch) => {
  axios.get(`${ROOT_URL}/login/${classId}/${kclassName}`)
    .then(res => {
      // if(res.data[0].className !== kclassName){
      //   console.log("기존에 있던것",res.data[0].className)
      //   console.log("비교하려는 것",kclassName)
      //   dispatch({ type: IS_REGISTERED_FIRST_TIME, kclassName})
      // } else {
      //   dispatch({ type: IS_FETCHED_NAMES, names:res.data[0].className , students:res.data[0].students })
      // }
      if(res.data){
        dispatch({ type: IS_FETCHED_NAMES, name:res.data.className , students:res.data.students , classId})
      } else {
        // console.log("기존에 있던것",res.data[0].className)
        // console.log("비교하려는 것",kclassName)
        dispatch({ type: IS_REGISTERED_FIRST_TIME, classId})
      }
    })
    // .catch(err => {
    //   dispatch({ type: IS_REGISTERED_FIRST_TIME, classId})
    //   console.log(err, classId, kclassName);
    // })
    // 아예없으면 걍 빠짐
    //[0] => mongoDB에서 findOne으로 해주면 배열이 아니라 오브젝트로 온당당
}

export const isRegisteredNames = ( parentId, kinderId, classId, className, students ) => (dispatch) => {
  const loginCont = { parentId, kinderId, classId, className, students }
  axios.post(`${ROOT_URL}/login`, loginCont)
    .then(res => {
      dispatch({ type: IS_REGISTER_NAMES, names: className, students, className})
      alert('등록이 완료 되었습니다.')
    })
}






/*-------------------*/
