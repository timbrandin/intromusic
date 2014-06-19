Router.map(function() {
  this.route('home', {
    path: '/',
  });

  this.route('assessment', {
    path: '/a/:assessmentId'
  });

  this.route('results', {
    path: '/r/:assessmentId',
    data: function() {
      return Profiles.findOne({assessmentId: this.params.assessmentId});
    }
  });
});
