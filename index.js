const notificationService = require('./src/notification_service');

const service = notificationService.buildNotificationService();
const userProfile = {
    emailAddress: 'my_email@live.com',
    twitterHandle: '@SinonDev'
};

service.sendNotifications(userProfile, 'Hello, World!');