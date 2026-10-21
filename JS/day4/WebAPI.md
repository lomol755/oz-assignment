# Web API 정리

## 1. Web API의 정의
Web API는 **브라우저가 JavaScript에게 기본으로 제공하는 기능 모음**이다.
JavaScript 언어 자체에는 화면을 바꾸거나, 시간을 재거나, 서버와 통신하는 기능이 없다.
이런 일들은 브라우저가 미리 만들어둔 Web API를 호출해서 처리한다.

- JavaScript = 요리사
- Web API = 주방에 갖춰진 조리 도구 (오븐, 타이머, 냉장고...)
- 요리사는 도구를 직접 만들지 않고, 있는 도구를 꺼내서 사용한다.

> `document`, `setTimeout`, `localStorage`, `fetch` 모두 JavaScript 문법이 아니라 **브라우저가 제공하는 Web API**이다.
> 그래서 브라우저 밖(Node.js)에서는 `document`나 `localStorage`를 사용할 수 없다.

## 2. Web API의 예시

### DOM API
HTML 문서의 요소를 찾고, 바꾸고, 만들고, 지우는 기능

```javascript
const title = document.querySelector("h1");      // 요소 찾기
title.textContent = "새 제목";                    // 내용 바꾸기
title.classList.add("active");                   // class 추가

const li = document.createElement("li");         // 요소 만들기
li.textContent = "새 항목";
document.querySelector("ul").appendChild(li);    // 화면에 붙이기

li.remove();                                     // 요소 지우기
```

### Event API
사용자의 행동(클릭, 입력, 키보드 등)을 감지하고 반응하는 기능

```javascript
const button = document.querySelector("button");

button.addEventListener("click", () => {
    console.log("클릭!");
});

document.querySelector("input").addEventListener("input", (event) => {
    console.log("입력값:", event.target.value);
});
```

- 과제 활용: 검색창 `input` 이벤트, 탭 `click` 이벤트, 관심 별 버튼 `click` 이벤트

### Timer API
정해진 시간 뒤에, 또는 일정 간격으로 코드를 실행하는 기능

| 함수 | 설명 |
|---|---|
| `setTimeout(함수, ms)` | ms 후에 **한 번** 실행 |
| `setInterval(함수, ms)` | ms마다 **반복** 실행 |
| `clearTimeout(id)` / `clearInterval(id)` | 예약 취소 |

```javascript
setTimeout(() => console.log("3초 뒤 실행"), 3000);

const timerId = setInterval(() => console.log("1초마다 실행"), 1000);
clearInterval(timerId); // 반복 멈추기
```

- 과제 활용: `setInterval(fetchPrices, 1000)`으로 1초마다 가격 업데이트

### Storage API
브라우저에 데이터를 저장하는 기능

| 종류 | 특징 |
|---|---|
| `localStorage` | 브라우저를 껐다 켜도 **계속 유지** |
| `sessionStorage` | 탭을 닫으면 **사라짐** |

```javascript
localStorage.setItem("name", "최현영");          // 저장
localStorage.getItem("name");                    // 읽기 → "최현영"
localStorage.removeItem("name");                 // 삭제
localStorage.clear();                            // 전체 삭제
```

- **문자열만 저장**할 수 있어서, 배열이나 객체는 `JSON`으로 변환해야 한다.
```javascript
const favorites = ["BTCUSDT", "ETHUSDT"];
localStorage.setItem("favorites", JSON.stringify(favorites));      // 배열 → 문자열
const saved = JSON.parse(localStorage.getItem("favorites"));       // 문자열 → 배열
```

- 과제 활용: 관심항목 목록을 저장해서 새로고침해도 유지

### Fetch API
서버에 요청을 보내고 응답(데이터)을 받아오는 기능

```javascript
// then 방식
fetch("https://api.example.com/data")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log("에러:", error));

// async / await 방식 (더 읽기 쉬움)
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("에러:", error);
    }
}
```

- `fetch`는 결과가 바로 오지 않기 때문에 **비동기(Promise)** 로 동작한다.
- `await`는 응답이 올 때까지 기다렸다가 다음 줄을 실행한다. (`async` 함수 안에서만 사용 가능)
- 과제 활용: Binance API에서 24시간 시세 데이터를 받아오기
