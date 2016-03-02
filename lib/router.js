Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', {name: 'draftList'});

Router.route('/drafts/:_id', {
	name: 'emailForm',
	data: function() {
		return EmailDrafts.findOne(this.params._id);
	}
});
