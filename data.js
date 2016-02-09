function load_artwork(page, callback) {
    loadJSON('people.json', function(peopleResponse) {
        people = JSON.parse(peopleResponse);

        loadJSON('artwork.json', function(response) {
            artwork = JSON.parse(response);
            var result = [];

            for (a = 0; a < artwork.length; a++) {
                var item;

                if (artwork[a].page != page) {
                    break;
                } else {
                    item = artwork[a];
                    result.push(item);
                }

                alert(item.url);
                item.artist = "unknown";
                
                for (p = 0; p < people.length; p++) {
                    if (item.artist_id == people[p].id) {
                        item.artist = people[p].first_name + " " + people[p].last_name;
                    }
                }
            }
            console.log("Almost there...");
            callback(result);
            console.log("Success");
        });
    });

}

function loadJSON(fileName, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', fileName, true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 var source = "{{#each artwork}}" +
             "<td>" +
             "<div class = 'panel panel-default' style='width:200px;'>" +
                  "<div class = 'panel-body'>" +
                       "<a href='{{url}}'><img src='{{src}}' alt='{{url}}' style='width:100%;height:100%;'></a>" +
                  "</div>" +
                  "<div class = 'panel-footer'>" +
                       "{{artist}}" +
                  "</div>" +
              "</div>" +
              "</td>" +
             "{{/each}}";

             

var template = Handlebars.compile(source);

function loadPageArtwork() {
    load_artwork(window.location.pathname, function(list) {
        var result = template({ artwork : list });
        document.getElementById("clip_art_row").innerHTML = result;
    });
}









