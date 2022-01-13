exports.createEmailer = function () {
    function email (address, message) {
        console.log(`Email "${message} sent to ${address}`);
    }
  
    return {
        sendEmail: email,
    };
};