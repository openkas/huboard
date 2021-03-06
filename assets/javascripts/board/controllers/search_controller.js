var Fuse = require("../vendor/fuse.min");
var SearchController = Ember.Controller.extend({
  needs:["application"],
  term: "",
  termChanged : Ember.debouncedObserver(function(){
    var term = this.get("term");
    var issues = this.get("controllers.application.model.board").combinedIssues();
    var Searcher = new Fuse(issues, {keys: ["title"], id: "id", threshold: 0.4});
    var results = Searcher.search(term);
    App.set("searchFilter", {condition: function(i){
       return term.length == 0 || results.indexOf(i.id) !== -1;
    }});

  },"term", 300)
});

module.exports = SearchController;
