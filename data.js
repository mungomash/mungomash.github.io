function load_artwork(page, callback) {
    loadJSON('people.json', function(peopleResponse) {
        people = JSON.parse(peopleResponse);

        loadJSON('artwork.json', function(response) {
            artwork = JSON.parse(response);

            for (a = 0; a < artwork.length; a++) {
                if (artwork[a].page != page) {
                    artwork.splice(a);
                        break;
                }
                alert(artwork[a].url);
                artwork[a].artist = "unknown";
                
                for (p = 0; p < people.length; p++) {
                    if (artwork[a].artist_id == people[p].id) {
                        artwork[a].artist = people[p].first_name + " " + people[p].last_name;
                    }
                }
            }
            console.log("Almost there...");
            callback(artwork);
            console.log("Succes");
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









