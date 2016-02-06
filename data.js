function load_artwork(callback) {
    loadJSON('people.json', function(peopleResponse) {
        people = JSON.parse(peopleResponse);

        loadJSON('artwork.json', function(response) {
            artwork = JSON.parse(response);

            for (a = 0; a < artwork.length; a++) {
                artwork[a].artist = "unknown";
                
                for (p = 0; p < people.length; p++) {
                    if (artwork[a].artist_id == people[p].id) {
                        artwork[a].artist = people[p].first_name + " " + people[p].last_name;
                    }
                }
            }

            callback(artwork);
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