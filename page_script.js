// Open and close the sidebar on medium and small screens
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

// Change style of top container on scroll
window.onscroll = function () { myFunction() };
function myFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("myTop").classList.add("w3-card-4", "w3-animate-opacity");
        document.getElementById("myIntro").classList.add("w3-show-inline-block");
    } else {
        document.getElementById("myIntro").classList.remove("w3-show-inline-block");
        document.getElementById("myTop").classList.remove("w3-card-4", "w3-animate-opacity");
    }
}

// Accordions
function myAccordion(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-theme";
    } else {
        x.className = x.className.replace("w3-show", "");
        x.previousElementSibling.className =
            x.previousElementSibling.className.replace(" w3-theme", "");
    }
}

function problemPageScript(problem_data) {
    $.getJSON("resources/" + problem_data, function(data) {
        // alert("success");
        var main = document.getElementById("main-container");

        // var header = document.createElement("h2");
        // header.innerHTML = "목차";
        // main.appendChild(header);
        
        var contents_list = document.createElement("div");
        contents_list.className = "w3-bar w3-theme-l4"
        for (i in data) {
            var bi = document.createElement("button");
            bi.innerHTML = data[i].chapter_name
            bi.className = "w3-bar-item w3-button w3-hover-theme w3-mobile"
            bi.setAttribute('onclick', "location.href='#" + data[i].chapter_id  + "'")
            contents_list.appendChild(bi);
        }
        main.appendChild(contents_list);

        for (i in data) {
            main.appendChild(document.createElement("hr"));

            var header = document.createElement("h2");
            header.className = "w3-cell w3-cell-bottom w3-mobile"
            header.id = data[i].chapter_id;
            header.appendChild(document.createTextNode(data[i].chapter_name));
            main.appendChild(header);
            if (data[i].chapter_explanation) {
                var exp = document.createElement("div");
                exp.className = "w3-container w3-cell w3-cell-bottom w3-large w3-text-grey w3-mobile"
                exp.appendChild(document.createTextNode("— " + data[i].chapter_explanation));
                main.appendChild(exp);
            }

            for (con of data[i].chapter_concepts) {
                // <div class="w3-panel w3-blue w3-card">
                var concept_card = document.createElement("div");
                concept_card.className = "w3-panel w3-blue w3-card";
                concept_card.innerHTML = '<p><i class="far fa-file w3-large"></i>&nbsp;<a href="' + con.link + '">' + con.concept_title + '</a></p>'
                main.appendChild(concept_card)
            }

            var pdiv = document.createElement("div");
            pdiv.className = "w3-panel w3-card w3-theme-l5 problem-card";

            var pheader = document.createElement("h3");
            pheader.appendChild(document.createTextNode("문제"));
            pdiv.appendChild(pheader);

            var ptable = document.createElement("table");
            ptable.className = "w3-table-all";
            ptable.innerHTML = '<thead><tr><th width=20%>번호</th><th>문제</th><th width=25%>출처</th></tr></thead>'

            for (j in data[i].chapter_problems) {
                var pro = data[i].chapter_problems[j]
                var row = document.createElement("tr");
                row.innerHTML = '<td>'
                    + (j*1 + 1)
                    + '</td><td><a class="w3-text-indigo" href="'
                    + pro.link
                    + '">'
                    + pro.name
                    + '</a></td><td>'
                    + pro.from
                    + '</td>';
                ptable.appendChild(row);
            }

            pdiv.appendChild(ptable);
            main.appendChild(pdiv);
        }
    });
}

$(function() {
    // TODO: footer
    $.getJSON("resources/menus.json", function(menus) {
        var sidebar = document.getElementById("mySidebar");
        for (i in menus) {
            var bar_item = document.createElement("a");
            bar_item.className = "w3-bar-item w3-button";
            bar_item.href = menus[i].link;
            if (window.location.pathname.endsWith(menus[i].link)) {
                document.getElementById("myIntro").innerText += " - " + menus[i].menu_name;
                document.getElementById("myHeader").innerText += " - " + menus[i].menu_name;
                bar_item.className += " w3-theme";

                if (menus[i].problem_data) {
                    problemPageScript(menus[i].problem_data);
                }
            }
            bar_item.appendChild(document.createTextNode(menus[i].menu_name))
            sidebar.appendChild(bar_item);
        }
    });
});