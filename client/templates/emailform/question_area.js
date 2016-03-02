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

      let familiarity_level = $( "#familiarity option:selected" ).text()
      let tone_choice = $( "#tone option:selected" ).text()

      if ((familiarity_level == "We've never met" || familiarity_level == "We've met briefly once or twice") && tone_choice != "Informal") {
        document.getElementById("greeting").innerHTML = 'Dear <strong>____________</strong>,';
      } else {
        document.getElementById("greeting").innerHTML = 'Hi <strong>____________</strong>,';
      }

      if (familiarity_level == "We've met briefly once or twice") {
        document.getElementById("introduction").innerHTML = '';
      } else if (familiarity_level == "We've never met") {
        document.getElementById("introduction").innerHTML = 'My name is <strong>____________</strong>, and I am <strong>____________</strong>. I found your contact information on <strong>____________</strong>.';
        document.getElementById("email-body").innerHTML = '';
      } else {
        document.getElementById("introduction").innerHTML = '';
      }

      if (familiarity_level !== "We've never met") {
        changeQuestion(1, 2);
      } else {
        changeQuestion(1, 3);
      }
  }
});

Template.lastTimeYouSpoke.events({
  'click .submit': function(e) {
      e.preventDefault();

      let last_contact = $( "#last-contact option:selected" ).text()

      if (last_contact == "Over 6 months ago") {
        document.getElementById("well-wishes").innerHTML = 'I hope all is well with you!';
      } else {
        document.getElementById("well-wishes").innerHTML = '';
      }

      changeQuestion(2,3);
  }
});

Template.emailType.events({
  'click .submit': function(e) {
    e.preventDefault();

    let email_type = $( "#type option:selected" ).text()

    if (email_type == "Request for conversation") {
      document.getElementById("email-body").innerHTML = 'I am writing to you because I am working on <strong>____________</strong>. You would be a great person to talk to because <strong>____________</strong>. I would specifically like to ask you questions about <strong>____________</strong> and <strong>____________</strong> if you have 15 minutes to spare. I am happy to meet via <strong>____________</strong> or <strong>____________</strong>, whichever would be most convenient for you. I am free on <strong>____________</strong> and <strong>____________</strong>. If those don’t work for you, feel free to suggest other times.  If you are unable to chat, I would greatly appreciate if you could connect me to someone who I could talk to about this topic. Thank you.';
      changeQuestion(3,5);
    } else if (email_type == "Request for them to introduce you to someone else") {
      changeQuestion(3,4);
    }
  }
});

Template.genderPronouns.events({
  'click .submit': function(e) {
    e.preventDefault();

    let gender = $( "#gender-pronouns option:selected" ).text()

    if (gender == "He/him") {
      genderChoice = "him";
    } else if (gender == "She/her") {
      genderChoice = "her";
    } else {
      genderChoice = "them";
    }

    document.getElementById("email-body").innerHTML = `I found out that you are connected to <strong>____________</strong> through <strong>____________</strong>. I am hoping to connect with ${genderChoice} because <strong>____________</strong>. Talking with ${genderChoice} will help me to <strong>____________</strong>. Also, I believe that <strong>____________</strong> could be beneficial for ${genderChoice} too because <strong>____________</strong>. Would you feel comfortable introducing me to ${genderChoice} via email to get the conversation started? Thank you for your help.<br/>Have a nice day!`;

    changeQuestion(4,5);
  }
});

Template.signoffChoice.events({
  'click .submit': function(e) {
    e.preventDefault();

    let signoff = $( "#signoff option:selected" ).text()

    if (signoff == "Best") {
      document.getElementById("signoff-word").innerHTML = 'Best,<br/><strong>____________</strong>';
    } else if (signoff == "Thank you for your consideration") {
      document.getElementById("signoff-word").innerHTML = 'Thank you for your consideration,<br/><strong>____________</strong>';
    } else if (signoff == "Thanks") {
      document.getElementById("signoff-word").innerHTML = 'Thanks,<br/><strong>____________</strong>';
    } else if (signoff == "Cheers") {
      document.getElementById("signoff-word").innerHTML = 'Cheers,<br/><strong>____________</strong>';
    }

    changeQuestion(5,6);
  }
});
