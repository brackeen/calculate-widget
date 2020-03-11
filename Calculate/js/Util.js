if (typeof CalcWidget === "undefined" || !CalcWidget) {
    var CalcWidget = {};
}

CalcWidget.valueToString = function(value) {
    if (value === undefined) {
        value = "undefined";
    }
    else if (value === null) {
        value = "null";
    }
    else if (typeof value === "boolean") {
        value = value.toString();
    }
    else if (typeof value === "number") {
        value = Math.fixPrecision(value).toString();
    }
    else if (value instanceof Array) {
        value = CalcWidget.arrayToString(value);
    }
    else if (typeof value === "string") {
        value = "\"" + value + "\"";
    }
    else if (typeof value === "function") {
        value = value.toString();
    }
    else if (value.toString() === "[object Object]") {
        value = CalcWidget.objectToString(value);
    }
    else {
        value = "\"" + value.toString() + "\"";
    }
    return value;
};

CalcWidget.arrayToString = function(a) {
    var s = "";
    for (var i = 0; i < a.length; i++) {
        s += CalcWidget.valueToString(a[i]);
        if (i < a.length - 1) {
            s += ",";
        }
    }
    return "[" + s + "]";
};

CalcWidget.objectToString = function(obj) {
    var s = "";
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (obj[i] !== undefined) {
                var value = CalcWidget.valueToString(obj[i]);
                s += "\"" + i + "\": " + value + ", ";
            }
        }
    }
    // Remove trailing comma
    if (s.charAt(s.length-2) === ',') {
        s = s.substring(0, s.length-2);
    }
    return "{" + s + "}";
};

CalcWidget.isAlphaNumeric = function(ch) {
    return ((ch >= '0' && ch <= '9') || ch.toLowerCase() !== ch.toUpperCase());
};
