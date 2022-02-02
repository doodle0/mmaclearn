function homePageScript(menuLayout, menus, currMenuId) {
    let buttons = [["begin", "algo", "advanced", "python"], "ref"];
    let linkCardBody = $("#link-card-body");
    for (let bi of buttons) {
        if (typeof(bi) == "string") {
            linkCardBody.append(
                $('<a class="btn btn-outline-primary m-1" role="button"></a>')
                    .text(menus[bi].name)
                    .attr("href", menus[bi].link)
            )
        } else {
            let btnGroup = $('<div class="btn-group m-1" role="group">');
            for (let bii of bi) {
                btnGroup.append(
                    $('<a class="btn btn-outline-primary" role="button"></a>')
                        .text(menus[bii].name)
                        .attr("href", menus[bii].link)
                );
            }
            linkCardBody.append(btnGroup);
        }
    }
}
