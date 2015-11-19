var mailer = require('nodemailer');
plugins.notifications.register('mail', function() {
    console.log(arguments);
});
plugins.alarms.register('mail', function(config, handler, method, data) {
    if (undefined !== mail && config.to) {
        mail.send(config.to, 'ClusterControl alert', JSON.stringify(data));
    }
});