# CSS 정리

## 1. CSS란?
CSS(Cascading Style Sheets)는 HTML 문서의 디자인(색상, 크기, 배치 등)을 지정하는 언어이다.
HTML이 웹 페이지의 뼈대라면, CSS는 그 위에 입히는 옷의 역할을 한다.

## 2. CSS 적용 방식

### Inline CSS
태그의 `style` 속성에 직접 작성하는 방식

```html
<p style="color: red;">안녕하세요</p>
```

- 장점: 특정 요소 하나만 빠르게 수정할 수 있음
- 단점: 재사용이 어렵고 코드가 지저분해짐

### Internal CSS
HTML 파일의 `<head>` 안 `<style>` 태그에 작성하는 방식

```html
<style>
  p { color: red; }
</style>
```

- 장점: 한 페이지 안의 스타일을 한곳에 모아서 관리할 수 있음
- 단점: 다른 페이지와 스타일을 공유할 수 없음

### External CSS
별도의 `.css` 파일을 만들고 `<link>` 태그로 연결하는 방식

```html
<link rel="stylesheet" href="style.css">
```

- 장점: 여러 페이지에서 재사용 가능, HTML(구조)과 CSS(디자인)를 분리할 수 있음
- 단점: 관리할 파일이 하나 더 생김

> 우선순위: Inline CSS가 가장 높고, Internal과 External은 나중에 작성된 것이 적용된다.

## 3. CSS Selector (선택자)
스타일을 적용할 HTML 요소를 골라내는 방법

| 선택자 | 문법 | 예시 |
|---|---|---|
| 전체 선택자 | `*` | `* { margin: 0; }` |
| 태그 선택자 | `태그명` | `p { color: blue; }` |
| 클래스 선택자 | `.클래스명` | `.card { padding: 10px; }` |
| 아이디 선택자 | `#아이디명` | `#github { color: gray; }` |
| 자손 선택자 | `A B` | `header h1 { font-size: 30px; }` |
| 가상 클래스 선택자 | `:hover` 등 | `a:hover { color: orange; }` |

- 클래스(`.`)는 여러 요소에 반복해서 사용할 수 있다.
- 아이디(`#`)는 한 페이지에서 하나의 요소에만 사용한다.

## 4. Style 속성

### 텍스트 관련
- `font-size`: 글자 크기 (예: `16px`, `x-large`)
- `font-weight`: 글자 두께 (`normal`, `bold`, `100`~`900`)
- `text-align`: 텍스트 정렬 (`left`, `center`, `right`)
- `color`: 글자 색상
- `text-decoration`: 밑줄 등 장식 (`none`, `underline`)

### Box Model
모든 HTML 요소는 박스 형태로 이루어져 있으며, 안쪽부터 아래 순서로 구성된다.

```
content → padding → border → margin
```

- `content`: 실제 내용(텍스트, 이미지)이 들어가는 영역
- `padding`: content와 border 사이의 안쪽 여백
- `border`: 요소의 테두리
- `margin`: 요소 바깥쪽 여백 (다른 요소와의 간격)
- `width` / `height`: 요소의 너비와 높이
- `box-sizing`: width와 height를 계산하는 기준
  - `content-box` (기본값): width가 content 영역의 크기만 의미함
  - `border-box`: width에 padding과 border까지 포함 → 크기 계산이 편해서 많이 사용함

```css
* {
    box-sizing: border-box;
}
```
