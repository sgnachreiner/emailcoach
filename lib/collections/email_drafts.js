EmailDrafts = new Mongo.Collection('emailDrafts');

Meteor.methods({
	draftInsert: function(draft) {
		draft._id = EmailDrafts.insert(draft);

		return {
			_id: draft._id
		}
	}
});
