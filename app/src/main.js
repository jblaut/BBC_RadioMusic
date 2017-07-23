import {Retrieve} from './Retrieve';

function keychange() {
  const loading = $('#loading');
  const searchKey = $('#title').val();
  const results = $('#results');
  const noResults = $('#noResults');

  loading.show();

  if (searchKey != "") {
    let retriever = new Retrieve("server/response.php");
    retriever.search(searchKey);
  } else {
    loading.hide();
    results.empty();
  }

  if ($("#results > div").length == 0) {
    noResults.show();
  } else {
    loading.hide();
  }
}

$("#title").keyup(keychange);
