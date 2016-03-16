Meteor.methods({
	draftInsert: function(draft) {
		draftId = EmailDrafts.insert(draft);

		console.log(draftId);

		result = {};
		result._id = draftId;

		console.log(result);

		return result;
	}
});
