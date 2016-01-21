Questions = new Mongo.Collection("questions");

if (Meteor.isClient) {

  $(document).bind('touchmove', function(e) {
    e.preventDefault();
  });

  $(document).ready(function(){
    window.addEventListener("onTouchMove", function() {
      if (window.scrollY > 100) {
        $('.navbar').style("background:#642c6e;");
      }
      else {
        $('.navbar').style("background:transparent;");
      }
    },false);

    $(window).resize(function(){
      var windowHeight = $(window).height();
      var scrollPosition = $(document).scrollTop();
      console.log("resizing");
      console.log("windowHeight: " + windowHeight - 100);
      console.log("scrollPosition: " + scrollPosition);
      if (scrollPosition < windowHeight){
        window.scrollTo(0,$("#intro").offset().top);
      }
      else if (scrollPosition < windowHeight*2){
        window.scrollTo(0,$("#proposal").offset().top);
      }
      else if (scrollPosition < windowHeight*3){
        window.scrollTo(0,$("#endorsements").offset().top);
      }
      else {
        window.scrollTo(0,$("#vote").offset().top)
      }
    });


  });

  Template.vote.helpers({
    popular: function () {
      return Questions.find({}) || [];
    },

    recent: function () {
      return Questions.find({}) || [];
    },

    popularSettings: function () {
        return {
            rowsPerPage: 5,
            showFilter: false,
            showNavigation: 'never',
            showRowCount: false,
            showColumnToggles: false,
            showNavigationRowsPerPage: false,
            fields:[
              { key: 'text', label: 'Question' , cellClass: 'col-md-4',sortable:false},  // as String
              { key: 'votes', label: 'Votes',cellClass: 'col-md-1', fn: addUpvoteButton, sortOrder:1, sortDirection: 'descending'}
            ]
        };
    },

    recentSettings: function () {
        return {
            rowsPerPage: 5,
            showFilter: false,
            showNavigation: 'never',
            showRowCount: false,
            showColumnToggles: false,
            showNavigationRowsPerPage: false,
            fields:[
              { key: 'text', label: 'Question' , cellClass: 'col-md-4',sortable:false},  // as String
              { key: 'votes', label: 'Votes',cellClass: 'col-md-1', fn: addUpvoteButton, sortable:false}
            ]
        };
    }

  });

  Template.vote.events({
    'click .reactive-table tbody tr': function (event) {
      event.preventDefault();
       var questionId = this._id;
      
      console.log(questionId);

      // checks if the actual clicked element has the class `delete`
      if (event.target.className == "") {
        console.log("voted");
        Questions.update(questionId, {$inc: {votes: 1}});
      }
    }
  }); 

  Template.body.events({
    "submit .new-question": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      console.log(event.target.text.value);

      // Get value from form element
      var text = event.target.text.value;

      Questions.insert({
        text: text,
        createdAt: new Date(),
        votes: 0,
        approved: false
      });

      // Clear form
      event.target.text.value = "";
    }
  });
}