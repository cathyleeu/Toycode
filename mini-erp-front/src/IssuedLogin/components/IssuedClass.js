import React from 'react';

const IssuedClass = ({loginInfo}) => {
  const { kinderClasses } = loginInfo;
  return(
    <div>
      {kinderClasses.map((kids, i) => (
        <div key={i} style={{margin: '1em'}}>
          {kids.className} {kids.level}레벨
          <button>원아수 수정</button>
          <button>ID 설정하기</button>
          <button>로그인 발급 받기</button>
        </div>
      ))}
    </div>
)}

export default IssuedClass;
