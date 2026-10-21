# JavaScript DOM 조작법 정리

## 1. DOM(Document Object Model)이란?
DOM은 브라우저가 HTML 문서를 읽어서 만든 **객체 형태의 트리 구조**이다.
JavaScript는 이 DOM을 통해 HTML 요소를 찾고, 내용을 바꾸고, 새로 만들거나 지울 수 있다.

```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1
        └── div
            └── button
```

- HTML 파일 = 설계도
- DOM = 그 설계도로 브라우저가 실제로 지어놓은 건물
- JavaScript = 그 건물을 리모델링하는 작업자

## 2. Selector(선택자)로 DOM 요소 가져오기

| 메서드 | 설명 | 반환값 |
|---|---|---|
| `document.getElementById("id")` | id로 요소 1개 찾기 | 요소 1개 |
| `document.querySelector("선택자")` | CSS 선택자로 **첫 번째** 요소 찾기 | 요소 1개 |
| `document.querySelectorAll("선택자")` | CSS 선택자로 **모든** 요소 찾기 | NodeList (배열 비슷한 목록) |

```javascript
const display = document.querySelector("#display");         // id 선택
const firstButton = document.querySelector(".number");      // class 선택 (첫 번째만)
const allNumbers = document.querySelectorAll(".number");    // class 선택 (전부)
const title = document.querySelector("h1");                 // 태그 선택
```

- `querySelector`는 CSS에서 쓰던 선택자(`#id`, `.class`, `태그`)를 그대로 사용할 수 있어서 편하다.

### 가져온 요소 다루기
```javascript
display.value = "0";                    // input의 값 바꾸기
title.textContent = "새 제목";           // 글자 바꾸기
title.style.color = "red";              // 스타일 바꾸기
title.classList.add("active");          // class 추가
title.classList.remove("active");       // class 제거
title.classList.toggle("active");       // 있으면 제거, 없으면 추가
```

## 3. Event란?
Event(이벤트)는 웹 페이지에서 일어나는 **사용자의 행동이나 브라우저의 상황 변화**이다.

| 종류 | 이벤트 | 발생 시점 |
|---|---|---|
| 마우스 | `click` | 클릭했을 때 |
| | `mouseenter` / `mouseleave` | 마우스가 요소에 들어오거나 나갈 때 |
| | `mousemove` | 마우스가 움직일 때 |
| 키보드 | `keydown` / `keyup` | 키를 누를 때 / 뗄 때 |
| 폼 | `input` | 입력값이 바뀔 때 |
| | `submit` | 폼을 제출할 때 |
| 페이지 | `DOMContentLoaded` | HTML을 다 읽었을 때 |

## 4. EventListener(이벤트 리스너)

### EventListener란?
특정 요소에서 **이벤트가 발생하기를 기다리고 있다가**, 발생하면 정해둔 함수를 실행하는 기능이다.
"이 버튼이 클릭되면 이 일을 해줘"라고 미리 등록해두는 것.

### 사용하는 목적, 이유
- **HTML과 JavaScript의 분리**: `onclick="..."`처럼 HTML에 코드를 섞지 않아도 된다.
- **여러 개 등록 가능**: 하나의 요소에 같은 이벤트를 여러 개 연결할 수 있다.
- **다양한 이벤트 처리**: 클릭뿐 아니라 키보드, 마우스 이동, 스크롤 등 모든 이벤트에 사용할 수 있다.
- **이벤트 정보 활용**: 어떤 키를 눌렀는지, 마우스가 어디 있는지 등을 `event` 객체로 받을 수 있다.

### EventListener 정의하기
```javascript
요소.addEventListener("이벤트이름", 실행할함수);
```

```javascript
const button = document.querySelector("#myButton");

button.addEventListener("click", function () {
    console.log("버튼이 클릭됐어요!");
});
```

### EventListener 응용

**① 여러 버튼에 한 번에 등록하기**
```javascript
const numberButtons = document.querySelectorAll(".number");

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(button.textContent + " 클릭!");
    });
});
```

**② event 객체 활용하기 (키보드 입력 감지)**
```javascript
document.addEventListener("keydown", (event) => {
    console.log("누른 키:", event.key);

    if (event.key === "Enter") {
        event.preventDefault(); // 브라우저의 기본 동작 막기
        console.log("계산 실행!");
    }
});
```

**③ 이벤트 제거하기**
```javascript
function sayHello() {
    console.log("Hello");
}
button.addEventListener("click", sayHello);
button.removeEventListener("click", sayHello);
```

## 5. 마우스 감지란?
마우스의 움직임, 위치, 클릭 등을 이벤트로 감지해서 반응하는 것이다.

| 이벤트 | 설명 |
|---|---|
| `click` | 클릭 |
| `dblclick` | 더블클릭 |
| `mousedown` / `mouseup` | 마우스 버튼을 누를 때 / 뗄 때 |
| `mouseenter` / `mouseleave` | 요소 안으로 들어올 때 / 나갈 때 |
| `mouseover` / `mouseout` | 위와 비슷하지만 자식 요소에서도 발생 |
| `mousemove` | 요소 위에서 움직일 때 |

### 마우스 감지 사용
**버튼에 마우스를 올리면 밝아지는 효과** (계산기 과제에 적용)
```javascript
const buttons = document.querySelectorAll(".buttons button");

buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
        button.style.filter = "brightness(1.2)";
    });
    button.addEventListener("mouseleave", () => {
        button.style.filter = "";
    });
});
```

**마우스 좌표 출력하기**
```javascript
document.addEventListener("mousemove", (event) => {
    console.log(`x: ${event.clientX}, y: ${event.clientY}`);
});
```

## 6. 화살표 함수란?
`function` 키워드 대신 `=>`(화살표)를 사용해서 함수를 **더 짧게** 쓰는 문법이다.

```javascript
// 일반 함수
function add(a, b) {
    return a + b;
}

// 화살표 함수
const add = (a, b) => {
    return a + b;
};

// 한 줄이면 중괄호와 return 생략 가능
const add = (a, b) => a + b;

// 매개변수가 1개면 괄호 생략 가능
const double = n => n * 2;

// 매개변수가 없으면 빈 괄호
const sayHi = () => console.log("Hi");
```

### 화살표 함수 사용
이벤트 리스너나 배열 메서드처럼 **함수를 전달해야 하는 곳**에서 특히 많이 쓴다.

```javascript
// 이벤트 리스너
button.addEventListener("click", () => {
    console.log("클릭!");
});

// 배열 메서드
const nums = [1, 2, 3];
const doubled = nums.map((n) => n * 2);       // [2, 4, 6]
const evens = nums.filter((n) => n % 2 === 0); // [2]
```

- 주의: 화살표 함수는 자신만의 `this`를 가지지 않는다. 그래서 객체의 메서드를 만들 때는 일반 함수를 쓰는 것이 안전하다.
