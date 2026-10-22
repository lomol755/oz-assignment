# 2일차 Git Branch 전략

## 1. 브랜치 전략이란?

여러 명이 하나의 저장소에서 같이 작업할 때 **브랜치를 어떻게 만들고, 어떻게 합칠지 정한 규칙**이다.

- 각자 다른 브랜치에서 작업하니까 서로 코드를 덮어쓰지 않는다
- 기능 단위로 작업을 나눠서 추적하기 쉽다
- 문제가 생기면 그 작업만 되돌릴 수 있다

> 🍳 **비유: 브랜치 = 내 조리대**
> 한 주방(저장소)에서 요리사 여러 명이 한 냄비에 동시에 재료를 넣으면 요리가 엉망이 된다.
> 그래서 각자 **자기 조리대(브랜치)** 에서 요리하고, 다 되면 검사받고 **완성 접시(main)** 에 올린다.

대표적인 전략은 **Git Flow**와 **GitHub Flow** 두 가지다.

### 자주 나오는 용어 비유

| 용어 | 뜻 | 비유 |
|---|---|---|
| Branch | 독립된 작업 공간 | 원본 문서를 복사한 내 사본 |
| Commit | 변경 내용 저장 | 게임 세이브 포인트 |
| Push | 원격 저장소에 올리기 | 내 사본을 공유 폴더에 업로드 |
| Pull | 원격의 최신 내용 받기 | 공유 폴더의 최신본 다운로드 |
| PR (Pull Request) | 합쳐도 되는지 요청 | 보고서 결재 올리기 |
| Review | 코드 검토 | 선배가 결재 전 검토하기 |
| Merge | 브랜치 합치기 | 결재 완료 후 원본에 반영 |

---

## 2. Git Flow

Vincent Driessen이 제안한 전략으로, 브랜치를 역할별로 나눠서 **체계적으로 버전을 관리**한다.

### 브랜치 종류

| 브랜치 | 역할 |
|---|---|
| `main` | 실제로 배포된 최종 코드 |
| `develop` | 개발 중인 기능들을 모으는 브랜치 |
| `feature/*` | 새로운 기능 개발 |
| `release/*` | 배포 전 테스트, 버그 수정 |
| `hotfix/*` | 배포 후 생긴 긴급 버그 수정 |

### 작업 흐름

1. `develop`에서 `feature` 브랜치를 만들어 기능을 개발한다
2. 개발이 끝나면 PR → 리뷰 → `develop`에 Merge
3. 배포할 때가 되면 `develop`에서 `release` 브랜치를 만들어 테스트한다
4. 테스트가 끝나면 `release`를 `main`과 `develop`에 Merge하고 배포한다
5. 배포 후 급한 버그는 `main`에서 `hotfix`를 만들어 고치고 `main`, `develop`에 Merge한다

> 🍽️ **비유: 큰 레스토랑 주방**
> - `main` = 손님 테이블에 나간 요리
> - `develop` = 주방에서 준비 중인 요리들
> - `feature` = 요리사 각자의 조리대
> - `release` = 서빙 전 셰프가 맛보고 점검하는 단계
> - `hotfix` = 손님 테이블에서 문제가 생겨 급히 바꿔주는 것
>
> 단계가 많아서 느리지만, 손님에게 이상한 요리가 나갈 일이 적다.

### 장단점

- 👍 배포 버전과 개발 버전이 확실히 나뉘어서 안정적이다
- 👎 브랜치가 많아서 복잡하다 → 작은 팀, 짧은 프로젝트에는 과하다

---

## 3. GitHub Flow

GitHub에서 제안한 전략으로, **`main` + `feature` 브랜치 두 개만** 쓰는 단순한 방식이다.

### 브랜치 종류

| 브랜치 | 역할 |
|---|---|
| `main` | 항상 배포 가능한 상태를 유지하는 기본 브랜치 |
| `feature/*` | 모든 작업(기능 추가, 버그 수정 등) |

