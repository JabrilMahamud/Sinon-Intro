exports.createTweeter = function () {
    function tweet (address, message) {
        console.log(`Tweet " ${message}" sent to ${address}`);
    }

    return {
        sendTweet: tweet,
    };
};
