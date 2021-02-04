$(function() {
    $.getJSON("resources/python_data.json", function( data ) {
        var main = document.getElementById("main-container");

        var header = document.createElement("h2");
        header.innerHTML = "목차";
        main.appendChild(header);
        
        var contents_list = document.createElement("ol");
        for (i in data) {
            var li = document.createElement("li");
            li.innerHTML = '<a href="#' + data[i].chapter_id + '">' + data[i].chapter_name + '</a>'
            contents_list.appendChild(li);
        }
        main.appendChild(contents_list);

        for (i in data) {
            main.appendChild(document.createElement("hr"));

            var header = document.createElement("h2");
            header.id = data[i].chapter_id;
            header.appendChild(document.createTextNode(data[i].chapter_name));
            main.appendChild(header);

            for (con of data[i].chapter_concepts) {
                // <div class="w3-panel w3-blue w3-card">
                var concept_card = document.createElement("div");
                concept_card.className = "w3-panel w3-blue w3-card";
                concept_card.innerHTML = '<p><i class="far fa-file w3-large"></i>&nbsp;<a href="' + con.link + '">' + con.concept_title + '</a></p>'
                main.appendChild(concept_card)
            }

            var pdiv = document.createElement("div");
            pdiv.className = "w3-panel w3-card w3-light-gray problem-card";

            var pheader = document.createElement("h3");
            pheader.appendChild(document.createTextNode("문제"));
            pdiv.appendChild(pheader);

            var ptable = document.createElement("table");
            ptable.className = "w3-table-all w3-hoverable";
            ptable.innerHTML = "<thead><tr><th width=20%>번호</th><th>문제</th><th width=25%>출처</th></tr></thead>"

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
});