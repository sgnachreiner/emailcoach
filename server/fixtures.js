if (QuestionSets.find().count() === 0) {
	no_more_questions = QuestionSets.insert({
		order: 6,
		name: 'done with questions',
		next: null,
		showingNow: false
	})

	signoff_id = QuestionSets.insert({
		order: 5,
		name: 'signoff choice',
		next: no_more_questions,
		showingNow: false
	});

	gender_pro_id = QuestionSets.insert({
		order: 4,
		name: 'gender pronouns',
		next: signoff_id,
		showingNow: false
	})

	email_id = QuestionSets.insert({
		order: 3,
		name: 'email type',
		next: gender_pro_id,
		showingNow: false
	});

	last_contact_id = QuestionSets.insert({
		order: 2,
		name: 'time of last contact',
		next: email_id,
		showingNow: false
	});

	last_contact_id = QuestionSets.insert({
		order: 1,
		name: 'familiarity level',
		next: last_contact_id,
		showingNow: true
	});
}
