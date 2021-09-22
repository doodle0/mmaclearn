# 명문학원

명문학원 초/중급 및 기타 반 홈페이지입니다.

## 수정 권한

명문학원 선생님이면 홈페이지를 자유롭게 수정할 수 있습니다. 원장 선생님을 통해서 관리자에게 말씀 주시면 빠른 시일 내에 기여자 권한을 드리겠습니다.

기여자 권한이 없으셔도 관리자에게 문제 링크와 추가할 위치를 알려주시면 문제를 추가해 드리도록 하겠습니다.

## 페이지 구조

```
.
├── docs                    # 문서
│   ├── resources           # 문서에 첨부할 리소스 (사진)
│   └── ...
├── resources               # 페이지 표시에 필요한 리소스 (사진, CSS, JSON, ...)
│   ├── menus.json          # 사이드바 메뉴 표시에 필요한 정보
│   ├── begin_data.json     # 초급반 문제 정보 JSON 파일
│   ├── algo_data.json
│   ├── python_data.json
│   ├── style.css           # 기타 CSS
│   └── ...
├── index.html              # 홈페이지
├── begin.html              # 초급반 페이지
├── algo.html               # 알고리즘반 페이지
├── python.html             # 파이썬반 페이지
└── ...
```

### ./docs

알고리즘 개념 설명 문서, 자체제작 문제 등을 위한 .md(마크다운) 파일들을 보관하는 디렉토리입니다. 디렉토리 내에는 현재 하위 분류가 없는 상태입니다.
모든 .md 파일들은 Jekyll을 사용하여 자동으로 동명의 .html 문서로 변환됩니다. [(도큐멘테이션)](https://docs.github.com/en/github/working-with-github-pages/setting-up-a-github-pages-site-with-jekyll)

### ./resources/menus.json

사이드바 메뉴를 표시하기 위한 정보를 저장하는 JSON 파일입니다. 이 파일은 단 하나만 존재하며, 다음과 같은 구조로 되어 있습니다. 학원 홈페이지에 새로운 메뉴를 추가하고 싶으면 이 JSON 파일에 새 항목을 추가하면 됩니다.

```
[
    {
        "menu_id": "begin",                 # 메뉴 고유 ID
        "menu_name": "초급반",              # 사이드바와 페이지 상단에 표시되는 메뉴 이름
        "link": "begin.html",               # 메뉴를 눌렀을 때 연결되는 링크
        "problem_data": "begin_data.json"   # (선택적) 문제 정보 JSON 파일명
    },
    ...
]
```

**참고:** problem_data가 없을 경우 해당 페이지에 문제가 자동으로 표시되지 않습니다.

### ./resources/*_data.json (문제 정보 JSON 파일)

초급반, 알고리즘반 등의 페이지에서 각 챕터마다 개념과 문제를 저장하는 JSON 파일입니다.

```
[
    {
        "chapter_id": "ch-recursion",                   # 챕터 고유 ID
        "chapter_name": "재귀",                         # 챕터 제목
        "chapter_description": "재귀 및 백트래킹",      # (선택적) 챕터 설명
        "chapter_concepts": [                           # 챕터 개념 설명 문서 리스트
                                                        # (리스트 안의 내용물은 선택적)
            {
                "concept_title": "재귀 개념",           # 개념 문서 이름
                "link": "http://..."                    # 개념 문서 링크
            },
            ...
        ],
        "chapter_problems": [                   # 문제 리스트
            {
                "from": "더블릿",               # 문제 출처
                "name": "x의 y거듭제곱",        # 문제 이름
                "link": "http://..."            # 문제 링크
            },
            ...
        ]
    },
    ...
]
```

## CSS

모든 페이지에 CSS 코드는 최소화하고, 상기한 Jekyll 테마를 적용하거나 Bootstrap 프레임워크를 사용하는 것을 원칙으로 합니다. (2021.09.22.부로 W3-CSS 대신 부트스트랩을 사용합니다.)
