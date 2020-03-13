if (typeof Calculate === "undefined" || !Calculate) {
    var Calculate = {};
}

Calculate.isNativeFunction = function(value) {
    // From https://stackoverflow.com/a/6599105
    return typeof value === "function" && /\{\s+\[native code\]/.test(Function.prototype.toString.call(value))
}

Calculate.valueToString = function(value) {
    if (value === undefined) {
        return "undefined";
    } else if (value === null) {
        return "null";
    } else if (value === globalThis) {
        return "this";
    } else if (typeof value === "boolean") {
        return value.toString();
    } else if (typeof value === "number") {
        return Calculate.fixPrecision(value).toString();
    } else if (value instanceof Array) {
        return Calculate.arrayToString(value);
    } else if (typeof value === "string") {
        return '"' + value + '"';
    } else if (typeof value === "function") {
        return value.toString();
    } else if (typeof value === "object") {
        return Calculate.objectToString(value);
    } else {
        return '"' + value.toString() + '"';
    }
};

Calculate.arrayToString = function(a) {
    let s = "";
    for (let i = 0; i < a.length; i++) {
        s += Calculate.valueToString(a[i]);
        if (i < a.length - 1) {
            s += ",";
        }
    }
    return "[" + s + "]";
};

Calculate.objectToString = function(obj) {
    let s = "";
    for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
            const value = Calculate.valueToString(obj[i]);
            s += '"' + i + '": ' + value + ", ";
        }
    }
    // Remove trailing comma
    if (s.charAt(s.length - 2) === ",") {
        s = s.substring(0, s.length - 2);
    }
    return "{" + s + "}";
};

Calculate.fixPrecision = function(n) {
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function getSignificantDigits(n) {
        const s = Math.abs(n).toString().split("e")[0].split(".");

        // String before decimal. Remove leading zeroes
        const a = s[0].replace(/^0+/, "");
        // String after decimal. Remove trailing zeroes
        const b = s.length === 1 ? "" : s[1].replace(/0*$/, "");

        if (b.length === 0) {
            // Remove trailing zeroes
            return a.replace(/0*$/, "").length;
        } else if (a.length === 0) {
            // Remove leading zeroes
            return b.replace(/^0+/, "").length;
        } else {
            return a.length + b.length;
        }
    }

    if (isNumber(n)) {
        const p = getSignificantDigits(n);
        // If the number has at least 13 significant digits, reduce to 9 significant digits.
        // If the resulting number has much less precision, then use it instead of the original number.
        if (p >= 13) {
            const n2 = parseFloat(n.toPrecision(9));
            if (getSignificantDigits(n2) < 9) {
                n = n2;
            }
        }
    }
    return n;
};
