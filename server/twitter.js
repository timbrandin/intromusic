TwitterUsers = new Meteor.Collection('twitterusers');
var Future = Npm.require("fibers/future");

Meteor.methods({
  getTwitterUser: function(handle) {
    var twitter = new TwitterApi();
    var fut = new Future();

    try {
      var res = twitter.callAsApp('GET', 'users/show.json', {
        'screen_name': handle
      });

      TwitterUsers.insert(res.data);
      fut.return(res.data.name);

    } catch (err) {
      console.log(err);
    }

    return fut.wait();
  }
});

Meteor.startup(function() {
  TwitterUsers._ensureIndex('screen_name', {unique: true});

  // Meteor.call('getTwitterUser', 'timbrandin', function() {
  //   console.log(arguments);
  // });
});
