(function () {

    //js拓展
    String.prototype.format = function (args) {
        var result = this;
        var reg;
        if (arguments.length > 0) {
            if (arguments.length === 1 && typeof(args) === "object") {
                for (var key in args) {
                    if (args[key] !== undefined) {
                        reg = new RegExp("\\{" + key + "\\}", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            } else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] !== undefined) {
                        reg = new RegExp("\\{" + i + "\\}", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
    };

    Function.prototype.extend = function (fn) {
        if (typeof fn == "function") {
            this.prototype = new fn();
            return this;
        }
    };

    Function.prototype.mixin = function (fn) {
        var methodName;
        if (typeof fn == "function") {
            for (methodName in fn.prototype) {
                if (!this.prototype[methodName]) {
                    this.prototype[methodName] = fn.prototype[methodName];
                }
            }
        }
    };

    if (typeof Array.indexOf !== 'function') {
        Array.prototype.indexOf = function (args) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == args) return i;
            }
            return -1;
        }
    }

    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

    if (typeof Array.prototype.map != "function") {
        Array.prototype.map = function (fn, context) {
            var arr = [];
            if (typeof fn === "function") {
                for (var k = 0, length = this.length; k < length; k++) {
                    arr.push(fn.call(context, this[k], k, this));
                }
            }
            return arr;
        };
    }
})();