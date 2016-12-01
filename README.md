
## 설치
  ```
  git clone git@gitlab.com:toycode/sample-erp.git
  cd sample-erp
	```
	ForSite : 클라이언트
	server : 백엔드
	각 폴더에 들어가서 npm install 해주시면 됩니다.
	```
	cd ForSite
  npm install
	npm start

	cd server
  npm install
	npm run dev

  ```

## 서버 실행
  * 서버 시작
  ```
  npm start
  ```
  * 개발 환경에서의 실행
    * mongodb 실행
    ```
    mongod --dbpath ./db
    ```

## local 주소
	* ForSite : http://localhost:8080/
	* server : http://localhost:3090/

## 사용된 라이브러리
* [redux](http://dobbit.github.io/redux/)
* [webpack](https://webpack.github.io/)
* [Babel](http://babeljs.io/)
* [passport](http://passportjs.org/j)
* [jwt](http://jwt.io/)
* [axios](https://github.com/mzabriskie/axios)
* [mongod](https://www.mongodb.com)
* [mongoose](http://mongoosejs.com/)


## TODO
* 회원가입 폼 상세
* User 모델 스키마 정의
* Feature 구도
