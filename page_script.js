function getMenuIdOfCurrPage() {
    if (window.location.pathname.endsWith("problempage.html")) {
        return new URLSearchParams(window.location.search).get("class");
    }
    return "home";
}

$(document).ready(function() {
    $('#navbar')
        .addClass("navbar navbar-expand-md sticky-top navbar-light bg-light shadow-sm")
        .load("elements/navbar.html");

    $.getJSON("resources/menu_layout.json", function(menuLayout) {
    $.getJSON("resources/menus.json", function(menus) {
        let currMenuId = getMenuIdOfCurrPage();
        let navbar = $("#navbar-ul, #navbar-lg-ul");
        for (let menuId of menuLayout) {
            // 구분선일 때
            if (menuId == "-") {
                navbar.append($('<li class="my-1 mx-1 border-top border-start">'));
            }
            // 실제 메뉴일 때
            else {
                navbar.append(
                    $('<li class="px-1 px-md-0">').append(
                        $('<a>')
                            .addClass(
                                menuId == currMenuId
                                    ? "nav-link active"
                                    : "nav-link link-dark"
                            )
                            .attr("href", menus[menuId].link)
                            .text(menus[menuId].name)
                    )
                );
            }
        }
    
        document.title += " - " + menus[currMenuId].name;
        $("#subtitle").text(menus[currMenuId].name);
        if (menus[currMenuId].problem_data) {
            problemPageScript(menus[currMenuId].name, menus[currMenuId].problem_data);
        } else if (currMenuId == "home") {
            homePageScript(menuLayout, menus, currMenuId);
        }
    })});

    // 맨 위로 가기 버튼
    $('#to-top-btn').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 0);
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $("#to-top-btn").removeClass('d-none');
        } else {
            $("#to-top-btn").addClass('d-none');
        }
    });
});