### 작업 흐름

1. `main`에서 `feature` 브랜치를 만든다
2. 작업 후 commit, push
3. PR을 만들어 팀원에게 리뷰를 요청한다
4. 리뷰 승인(Approve)을 받으면 `main`에 Merge

> 🚚 **비유: 푸드트럭**
> 요리사가 메뉴를 만들면(feature) 사장님이 바로 맛보고(Review) OK면 바로 판매(main)한다.
> 점검 단계가 적어서 빠르지만, 사장님이 대충 맛보면 맛없는 메뉴가 그대로 나갈 수 있다.

### 장단점

- 👍 단순해서 배우기 쉽고 빠르게 개발할 수 있다
- 👎 `main`에 바로 합쳐지므로 리뷰를 꼼꼼히 하지 않으면 위험하다

---

## 4. 한눈에 비교

| | Git Flow | GitHub Flow |
|---|---|---|
| 브랜치 | main, develop, feature, release, hotfix | main, feature |
| 복잡도 | 복잡함 | 단순함 |
| 배포 | 버전 단위로 정해진 절차 | 수시로 빠르게 |
| 어울리는 곳 | 대규모 프로젝트 | 소규모 팀, 짧은 프로젝트 |

---

## 5. 우리 팀의 선택: GitHub Flow

**이유**
- 팀 규모가 작고 프로젝트 기간이 짧다
- Git 협업이 처음이라 PR → 리뷰 → Merge 흐름부터 익히는 게 좋다

### 규칙

- 브랜치 이름: `feature/기능명` (예: `feature/user-api`)
- 커밋 메시지: `feat:` 기능 추가 / `fix:` 버그 수정 / `docs:` 문서 수정
- `main`에 직접 push 하지 않고 반드시 PR로 합친다
- 팀원 1명 이상 Approve 후 Merge
- Merge가 끝난 브랜치는 삭제한다

### 작업 순서

```bash
# 1. main 최신화
git switch main
git pull origin main

# 2. 작업 브랜치 만들기
git switch -c feature/기능명

# 3. 작업 후 커밋
git add .
git commit -m "feat: 기능 설명"

# 4. 원격에 올리기
git push origin feature/기능명

# 5. GitHub에서 PR 생성 → 리뷰 → Merge

# 6. 정리
git switch main
git pull origin main
git branch -d feature/기능명
```

---

## 6. 충돌(Conflict)이 나면?

같은 파일의 같은 줄을 두 사람이 고치면 충돌이 난다.

> 📝 **비유: 같은 문장을 두 사람이 다르게 고친 공유 문서**
> A는 "안녕하세요"로, B는 "반갑습니다"로 고쳤다면 Git은 어느 쪽이 맞는지 모른다.
> 그래서 사람에게 "둘 중 뭘 쓸지 골라줘!" 하고 물어보는 게 충돌이다.

파일을 열면 이렇게 표시된다.

```
<<<<<<< HEAD
print("hello")   ← 이미 반영된 코드
=======
print("hi")      ← 내가 고친 코드
>>>>>>> feature/login
```

**해결 방법**
1. 맞는 코드만 남기고 `<<<<<<<`, `=======`, `>>>>>>>` 줄은 지운다
2. `git add 파일명`
3. `git commit` (rebase 중이었다면 `git rebase --continue`)

> 헷갈리면 혼자 고치지 말고 그 코드를 쓴 팀원과 같이 확인하기!

---

## 참고자료

- [주니어 개발자의 현업에서 배운 Git Flow](https://velog.io/@myoungji-kim/git-flow)
- [Git Branch 전략 비교 - Git Flow vs GitHub Flow](https://devocean.sk.com/blog/techBoardDetail.do?ID=165571&boardType=techBlog)
- [사례로 이해하는 GitHub Flow](https://www.heropy.dev/p/6hdJi6)
