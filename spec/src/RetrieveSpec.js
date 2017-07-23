import {Retrieve} from '../../app/src/Retrieve';
// import {loadFixtures} from 'jasmine-jquery';
require(['jasmine-jquery']);

describe('Retrieve', () => {
  const data = [
    {
      "programme": {
        "title": "foo bar",
        "short_synopsis": "synopsis",
        "image": {
          "pid": "p012e4s"
        }
      }
    }, {
      "programme": {
        "title": "test title",
        "short_synopsis": "synopsis"
      }
    }
  ];

  beforeEach(() => {
    loadFixtures('../../../base/spec/javascripts/fixtures/resultsFixture.html');
  });

  it("should correctly find search term", () => {
    let retrieve = new Retrieve("/foo");
    retrieve.filter("foo", data);

    expect($('#results')).toBeVisible();
    expect($("#results > div").length).toBe(1);
    expect($("#results h1")).toContainText("foo");
    expect($("#results img")).toExist();
  });

  it("should correctly find search term without a PID", () => {
    let retrieve = new Retrieve("/foo");
    retrieve.filter("test", data);

    expect($('#results')).toBeVisible();
    expect($("#results > div").length).toBe(1);
    expect($("#results img")).not.toExist();
  });

  it("should not find programmes not matching the search term", () => {
    let retrieve = new Retrieve("/foo");
    retrieve.filter("abcd", data);

    expect($("#results > div").length).toBe(0);
  });
});
