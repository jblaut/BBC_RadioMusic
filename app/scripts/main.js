function keychange() {
  var loading = $('#loading');
  var searchKey = $('#title').val();
  var results = $('#results');

  loading.show();

  if (searchKey != "") {
    var apiRes = new XMLHttpRequest();
    apiRes.onload = function() {
      loading.hide();
      var titlesArray = JSON.parse(this.responseText);
      var programmes = [];

      results.empty();

      for (var i = 0; i < titlesArray.length; i++) {
        var titles = titlesArray[i]['programme']['title'];
        var synopsis = titlesArray[i]['programme']['short_synopsis'];

        if (titles.toLowerCase().search(searchKey) >= 0) {
          $('#noResults').hide();
          if (titlesArray[i]['programme']['image'] != undefined && titlesArray[i]['programme']['image']['pid'] != undefined) {
            var imageID = titlesArray[i]['programme']['image']['pid'];
            programmes.push(createProgramme(titles, synopsis, imageID));
          } else {
            programmes.push(createProgramme(titles, synopsis));
          }
        }
      }
      $('#results').append(programmes);
      $('#results').show();
    };

    apiRes.open("get", "server/response.php", true);
    apiRes.send();
  } else {
    loading.hide();
    results.empty();
  }

  if ($("#results > div").length == 0) {
    $('#noResults').show();
  }
}

function createProgramme(title, synopsis, imageID=null) {
  var titleElem = document.createElement("h1");
  titleElem.append(document.createTextNode(title));
  var synopsisElem = document.createElement("p");
  synopsisElem.append(document.createTextNode(synopsis));

  var programme = document.createElement("div");
  programme.className = "programme";
  var innerDiv = document.createElement("div");
  innerDiv.append(titleElem, synopsisElem);
  innerDiv.className = "inner";

  if (!imageID) {
    programme.append(innerDiv);
  } else {
    var image = document.createElement("img");
    image.src = "https://ichef.bbci.co.uk/images/ic/480x270/" + imageID + ".jpg";
    programme.append(image, innerDiv);
  }
  return programme;
}

$("#title").keyup(keychange);
