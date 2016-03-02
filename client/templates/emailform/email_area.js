var setShowingNow = function(orderOfQ, showOrNot) {
  let q = QuestionSets.findOne({order: orderOfQ});
  QuestionSets.update({_id: q._id}, {"$set" : {showingNow: showOrNot}});
};

Template.emailArea.events({
  'click #save-draft-btn': function(e) {
    e.preventDefault();

    EmailDrafts.update({_id: this._id}, {$set: {toEmail: $('#toEmail').val(), greeting: $('#greeting').text(), well_wishes: $('#well-wishes').text(), introduction: $('#introduction').text(), email_body: $('#email-body').text(), signoff_word: $('#signoff-word').text()}});

    document.getElementById("greeting").innerHTML = '';
    document.getElementById("well-wishes").innerHTML = '';
    document.getElementById("introduction").innerHTML = '';
    document.getElementById("email-body").innerHTML = '';
    document.getElementById("signoff-word").innerHTML = '';
  },
  'click #start-over': function(e) {
    e.preventDefault();

    setShowingNow(1, true);
    setShowingNow(2, false);
    setShowingNow(3, false);
    setShowingNow(4, false);
    setShowingNow(5, false);
    setShowingNow(6, false);

    document.getElementById("greeting").innerHTML = 'Your greeting will go here.';
    document.getElementById("well-wishes").innerHTML = '';
    document.getElementById("introduction").innerHTML = '';
    document.getElementById("email-body").innerHTML = 'The email body will go here.';
    document.getElementById("signoff-word").innerHTML = 'The signoff will go here.';
  }
});
