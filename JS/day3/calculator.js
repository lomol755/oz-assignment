// ===== 1. querySelector로 DOM 요소 가져오기 =====
const display = document.querySelector("#display");               // 계산기 화면
const buttons = document.querySelectorAll(".buttons button");      // 모든 버튼
const powerButton = document.querySelector(".on-off");            // ON/OFF 버튼

const OPERATORS = ["+", "-", "*", "/"];
let isOn = true;             // 계산기 전원 상태
let justCalculated = false;  // 방금 Enter로 계산했는지 여부

powerButton.classList.add("on"); // 처음엔 켜진 상태 (CSS의 .on-off.on → 초록색)


// ===== 2. 버튼 기능 함수 (HTML의 onclick에서 호출) =====

// ON/OFF 버튼
function togglePower() {
    isOn = !isOn;
    display.value = isOn ? "0" : "";
    justCalculated = false;
    powerButton.classList.toggle("on", isOn); // 켜지면 초록색, 꺼지면 회색
}

// C 버튼: 화면 초기화
function clearDisplay() {
    if (!isOn) return;
    display.value = "0";
    justCalculated = false;
}

// 숫자, 소수점 버튼
function appendNumber(num) {
    if (!isOn) return;

    // 계산 직후이거나 에러 상태면 새로 시작
    if (justCalculated || display.value === "Error") {
        display.value = "0";
        justCalculated = false;
    }

    if (num === ".") {
        // 지금 입력 중인 숫자에 이미 소수점이 있으면 무시
        const parts = display.value.split(/[+\-*/]/);
        const currentNumber = parts[parts.length - 1];
        if (currentNumber.includes(".")) return;

        // 연산자 바로 뒤에서 . 을 누르면 0. 으로 시작
        if (OPERATORS.includes(lastChar())) {
            display.value += "0.";
        } else {
            display.value += ".";
        }
        return;
    }

    // 화면이 0 하나뿐이면 새 숫자로 교체, 아니면 뒤에 이어붙이기
    if (display.value === "0") {
        display.value = num;
    } else {
        display.value += num;
    }
}

// 연산자 버튼 (+, -, *, /)
function appendOperator(operator) {
    if (!isOn) return;

    if (display.value === "Error") {
        display.value = "0";
    }
    justCalculated = false;

    // 연산자를 연달아 누르면 마지막 연산자를 교체
    if (OPERATORS.includes(lastChar())) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

// Enter 버튼: 계산 실행
function performCalculate() {
    if (!isOn) return;

    let expression = display.value;

    // 식이 연산자로 끝나면 마지막 연산자는 무시 (예: "3+5+" → "3+5")
    if (OPERATORS.includes(lastChar())) {
        expression = expression.slice(0, -1);
    }

    const result = calculate(expression);
    display.value = result === null ? "Error" : String(result);
    justCalculated = true;
}

// 마지막 한 글자 지우기 (키보드 Backspace용)
function deleteLast() {
    if (!isOn) return;

    if (justCalculated || display.value === "Error" || display.value.length <= 1) {
        display.value = "0";
        justCalculated = false;
        return;
    }
    display.value = display.value.slice(0, -1);
}

// 화면의 마지막 글자
function lastChar() {
    return display.value.slice(-1);
}


// ===== 3. 계산 로직 (2일차 계산기 재활용: *, / 를 먼저 계산) =====

// "3+5*2" → [3, "+", 5, "*", 2] 로 쪼개기
function tokenize(expression) {
    const tokens = [];
    let number = "";

    for (const char of expression) {
        if (OPERATORS.includes(char)) {
            // 숫자 시작 전의 '-'는 음수 부호 (예: 계산 결과가 -5일 때)
            if (char === "-" && number === "") {
                number = "-";
                continue;
            }
            if (number === "" || number === "-") return null;

            tokens.push(Number(number));
            tokens.push(char);
            number = "";
        } else {
            number += char;
        }
    }

    if (number === "" || number === "-") return null;
    tokens.push(Number(number));

    return tokens;
}

// 우선순위를 지켜서 계산
function calculate(expression) {
    const tokens = tokenize(expression);
    if (tokens === null) return null;

    // 1단계: *, / 먼저 계산
    const stack = [tokens[0]];
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const num = tokens[i + 1];

        if (operator === "*") {
            stack.push(stack.pop() * num);
        } else if (operator === "/") {
            if (num === 0) return null; // 0으로 나누기 → Error
            stack.push(stack.pop() / num);
        } else {
            stack.push(operator, num);
        }
    }

    // 2단계: +, - 를 왼쪽부터 계산
    let result = stack[0];
    for (let i = 1; i < stack.length; i += 2) {
        if (stack[i] === "+") {
            result += stack[i + 1];
        } else {
            result -= stack[i + 1];
        }
    }

    // 0.1 + 0.2 = 0.30000000000000004 같은 소수점 오차 정리
    return Math.round(result * 1e10) / 1e10;
}


// ===== 4. EventListener: 키보드로도 계산기 조작하기 =====
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if ("0123456789.".includes(key)) {
        appendNumber(key);
    } else if (OPERATORS.includes(key)) {
        appendOperator(key);
    } else if (key === "Enter" || key === "=") {
        event.preventDefault(); // 포커스된 버튼이 한 번 더 눌리는 것 방지
        performCalculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});


// ===== 5. EventListener: 마우스 감지 (버튼 위에 올리면 밝아지는 효과) =====
buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
        button.style.filter = "brightness(1.2)";
    });

    button.addEventListener("mouseleave", () => {
        button.style.filter = "";
    });
});
