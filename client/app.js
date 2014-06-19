TwitterUsers = new Meteor.Collection('twitterusers');
Profiles = new Meteor.Collection('profiles');

Template.home.helpers({
  users: function() {
    return TwitterUsers.find({}, {sort: {followers_count: -1}});
  },

  image: function() {
    return this.profile_image_url.replace('normal', '400x400');
  },

  assessmentId: function() {
    var pattern = new RegExp('^' + this.screen_name + '$', 'i');
    var profile = Profiles.findOne({handle: pattern});
    if (profile) {
      return profile.assessmentId;
    }
  },

  completed: function() {
    var profile = Profiles.findOne({handle: this.screen_name});
    if (profile) {
      return profile.completed ? 'completed' : '';
    }
  }
});

var music = [{
  artist: 'Electric 6',
  song: 'Gay Bar',
  file: 'gay.mp3'
}, {
  artist: 'Chesney Hawkes',
  song: 'The One and Only',
  file: 'one.mp3'
}, {
  artist: 'Survivor',
  song: 'Eye of the Tiger',
  file: 'tiger.mp3'
}, {
  artist: 'Rebirth Brass Band',
  song: 'Rebirth for Life',
  file: 'tuba.mp3'
}, {
  artist: 'Stevie Griffin ft. Brian Griffin',
  song: 'The Ugly Song',
  file: 'ugly.mp3'
}, {
  artist: 'Village People',
  song: 'YMCA',
  file: 'ymca.mp3'
}];

Deps.autorun(function() {
  var route = Router.current();
  if (route) {
    var profile = Profiles.findOne({assessmentId: route.params.assessmentId});
    if (profile) {
      var choice = profile.musicChoice || 0;
      Session.set('musicChoice', music[choice]);
    }
  }
});

Template.results.helpers({
  image: function() {
    var twitteruser = TwitterUsers.findOne({screen_name: this.handle});
    if (twitteruser) {
      return twitteruser.profile_image_url.replace('normal', '400x400');
    }
  },

  music: function() {
    return Session.get('musicChoice');
  },

  handle: function() {
    var route = Router.current();
    if (route) {
      var profile = Profiles.findOne({assessmentId: route.params.assessmentId});
      if (profile) {
        return profile.handle;
      }
    }
  }
});

Template.results.rendered = function() {
  setTimeout(function() {
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
  }, 1000);
};

Template.assessment.rendered = function() {
  var route = Router.current();

  Traitify.setPublicKey("tofa3fl6gs0cguqq83f5qojha4");
  Traitify.setHost("https://api-sandbox.traitify.com");
  Traitify.setVersion("v1");

  Traitify.ui.slideDeck(route.params.assessmentId, ".tf-assessment", function(data) {
    var profile = Profiles.findOne({assessmentId: route.params.assessmentId});
    if (profile) {
      Profiles.update({_id: profile._id},
        {$set: {completed: true, assessment: data, musicChoice: Math.floor(Math.random() * music.length)}});
    }

    Router.go('/r/' + route.params.assessmentId);
    //Traitify.ui.resultsProp(route.params.assessmentId, ".tf-assessment", {showTraits: true});
  });
}
