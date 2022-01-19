const { expect } = require('chai');
const sinon = require('sinon');
const notifications = require('../src/notification_service');
const tweeter = require('../src/tweet_service');
const emailer = require(`../src/email_service`)

describe('notification service', function () {
    const userProfile = {
        emailAddress: 'an_email@email.com',
        twitterHandle: '@fake_user'
    };

    it('triggers email to be sent', function () {
        const createEmailer = sinon.stub(emailer, 'createEmailer');
        const fakeEmailer = {sendEmail: sinon.spy()};
        createEmailer.returns(fakeEmailer);

        const notificationService = notifications.buildNotificationService();
        const message = 'Hello';
        notificationService.sendNotifications(userProfile, message);
        expect(fakeEmailer.sendEmail.calledOnce).to.be.true;
        expect(fakeEmailer.sendEmail.getCall(0).args[0]).to.equal(userProfile.emailAddress);
        expect(fakeEmailer.sendEmail.getCall(0).args[1]).to.equal(message);

        // Oops, did we just email somebody?
        // How do we check if anything happened?
    });
        this.afterEach(function(){
            sinon.restore()
        })
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