var Hoek = require('hoek');
var Transform = require('stream').Transform;
var Moment = require('moment');

var internals = {
    defaults: {
        timestampFormat: '',
        utc: true
    }
};

module.exports = internals.Formatter = function (options) {
    if (!(this instanceof internals.Formatter)) {
        return new internals.Formatter(options);
    }
    options = options || {};
    this._settings = Hoek.applyToDefaults(internals.defaults, options);

    Transform.call(this, { objectMode: true });
}

internals.Formatter.prototype = Object.create(Transform.prototype);

internals.Formatter.prototype._transform = function (data, encoding, next) {
    var value;

    try {
        var m = Moment(parseInt(data.timestamp, 10));
        if (!this._settings.utc) { m.local(); }

        var timeObj = {
            time: m.format(this._settings.timestampFormat)
        };
        
        value = JSON.stringify(Hoek.merge(timeObj, data));
    } catch (err) {
        err.source = data;
        return next(err);
    }

    next(null, value + '\n');
}