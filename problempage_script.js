function makeChapterCardHeader(chapterInfo) {
    let row = $('<div class="row">').append(
        $('<h4 class="col-auto m-0">')
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
            $('<a class="btn btn-outline-primary m-1" role="button">')
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
                .append($('<td>').text(pi * 1 + 1))
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

function onNavItemClick(e) {
    $("#chapter-nav .active").removeClass("active");
    $(e).addClass("active");
}

function problemPageScript(pageName, problemDataFile) {
    $.getJSON(resourceURL("resources/" + problemDataFile), function(problemData) {
        if (!problemData) return;

        let mainContainer = $("#main-container");

        // 챕터 내비게이션 만들기
        $('#chapter-nav-area').append(
            $('<div id="chapter-nav" class="nav nav-pills sticky-md-top flex-column">').append(
                $('<nav id="chapter-nav-inner" class="overflow-auto">').append(
                    $('<ul id="chapter-nav-list" class="nav nav-pills flex-md-column justify-content-around">')
                )
            )
        );

        $("#chapter-nav-list").append(
            $('<li class="nav-item d-none d-md-block mx-auto my-3">').append(
                $('<h5 class="m-0">').text(pageName)
            )
        );
        for (let chapter of problemData) {
            // 내비게이션에 챕터 제목 추가
            $("#chapter-nav-list").append(
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
        
        // 앵커가 내비게이션 바에 가려지지 않게 스크롤 위치 수정
        $('#chapter-nav .nav-link').click(function() {
            var divId = $(this).attr('href');
            $('html, body').animate({ scrollTop: $(divId).offset().top - $('#navbar').outerHeight() }, 10);
        });
    });
}
