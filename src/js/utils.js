/**
 * Strings used in the calendar.
 * @return {array} All strings already localised when need be.
 */
bCalendar.prototype.strings = function () {
    if (this._strings) {
        return this._strings;
    }

    var strings = this.opts.classes;
    strings     = bCalendar.Utils.extend(strings, {
        prevYearLabel:  this.opts.translations.prevYearLabel[this.lang],
        nextYearLabel:  this.opts.translations.nextYearLabel[this.lang],
        nextMonthLabel: this.opts.translations.nextMonthLabel[this.lang],
        prevMonthLabel: this.opts.translations.prevMonthLabel[this.lang],
    });

    this._strings = strings;
    return this._strings;
};


/**
 * Make sures the events array as all years and month
 * according to the provided data
 *
 * @param year
 * @param month
 * @returns {bCalendar}
 */
bCalendar.prototype._buildEventsSkeleton = function (year, month) {
    // BUILDING events array
    if (typeof this.events[year] === 'undefined') {
        this.events[year] = {};
    }

    if (typeof this.events[year][month] === 'undefined') {
        this.events[year][month] = {};
    }

    // Number of events
    if (typeof this.numEvents[year] === 'undefined') {
        this.numEvents[year] = {
            num:    0,
            months: {}
        };

    }
    if (typeof this.numEvents[year].months[month] === 'undefined') {
        this.numEvents[year].months[month] = {
            num:  0,
            days: {}
        };
    }

    // Uniq events by months
    if (typeof this.singleEvents[year] === 'undefined') {
        this.singleEvents[year] = {
            months: {}
        };
    }
    if (typeof this.singleEvents[year].months[month] === 'undefined') {
        this.singleEvents[year].months[month] = [];
    }

    return this;
};

/**
 * Every data passed to this function will be cleaned and encoded for web
 * Recursive
 * Prevents output errors
 * @param {Object} data
 * @return {Object} data
 */
bCalendar.prototype.escapeDatas = function (data) {
    var that = this;

    if (typeof data === 'undefined') {
        return '';
    }

    if (typeof data === 'array') {
        var i     = 0;
        var count = data.length;
        for (; i < count; i++) {
            data[i] = this.escapeDatas(data[i]);
        }
    }

    if (typeof data === 'object') {
        for (var i in data) {
            data[i] = this.escapeDatas(data[i]);
        }
    }

    if (typeof data === 'string') {
        // Do not escape twice.
        data = this.unescapeDatas(data);
        return escape(data);
    }

    // Default;
    return data;

};

/**
 * Every data passed to this function will be cleaned and encoded for web
 * Recursive
 * Prevents output errors
 * @param {Object|string} data
 * @return {Object} data
 */
bCalendar.prototype.unescapeDatas = function (data) {

    if (typeof data === 'undefined') {
        return '';
    }

    if (typeof data === 'object') {
        for (var i in data) {
            data[i] = this.unescapeDatas(data[i]);
        }
    }

    if (typeof data === 'string') {
        var out = unescape(data);
        return out;
    }

    // Default;
    return data;
};


/**
 * Gets the event data over an calendar dom object
 * Mainly internal use
 *
 * @param {jQuery Dom object} elem | Elem that can trigger calendar events
 * @return {Object} ret | { date : date, events : [{event},{event}] }
 */
bCalendar.prototype._eventDatas = function (elem) {
    var date = elem.dataset.date;
    if (!date) {
        return {
            date:   null,
            events: []
        }
    }
    date = new Date(date);

    return {
        date:   date,
        events: this.getEventsByDate(date)
    };
};

/**
 * Replaces all instance of {property} by the args[property].
 * @param  {object} args Replacements.
 * @return {string}      Modified string.
 */
if (typeof String.prototype.strtr === 'undefined') {
    String.prototype.strtr = function (args) {
        var str = this.toString(),
            key, re;
        for (key in args) {
            if (args.hasOwnProperty(key)) {
                re  = new RegExp('{' + key + '}', "g");
                str = str.replace(re, args[key]);
            }
        }
        return str;
    }
}

/**
 * Returns the last day in a given Date object.
 * @param  {Date|string}      date DateTime or string of date.
 * @return {string}         Number of days in the month / last day of the month.
 */
if (typeof Date.prototype.getLastDayOfMonth === 'undefined') {
    Date.prototype.getLastDayOfMonth = function (date) {
        if (!date) {
            return new Date(this.getYear(), this.getMonth() + 1, 0).getDate();
        }

        if (!(date instanceof Date)) {
            date = new Date(date);
        }

        return new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
    }
}

/**
 * Extend function to mimic the jQuery.extend method with deep copying
 * @returns {{}}
 */
bCalendar.Utils = {
    extend: function () {

        var extended = {};
        var deep     = false;
        var i        = 0;
        var length   = arguments.length;

        // check if a deep merge
        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0];
            i++;
        }

        // merge the object into the extended object
        var merge = function (obj) {
            for (var prop in obj) if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                // if deep merge and property is an object, merge properties
                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]')
                    extended[prop] = bCalendar.Utils.extend(true, extended[prop], obj[prop]);
                else
                    extended[prop] = obj[prop];
            }
        };

        // loop through each object and conduct a merge
        for (; i < length; i++) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;
    },
    isEmpty: function(e) {
        if ((e.constructor === String || e.constructor === Array)) {
            return e.length === 0;
        }
        return Object.keys(e).length === 0 && e.constructor === Object
    }
};

/**
 * A storage solution aimed at replacing jQuerys data function.
 * Implementation Note: Elements are stored in a (WeakMap)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap].
 * This makes sure the data is garbage collected when the node is removed.
 * credits: https://stackoverflow.com/questions/29222027/vanilla-alternative-to-jquery-data-function-any-native-javascript-alternati
 */
window.dataStorage = {
    _storage: new WeakMap(),
    put: function (element, key, obj) {
        if (!this._storage.has(element)) {
            this._storage.set(element, new Map());
        }
        this._storage.get(element).set(key, obj);
    },
    get: function (element, key) {
        return this._storage.get(element).get(key);
    },
    has: function (element, key) {
        return this._storage.has(element) && this._storage.get(element).has(key);
    },
    remove: function (element, key) {
        var ret = this._storage.get(element).delete(key);
        if (!this._storage.get(element).size === 0) {
            this._storage.delete(element);
        }
        return ret;
    }
}

// Wrap it up
window.bCalendar = bCalendar;
