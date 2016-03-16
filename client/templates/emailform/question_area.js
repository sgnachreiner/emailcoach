var setShowingNow = function(orderOfQ, showOrNot) {
  let q = QuestionSets.findOne({order: orderOfQ});
  QuestionSets.update({_id: q._id}, {"$set" : {showingNow: showOrNot}});
};

var changeQuestion = function(from, to) {
  setShowingNow(from, false);
  setShowingNow(to, true);
};

var genderChoice;

Template.questionArea.helpers({
  showQuestion: function(num) {
    return QuestionSets.findOne({order: num}).showingNow
  }
});

Template.howWellYouKnowThem.events({
  'click .submit': function(e) {
      e.preventDefault();

      //let familiarity_level = $( "#familiarity option:selected" ).text()
      let familiarity_level = $('input[name=familiarity-level]:checked').val();
      //let tone_choice = $( "#tone option:selected" ).text()
      let tone_choice = $('input[name=tone-choice]:checked').val();

      if ((familiarity_level == "never-met" || familiarity_level == "met-once-or-twice") && tone_choice != "informal") {
        document.getElementById("greeting").innerHTML = 'Dear ____________,';
      } else {
        document.getElementById("greeting").innerHTML = 'Hi ____________,';
      }

      if (familiarity_level == "met-once-or-twice") {
        document.getElementById("introduction").innerHTML = '';
      } else if (familiarity_level == "never-met") {
        document.getElementById("introduction").innerHTML = 'My name is ____________, and I am ____________. I found your contact information through ____________.';
        document.getElementById("email-body").innerHTML = '';
      } else {
        document.getElementById("introduction").innerHTML = '';
      }

      EmailDrafts.update({_id: this._id}, {"$set" : {familiarity_level: familiarity_level, tone_choice: tone_choice}});

      if (familiarity_level !== "never-met") {
        changeQuestion(1, 2);
      } else {
        changeQuestion(1, 3);
      }
  }
});

Template.lastTimeYouSpoke.events({
  'click .submit': function(e) {
      e.preventDefault();

      //let last_contact = $( "#last-contact option:selected" ).text()
      let last_contact = $('input[name=last-contact]:checked').val();

      if (last_contact == "not-recent") {
        document.getElementById("well-wishes").innerHTML = 'I hope all is well with you!';
      } else {
        document.getElementById("well-wishes").innerHTML = '';
      }

      EmailDrafts.update({_id: this._id}, {"$set" : {last_contact: last_contact}});

      changeQuestion(2,3);
  }
});

Template.emailType.events({
  'click .submit': function(e) {
    e.preventDefault();

    //let email_type = $( "#type option:selected" ).text();
    let email_type = $('input[name=email-type]:checked').val();

    EmailDrafts.update({_id: this._id}, {"$set" : {email_type: email_type}});

    if (email_type == "conversation") {
      document.getElementById("email-body").innerHTML = 'I am working on ____________. You would be a great person to talk to because ____________. I would specifically like to ask you questions about ____________ and ____________ if you have 15 minutes to spare. I am happy to meet via ____________ or ____________, whichever would be most convenient for you. I am free on ____________ and ____________. If those times don’t work for you, feel free to suggest other times.  If you are unable to chat, I would greatly appreciate if you could connect me to someone who I could talk to about this topic. Thank you.';
      changeQuestion(3,5);
    } else if (email_type == "introduction") {
      changeQuestion(3,4);
    }
  }
});

Template.emailType.helpers({
  youKnowThem: function() {
    return EmailDrafts.findOne({_id: this._id}).familiarity_level !== "never-met";
  }
});

Template.genderPronouns.events({
  'click .submit': function(e) {
    e.preventDefault();

    //let gender = $( "#gender-pronouns option:selected" ).text()
    let genderChoice = $('input[name=gender]:checked').val()

    document.getElementById("email-body").innerHTML = `I found out that you are connected to ____________ through ____________. I am hoping to connect with ${genderChoice} because ____________. Talking with ${genderChoice} will help me to ____________. Also, I believe that ____________ could be beneficial for ${genderChoice} too because ____________. Would you feel comfortable introducing me to ${genderChoice} via email to get the conversation started? Thank you for your help.<br/>Have a nice day!`;

    changeQuestion(4,5);
  }
});

Template.signoffChoice.events({
  'click .submit': function(e) {
    e.preventDefault();

    //let signoff = $( "#signoff option:selected" ).text();
    let signoff = $('input[name=signoff]:checked').val()

    EmailDrafts.update({_id: this._id}, {"$set" : {signoff: signoff}});

    switch(signoff) {
      case "consideration":
        document.getElementById("signoff-word").innerHTML = 'Thank you for your consideration,<br/>____________';
        break;
      case "best-regards":
        document.getElementById("signoff-word").innerHTML = 'Best regards,<br/>____________';
        break;
      case "thank-you":
        document.getElementById("signoff-word").innerHTML = 'Thank you,<br/>____________';
        break;
      case "sincerely":
        document.getElementById("signoff-word").innerHTML = 'Sincerely,<br/>____________';
        break;
      case "dash":
        document.getElementById("signoff-word").innerHTML = '-____________';
        break;
      case "best":
        document.getElementById("signoff-word").innerHTML = 'Best,<br/>____________';
        break;
      case "thanks":
        document.getElementById("signoff-word").innerHTML = 'Thanks,<br/>____________';
        break;
      case "cheers":
        document.getElementById("signoff-word").innerHTML = 'Cheers,<br/>____________';
        break;
      default:
    }

    changeQuestion(5,6);
  }
});

Template.signoffChoice.helpers({
  isFormal: function() {
    let tone = EmailDrafts.findOne({_id: this._id}).tone_choice;
    return tone === "formal" || tone === "dont-know";
  }
});
