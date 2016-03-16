var setShowingNow = function(orderOfQ, showOrNot) {
  let q = QuestionSets.findOne({order: orderOfQ});
  QuestionSets.update({_id: q._id}, {"$set" : {showingNow: showOrNot}});
};

Template.draftList.helpers({
  emailDrafts: function() {
    return EmailDrafts.find();
  }
});

Template.draftList.events({
  'click #compose-draft': function(e) {
  	var draft = {
      sender: Meteor.userId(),
      toEmail: "",
      familiarity_level: "",
      tone_choice: "",
      last_contact: "",
      email_type: "",
      signoff: "",
      greeting: "Your greeting will go here",
      well_wishes: "",
      introduction: "",
      email_body: "Your email body will go here",
      signoff_word: "Your signoff will go here"
    };

    console.log(draft);

    Meteor.call('draftInsert', draft, function(error, result) {
      if (error) {
        return alert(error.reason);
      }

      setShowingNow(1, true);
      setShowingNow(2, false);
      setShowingNow(3, false);
      setShowingNow(4, false);
      setShowingNow(5, false);
      setShowingNow(6, false);

      Router.go('emailForm', {_id: result._id});
    });
  }
});
