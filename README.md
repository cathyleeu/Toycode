## 이번주 꼭 해야할 것
  * total 받아오기 => 각 상품에 주문에 따라 수량 및 계산된 가격 data
  * 회원가입 및 로그인 auth 리팩토링

## 설치
  * 서버 설치
  ```
  git clone git@gitlab.com:toycode/sample-erp.git
  cd sample-erp
	```
  * 각 폴더에서 npm install 후 실행
    * ForSite : 클라이언트실행
  	```
  	cd ForSite
    npm install
  	npm start
    ```
    * server : 백엔드실행
    ```
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


## 장기적으로 해야할 것
  * User 모델 스키마 정의
  * 고객지원 페이지 
  * 매터리얼 디자인 적용