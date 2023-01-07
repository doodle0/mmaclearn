# 명문온라인

명문학원 초/중급 및 기타 반 문제풀이용 [사이트](https://doodle0.github.io/mmaclearn/)입니다.

## 수정 권한

명문학원 선생님이면 사이트를 자유롭게 수정할 수 있습니다. 원장 선생님을 통해서 관리자에게 말씀 주시면 빠른 시일 내에 기여자 권한을 드리겠습니다.

기여자 권한이 없으셔도 관리자에게 추가할 문제의 링크와 추가할 위치를 알려주시면 문제를 추가해 드리도록 하겠습니다.

## 사이트 제작 방식

2023.01.07.부로 Jekyll 테마뿐만이 아닌 정식 Jekyll 프레임워크를 사용합니다.

[학원 홈페이지](https://github.com/doodle0/mmac)와 마찬가지로 Jekyll을 사용합니다. 아래 [사이트 구조](#사이트-구조)에서 설명하지 않는 파일에 대한 정보는 [Jekyll 도큐멘테이션](https://jekyllrb.com/docs/)을 확인하면 높은 가능성으로 얻을 수 있습니다.

## 사이트 구조

```
.
├── _data                       # 페이지 표시에 필요한 데이터
│   ├── problem_chapters        # 문제 정보 JSON 파일
│   │   ├── begin_data.json     # 초급반 문제 정보 JSON 파일
│   │   ├── algo_data.json      # 알고리즘반 문제 정보 JSON 파일
│   │   ├── python_data.json    # ...
│   │   └── ...
│   ├── custom_menus.json       # 커스텀 메뉴에 대한 정보
│   └── menu_layout.json        # 상단 내비게이션 바 표시에 필요한 정보
├── docs                        # 문서
│   ├── assets                  # 문서에 첨부할 자료 (사진)
│   └── ...
├── problems
│   ├── begin.html              # 초급반 문제 표시 페이지
│   ├── algo.html               # 알고리즘반 문제 표시 페이지
│   ├── python.html             # ...
│   └── ...
├── index.html                  # 홈화면
└── ...
```

### /_data/menu_layout.json

사이트 상단 메뉴바에서 메뉴를 어떻게 표시할지를 정하는 파일입니다. 배열의 각 요소는 각 페이지의 고유 ID를 나타내는 문자열 또는 `"-"`입니다.

```json
[ "home", "-", "begin", "algo", "python", "-", "ref" ]
```

- 페이지 고유 ID는 `<페이지명>.html` 파일의 [front matter](https://jekyllrb.com/docs/front-matter/) 중 `menu_id` 속성을 통해 정해집니다. 예를 들어, 위 배열의 첫 요소는 `home`입니다. `/index.html`의 front matter를 확인해 보면 `menu_id: home`이라고 되어 있으므로, 내비게이션 바를 만드는 내부 코드가 이를 인식하여 이 페이지를 내비게이션 바의 첫 칸에 추가하게 됩니다.

- 만약 외부 사이트에 대한 링크를 걸고 싶다면, [custom_menus.json 파일](#_datacustom_menusjson)에 추가하면 됩니다.

- `"-"`가 있는 위치에는 구분선이 들어갑니다.

### /_data/custom_menus.json

현재 사이트 안에 있는 페이지가 아닌 외부 사이트로 이동하는 링크를 만들고자 할 때 사용합니다.

```json
{
    "ref": {
        "title": "참고자료",
        "url": "https://drive.google.com/drive/folders/1AKzLbQDBmO5GXQyddUQEs0b3nIKk_-9b?usp=sharing"
    },
    /* ... */
}
```

### /_data/problem_chapters/*.json (문제 정보 JSON 파일)

초급반, 알고리즘반 등의 페이지에서 각 챕터마다 개념과 문제를 저장하는 JSON 파일입니다. 파일명은 `<문제를 표시할 페이지의 고유 ID>.json`이어야 정상적으로 인식됩니다.

```json
[
    {
        "id": "ch-recursion",                   // 챕터 고유 ID
        "title": "재귀",                        // 챕터 제목
        "description": "재귀 및 백트래킹",      // (optional) 챕터 설명
        "concepts": [                           // (optional) 챕터 개념 설명 문서 리스트
            {
                "title": "재귀 개념",           // 개념 문서 이름
                "link": "http://..."            // 개념 문서 링크
            },
            // ...
        ],
        "problems": [                           // 문제 리스트
            {
                "from": "더블릿",               // 문제 출처
                "name": "x의 y거듭제곱",        // 문제 이름
                "link": "http://..."            // 문제 링크
            },
            // ...
        ]
    },
    // ...
]
```

### /docs

알고리즘 개념 설명 문서, 자체제작 문제 등을 위한 .md(마크다운) 파일들을 보관하는 디렉토리입니다. 디렉토리 내에는 현재 하위 분류가 없는 상태입니다.

front matter가 있는 .md 파일들은 Jekyll 빌드 과정에서 자동으로 동명의 .html 문서로 변환됩니다.

### /problems/*.html

문제를 표시하는 페이지입니다. 각 반(초급반, 알고리즘반 등)마다 별도의 .html 파일을 사용합니다. 특별한 내용물을 넣을 필요는 없지만, 다음에 주의해야 문제가 화면에 제대로 자동으로 표시됩니다.

- `layout`을 반드시 `problems`로 설정해야 합니다.

- `menu_id`는 페이지의 고유 ID입니다. 이 페이지에 띄울 [문제 정보 파일](#_dataproblem_chaptersjson-문제-정보-json-파일)의 제목은 반드시 `<이 ID>.json`이어야 합니다.

```html
---
title: "알고리즘 고급"
layout: problems
menu_id: "advanced"
---
```

## CSS

모든 페이지에 CSS 코드는 최소화하고, 상기한 Jekyll 테마를 적용하거나 Bootstrap 프레임워크를 사용하는 것을 원칙으로 합니다. (2021.09.22.부로 W3-CSS 대신 부트스트랩을 사용합니다.)
