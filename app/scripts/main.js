"use strict"

class Retrieve {
  constructor(path) {
    this.path = path;
    this.data = "";
  }

  filter(term, data) {
    console.log(data)

    let programmes = [];
    for (let i = 0; i < data.length; i++) {
      const titles = data[i]['programme']['title'];
      const synopsis = data[i]['programme']['short_synopsis'];

      if (titles.toLowerCase().search(term) >= 0) {
        $('#noResults').hide();
        if (data[i]['programme']['image'] != undefined &&
            data[i]['programme']['image']['pid'] != undefined) {
          const imageID = data[i]['programme']['image']['pid'];
          let programme = new Programme(titles, synopsis, imageID);
          programmes.push(programme.structure());
        } else {
          let programme = new Programme(titles, synopsis);
          programmes.push(programme.structure());
        }
      }
    }
    return programmes;
  }

  search(searchTerm) {
    if (this.data.length != 0) {
      this.filter(searchTerm, this.data);
    } else {
      fetch(this.path).then(response => {
        if (response.ok) {
          return response;
        }
        return Promise.reject(Error('error'));
      }).catch(error => {
        return Promise.reject(Error(error.message));
      })

      .then(response => {
        return response.json();
      }).then(data => {
        this.data = data;
        this.filter(searchTerm, this.data);

      })

    }
  }
}

class Programme {
  constructor(title, synopsis, pid=null) {
        this.title = title;
        this.synopsis = synopsis;
        this.pid = pid;
    }

    structure() {
        let image = "";

        if (this.pid) {
          image = `<img src="https://ichef.bbci.co.uk/images/ic/480x270/${this.pid}.jpg">`;
        }

        return `<div class="programme">
                  ${image}
                  <div class="inner">
                    <h1>${this.title}</h1>
                    <p>${this.synopsis}</p>
                  </div>
                </div>`
    }

    print() {
      console.log( this.structure() );
    }
}

function keychange() {
  const loading = $('#loading');
  const searchKey = $('#title').val();
  const results = $('#results');

  loading.show();

  if (searchKey != "") {
    const apiRes = new XMLHttpRequest();
    apiRes.onload = function() {
      loading.hide();
      const titlesArray = JSON.parse(this.responseText);
      const programmes = [];

      results.empty();

      for (let i = 0; i < titlesArray.length; i++) {
        const titles = titlesArray[i]['programme']['title'];
        const synopsis = titlesArray[i]['programme']['short_synopsis'];

        if (titles.toLowerCase().search(searchKey) >= 0) {
          $('#noResults').hide();
          if (titlesArray[i]['programme']['image'] != undefined &&
              titlesArray[i]['programme']['image']['pid'] != undefined) {
            const imageID = titlesArray[i]['programme']['image']['pid'];
            let programme = new Programme(titles, synopsis, imageID);
            programmes.push(programme.structure());
          } else {
            let programme = new Programme(titles, synopsis);
            programmes.push(programme.structure());
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

$("#title").keyup(keychange);

let retriever = new Retrieve("server/response.php");
retriever.search("fry");
