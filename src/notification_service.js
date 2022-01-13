const tweetService = require('./tweet_service');
const emailService = require('./email_service');

exports.buildNotificationService = function () {
    const emailer = emailService.createEmailer();
    const tweeter = tweetService.createTweeter();

    function sendNotifications (userProfile, message) {
        emailer.sendEmail(userProfile.emailAddress, message);
        tweeter.sendTweet(userProfile.twitterHandle, message);
    }

    return {
        sendNotifications: sendNotifications,
    };
};
