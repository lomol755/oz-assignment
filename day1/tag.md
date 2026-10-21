# HTML 태그 정리

## HTML이란?
HTML(HyperText Markup Language)은 웹 페이지의 구조(뼈대)를 만드는 언어이다.
`<태그>내용</태그>` 형태로 작성하며, 태그마다 정해진 의미와 역할이 있다.

## 1. 문서 구조 태그

### `<html>`
HTML 문서의 시작과 끝을 나타내는 최상위 태그. `lang` 속성으로 문서 언어를 지정한다.

### `<head>`
문서의 정보(메타데이터)를 담는 영역. 화면에 직접 보이지 않는다.
- `<meta charset="UTF-8">`: 문자 인코딩 설정 (한글 깨짐 방지)
- `<title>`: 브라우저 탭에 표시되는 제목
- `<link>`: 외부 CSS 파일 등을 연결

### `<body>`
실제로 화면에 보이는 내용이 들어가는 영역.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>문서 제목</title>
</head>
<body>
    화면에 보이는 내용
</body>
</html>
```

## 2. 텍스트 태그

### `<h1>` ~ `<h6>`
제목(Heading) 태그. 숫자가 작을수록 크고 중요한 제목이다.
`<h1>`은 보통 페이지에 한 번만 사용한다.

### `<p>`
문단(Paragraph)을 나타내는 태그. 앞뒤로 줄바꿈이 생긴다.

### `<hr>`
주제가 바뀌는 곳에 가로 구분선을 넣는 태그. 닫는 태그가 없는 빈 태그이다.

### `<a>`
다른 페이지나 사이트로 이동하는 링크(Anchor) 태그.
- `href`: 이동할 주소
- `target="_blank"`: 새 탭에서 열기

```html
<a href="https://github.com" target="_blank">GitHub</a>
```

## 3. 목록 태그

### `<ul>`
순서가 없는 목록(Unordered List). 항목 앞에 점(●)이 붙는다.

### `<ol>`
순서가 있는 목록(Ordered List). 항목 앞에 숫자(1, 2, 3)가 붙는다.

### `<li>`
목록의 각 항목(List Item). `<ul>`이나 `<ol>` 안에서 사용한다.

```html
<ul>
    <li>Python</li>
    <li>HTML</li>
</ul>

<ol>
    <li>첫 번째</li>
    <li>두 번째</li>
</ol>
```

## 4. 이미지 태그

### `<img>`
이미지를 넣는 태그. 닫는 태그가 없는 빈 태그이다.
- `src`: 이미지 파일 경로
- `alt`: 이미지가 안 보일 때 대신 표시되는 설명 (접근성에 중요)
- `width` / `height`: 이미지 크기

```html
<img src="profile.jpg" alt="프로필 사진" width="150">
```

## 5. 표 태그

| 태그 | 역할 |
|---|---|
| `<table>` | 표 전체를 감싸는 태그 |
| `<thead>` | 표의 머리글(제목 행) 영역 |
| `<tbody>` | 표의 본문(데이터) 영역 |
| `<tr>` | 표의 한 행(Table Row) |
| `<th>` | 제목 칸(Table Header), 기본적으로 굵고 가운데 정렬 |
| `<td>` | 데이터 칸(Table Data) |

```html
<table>
    <thead>
        <tr><th>기간</th><th>내용</th></tr>
    </thead>
    <tbody>
        <tr><td>2026.07</td><td>부트캠프 수강</td></tr>
    </tbody>
</table>
```

## 6. 폼 태그

### `<form>`
사용자 입력을 모아서 전송하는 영역.
- `action`: 데이터를 보낼 주소
- `method`: 전송 방식 (`get`, `post`)

### `<input>`
사용자 입력을 받는 태그. 닫는 태그가 없는 빈 태그이며, `type`에 따라 모양과 역할이 달라진다.
- `type="text"`: 한 줄 텍스트
- `type="email"`: 이메일 형식 검사
- `type="password"`: 입력값을 가려서 표시
- `placeholder`: 입력 전 보이는 안내 문구
- `required`: 필수 입력 항목으로 지정

### `<label>`
입력창의 이름표. `for` 속성을 `<input>`의 `id`와 맞추면, 라벨을 클릭해도 입력창이 선택된다.

### `<button>`
클릭할 수 있는 버튼. `type="submit"`이면 폼을 전송한다.

```html
<form action="mailto:example@email.com" method="post">
    <label for="email">이메일</label>
    <input type="email" id="email" placeholder="example@email.com" required>
    <button type="submit">보내기</button>
</form>
```
