// 계산식 문자열을 숫자와 연산자로 쪼개는 함수
// 예: "3+5*2" → [3, "+", 5, "*", 2]
function tokenize(expression) {
    const tokens = [];
    let number = "";
    const text = expression.replaceAll(" ", ""); // 띄어쓰기 제거

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if ("+-*/".includes(char)) {
            // 숫자가 시작되기 전의 '-'는 음수 부호로 처리 (예: -3, 5*-2)
            if (char === "-" && number === "") {
                number = "-";
                continue;
            }
            // 연산자가 연달아 나오는 등 잘못된 식
            if (number === "" || number === "-") {
                return null;
            }
            const value = Number(number);
            if (Number.isNaN(value)) {
                return null;
            }
            tokens.push(value);
            tokens.push(char);
            number = "";
        } else if ("0123456789.".includes(char)) {
            number += char;
        } else {
            return null; // 숫자, 연산자 외의 문자
        }
    }

    // 마지막 숫자 처리
    const lastValue = Number(number);
    if (number === "" || number === "-" || Number.isNaN(lastValue)) {
        return null;
    }
    tokens.push(lastValue);

    return tokens;
}

// 사칙연산 계산기 (*, / 를 +, - 보다 먼저 계산)
function calculate(expression) {
    const tokens = tokenize(expression);

    if (tokens === null) {
        console.log("❌ 올바른 계산식이 아닙니다:", expression);
        return;
    }

    // 1단계: 곱셈(*), 나눗셈(/) 먼저 계산
    const stack = [tokens[0]];
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const num = tokens[i + 1];

        if (operator === "*") {
            stack.push(stack.pop() * num);
        } else if (operator === "/") {
            if (num === 0) {
                console.log("❌ 0으로 나눌 수 없습니다");
                return;
            }
            stack.push(stack.pop() / num);
        } else {
            stack.push(operator, num); // +, - 는 일단 보관
        }
    }

    // 2단계: 남은 덧셈(+), 뺄셈(-)을 왼쪽부터 계산
    let result = stack[0];
    for (let i = 1; i < stack.length; i += 2) {
        if (stack[i] === "+") {
            result += stack[i + 1];
        } else {
            result -= stack[i + 1];
        }
    }

    console.log(`${expression} = ${result}`);
    return result;
}

// 페이지를 열면 사용법과 예시를 콘솔에 출력
console.log("🧮 콘솔 계산기 준비 완료!");
console.log('사용법: calculate("계산식")');
calculate("3 + 5");
calculate("10 - 4 * 2");
calculate("2 + 3 * 4 - 10 / 5");
calculate("100 / 4 * 3 + 7 - 2 * 6");
calculate("1 + 2 * 3 - 4 / 2")
calculate("50 - 3 * 4 + 18 / 6 * 2 - 7 + 100 / 25")