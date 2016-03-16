How to get the code on your laptop:
1. bring up the Terminal application on your computer
2. now type in your terminal "curl https://install.meteor.com/ | sh" -- this installs Meteor on your machine
3. in whatever directory you would like (I do this in "/Users/shannonnachreiner"), type in "git clone https://github.com/sgnachreiner/emailcoach.git" -- this copies my code onto your machine
4. now type into your terminal "cd emailcoach" to get into the directory of code you just copied -- if that fails type in "ls" (basically means list files) and make sure that "emailcoach" is listed as a directory
5. type "meteor" into your terminal to start the meteor server, wait for it to say "App running at: http://localhost:3000/"
6. on your web browser, type "localhost:3000" into the navigation bar -- that's the URL for our project
7. play around!

Resources for opening up user's default email client (typically Outlook or Apple Mail):
http://stackoverflow.com/questions/10172499/mailto-using-javascript
Resource for forcing it to open up Gmail:
http://stackoverflow.com/questions/6988355/open-gmail-on-mailto-action
You can specifically put in the following element:
<a href="https://mail.google.com/mail/?view=cm&fs=1&to={{toEmail}}&body={{greeting}}{{well_wishes}}{{introduction}}{{email_body}}{{signoff_word}}">Open draft in client</a>
If the user is signed into their Gmail account in that browser, this will open up a draft in Gmail with the content they've saved already pre-loaded in. (At the moment, they have to press "Save draft" button first for both of these proposed options, but that can be fixed if you want to incorporate this in the future).

For adding tooltips to blank spaces:
http://stackoverflow.com/questions/7117073/how-to-add-a-tooltip-to-a-div

For sending emails with Meteor from our site (if you want to do a feedback from friends feature):
https://themeteorchef.com/snippets/using-the-email-package/
