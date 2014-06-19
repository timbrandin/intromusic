var Future = Npm.require("fibers/future");

Meteor.methods({
  createAssessment: function() {
    var fut = new Future();
    // live url
    // Traitify.setHost("https://api.traitify.com");

    // testing url
    Traitify.setHost("api-sandbox.traitify.com");

    Traitify.setVersion("v1");
    Traitify.setPrivateKey("ooo27me7jd8p9p4p0hf7d66tld");

    Traitify.createAssessment('304d0392-4a08-4ef6-a996-224324a9f6f8', function(assessment) {
      fut.return(assessment);
    });

    return fut.wait();
  }
});

// Meteor.startup(function() {
//   Meteor.call('createAssessment', function(err, res) {
//     console.log(res);
//   });
// });
