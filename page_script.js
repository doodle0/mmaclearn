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
                .attr("href", "docs/" + concept.link)
                .append('<i class="far fa-file w3-large">')
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

function problemPageScript(problemDataFile) {
    $.getJSON("resources/" + problemDataFile, function(problemData) {
        if (!problemData) return;

        let mainContainer = $("#main-container");

        // 상단 nav 만들기
        let chapterNav = $('<ul id="chapter-nav" class="nav nav-pills justify-content-around">');
        mainContainer.append(chapterNav);

        for (let chapter of problemData) {
            console.log(chapter)
            // 내비게이션에 챕터 제목 추가
            chapterNav.append(
                $('<li class="nav-item">').append(
                    $('<a class="nav-link">')
                        .attr("href", "#" + chapter.chapter_id)
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
    });
}

// onLoad
$(function() {
    $.getJSON("resources/menus.json", function(menus) {
        let sidebar = $("#sidebar-ul");
        for (let menu of menus) {
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
                $("h1").text($("h1").text() + " - " + menu.menu_name);
                document.title += " - " + menu.menu_name;
                if (menu.problem_data) {
                    problemPageScript(menu.problem_data);
                }
            }
        }
    });
});