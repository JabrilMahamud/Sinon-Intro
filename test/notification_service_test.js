const { expect } = require('chai');
const sinon = require('sinon');
const notifications = require('../src/notification_service');
const tweeter = require('../src/tweet_service');

describe('notification service', function () {
    const userProfile = {
        emailAddress: 'an_email@email.com',
        twitterHandle: '@fake_user'
    };

    it('triggers email to be sent', function () {
        const notificationService = notifications.buildNotificationService();
        notificationService.sendNotifications(userProfile, 'Hello');
        // Oops, did we just email somebody?
        // How do we check if anything happened?
    });

    it('triggers tweet to be sent', function () {
        const createTweeter = sinon.stub(tweeter, 'createTweeter');
        const fakeTweeter = {sendTweet: sinon.spy()};
        createTweeter.returns(fakeTweeter);

        const notificationService = notifications.buildNotificationService();
        const message = 'Hello';
        notificationService.sendNotifications(userProfile, message);
        // Now we can check whether the right method was called!
        expect(fakeTweeter.sendTweet.calledOnce).to.be.true;
        expect(fakeTweeter.sendTweet.getCall(0).args[0]).to.equal(userProfile.twitterHandle);
        expect(fakeTweeter.sendTweet.getCall(0).args[1]).to.equal(message);
    });
});