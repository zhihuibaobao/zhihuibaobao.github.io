/*!
 * vue-validator v2.1.5
 * (c) 2016 kazuya kawaguchi
 * Released under the MIT License.
 */
!function (t, i) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : t.VueValidator = i()
}(this, function () {
    "use strict";
    function t(t, i) {
        window.console && (console.warn("[vue-validator] " + t), i && console.warn(i.stack))
    }

    function i(t) {
        if (null === t || void 0 === t)return !0;
        if (Array.isArray(t)) {
            if (t.length > 0)return !1;
            if (0 === t.length)return !0
        } else if (C.Vue.util.isPlainObject(t))for (var i in t)if (C.Vue.util.hasOwn(t, i))return !1;
        return !0
    }

    function e(t, i, e) {
        if (Array.isArray(t))for (var n = 0; n < t.length; n++)i.call(e || t[n], t[n], n); else if (C.Vue.util.isPlainObject(t)) {
            var a = C.Vue.util.hasOwn;
            for (var o in t)a(t, o) && i.call(e || t[o], t[o], o)
        }
    }

    function n(t, i) {
        var e = C.Vue.util.indexOf(t, i);
        return ~e ? t.splice(e, 1) : null
    }

    function a(t, i, e) {
        var n = document.createEvent("HTMLEvents");
        if (n.initEvent(i, !0, !1), e)for (var a in e)n[a] = e[a];
        try {
            t.dispatchEvent(n)
        } catch (t) {
        }
    }

    function o(t) {
        return t && "function" == typeof t.then
    }

    function r(t, i, e) {
        if (i = i.trim(), i.indexOf(" ") === -1)return void e(t, i);
        for (var n = i.split(/\s+/), a = 0, o = n.length; a < o; a++)e(t, n[a])
    }

    function s(t) {
        if (Array.isArray(t)) {
            if (0 !== t.length) {
                for (var i = !0, e = 0, n = t.length; e < n && (i = s(t[e]), i); e++);
                return i
            }
            return !1
        }
        return "number" == typeof t || "function" == typeof t || ("boolean" == typeof t ? t : "string" == typeof t ? t.length > 0 : null !== t && "object" === ("undefined" == typeof t ? "undefined" : w.typeof(t)) ? Object.keys(t).length > 0 : null !== t && void 0 !== t && void 0)
    }

    function l(t, i) {
        if ("string" != typeof i)return !1;
        var e = i.match(new RegExp("^/(.*?)/([gimy]*)$"));
        return !!e && new RegExp(e[1], e[2]).test(t)
    }

    function d(t, i) {
        return "string" == typeof t ? f(i, 10) && t.length >= parseInt(i, 10) : !!Array.isArray(t) && t.length >= parseInt(i, 10)
    }

    function u(t, i) {
        return "string" == typeof t ? f(i, 10) && t.length <= parseInt(i, 10) : !!Array.isArray(t) && t.length <= parseInt(i, 10)
    }

    function h(t, i) {
        return !isNaN(+t) && !isNaN(+i) && +t >= +i
    }

    function c(t, i) {
        return !isNaN(+t) && !isNaN(+i) && +t <= +i
    }

    function f(t) {
        return /^(-?[1-9]\d*|0)$/.test(t)
    }

    function p(t) {
        var i = t.util.extend, e = Object.create(null);
        i(e, k), t.options.validators = e;
        var n = t.config.optionMergeStrategies;
        n && (n.validators = function (t, e) {
            if (!e)return t;
            if (!t)return e;
            var n = Object.create(null);
            i(n, t);
            for (var a in e)n[a] = e[a];
            return n
        }), t.validator = function (i, e) {
            return e ? void(t.options.validators[i] = e) : t.options.validators[i]
        }
    }

    function v(t) {
        var i = t.prototype._init;
        t.prototype._init = function (t) {
            this._validatorMaps || (this._validatorMaps = Object.create(null)), i.call(this, t)
        };
        var e = t.prototype._destroy;
        t.prototype._destroy = function () {
            e.apply(this, arguments), this._validatorMaps = null
        }
    }

    function _(t) {
        var i = t.directive("if"), e = t.FragmentFactory, n = t.util, a = n.toArray, o = n.replace, r = n.createAnchor;
        t.directive("validate-class", {
            terminal: !0, priority: i.priority + F, bind: function () {
                var t = this, i = String(I++);
                this.setClassIds(this.el, i), this.vm.$on(E, this.cb = function (e, n, a) {
                    e.indexOf(i) > -1 && n.updateClasses(a, t.frag.node)
                }), this.setupFragment()
            }, unbind: function () {
                this.vm.$off(E, this.cb), this.teardownFragment()
            }, setClassIds: function (t, i) {
                for (var e = a(t.childNodes), n = 0, o = e.length; n < o; n++) {
                    var r = e[n];
                    if (1 === r.nodeType)for (var s = r.hasAttributes(), l = s && a(r.attributes), d = 0, u = l.length; d < u; d++) {
                        var h = l[d];
                        if (h.name.match(N)) {
                            var c = r.getAttribute(E), f = c ? c + "," + i : i;
                            r.setAttribute(E, f)
                        }
                    }
                    r.hasChildNodes() && this.setClassIds(r, i)
                }
            }, setupFragment: function () {
                this.anchor = r("v-validate-class"), o(this.el, this.anchor), this.factory = new e(this.vm, this.el), this.frag = this.factory.create(this._host, this._scope, this._frag), this.frag.before(this.anchor)
            }, teardownFragment: function () {
                this.frag && (this.frag.remove(), this.frag = null, this.factory = null), o(this.anchor, this.el), this.anchor = null
            }
        })
    }

    function g(t) {
        function i() {
            if (s) {
                var t = document.createElement("textarea");
                return t.placeholder = "t", "t" === t.cloneNode(!0).value
            }
            return !1
        }

        var n = t.directive("if"), a = t.FragmentFactory, o = t.parsers.directive.parseDirective, r = t.util, s = r.inBrowser, l = r.bind, d = r.on, u = r.off, h = r.createAnchor, c = r.replace, f = r.camelize, p = r.isPlainObject, v = i();
        t.directive("validate", {
            deep: !0,
            terminal: !0,
            priority: n.priority + A,
            params: ["group", "field", "detect-blur", "detect-change", "initial", "classes"],
            paramWatchers: {
                detectBlur: function (t, i) {
                    this._invalid || (this.validation.detectBlur = this.isDetectBlur(t), this.validator.validate(this.field))
                }, detectChange: function (t, i) {
                    this._invalid || (this.validation.detectChange = this.isDetectChange(t), this.validator.validate(this.field))
                }
            },
            bind: function () {
                var t = this.el, i = this.vm.$options._validator, e = t.getAttribute("v-model"), n = this.parseModelRaw(e), a = n.model, o = n.filters;
                this.model = a, this.setupFragment(), this.setupValidate(i, a, o), this.listen()
            },
            update: function (t, i) {
                if (t && !this._invalid) {
                    p(t) || i && p(i) ? this.handleObject(t, i) : (Array.isArray(t) || i && Array.isArray(i)) && this.handleArray(t, i);
                    var e = {field: this.field, noopable: this._initialNoopValidation};
                    this.frag && (e.el = this.frag.node), this.validator.validate(e), this._initialNoopValidation && (this._initialNoopValidation = null)
                }
            },
            unbind: function () {
                this._invalid || (this.unlisten(), this.teardownValidate(), this.teardownFragment(), this.model = null)
            },
            parseModelRaw: function (t) {
                if (S.test(t)) {
                    var i = o(t);
                    return {model: i.expression, filters: i.filters}
                }
                return {model: t}
            },
            setupValidate: function (t, i, e) {
                var n = this.params, a = this.validator = this.vm._validatorMaps[t];
                this.field = f(this.arg ? this.arg : n.field), this.validation = a.manageValidation(this.field, i, this.vm, this.getElementFrom(this.frag), this._scope, e, n.initial, this.isDetectBlur(n.detectBlur), this.isDetectChange(n.detectChange)), p(n.classes) && this.validation.setValidationClasses(n.classes), n.group && a.addGroupValidation(n.group, this.field), this._initialNoopValidation = this.isInitialNoopValidation(n.initial)
            },
            listen: function () {
                var t = this.model, i = this.validation, e = this.getElementFrom(this.frag);
                this.onBlur = l(i.listener, i), d(e, "blur", this.onBlur), "radio" !== e.type && "SELECT" !== e.tagName || t ? "checkbox" === e.type ? t ? (this.onClick = l(i.listener, i), d(e, "click", this.onClick)) : (this.onChange = l(i.listener, i), d(e, "change", this.onChange)) : t || (this.onInput = l(i.listener, i), d(e, "input", this.onInput)) : (this.onChange = l(i.listener, i), d(e, "change", this.onChange))
            },
            unlisten: function () {
                var t = this.getElementFrom(this.frag);
                this.onInput && (u(t, "input", this.onInput), this.onInput = null), this.onClick && (u(t, "click", this.onClick), this.onClick = null), this.onChange && (u(t, "change", this.onChange), this.onChange = null), this.onBlur && (u(t, "blur", this.onBlur), this.onBlur = null)
            },
            teardownValidate: function () {
                if (this.validator && this.validation) {
                    var t = this.getElementFrom(this.frag);
                    this.params.group && this.validator.removeGroupValidation(this.params.group, this.field), this.validator.unmanageValidation(this.field, t), this.validator = null, this.validation = null, this.field = null
                }
            },
            setupFragment: function () {
                this.anchor = h("v-validate"), c(this.el, this.anchor), this.factory = new a(this.vm, this.shimNode(this.el)), this.frag = this.factory.create(this._host, this._scope, this._frag), this.frag.before(this.anchor)
            },
            teardownFragment: function () {
                this.frag && (this.frag.remove(), this.frag = null, this.factory = null), c(this.anchor, this.el), this.anchor = null
            },
            handleArray: function (t, i) {
                var n = this;
                i && this.validation.resetValidation(), e(t, function (t) {
                    n.validation.setValidation(t)
                })
            },
            handleObject: function (t, i) {
                var n = this;
                i && this.validation.resetValidation(), e(t, function (t, i) {
                    if (p(t)) {
                        if ("rule"in t) {
                            var e = "message"in t ? t.message : null, a = "initial"in t ? t.initial : null;
                            n.validation.setValidation(i, t.rule, e, a)
                        }
                    } else n.validation.setValidation(i, t)
                })
            },
            isDetectBlur: function (t) {
                return void 0 === t || "on" === t || t === !0
            },
            isDetectChange: function (t) {
                return void 0 === t || "on" === t || t === !0
            },
            isInitialNoopValidation: function (t) {
                return "off" === t || t === !1
            },
            shimNode: function (t) {
                var i = t;
                if (v && "TEXTAREA" === t.tagName) {
                    i = t.cloneNode(!0), i.value = t.value;
                    for (var e = i.childNodes.length; e--;)i.removeChild(i.childNodes[e])
                }
                return i
            },
            getElementFrom: function (t) {
                return t.single ? t.node : t.node.nextSibling
            }
        })
    }

    function m(t) {
        var i = t.FragmentFactory, e = t.directive("if"), n = t.util, a = n.isArray, o = n.isPlainObject, r = n.createAnchor, s = n.replace, l = n.extend, d = n.camelize;
        t.elementDirective("validator", {
            params: ["name", "groups", "lazy", "classes"], bind: function () {
                var t = this.params;
                if (this.validatorName = "$" + d(t.name), !this.vm._validatorMaps)throw new Error("Invalid validator management error");
                var i = {};
                o(this.params.classes) && (i = this.params.classes), this.setupValidator(i), this.setupFragment(t.lazy)
            }, unbind: function () {
                this.teardownFragment(), this.teardownValidator()
            }, getGroups: function () {
                var t = this.params, i = [];
                return t.groups && (a(t.groups) ? i = t.groups : o(t.groups) || "string" != typeof t.groups || i.push(t.groups)), i
            }, setupValidator: function (t) {
                var i = this.validator = new U(this.validatorName, this, this.getGroups(), t);
                i.enableReactive(), i.setupScope(), i.registerEvents()
            }, teardownValidator: function () {
                this.validator.unregisterEvents(), this.validator.disableReactive(), this.validatorName && (this.validatorName = null, this.validator = null)
            }, setupFragment: function (t) {
                var n = this, a = this.vm;
                this.validator.waitFor(function () {
                    n.anchor = r("vue-validator"), s(n.el, n.anchor), l(a.$options, {_validator: n.validatorName}), n.factory = new i(a, n.el.innerHTML), e.insert.call(n)
                }), !t && a.$activateValidator()
            }, teardownFragment: function () {
                e.unbind.call(this)
            }
        })
    }

    function y(t) {
        var i = {
            name: "validator-error",
            props: {
                field: {type: String, required: !0},
                validator: {type: String},
                message: {type: String, required: !0},
                partial: {type: String, default: "validator-error-default"}
            },
            template: '<div><partial :name="partial"></partial></div>',
            partials: {}
        };
        return i.partials["validator-error-default"] = "<p>{{field}}: {{message}}</p>", i
    }

    function V(t) {
        var i = t.util, e = y(t), n = {
            name: "validator-errors",
            props: {
                validation: {type: Object, required: !0},
                group: {type: String, default: null},
                field: {type: String, default: null},
                component: {type: String, default: "validator-error"}
            },
            computed: {
                errors: function () {
                    var t = this;
                    if (null !== this.group)return this.validation[this.group].errors;
                    if (null !== this.field) {
                        var e = this.validation[this.field];
                        if (!e.errors)return;
                        return e.errors.map(function (e) {
                            var n = {field: t.field};
                            return i.isPlainObject(e) ? (e.validator && (n.validator = e.validator), n.message = e.message) : "string" == typeof e && (n.message = e), n
                        })
                    }
                    return this.validation.errors
                }
            },
            template: '<template v-for="error in errors"><component :is="component" :partial="partial" :field="error.field" :validator="error.validator" :message="error.message"></component></template>',
            components: {}
        };
        return n.props.partial = e.props.partial, n.components[e.name] = e, t.component(n.name, n), n
    }

    function b(i) {
        arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
        return b.installed ? void t("already installed.") : (C.Vue = i, p(i), V(i), v(i), m(i), _(i), void g(i))
    }

    var w = {};
    w.typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
    }, w.classCallCheck = function (t, i) {
        if (!(t instanceof i))throw new TypeError("Cannot call a class as a function")
    }, w.createClass = function () {
        function t(t, i) {
            for (var e = 0; e < i.length; e++) {
                var n = i[e];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value"in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
            }
        }

        return function (i, e, n) {
            return e && t(i.prototype, e), n && t(i, n), i
        }
    }(), w.inherits = function (t, i) {
        if ("function" != typeof i && null !== i)throw new TypeError("Super expression must either be null or a function, not " + typeof i);
        t.prototype = Object.create(i && i.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), i && (Object.setPrototypeOf ? Object.setPrototypeOf(t, i) : t.__proto__ = i)
    }, w.possibleConstructorReturn = function (t, i) {
        if (!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !i || "object" != typeof i && "function" != typeof i ? t : i
    };
    var C = {}, k = Object.freeze({
        required: s,
        pattern: l,
        minlength: d,
        maxlength: u,
        min: h,
        max: c
    }), E = "__vue-validator-validate-update__", A = 16, F = 32, S = /[^|]\|[^|]/, N = /^v-validate(?:$|:(.*)$)/, x = /^v-on:|^@/, I = 0, O = function () {
        function t(i, e, n, a, o, r, s, l, d) {
            w.classCallCheck(this, t), this.field = i, this.touched = !1, this.dirty = !1, this.modified = !1, this._modified = !1, this._model = e, this._filters = s, this._validator = r, this._vm = n, this._el = a, this._forScope = o, this._init = this._getValue(a), this._validators = {}, this._detectBlur = l, this._detectChange = d, this._classes = {}
        }

        return t.prototype.manageElement = function (t, i) {
            var e = this, n = this._getScope(), a = this._model;
            this._initial = i;
            var o = t.getAttribute(E);
            o && (t.removeAttribute(E), this._classIds = o.split(",")), a && (t.value = this._evalModel(a, this._filters), this._unwatch = n.$watch(a, function (i, n) {
                if (i !== n) {
                    if (e.guardValidate(t, "input"))return;
                    e.handleValidate(t, {noopable: e._initial}), e._initial && (e._initial = null)
                }
            }, {deep: !0}))
        }, t.prototype.unmanageElement = function (t) {
            this._unwatch && this._unwatch()
        }, t.prototype.resetValidation = function () {
            var t = this, i = Object.keys(this._validators);
            e(i, function (i, e) {
                t._validators[i] = null, delete t._validators[i]
            })
        }, t.prototype.setValidation = function (t, i, e, n) {
            var a = this._validators[t];
            a || (a = this._validators[t] = {}, a.name = t), a.arg = i, e && (a.msg = e), n && (a.initial = n, a._isNoopable = !0)
        }, t.prototype.setValidationClasses = function (t) {
            var i = this;
            e(t, function (t, e) {
                i._classes[e] = t
            })
        }, t.prototype.willUpdateFlags = function () {
            var t = !(arguments.length <= 0 || void 0 === arguments[0]) && arguments[0];
            t && this.willUpdateTouched(this._el, "blur"), this.willUpdateDirty(this._el), this.willUpdateModified(this._el)
        }, t.prototype.willUpdateTouched = function (t, i) {
            i && "blur" === i && (this.touched = !0, this._fireEvent(t, "touched"))
        }, t.prototype.willUpdateDirty = function (t) {
            !this.dirty && this._checkModified(t) && (this.dirty = !0, this._fireEvent(t, "dirty"))
        }, t.prototype.willUpdateModified = function (t) {
            this.modified = this._checkModified(t), this._modified !== this.modified && (this._fireEvent(t, "modified", {modified: this.modified}), this._modified = this.modified)
        }, t.prototype.listener = function (t) {
            this.guardValidate(t.target, t.type) || this.handleValidate(t.target, {type: t.type})
        }, t.prototype.handleValidate = function (t) {
            var i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], e = i.type, n = void 0 === e ? null : e, a = i.noopable, o = void 0 !== a && a;
            this.willUpdateTouched(t, n), this.willUpdateDirty(t), this.willUpdateModified(t), this._validator.validate({
                field: this.field,
                el: t,
                noopable: o
            })
        }, t.prototype.validate = function (t) {
            var e = this, n = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1], a = arguments.length <= 2 || void 0 === arguments[2] ? null : arguments[2], o = C.Vue.util, r = {}, s = [], l = !0;
            this._runValidators(function (t, i, a) {
                var d = e._resolveValidator(i), u = null, h = null;
                if (o.isPlainObject(d) ? (d.check && "function" == typeof d.check && (u = d.check), d.message && (h = d.message)) : "function" == typeof d && (u = d), t.msg && (h = t.msg), n)return r[i] = !1, a();
                if (t._isNoopable)return r[i] = !1, t._isNoopable = null, a();
                if (u) {
                    var c = e._getValue(e._el);
                    e._invokeValidator(e._vm, u, c, t.arg, function (n, o) {
                        if (n)r[i] = !n; else if (l = !1, o)s.push({validator: i, message: o}), r[i] = o; else if (h) {
                            var d = {validator: i};
                            d.message = "function" == typeof h ? h.call(e._vm, e.field, t.arg) : h, s.push(d), r[i] = d.message
                        } else r[i] = !n;
                        a()
                    })
                } else a()
            }, function () {
                e._fireEvent(e._el, l ? "valid" : "invalid");
                var n = {
                    valid: l,
                    invalid: !l,
                    touched: e.touched,
                    untouched: !e.touched,
                    dirty: e.dirty,
                    pristine: !e.dirty,
                    modified: e.modified
                };
                i(s) || (n.errors = s), o.extend(r, n), e.willUpdateClasses(r, a), t(r)
            })
        }, t.prototype.resetFlags = function () {
            this.touched = !1, this.dirty = !1, this.modified = !1, this._modified = !1
        }, t.prototype.reset = function () {
            e(this._validators, function (t, i) {
                t.initial && !t._isNoopable && (t._isNoopable = !0)
            }), this.resetFlags(), this._init = this._getValue(this._el)
        }, t.prototype.willUpdateClasses = function (t) {
            var i = this, e = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
            this._checkClassIds(e) ? !function () {
                var n = i._getClassIds(e);
                i.vm.$nextTick(function () {
                    i.vm.$emit(E, n, i, t)
                })
            }() : this.updateClasses(t)
        }, t.prototype.updateClasses = function (t) {
            var i = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
            this._updateClasses(i || this._el, t)
        }, t.prototype.guardValidate = function (t, i) {
            return !(!i || "blur" !== i || this.detectBlur) || (!(!i || "input" !== i || this.detectChange) || (!(!i || "change" !== i || this.detectChange) || !(!i || "click" !== i || this.detectChange)))
        }, t.prototype._getValue = function (t) {
            return t.value
        }, t.prototype._getScope = function () {
            return this._forScope || this._vm
        }, t.prototype._getClassIds = function (t) {
            return this._classIds
        }, t.prototype._checkModified = function (t) {
            return this._init !== this._getValue(t)
        }, t.prototype._checkClassIds = function (t) {
            return this._getClassIds(t)
        }, t.prototype._fireEvent = function (t, i, e) {
            a(t, i, e)
        }, t.prototype._evalModel = function (t, i) {
            var e = this._getScope(), n = null;
            return i ? (n = e.$get(t), i ? this._applyFilters(n, null, i) : n) : (n = e.$get(t), void 0 === n || null === n ? "" : n)
        }, t.prototype._updateClasses = function (t, i) {
            this._toggleValid(t, i.valid), this._toggleTouched(t, i.touched), this._togglePristine(t, i.pristine), this._toggleModfied(t, i.modified)
        }, t.prototype._toggleValid = function (t, i) {
            var e = C.Vue.util, n = e.addClass, a = e.removeClass, o = this._classes.valid || "valid", s = this._classes.invalid || "invalid";
            i ? (r(t, o, n), r(t, s, a)) : (r(t, o, a), r(t, s, n))
        }, t.prototype._toggleTouched = function (t, i) {
            var e = C.Vue.util, n = e.addClass, a = e.removeClass, o = this._classes.touched || "touched", s = this._classes.untouched || "untouched";
            i ? (r(t, o, n), r(t, s, a)) : (r(t, o, a), r(t, s, n))
        }, t.prototype._togglePristine = function (t, i) {
            var e = C.Vue.util, n = e.addClass, a = e.removeClass, o = this._classes.pristine || "pristine", s = this._classes.dirty || "dirty";
            i ? (r(t, o, n), r(t, s, a)) : (r(t, o, a), r(t, s, n))
        }, t.prototype._toggleModfied = function (t, i) {
            var e = C.Vue.util, n = e.addClass, a = e.removeClass, o = this._classes.modified || "modified";
            i ? r(t, o, n) : r(t, o, a)
        }, t.prototype._applyFilters = function (t, i, e, n) {
            var a = C.Vue.util.resolveAsset, o = this._getScope(), r = void 0, s = void 0, l = void 0, d = void 0, u = void 0, h = void 0, c = void 0, f = void 0, p = void 0;
            for (h = 0, c = e.length; h < c; h++)if (r = e[h], s = a(this._vm.$options, "filters", r.name), s && (s = n ? s.write : s.read || s, "function" == typeof s)) {
                if (l = n ? [t, i] : [t], u = n ? 2 : 1, r.args)for (f = 0, p = r.args.length; f < p; f++)d = r.args[f], l[f + u] = d.dynamic ? o.$get(d.value) : d.value;
                t = s.apply(this._vm, l)
            }
            return t
        }, t.prototype._runValidators = function (t, i) {
            var n = this._validators, a = Object.keys(n).length, o = 0;
            e(n, function (e, n) {
                t(e, n, function () {
                    ++o, o >= a && i()
                })
            })
        }, t.prototype._invokeValidator = function (t, i, e, n, a) {
            var r = i.call(this, e, n);
            "function" == typeof r ? r(function () {
                a(!0)
            }, function (t) {
                a(!1, t)
            }) : o(r) ? r.then(function () {
                a(!0)
            }, function (t) {
                a(!1, t)
            }).catch(function (t) {
                a(!1, t.message)
            }) : a(r)
        }, t.prototype._resolveValidator = function (t) {
            var i = C.Vue.util.resolveAsset;
            return i(this._vm.$options, "validators", t)
        }, w.createClass(t, [{
            key: "vm", get: function () {
                return this._vm
            }
        }, {
            key: "el", get: function () {
                return this._el
            }
        }, {
            key: "detectChange", get: function () {
                return this._detectChange
            }, set: function (t) {
                this._detectChange = t
            }
        }, {
            key: "detectBlur", get: function () {
                return this._detectBlur
            }, set: function (t) {
                this._detectBlur = t
            }
        }]), t
    }(), $ = function (t) {
        function i(e, n, a, o, r, s, l, d, u) {
            w.classCallCheck(this, i);
            var h = w.possibleConstructorReturn(this, t.call(this, e, n, a, o, r, s, l, d, u));
            return h._inits = [], h
        }

        return w.inherits(i, t), i.prototype.manageElement = function (t, i) {
            var e = this, n = this._getScope(), a = this._addItem(t, i), o = a.model = this._model;
            if (o) {
                var r = this._evalModel(o, this._filters);
                Array.isArray(r) ? (this._setChecked(r, a.el), a.unwatch = n.$watch(o, function (t, i) {
                    if (t !== i) {
                        if (e.guardValidate(a.el, "change"))return;
                        e.handleValidate(a.el, {noopable: a.initial}), a.initial && (a.initial = null)
                    }
                })) : (t.checked = r || !1, this._init = t.checked, a.init = t.checked, a.value = t.value, a.unwatch = n.$watch(o, function (i, n) {
                    if (i !== n) {
                        if (e.guardValidate(t, "change"))return;
                        e.handleValidate(t, {noopable: a.initial}), a.initial && (a.initial = null)
                    }
                }))
            } else {
                var s = {field: this.field, noopable: i};
                this._checkClassIds(t) && (s.el = t), this._validator.validate(s)
            }
        }, i.prototype.unmanageElement = function (t) {
            var i = -1;
            e(this._inits, function (e, n) {
                e.el === t && (i = n, e.unwatch && e.model && (e.unwatch(), e.unwatch = null, e.model = null))
            }), i !== -1 && (this._inits.splice(i, 1), this._validator.validate({field: this.field}))
        }, i.prototype.willUpdateFlags = function () {
            var t = this, i = !(arguments.length <= 0 || void 0 === arguments[0]) && arguments[0];
            e(this._inits, function (e, n) {
                i && t.willUpdateTouched(e.el, "blur"), t.willUpdateDirty(e.el), t.willUpdateModified(e.el)
            })
        }, i.prototype.reset = function () {
            this.resetFlags(), e(this._inits, function (t, i) {
                t.init = t.el.checked, t.value = t.el.value
            })
        }, i.prototype.updateClasses = function (t) {
            var i = this, n = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
            n ? this._updateClasses(n, t) : e(this._inits, function (e, n) {
                i._updateClasses(e.el, t)
            })
        }, i.prototype._addItem = function (t, i) {
            var e = {el: t, init: t.checked, value: t.value, initial: i}, n = t.getAttribute(E);
            return n && (t.removeAttribute(E), e.classIds = n.split(",")), this._inits.push(e), e
        }, i.prototype._setChecked = function (t, i) {
            for (var e = 0, n = t.length; e < n; e++) {
                var a = t[e];
                i.disabled || i.value !== a || i.checked || (i.checked = !0)
            }
        }, i.prototype._getValue = function (t) {
            var i = this;
            if (!this._inits || 0 === this._inits.length)return t.checked;
            var n = function () {
                var t = [];
                return e(i._inits, function (i, e) {
                    i.el.checked && t.push(i.el.value)
                }), {v: t}
            }();
            return "object" === ("undefined" == typeof n ? "undefined" : w.typeof(n)) ? n.v : void 0
        }, i.prototype._getClassIds = function (t) {
            var i = void 0;
            return e(this._inits, function (e, n) {
                e.el === t && (i = e.classIds)
            }), i
        }, i.prototype._checkModified = function (t) {
            var i = this;
            if (0 === this._inits.length)return this._init !== t.checked;
            var n = function () {
                var t = !1;
                return e(i._inits, function (i, e) {
                    t || (t = i.init !== i.el.checked)
                }), {v: t}
            }();
            return "object" === ("undefined" == typeof n ? "undefined" : w.typeof(n)) ? n.v : void 0
        }, i
    }(O), M = function (t) {
        function i(e, n, a, o, r, s, l, d, u) {
            w.classCallCheck(this, i);
            var h = w.possibleConstructorReturn(this, t.call(this, e, n, a, o, r, s, l, d, u));
            return h._inits = [], h
        }

        return w.inherits(i, t), i.prototype.manageElement = function (t, i) {
            var e = this, n = this._getScope(), a = this._addItem(t, i), o = a.model = this._model;
            if (o) {
                var r = this._evalModel(o, this._filters);
                this._setChecked(r, t, a), a.unwatch = n.$watch(o, function (i, n) {
                    if (i !== n) {
                        if (e.guardValidate(a.el, "change"))return;
                        e.handleValidate(t, {noopable: a.initial}), a.initial && (a.initial = null)
                    }
                })
            } else {
                var s = {field: this.field, noopable: i};
                this._checkClassIds(t) && (s.el = t), this._validator.validate(s)
            }
        }, i.prototype.unmanageElement = function (t) {
            var i = -1;
            e(this._inits, function (e, n) {
                e.el === t && (i = n)
            }), i !== -1 && (this._inits.splice(i, 1), this._validator.validate({field: this.field}))
        }, i.prototype.willUpdateFlags = function () {
            var t = this, i = !(arguments.length <= 0 || void 0 === arguments[0]) && arguments[0];
            e(this._inits, function (e, n) {
                i && t.willUpdateTouched(e.el, "blur"), t.willUpdateDirty(e.el), t.willUpdateModified(e.el)
            })
        }, i.prototype.reset = function () {
            this.resetFlags(), e(this._inits, function (t, i) {
                t.init = t.el.checked, t.value = t.el.value
            })
        }, i.prototype.updateClasses = function (t) {
            var i = this, n = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
            n ? this._updateClasses(n, t) : e(this._inits, function (e, n) {
                i._updateClasses(e.el, t)
            })
        }, i.prototype._addItem = function (t, i) {
            var e = {el: t, init: t.checked, value: t.value, initial: i}, n = t.getAttribute(E);
            return n && (t.removeAttribute(E), e.classIds = n.split(",")), this._inits.push(e), e
        }, i.prototype._setChecked = function (t, i, e) {
            i.value === t && (i.checked = !0, this._init = i.checked, e.init = i.checked, e.value = t)
        }, i.prototype._getValue = function (t) {
            var i = this;
            if (!this._inits || 0 === this._inits.length)return t.checked;
            var n = function () {
                var t = [];
                return e(i._inits, function (i, e) {
                    i.el.checked && t.push(i.el.value)
                }), {v: t}
            }();
            return "object" === ("undefined" == typeof n ? "undefined" : w.typeof(n)) ? n.v : void 0
        }, i.prototype._getClassIds = function (t) {
            var i = void 0;
            return e(this._inits, function (e, n) {
                e.el === t && (i = e.classIds)
            }), i
        }, i.prototype._checkModified = function (t) {
            var i = this;
            if (0 === this._inits.length)return this._init !== t.checked;
            var n = function () {
                var t = !1;
                return e(i._inits, function (i, e) {
                    t || (t = i.init !== i.el.checked)
                }), {v: t}
            }();
            return "object" === ("undefined" == typeof n ? "undefined" : w.typeof(n)) ? n.v : void 0
        }, i
    }(O), j = function (t) {
        function i(e, n, a, o, r, s, l, d, u) {
            w.classCallCheck(this, i);
            var h = w.possibleConstructorReturn(this, t.call(this, e, n, a, o, r, s, l, d, u));
            return h._multiple = h._el.hasAttribute("multiple"), h
        }

        return w.inherits(i, t), i.prototype.manageElement = function (t, i) {
            var e = this, n = this._getScope(), a = this._model;
            this._initial = i;
            var o = t.getAttribute(E);
            if (o && (t.removeAttribute(E), this._classIds = o.split(",")), a) {
                var r = this._evalModel(a, this._filters), s = Array.isArray(r) ? r : [r];
                this._setOption(s, t), this._unwatch = n.$watch(a, function (i, n) {
                    var a = Array.isArray(i) ? i : [i], o = Array.isArray(n) ? n : [n];
                    if (a.slice().sort().toString() !== o.slice().sort().toString()) {
                        if (e.guardValidate(t, "change"))return;
                        e.handleValidate(t, {noopable: e._initial}), e._initial && (e._initial = null)
                    }
                })
            }
        }, i.prototype.unmanageElement = function (t) {
            this._unwatch && this._unwatch()
        }, i.prototype.reset = function () {
            this.resetFlags()
        }, i.prototype._getValue = function (t) {
            for (var i = [], e = 0, n = t.options.length; e < n; e++) {
                var a = t.options[e];
                !a.disabled && a.selected && i.push(a.value)
            }
            return i
        }, i.prototype._setOption = function (t, i) {
            for (var e = 0, n = t.length; e < n; e++)for (var a = t[e], o = 0, r = i.options.length; o < r; o++) {
                var s = i.options[o];
                s.disabled || s.value !== a || s.hasAttribute("selected") && s.selected || (s.selected = !0)
            }
        }, i.prototype._checkModified = function (t) {
            var i = this._getValue(t).slice().sort();
            if (this._init.length !== i.length)return !0;
            var e = this._init.slice().sort();
            return e.toString() !== i.toString()
        }, i
    }(O), U = function () {
        function t(i, n, a, o) {
            var r = this;
            w.classCallCheck(this, t), this.name = i, this._scope = {}, this._dir = n, this._validations = {}, this._checkboxValidations = {}, this._radioValidations = {}, this._groups = a, this._groupValidations = {}, this._events = {}, this._modified = !1, this._classes = o, e(a, function (t) {
                r._groupValidations[t] = []
            })
        }

        return t.prototype.enableReactive = function () {
            var t = this._dir.vm;
            C.Vue.util.defineReactive(t, this.name, this._scope), t._validatorMaps[this.name] = this, this._defineResetValidation(), this._defineValidate(), this._defineSetValidationErrors()
        }, t.prototype.disableReactive = function () {
            var t = this._dir.vm;
            t.$setValidationErrors = null, delete t.$setValidationErrors, t.$validate = null, delete t.$validate, t.$validatorReset = null, delete t.$validatorReset, t._validatorMaps[this.name] = null, delete t._validatorMaps[this.name], t[this.name] = null, delete t[this.name]
        }, t.prototype.registerEvents = function () {
            for (var t = C.Vue.parsers.expression.isSimplePath, i = this._dir.el.attributes, e = 0, n = i.length; e < n; e++) {
                var a = i[e].name;
                if (x.test(a)) {
                    var o = i[e].value;
                    t(o) && (o += ".apply(this, $arguments)"), a = a.replace(x, ""), this._events[this._getEventName(a)] = this._dir.vm.$eval(o, !0)
                }
            }
        }, t.prototype.unregisterEvents = function () {
            var t = this;
            e(this._events, function (i, e) {
                t._events[e] = null, delete t._events[e]
            })
        }, t.prototype.manageValidation = function (t, i, e, n, a, o, r, s, l) {
            var d = null;
            return d = "SELECT" === n.tagName ? this._manageSelectValidation(t, i, e, n, a, o, r, s, l) : "checkbox" === n.type ? this._manageCheckboxValidation(t, i, e, n, a, o, r, s, l) : "radio" === n.type ? this._manageRadioValidation(t, i, e, n, a, o, r, s, l) : this._manageBaseValidation(t, i, e, n, a, o, r, s, l), d.setValidationClasses(this._classes), d
        }, t.prototype.unmanageValidation = function (t, i) {
            "checkbox" === i.type ? this._unmanageCheckboxValidation(t, i) : "radio" === i.type ? this._unmanageRadioValidation(t, i) : "SELECT" === i.tagName ? this._unmanageSelectValidation(t, i) : this._unmanageBaseValidation(t, i)
        }, t.prototype.addGroupValidation = function (t, i) {
            var e = C.Vue.util.indexOf, n = this._getValidationFrom(i), a = this._groupValidations[t];
            a && !~e(a, n) && a.push(n)
        }, t.prototype.removeGroupValidation = function (t, i) {
            var e = this._getValidationFrom(i), a = this._groupValidations[t];
            a && n(a, e)
        }, t.prototype.validate = function () {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], i = t.el, n = void 0 === i ? null : i, a = t.field, o = void 0 === a ? null : a, r = t.touched, s = void 0 !== r && r, l = t.noopable, d = void 0 !== l && l, u = t.cb, h = void 0 === u ? null : u;
            o ? this._validate(o, s, d, n, h) : (e(this.validations, function (t, i) {
                t.willUpdateFlags(s)
            }), this._validates(h))
        }, t.prototype.setupScope = function () {
            var t = this;
            this._defineProperties(function () {
                return t.validations
            }, function () {
                return t._scope
            }), e(this._groups, function (i) {
                var e = t._groupValidations[i], n = {};
                C.Vue.set(t._scope, i, n), t._defineProperties(function () {
                    return e
                }, function () {
                    return n
                })
            })
        }, t.prototype.waitFor = function (t) {
            var i = "$activateValidator", e = this._dir.vm;
            e[i] = function () {
                t(), e[i] = null
            }
        }, t.prototype._defineResetValidation = function () {
            var t = this;
            this._dir.vm.$resetValidation = function (i) {
                t._resetValidation(i)
            }
        }, t.prototype._defineValidate = function () {
            var t = this;
            this._dir.vm.$validate = function () {
                for (var i = arguments.length, n = Array(i), a = 0; a < i; a++)n[a] = arguments[a];
                var o = null, r = !1, s = null;
                e(n, function (t, i) {
                    "string" == typeof t ? o = t : "boolean" == typeof t ? r = t : "function" == typeof t && (s = t)
                }), t.validate({field: o, touched: r, cb: s})
            }
        }, t.prototype._defineSetValidationErrors = function () {
            var t = this;
            this._dir.vm.$setValidationErrors = function (i) {
                t._setValidationErrors(i)
            }
        }, t.prototype._validate = function (t) {
            var i = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1], e = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2], n = this, a = arguments.length <= 3 || void 0 === arguments[3] ? null : arguments[3], o = arguments.length <= 4 || void 0 === arguments[4] ? null : arguments[4], r = this._scope, s = this._getValidationFrom(t);
            s && (s.willUpdateFlags(i), s.validate(function (i) {
                C.Vue.set(r, t, i), n._fireEvents(), o && o()
            }, e, a))
        }, t.prototype._validates = function (t) {
            var i = this, e = this._scope;
            this._runValidates(function (t, i, n) {
                t.validate(function (t) {
                    C.Vue.set(e, i, t), n()
                })
            }, function () {
                i._fireEvents(), t && t()
            })
        }, t.prototype._getValidationFrom = function (t) {
            return this._validations[t] || this._checkboxValidations[t] && this._checkboxValidations[t].validation || this._radioValidations[t] && this._radioValidations[t].validation
        }, t.prototype._resetValidation = function (t) {
            e(this.validations, function (t, i) {
                t.reset()
            }), this._validates(t)
        }, t.prototype._setValidationErrors = function (t) {
            var i = this, n = C.Vue.util.extend, a = {};
            e(t, function (t, i) {
                a[t.field] || (a[t.field] = []), a[t.field].push(t)
            }), e(a, function (t, a) {
                var o = i._scope[a], r = {};
                e(t, function (t) {
                    t.validator && (o[t.validator] = t.message)
                }), o.valid = !1, o.invalid = !0, o.errors = t, n(r, o);
                var s = i._getValidationFrom(a);
                s.willUpdateClasses(r, s.el), C.Vue.set(i._scope, a, r)
            })
        }, t.prototype._manageBaseValidation = function (t, i, e, n, a, o, r, s, l) {
            var d = this._validations[t] = new O(t, i, e, n, a, this, o, s, l);
            return d.manageElement(n, r), d
        }, t.prototype._unmanageBaseValidation = function (t, i) {
            var e = this._validations[t];
            e && (e.unmanageElement(i), C.Vue.delete(this._scope, t), this._validations[t] = null, delete this._validations[t])
        }, t.prototype._manageCheckboxValidation = function (t, i, e, n, a, o, r, s, l) {
            var d = this._checkboxValidations[t];
            if (!d) {
                var u = new $(t, i, e, n, a, this, o, s, l);
                d = {validation: u, elements: 0}, this._checkboxValidations[t] = d
            }
            return d.elements++, d.validation.manageElement(n, r), d.validation
        }, t.prototype._unmanageCheckboxValidation = function (t, i) {
            var e = this._checkboxValidations[t];
            e && (e.elements--, e.validation.unmanageElement(i), 0 === e.elements && (C.Vue.delete(this._scope, t), this._checkboxValidations[t] = null, delete this._checkboxValidations[t]))
        }, t.prototype._manageRadioValidation = function (t, i, e, n, a, o, r, s, l) {
            var d = this._radioValidations[t];
            if (!d) {
                var u = new M(t, i, e, n, a, this, o, s, l);
                d = {validation: u, elements: 0}, this._radioValidations[t] = d
            }
            return d.elements++, d.validation.manageElement(n, r), d.validation
        }, t.prototype._unmanageRadioValidation = function (t, i) {
            var e = this._radioValidations[t];
            e && (e.elements--, e.validation.unmanageElement(i), 0 === e.elements && (C.Vue.delete(this._scope, t), this._radioValidations[t] = null, delete this._radioValidations[t]))
        }, t.prototype._manageSelectValidation = function (t, i, e, n, a, o, r, s, l) {
            var d = this._validations[t] = new j(t, i, e, n, a, this, o, s, l);
            return d.manageElement(n, r), d
        }, t.prototype._unmanageSelectValidation = function (t, i) {
            var e = this._validations[t];
            e && (e.unmanageElement(i), C.Vue.delete(this._scope, t), this._validations[t] = null, delete this._validations[t])
        }, t.prototype._fireEvent = function (t) {
            for (var i = arguments.length, e = Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++)e[n - 1] = arguments[n];
            var a = this._events[this._getEventName(t)];
            a && this._dir.vm.$nextTick(function () {
                a.apply(null, e)
            })
        }, t.prototype._fireEvents = function () {
            var t = this._scope;
            t.touched && this._fireEvent("touched"), t.dirty && this._fireEvent("dirty"), this._modified !== t.modified && (this._fireEvent("modified", t.modified),
                this._modified = t.modified);
            var i = t.valid;
            this._fireEvent(i ? "valid" : "invalid")
        }, t.prototype._getEventName = function (t) {
            return this.name + ":" + t
        }, t.prototype._defineProperties = function (t, i) {
            var n = this, a = C.Vue.util.bind;
            e({
                valid: {fn: this._defineValid, arg: t},
                invalid: {fn: this._defineInvalid, arg: i},
                touched: {fn: this._defineTouched, arg: t},
                untouched: {fn: this._defineUntouched, arg: i},
                modified: {fn: this._defineModified, arg: t},
                dirty: {fn: this._defineDirty, arg: t},
                pristine: {fn: this._definePristine, arg: i},
                errors: {fn: this._defineErrors, arg: t}
            }, function (t, e) {
                Object.defineProperty(i(), e, {
                    enumerable: !0, configurable: !0, get: function () {
                        return a(t.fn, n)(t.arg)
                    }
                })
            })
        }, t.prototype._runValidates = function (t, i) {
            var n = Object.keys(this.validations).length, a = 0;
            e(this.validations, function (e, o) {
                t(e, o, function () {
                    ++a, a >= n && i()
                })
            })
        }, t.prototype._walkValidations = function (t, i, n) {
            var a = this, o = C.Vue.util.hasOwn, r = n;
            return e(t, function (t, e) {
                if (r !== !n && o(a._scope, t.field)) {
                    var s = a._scope[t.field];
                    s && s[i] === !n && (r = !n)
                }
            }), r
        }, t.prototype._defineValid = function (t) {
            return this._walkValidations(t(), "valid", !0)
        }, t.prototype._defineInvalid = function (t) {
            return !t().valid
        }, t.prototype._defineTouched = function (t) {
            return this._walkValidations(t(), "touched", !1)
        }, t.prototype._defineUntouched = function (t) {
            return !t().touched
        }, t.prototype._defineModified = function (t) {
            return this._walkValidations(t(), "modified", !1)
        }, t.prototype._defineDirty = function (t) {
            return this._walkValidations(t(), "dirty", !1)
        }, t.prototype._definePristine = function (t) {
            return !t().dirty
        }, t.prototype._defineErrors = function (t) {
            var n = this, a = C.Vue.util.hasOwn, o = C.Vue.util.isPlainObject, r = [];
            return e(t(), function (t, s) {
                if (a(n._scope, t.field)) {
                    var l = n._scope[t.field];
                    l && !i(l.errors) && e(l.errors, function (i, e) {
                        var n = {field: t.field};
                        o(i) ? (i.validator && (n.validator = i.validator), n.message = i.message) : "string" == typeof i && (n.message = i), r.push(n)
                    })
                }
            }), i(r) ? void 0 : r.sort(function (t, i) {
                return t.field < i.field ? -1 : 1
            })
        }, w.createClass(t, [{
            key: "validations", get: function () {
                var t = C.Vue.util.extend, i = {};
                return t(i, this._validations), e(this._checkboxValidations, function (t, e) {
                    i[e] = t.validation
                }), e(this._radioValidations, function (t, e) {
                    i[e] = t.validation
                }), i
            }
        }]), t
    }();
    return b.version = "2.1.5", "undefined" != typeof window && window.Vue && window.Vue.use(b), b
});