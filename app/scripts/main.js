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

      results.empty();

      for (var i = 0; i < titlesArray.length; i++) {
        var titles = titlesArray[i]['title'];
        var synopsis = titlesArray[i]['programme']['short_synopsis'];

        if (titles.toLowerCase().search(searchKey) >= 0) {
          if (titlesArray[i]['programme']['image'] != undefined && titlesArray[i]['programme']['image']['pid'] != undefined) {
            var imageID = titlesArray[i]['programme']['image']['pid'];
            createProgramme(titles, synopsis, imageID);
          } else {
            createProgramme(titles, synopsis);
          }
        }
      }
    };

    apiRes.open("get", "server/response.php", true);
    apiRes.send();
  } else if (searchKey == "") {
    loading.hide();
    results.empty();
  }
}

function createProgramme(title, synopsis, image='') {
  var programme = {
    title: title,
    synopsis: synopsis,
    image: image
  }

  // Mustache render here
  console.log(programme);
}
