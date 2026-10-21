# JavaScript 기초 정리

## 1. 자료형 (Data Type)

| 자료형 | 설명 | 예시 |
|---|---|---|
| `number` | 숫자 (정수와 실수를 구분하지 않음) | `10`, `3.14`, `-5` |
| `string` | 문자열 (따옴표로 감쌈) | `"hello"`, `'안녕'` |
| `boolean` | 참 / 거짓 | `true`, `false` |
| `null` | 값이 **비어 있음**을 개발자가 의도적으로 표시 | `let data = null;` |
| `undefined` | 값이 **아직 할당되지 않음** | `let x;` → `undefined` |

- `number`에는 특별한 값 `NaN`(Not a Number)과 `Infinity`도 있다.
  - `"abc" * 2` → `NaN`
  - `10 / 0` → `Infinity`
- `null`과 `undefined` 차이
  - `null`: "비어 있다"고 일부러 넣은 값
  - `undefined`: 아무것도 넣지 않아서 비어 있는 상태

## 2. 변수 선언

### `let`
값을 **다시 바꿀 수 있는** 변수
```javascript
let age = 20;
age = 21; // 가능
```

### `const`
값을 **다시 바꿀 수 없는** 변수 (상수)
```javascript
const name = "최현영";
name = "홍길동"; // TypeError 발생
```

- 기본은 `const`로 선언하고, 값이 바뀌어야 할 때만 `let`을 사용하는 것이 좋다.
- 예전 방식인 `var`는 예상치 못한 동작이 많아 요즘은 잘 사용하지 않는다.

## 3. 연산

| 연산자 | 의미 | 예시 | 결과 |
|---|---|---|---|
| `+` | 더하기 | `7 + 2` | `9` |
| `-` | 빼기 | `7 - 2` | `5` |
| `*` | 곱하기 | `7 * 2` | `14` |
| `/` | 나누기 | `7 / 2` | `3.5` |
| `%` | 나머지 | `7 % 2` | `1` |

- Python과 달리 `/`는 항상 실수 나눗셈이다. (몫만 구하는 `//` 연산자가 없음)
- `%`는 짝수/홀수 판별에 자주 쓴다. → `n % 2 === 0`이면 짝수

### `Math` 내장 객체
수학 계산을 도와주는 기능 모음

```javascript
Math.round(4.5);    // 5   반올림
Math.floor(4.9);    // 4   내림
Math.ceil(4.1);     // 5   올림
Math.abs(-7);       // 7   절댓값
Math.max(1, 5, 3);  // 5   최댓값
Math.min(1, 5, 3);  // 1   최솟값
Math.pow(2, 3);     // 8   거듭제곱 (2 ** 3 과 같음)
Math.sqrt(16);      // 4   제곱근
Math.random();      // 0 이상 1 미만의 랜덤 실수
```

## 4. 비교 연산

### 대소 비교
```javascript
5 > 3;   // true
5 < 3;   // false
5 >= 5;  // true
5 <= 4;  // false
```

### `==` vs `===`
| 연산자 | 이름 | 비교 대상 | 예시 |
|---|---|---|---|
| `==` | 동등 연산자 | **값만** 비교 (타입을 자동 변환) | `1 == "1"` → `true` |
| `===` | 일치 연산자 | **값 + 타입** 비교 | `1 === "1"` → `false` |

- `==`는 자동 타입 변환 때문에 헷갈리는 결과가 나올 수 있어서, 실무에서는 `===`를 사용한다.
- 다르다를 비교할 때도 `!=` 대신 `!==`를 사용한다.

### `typeof` 타입 확인
```javascript
typeof 10;          // "number"
typeof "hello";     // "string"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof null;        // "object" ← JavaScript의 유명한 오래된 버그
```

## 5. 논리 연산

| 연산자 | 이름 | 설명 | 예시 |
|---|---|---|---|
| `&&` | AND | 둘 다 참일 때만 참 | `true && false` → `false` |
| `\|\|` | OR | 하나라도 참이면 참 | `true \|\| false` → `true` |
| `!` | NOT | 참/거짓을 뒤집음 | `!true` → `false` |

```javascript
const age = 25;
age >= 20 && age < 30;  // true  (20대인가?)
age < 10 || age > 60;   // false
```

## 6. 문자열 연산

### `+` 이어붙이기
```javascript
"Hello" + " " + "World";  // "Hello World"
```

