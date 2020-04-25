# 202012701_PIK

202012701 박인규 9주차 과제
===
DAY9. Sequelize 적용하기

1. 본인의 프로젝트에 Sequelize 적용하기.

2. 모델 추가해서 관계 적용하기
===




202012701 박인규 8주차 과제
===
DAY8. 데이터베이스 적용하기
===

## pug 방식에서 ejs 방식으로 사용해 보았습니다.




202012701 박인규 7주차 과제
===
DAY7. 프론트엔드를 추가한 웹 서비스 작성하기
===

#### 6주차에 작성한 JSON 기반의 서비스에 프론트엔드를 추가해서 웹 브라우저로 사용할 수 있도록 작성하시오.

##### - github Organizations(IDU-SW/2020-1)에 만든 본인의 Repositories에 작성

##### - 기존 내용에 추가로 작성 가능

##### - 인증샷 3개 올리기

##### - SmartClasss에 올리기

--------------

| 업무 구분 |        항목        |       URL       | METHOD |
| :-------: | :----------------: | :-------------: | :----: |
|   목록    | 커피 목록 전체보기 |     /coffees     |  GET   |
|   CRUD    | 커피 정보 상세보기 |   /coffees/ID    |  GET   |
|           | 커피 정보 추가 폼  |   /music/add     |  GET   |
|           |   커피 정보 추가   |     /coffees     |  POST  |
|           |   커피 정보 삭제   |   /coffees/ID    | DELETE |
|           | 커피 정보 수정 폼  | /coffees/edit/ID |  GET   |
|           |   커피 정보 수정   |   /coffees/ID    |  PUT   |

--------------

# 커피 목록 전체보기

# 요청

|    업무     | 커피 목록 전체보기 |
| :---------: | ------------------ |
|     URL     | /coffees            |
| 요청 메소드 | GET                |

# 응답

| 컨텐트 타입 | JSON                                                         |
| :---------: | ------------------------------------------------------------ |
| 메세지 구조 | - id : 커피 ID<br />- name : 커피이름<br />- volume : 용량<br />- calorie : 커피 칼로리<br />- caffeine : 커피 카페인 |
|  메세지 예  | {<br/>    "data": [<br/>        {<br/>            "id": 0,<br/>            "name": "카페 라떼",<br/>            "volume": "355ml",<br/>            "calorie": "110Kcal",<br/>            "caffeine": "75mg"<br/>        },<br/>        {<br/>            "id": 1,<br/>            "name": "콜드 브루",<br/>            "volume": "355ml",<br/>            "calorie": "5Kcal",<br/>            "caffeine": "150mg"<br/>        }<br/>    ],<br/>    "count": 2<br/>} |

--------------

# 커피 정보 상세보기

# 요청

|     업무      | 커피 정보 상세보기                                           |
| :-----------: | ------------------------------------------------------------ |
|      URL      | /coffees/ID                                                   |
|  요청 메소드  | GET                                                          |

# 응답

| 컨텐트 타입 | JSON                                                         |
| :---------: | ------------------------------------------------------------ |
| 메세지 구조 | - id : 커피 ID<br />- name : 커피이름<br />- volume : 용량<br />- calorie : 커피 칼로리<br />- caffeine : 커피 카페인 |
|  메세지 예  | {<br/>    "id": 1,<br/>    "name": "콜드 브루",<br/>    "volume": "355ml",<br/>    "calorie": "5Kcal",<br/>    "caffeine": "150mg"<br/>} |

--------------

# 커피 정보 추가

# 요청

| 업무          | 커피 정보 추가                                               |
| ------------- | ------------------------------------------------------------ |
| URL           | /coffees                                                     |
| 요청 메소드   | POST                                                         |
| 콘텐트 타입   | application/json                                             |
| 메세지 구조   | - **name : 커피이름**<br />- **volume : 용량**<br />- calorie : 커피 칼로리<br />- caffeine : 커피 카페인 |
| 요청메세지 예 | { <br/> "name" : "에스프레소",<br/> "volume" : "22ml",<br/> "calorie" : "5Kcal",<br/> "caffeine" : "150mg"<br/>} |

# 응답

| 컨텐트 타입 | JSON                                                         |
| ----------- | ------------------------------------------------------------ |
| 메세지 구조 | - msg : 성공/실패 메세지<br />- data<br />-- id : 커피 ID<br />-- name : 커피이름<br />-- volume : 용량<br />-- calorie : 커피 칼로리<br />-- caffeine : 커피 카페인 |
| 메세지 예   | {<br/>    "msg": "SUCCESS : 다음 내용을 추가하였습니다.",<br/>    "data": {<br/>        "id": 2,<br/>        "name": "에스프레소",<br/>        "volume": "22ml",<br/>        "calorie": "5Kcal",<br/>        "caffeine": "75mg"<br/>    }<br/>} |
--------------

# 커피 정보 삭제

#### 요청

| 업무        | 커피 정보 삭제 |
| ----------- | -------------- |
| URL         | /coffees/ID     |
| 요청 메소드 | DELETE         |


# 응답

| 컨텐트 타입 | JSON                                                         |
| ----------- | ------------------------------------------------------------ |
| 메세지 구조 | - msg : 성공/실패 메세지<br />- data<br />-- id : 삭제된 커피 ID<br />-- name : 삭제된 커피 이름<br />-- volume : 삭제된 커피 용량<br />-- calorie : 삭제된 커피 칼로리<br />-- caffeine : 삭제된 커피 카페인 |
| 메세지 예   | {<br/>    "msg" : "SUCCESS : 다음 내용이 삭제되었습니다.",<br/>    "data": {<br/>        "id": 4,<br/>        "name": "아메리카노",<br/>        "volume": "355ml",<br/>        "calorie": "10Kcal",<br/>        "caffeine": "150mg"<br/>    }<br/>} |

--------------

# 커피 정보 수정

# 요청

|     업무      | 커피 정보 수정                                               |
| :-----------: | ------------------------------------------------------------ |
|      URL      | /coffees/ID                                                   |
|  요청 메소드  | PUT                                                          |
|  콘텐트 타입  | application/json                                             |
|  메세지 구조  | - **name : 커피이름**<br />- **volume : 용량**<br />- calorie : 커피 칼로리<br />- caffeine : 커피 카페인 |
| 요청메세지 예 | { <br/> "name" : "에스프레소",<br/> "volume" : "22ml",<br/> "calorie" : "5Kcal",<br/> "caffeine" : "75mg"<br/>} |

# 응답

| 컨텐트 타입 | JSON                                                         |
| :---------: | ------------------------------------------------------------ |
| 메세지 구조 | - msg : 성공/실패 메세지<br />- data<br />-- id : 수정된 커피 ID<br />-- name : 수정된 커피 이름<br />-- volume : 수정된 커피 용량<br />-- calorie : 수정된 커피 칼로리<br />-- caffeine : 수정된 커피 카페인 |
|  메세지 예  | {<br/>    "msg": "SUCCESS, 2번의 내용이 변경되었습니다.",<br/>    "data": {<br/>        "id": 2,<br/>        "name": "에스프레소 콘파냐",<br/>        "volume": "32ml",<br/>        "calorie": "120Kcal",<br/>        "caffeine": "75mg"<br/>    }<br/>} |

