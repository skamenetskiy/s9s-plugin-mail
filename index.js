var fs = require('fs'),
    hbs = require('handlebars');
hbs.registerHelper('ifCond', function(v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});
hbs.registerHelper('stringify', function(item) {
    try {
        return JSON.stringify(item);
    } catch (e) {
        return ''
    }
});
var html = hbs.compile(fs.readFileSync('./templates/html/mail.hbs', 'utf8')),
    text = hbs.compile(fs.readFileSync('./templates/text/mail.hbs', 'utf8'));
plugins.advisers.register('mail', function(config, data) {
    if (data instanceof Array) {
        data.forEach(function(item) {
            try {
                if (!config.to || !(config.to instanceof Array)) {
                    throw new Error('`to` is undefined or not an Array');
                }
                var subject = 'ClusterControl Adviser Alert: ' + item.client + '/' + item.alarm_id,
                message = {
                    subject: subject,
                    name: item.alarm_name,
                    description: item.alarm_description,
                    client: item.client || 'ClusterControl',
                    url: item.url || 'http://www.severalnines.com'
                };
                if (item.details) {
                    message.details = item.details;
                }
                if (item.contexts) {
                    message.contexts = items.contexts;
                }
                var options = {
                    subject: subject,
                    text: text(message),
                    html: html(message)
                };
                config.to.forEach(function(to) {
                    options.to = to;
                    mail.send(options);
                });
            } catch (error) {
                logger.warning('Mail: ' + error.message);
            }
        });
    }
});