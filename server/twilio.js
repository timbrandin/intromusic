// twilioRawIn = new Meteor.Collection('idontnow');
Profiles = new Meteor.Collection('profiles');

Meteor.Router.add('/api/twiml/sms', 'POST', function() {
    var rawIn = this.request.body;
    // if (Object.prototype.toString.call(rawIn) == "[object Object]") {
    //   twilioRawIn.insert(rawIn);
    // }

    var handle = rawIn.Body.replace('@', '');

    var name = Meteor.call('getTwitterUser', handle);
    var assessment = Meteor.call('createAssessment');

    Profiles.insert({
      handle: handle,
      name: name,
      phone: rawIn.From,
      assessmentId: assessment.id
    });

    // console.log(name, assessment.id);

    // var question = {};
    // if (rawIn.Body) {
    //     question.inputQuestion = rawIn.Body;
    //     question.source = "sms";
    // } else if (rawIn.TranscriptionText) {
    //     question.inputQuestion = rawIn.TranscriptionText;
    //     question.source = "voicemail";
    // } else {
    //     return;
    // }
    // question.inputName = rawIn.From;
    //
    // var toOrig = rawIn.To;
    // toOrig = toOrig.replace(/\+1/g, "");
    // var toPretty = '('+toOrig.substr(0,3)+') '+toOrig.substr(3,3)+'-'+toOrig.substr(6,10);
    // var eventDetails = Events.findOne({phone: toPretty});

    // if (_.size(eventDetails) == 0) {
    //     return;
    // } else {
    //     question.slug = eventDetails.slug;
    // }

    var xml = '<Response><Sms>Thank you ' + name + ' for submitting your Twitter handle! Take the personality test: http://intromusic.meteor.com/a/' + assessment.id + '</Sms></Response>';
    return [200, {"Content-Type": "text/xml"}, xml];
});