### 템플릿 리터럴
백틱(`` ` ``)으로 감싸고 `${변수명}`으로 값을 끼워 넣는다.
```javascript
const name = "최현영";
const job = "백엔드 개발자";
console.log(`저는 ${name}이고, ${job}를 꿈꿉니다.`);
```
- `+`로 이어붙이는 것보다 읽기 쉽고, 줄바꿈도 그대로 쓸 수 있다.
- `${}` 안에는 계산식도 넣을 수 있다. → `` `합계: ${3 + 4}` ``

### number + string 연산 (Python과의 차이)
| 코드 | JavaScript | Python |
|---|---|---|
| `"5" + 3` | `"53"` (숫자를 문자열로 바꿔서 이어붙임) | `TypeError` 발생 |
| `"5" - 3` | `2` (문자열을 숫자로 바꿔서 계산) | `TypeError` 발생 |
| `"5" * 3` | `15` | `"555"` (문자열 반복) |

- JavaScript는 타입이 달라도 **자동으로 형 변환**해서 어떻게든 계산한다.
- Python은 타입이 다르면 **에러를 내서** 실수를 미리 막아준다.
- 그래서 JavaScript에서는 `Number("5")`, `String(3)`처럼 직접 변환해주는 습관이 중요하다.

## 7. 조건문

JavaScript에는 Python의 `elif`가 없고, 대신 **`else if`** 를 사용한다.

```javascript
const score = 85;

if (score >= 90) {
    console.log("A");
} else if (score >= 80) {   // Python의 elif
    console.log("B");
} else {
    console.log("C");
}
```
- 조건은 `( )` 안에, 실행할 코드는 `{ }` 안에 쓴다.
- Python처럼 들여쓰기가 아니라 **중괄호**로 영역을 구분한다.

## 8. 반복문

### `for`
반복 횟수가 정해져 있을 때
```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}
```
- `(시작값; 조건; 증감)` 순서로 작성한다.

배열을 돌 때는 `for...of`가 편하다.
```javascript
const fruits = ["사과", "바나나", "포도"];
for (const fruit of fruits) {
    console.log(fruit);
}
```

### `while`
조건이 참인 동안 계속 반복
```javascript
let count = 3;
while (count > 0) {
    console.log(count);  // 3, 2, 1
    count--;
}
```
- 조건이 영원히 참이면 무한 루프에 빠지니 주의!

## 9. 배열 (Array)

### 사용법
여러 값을 순서대로 담는 자료형. 인덱스는 0부터 시작한다.
```javascript
const skills = ["Python", "HTML", "CSS"];

skills[0];       // "Python"   읽기
skills[1] = "JS"; //           수정
skills.length;   // 3          길이
```

### 활용
```javascript
const nums = [1, 2, 3];

nums.push(4);          // 맨 뒤에 추가 → [1, 2, 3, 4]
nums.pop();            // 맨 뒤 제거   → [1, 2, 3]
nums.unshift(0);       // 맨 앞에 추가 → [0, 1, 2, 3]
nums.shift();          // 맨 앞 제거   → [1, 2, 3]
nums.includes(2);      // true        포함 여부
nums.indexOf(3);       // 2           위치 찾기
nums.join("-");        // "1-2-3"     문자열로 합치기

nums.map((n) => n * 2);      // [2, 4, 6]  모든 값 변환
nums.filter((n) => n > 1);   // [2, 3]     조건에 맞는 값만
```
- `const`로 선언한 배열도 **안의 값은 바꿀 수 있다.** (배열 자체를 다른 배열로 바꾸는 것만 안 됨)

## 10. 객체 (Object)

### 선언 방법
`{ 키: 값 }` 형태로 관련된 데이터를 묶는다. (Python의 딕셔너리와 비슷)
```javascript
const person = {
    name: "최현영",
    job: "백엔드 개발자",
    age: 20
};
```

### 다루는 방법

**속성 읽기**
```javascript
person.name;       // "최현영"  (점 표기법)
person["job"];     // "백엔드 개발자"  (대괄호 표기법)
```

**속성 추가하기**
```javascript
person.github = "lomol755";
```

**속성 수정하기**
```javascript
person.age = 21;
```

**속성 제거하기**
```javascript
delete person.age;
```

**속성이 있는지 확인하기 (`in`)**
```javascript
"name" in person;  // true
"age" in person;   // false (위에서 삭제했으므로)
```

- 키 이름이 변수에 담겨 있거나 띄어쓰기가 있으면 대괄호 표기법을 사용한다.
  ```javascript
  const key = "name";
  person[key];  // "최현영"
  ```
