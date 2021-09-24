function makeChapterCardHeader(chapterInfo) {
    let row = $('<div class="row">').append(
        $('<h3 class="col-auto m-0">')
            .text(chapterInfo.chapter_name)
    )
    if (chapterInfo.chapter_description) {
        row.append(
            $('<div class="col-auto align-self-end text-muted">')
                .text("— " + chapterInfo.chapter_description)
        )
    }
    return $('<div class="card-header">').append(row);
}
function makeChapterCardBody(chapterInfo) {
    if (!chapterInfo.chapter_concepts || !chapterInfo.chapter_concepts.length) return null;
    let body = $('<div class="card-body">');
    for (let concept of chapterInfo.chapter_concepts) {
        body.append(
            $('<a class="btn btn-outline-primary mx-1" role="button">')
                .attr("href", concept.link)
                .append('<i class="far fa-file">')
                .append("&nbsp;" + concept.concept_title)
        )
    }
    return body;
}
function makeChapterCardTable(chapterInfo) {
    if (!chapterInfo.chapter_problems || !chapterInfo.chapter_problems.length) return null;
    let table = $('<table class="table table-striped mb-0">').append(
        $('<thead><tr><th width="20%">번호</th><th>문제</th><th width="25%">출처</th></tr></thead>')
    )

    let tableBody = $('<tbody>');
    for (let pi in chapterInfo.chapter_problems) {
        let problem = chapterInfo.chapter_problems[pi];
        tableBody.append(
            $('<tr>')
                .append($('<td>').text(pi))
                .append(
                    $('<td>').append(
                        $('<a>').attr("href", problem.link).text(problem.name)
                    )
                )
                .append($('<td>').text(problem.from))
        )
    }

    return table.append(tableBody);
}

// 로컬에서 테스트할 때를 위해 명시적으로 깃허브 서버에서 리소스 가져옴
function resourceURL(resourcePath) {
    return "https://doodle0.github.io/mmac/" + resourcePath;
}

function onNavItemClick(e) {
    $("#chapter-nav .active").removeClass("active");
    $(e).addClass("active");
}

function problemPageScript(problemDataFile) {
    $.getJSON(resourceURL("resources/" + problemDataFile), function(problemData) {
        if (!problemData) return;

        let mainContainer = $("#main-container");

        // 상단 nav 만들기
        let chapterNav = $('<ul id="chapter-nav" class="nav nav-tabs justify-content-around">');
        mainContainer.before(chapterNav);

        for (let chapter of problemData) {
            // 내비게이션에 챕터 제목 추가
            chapterNav.append(
                $('<li class="nav-item">').append(
                    $('<a class="nav-link">')
                        .attr("href", "#" + chapter.chapter_id)
                        .attr("onclick", "onNavItemClick(this)")
                        .text(chapter.chapter_name)
                )
            );

            // 챕처마다 카드 추가
            let chapterCard =
                $('<div class="card card-default shadow-sm my-4">')
                    .attr("id", chapter.chapter_id)
                    .append(makeChapterCardHeader(chapter))
                    .append(makeChapterCardBody(chapter))
                    .append(makeChapterCardTable(chapter))

            mainContainer.append(chapterCard);
        }
        
        // 앵커가 헤더에 가려지지 않게 스크롤 위치 수정
        $('#chapter-nav .nav-link').click(function() {
            var divId = $(this).attr('href');
            $('html, body').animate({ scrollTop: $(divId).offset().top - $('#header-area').height() }, 100);
        });
    });
}

$(document).ready(function() {
    $.getJSON(resourceURL("resources/menus.json"), function(menus) {
        let sidebar = $("#sidebar-ul, #sidebar-lg-ul");
        for (let menu of menus) {
            // 구분선일 때
            if (menu.type == "hr") {
                sidebar.append($('<li class="my-1">'));
            }
            // 실제 메뉴일 때
            else {
                sidebar.append(
                    $("<li>").append(
                        $('<a>')
                            .addClass(
                                window.location.pathname.endsWith(menu.link)
                                    ? "nav-link active"
                                    : "nav-link link-dark"
                            )
                            .attr("href", menu.link)
                            .text(menu.menu_name)
                    )
                );

                // i가 현재 페이지를 가리키는 메뉴일 때
                // TODO: 제대로 고치기
                if (window.location.pathname.endsWith(menu.link)) {
                    $("#heading, #heading-lg").text($("#heading").text() + " - " + menu.menu_name);
                    document.title += " - " + menu.menu_name;
                    if (menu.problem_data) {
                        problemPageScript(menu.problem_data);
                    }
                }
            }
        }
    });

    // 맨 위로 가기 버튼
    $('#to-top-btn').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 100);
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $("#to-top-btn").removeClass('d-none');
        } else {
            $("#to-top-btn").addClass('d-none');
        }
    });
});