import axios from 'axios'


export const CREATE_ACADEMY = 'CREATE_ACADEMY'    // create kinder Id
export const ADD_ACADEMY = 'ADD_ACADEMY'
export const UPDATE_KINDER = 'UPDATE_KINDER'
export const DELETE_KINDER = 'DELETE_KINDER'
export const FETCH_ACAMEDY = 'FETCH_ACAMEDY'

// 지사 유치원의 반 관리
export const CREATE_ACADEMY_CLASS = 'CREATE_ACADEMY_CLASS'
export const ADD_ACADEMY_CLASS = 'ADD_ACADEMY_CLASS'
export const FETCH_STUDENT_NAMES = 'FETCH_STUDENT_NAMES'
export const INITIAL_FETCH_STUDENT_NAMES = 'INITIAL_FETCH_STUDENT_NAMES'
export const UPDATE_KINDER_CLASS = 'UPDATE_KINDER_CLASS'
export const DELETE_KINDER_CLASS = 'DELETE_KINDER_CLASS'



const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'

let nextKinId = 0
export function createAcademy(_id){
  console.log("createAcademy",_id);
  return {
    type: CREATE_ACADEMY,
    kinderId: `${_id}_${nextKinId++}`
  }
}
export const addAcademy = (childId) => {
  console.log("addAcademy", childId);
  return({
    type: ADD_ACADEMY,
    childId
  })
}


// let nextKinClassId = 0
// export function createAcademyClass(_id){
//   console.log("createAcademyClass",_id);
//   return {
//     type: CREATE_ACADEMY_CLASS,
//     kinderId: `${_id}_class_${nextKinClassId++}`
//   }
// }
// export const addAcademyClass = (childId) => {
//   console.log("addAcademyClass", childId);
//   return({
//     type: ADD_ACADEMY_CLASS,
//     childId
//   })
// }


export const getAcademyByUser = () => (dispatch) => {
  const user = localStorage.getItem('email')
  // FIXME: server 에서 날려주는거 고치기
  axios.get(`${ROOT_URL}/user/${user}/kinders`)
       .then( res => dispatch({ type: FETCH_ACAMEDY, kinders: res.data[0].kinders }))
}


export const completedAddAcademy = (academy) => (dispatch, getState) => {
  let { code, branch } = getState().login.user
  academy = {
    ...academy,
    parentId: code,
    renewal : true
  }
  const user = localStorage.getItem('email')
  axios.put(`${ROOT_URL}/user/${user}/kinder`, { ...academy, branch: branch.name })

  alert('원 등록이 완료되었습니다.')
}

export const completedEditAcademy = (academy, academy_id) => (dispatch, getState) => {
  let { name, lang, manager, managerPh, phone } = academy;

  academy = {
    name, lang, manager, managerPh, phone
  }

  const user = localStorage.getItem('email')
  axios.put(`${ROOT_URL}/user/${user}/kinder/${academy_id}`, { ...academy })
       .then( res => {
         getAcademyByUser()
         alert('원 수정이 완료되었습니다.')
       })
}

export const completedDeleteAcademy = (academy_id) => (dispatch, getState) => {
  const user = localStorage.getItem('email')
  axios.delete(`${ROOT_URL}/user/${user}/kinder/${academy_id}`)
       .then( res => {
         getAcademyByUser()
         alert('원이 삭제되었습니다.')
       })
}



export const createAcademyClass = (academyClass) => (dispatch, getState) => {

  let { parentId, className, level, academyId  } = academyClass;
  academyClass = {
    parentId, className, level, academyId
  }

  const user = localStorage.getItem('email')
  axios.put(`${ROOT_URL}/user/${user}/academyClass/${academyId}`, {...academyClass})
       .then(res => {
          alert('반 등록이 완료되었습니다.')
       })
}

export const editAcademyClass = (academyClass) => (dispatch, getState) => {
  console.log("editAcademyClass", academyClass);
  let { parentId, className, level, academyId, _id, classId  } = academyClass;
  academyClass = {
    parentId, className, level, academyId, classId
  }
  // /user/:user/academyClass/:academyId/:classId
  const user = localStorage.getItem('email')
  axios.put(`${ROOT_URL}/user/${user}/academyClass/${academyId}/${_id}`, {...academyClass})
       .then(res => {
          alert('반 수정이 완료되었습니다.')
       })
}

export const deleteAcademyClass = (academyClass) => (dispatch, getState) => {
  console.log("createAcademyClass");
  // let { code, branch } = getState().login.user
  // academy = {
  //   ...academy,
  //   parentId: code,
  //   renewal : true
  // }
  // const user = localStorage.getItem('email')
  // axios.put(`${ROOT_URL}/user/${user}/kinder`, { ...academy, branch: branch.name })

  alert('반이 삭제되었습니다.')
}

export const createStudentIds = (studentInfo) => (dispatch, getState) => {
  console.log("createStudentIds", studentInfo);
  let { parentId, academyId, _id, className, registerStudents, classId } = studentInfo;
  registerStudents = registerStudents.split("\n").map(name => name.trim()).filter(name => name)
  let obj = {
    renew: true,
    parentId,
    kinderId: academyId,
    classId,
    className,
    students: registerStudents
  }
  // console.log(obj);
  axios.post(`${ROOT_URL}/login`, obj)
       .then(res => {
          alert(`반의 학생이 등록되었습니다.`)
       })
}

export const getStudentNames = (parentId, academyId, classId) => (dispatch) => {
  console.log("getStudentNames");
  // debugger
  axios.get(`${ROOT_URL}/login/${parentId}/${academyId}/${classId}`)
       .then( res => {
         if(res.status === 204) {
           dispatch({
             type: INITIAL_FETCH_STUDENT_NAMES
           })
         } else {
           dispatch({ type: FETCH_STUDENT_NAMES, students: res.data.students, classId})
         }
       })
}

export const editStudentName = (editType, studentInfo) => (dispatch, getState) => {
  let { parentId, kinderId, classId } = studentInfo
  axios.put(`${ROOT_URL}/login/${editType}/${classId}`, {...studentInfo })
       .then(res => {
          if(alert('완료되었습니다.')){
            // TODO: 새로고침
              getStudentNames(parentId, kinderId, classId)
          }
       })
}

export const delStudentName = (studentInfo) => (dispatch, getState) => {
  let { name, parentId, kinderId, classId, _id } = studentInfo
  if(confirm(`${name} 학생을 삭제 하시겠습니까?`)){
    console.log("yes", name, parentId, kinderId, classId, _id );
    axios.delete(`${ROOT_URL}/login/${_id}/`)
          .then(res => {
            alert(`${name} 학생 삭제가 완료되었습니다.`)
          })
  } else {
    console.log("no");
    return false
  }
}
