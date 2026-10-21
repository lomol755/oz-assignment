// ===== 설정 =====
const API_URL = "https://api4.binance.com/api/v3/ticker/24hr";
const STORAGE_KEY = "favoriteCoins";   // LocalStorage에 저장할 키 이름
const UPDATE_INTERVAL = 1000;          // 1초마다 업데이트


// ===== DOM 요소 가져오기 =====
const coinList = document.querySelector("#coin-list");
const searchInput = document.querySelector("#search");
const tabButtons = document.querySelectorAll(".tab");
const favCount = document.querySelector("#fav-count");
const emptyMessage = document.querySelector("#empty-message");
const statusDot = document.querySelector("#status-dot");
const statusText = document.querySelector("#status-text");


// ===== 상태(데이터) =====
let coins = [];                        // API에서 받아온 USDT 코인 목록
let previousPrices = {};               // 직전 가격 (반짝임 효과용)
let currentTab = "all";                // 현재 탭: "all" 또는 "favorites"
let favorites = loadFavorites();       // 관심항목 목록 (LocalStorage)
let isFetching = false;                // 요청이 겹치지 않게 막는 장치


// ===== LocalStorage: 관심항목 불러오기 / 저장하기 =====
function loadFavorites() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        return [];
    }
}

function saveFavorites() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.log("관심항목 저장 실패:", error);
    }
}

function toggleFavorite(symbol) {
    if (favorites.includes(symbol)) {
        favorites = favorites.filter((item) => item !== symbol); // 제거
    } else {
        favorites.push(symbol);                                   // 추가
    }
    saveFavorites();
    render();
}


// ===== API에서 가격 받아오기 (Fetch API) =====
async function fetchPrices() {
    if (isFetching) return; // 이전 요청이 아직 안 끝났으면 건너뛰기
    isFetching = true;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();

        // USDT 마켓만 + 거래가 있는 코인만 + 거래대금 큰 순으로 정렬
        coins = data
            .filter((coin) => coin.symbol.endsWith("USDT") && Number(coin.lastPrice) > 0)
            .map((coin) => ({
                symbol: coin.symbol,
                name: coin.symbol.replace(/USDT$/, ""),
                price: Number(coin.lastPrice),
                change: Number(coin.priceChangePercent),
                volume: Number(coin.quoteVolume),
            }))
            .sort((a, b) => b.volume - a.volume);

        setStatus("live", `실시간 · ${new Date().toLocaleTimeString("ko-KR")}`);
        render();
    } catch (error) {
        setStatus("error", "연결 실패 · 재시도 중...");
        console.log("가격 불러오기 실패:", error);
    } finally {
        isFetching = false;
    }
}


// ===== 화면 그리기 =====
function render() {
    const keyword = searchInput.value.trim().toUpperCase();

    // 1. 탭에 따라 목록 고르기
    let list = currentTab === "favorites"
        ? coins.filter((coin) => favorites.includes(coin.symbol))
        : coins;

    // 2. 검색어로 거르기
    if (keyword) {
        list = list.filter((coin) => coin.name.includes(keyword));
    }

    // 3. 표 만들기
    coinList.innerHTML = list.map((coin) => createRow(coin)).join("");

    // 4. 빈 화면 안내 문구
    if (coins.length === 0) {
        emptyMessage.textContent = "데이터를 불러오는 중이에요...";
    } else if (list.length === 0) {
        emptyMessage.textContent = currentTab === "favorites" && !keyword
            ? "☆ 별을 눌러 관심항목을 추가해보세요!"
            : "검색 결과가 없어요.";
    } else {
        emptyMessage.textContent = "";
    }

    favCount.textContent = favorites.length;

    // 5. 다음 비교를 위해 현재 가격 기억
    coins.forEach((coin) => {
        previousPrices[coin.symbol] = coin.price;
    });
}

// 코인 한 줄(tr) 만들기
function createRow(coin) {
    const isFavorite = favorites.includes(coin.symbol);
    const changeClass = coin.change > 0 ? "up" : coin.change < 0 ? "down" : "";
    const sign = coin.change > 0 ? "+" : "";

    // 직전 가격과 비교해서 오르면 초록, 내리면 빨강 반짝임
    const before = previousPrices[coin.symbol];
    let flash = "";
    if (before !== undefined && before !== coin.price) {
        flash = coin.price > before ? "flash-up" : "flash-down";
    }

    return `
        <tr>
            <td class="col-star">
                <button class="star ${isFavorite ? "on" : ""}" data-symbol="${coin.symbol}"
                    aria-label="${coin.name} 관심항목">${isFavorite ? "★" : "☆"}</button>
            </td>
            <td>
                <span class="coin-name">${coin.name}</span>
                <span class="coin-quote">/ USDT</span>
            </td>
            <td class="num ${flash}">${formatPrice(coin.price)}</td>
            <td class="num ${changeClass}">${sign}${coin.change.toFixed(2)}%</td>
            <td class="num col-volume">${formatVolume(coin.volume)}</td>
        </tr>
    `;
}


// ===== 숫자 보기 좋게 바꾸기 =====
function formatPrice(price) {
    const digits = price >= 1 ? 4 : 8; // 비싼 코인은 소수점 4자리, 싼 코인은 8자리까지
    return price.toLocaleString("en-US", { maximumFractionDigits: digits });
}

function formatVolume(volume) {
    return volume.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 2 });
}

function setStatus(type, text) {
    statusDot.className = `dot ${type}`;
    statusText.textContent = text;
}


// ===== EventListener =====

// 검색어 입력할 때마다 다시 그리기
searchInput.addEventListener("input", () => {
    render();
});

// 탭 전환
tabButtons.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabButtons.forEach((button) => button.classList.remove("active"));
        tab.classList.add("active");
        currentTab = tab.dataset.tab;
        render();
    });
});

// 별 버튼 클릭 (표 전체에 한 번만 등록: 이벤트 위임)
coinList.addEventListener("click", (event) => {
    const starButton = event.target.closest(".star");
    if (starButton) {
        toggleFavorite(starButton.dataset.symbol);
    }
});


// ===== 시작! =====
render();                                   // 처음 화면
fetchPrices();                              // 바로 한 번 불러오고
setInterval(fetchPrices, UPDATE_INTERVAL);  // 이후 1초마다 반복 (Timer API)
