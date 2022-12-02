(function(){"use strict";try{if(typeof document!="undefined"){var e=document.createElement("style");e.appendChild(document.createTextNode("")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import Te from "react";
var K = { exports: {} }, A = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Re;
function sr() {
  if (Re)
    return A;
  Re = 1;
  var i = Te, a = Symbol.for("react.element"), n = Symbol.for("react.fragment"), T = Object.prototype.hasOwnProperty, B = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, D = { key: !0, ref: !0, __self: !0, __source: !0 };
  function M(E, g, O) {
    var b, y = {}, R = null, F = null;
    O !== void 0 && (R = "" + O), g.key !== void 0 && (R = "" + g.key), g.ref !== void 0 && (F = g.ref);
    for (b in g)
      T.call(g, b) && !D.hasOwnProperty(b) && (y[b] = g[b]);
    if (E && E.defaultProps)
      for (b in g = E.defaultProps, g)
        y[b] === void 0 && (y[b] = g[b]);
    return { $$typeof: a, type: E, key: R, ref: F, props: y, _owner: B.current };
  }
  return A.Fragment = n, A.jsx = M, A.jsxs = M, A;
}
var W = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xe;
function ur() {
  return xe || (xe = 1, process.env.NODE_ENV !== "production" && function() {
    var i = Te, a = Symbol.for("react.element"), n = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), B = Symbol.for("react.strict_mode"), D = Symbol.for("react.profiler"), M = Symbol.for("react.provider"), E = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), O = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), y = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), F = Symbol.for("react.offscreen"), Q = Symbol.iterator, Oe = "@@iterator";
    function Se(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = Q && e[Q] || e[Oe];
      return typeof r == "function" ? r : null;
    }
    var S = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function w(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
          t[o - 1] = arguments[o];
        Ce("error", e, t);
      }
    }
    function Ce(e, r, t) {
      {
        var o = S.ReactDebugCurrentFrame, c = o.getStackAddendum();
        c !== "" && (r += "%s", t = t.concat([c]));
        var f = t.map(function(u) {
          return String(u);
        });
        f.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, f);
      }
    }
    var je = !1, Me = !1, Pe = !1, Le = !1, Ae = !1, ee;
    ee = Symbol.for("react.module.reference");
    function We(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === T || e === D || Ae || e === B || e === O || e === b || Le || e === F || je || Me || Pe || typeof e == "object" && e !== null && (e.$$typeof === R || e.$$typeof === y || e.$$typeof === M || e.$$typeof === E || e.$$typeof === g || e.$$typeof === ee || e.getModuleId !== void 0));
    }
    function Be(e, r, t) {
      var o = e.displayName;
      if (o)
        return o;
      var c = r.displayName || r.name || "";
      return c !== "" ? t + "(" + c + ")" : t;
    }
    function re(e) {
      return e.displayName || "Context";
    }
    function k(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && w("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case T:
          return "Fragment";
        case n:
          return "Portal";
        case D:
          return "Profiler";
        case B:
          return "StrictMode";
        case O:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case E:
            var r = e;
            return re(r) + ".Consumer";
          case M:
            var t = e;
            return re(t._context) + ".Provider";
          case g:
            return Be(e, e.render, "ForwardRef");
          case y:
            var o = e.displayName || null;
            return o !== null ? o : k(e.type) || "Memo";
          case R: {
            var c = e, f = c._payload, u = c._init;
            try {
              return k(u(f));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var x = Object.assign, P = 0, te, ne, ie, ae, oe, le, se;
    function ue() {
    }
    ue.__reactDisabledLog = !0;
    function De() {
      {
        if (P === 0) {
          te = console.log, ne = console.info, ie = console.warn, ae = console.error, oe = console.group, le = console.groupCollapsed, se = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ue,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        P++;
      }
    }
    function Fe() {
      {
        if (P--, P === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: x({}, e, {
              value: te
            }),
            info: x({}, e, {
              value: ne
            }),
            warn: x({}, e, {
              value: ie
            }),
            error: x({}, e, {
              value: ae
            }),
            group: x({}, e, {
              value: oe
            }),
            groupCollapsed: x({}, e, {
              value: le
            }),
            groupEnd: x({}, e, {
              value: se
            })
          });
        }
        P < 0 && w("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var I = S.ReactCurrentDispatcher, q;
    function $(e, r, t) {
      {
        if (q === void 0)
          try {
            throw Error();
          } catch (c) {
            var o = c.stack.trim().match(/\n( *(at )?)/);
            q = o && o[1] || "";
          }
        return `
` + q + e;
      }
    }
    var H = !1, Y;
    {
      var $e = typeof WeakMap == "function" ? WeakMap : Map;
      Y = new $e();
    }
    function ce(e, r) {
      if (!e || H)
        return "";
      {
        var t = Y.get(e);
        if (t !== void 0)
          return t;
      }
      var o;
      H = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var f;
      f = I.current, I.current = null, De();
      try {
        if (r) {
          var u = function() {
            throw Error();
          };
          if (Object.defineProperty(u.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(u, []);
            } catch (_) {
              o = _;
            }
            Reflect.construct(e, [], u);
          } else {
            try {
              u.call();
            } catch (_) {
              o = _;
            }
            e.call(u.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (_) {
            o = _;
          }
          e();
        }
      } catch (_) {
        if (_ && o && typeof _.stack == "string") {
          for (var s = _.stack.split(`
`), p = o.stack.split(`
`), d = s.length - 1, h = p.length - 1; d >= 1 && h >= 0 && s[d] !== p[h]; )
            h--;
          for (; d >= 1 && h >= 0; d--, h--)
            if (s[d] !== p[h]) {
              if (d !== 1 || h !== 1)
                do
                  if (d--, h--, h < 0 || s[d] !== p[h]) {
                    var m = `
` + s[d].replace(" at new ", " at ");
                    return e.displayName && m.includes("<anonymous>") && (m = m.replace("<anonymous>", e.displayName)), typeof e == "function" && Y.set(e, m), m;
                  }
                while (d >= 1 && h >= 0);
              break;
            }
        }
      } finally {
        H = !1, I.current = f, Fe(), Error.prepareStackTrace = c;
      }
      var j = e ? e.displayName || e.name : "", Ee = j ? $(j) : "";
      return typeof e == "function" && Y.set(e, Ee), Ee;
    }
    function Ye(e, r, t) {
      return ce(e, !1);
    }
    function Ne(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function N(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ce(e, Ne(e));
      if (typeof e == "string")
        return $(e);
      switch (e) {
        case O:
          return $("Suspense");
        case b:
          return $("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case g:
            return Ye(e.render);
          case y:
            return N(e.type, r, t);
          case R: {
            var o = e, c = o._payload, f = o._init;
            try {
              return N(f(c), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var U = Object.prototype.hasOwnProperty, fe = {}, de = S.ReactDebugCurrentFrame;
    function V(e) {
      if (e) {
        var r = e._owner, t = N(e.type, e._source, r ? r.type : null);
        de.setExtraStackFrame(t);
      } else
        de.setExtraStackFrame(null);
    }
    function Ue(e, r, t, o, c) {
      {
        var f = Function.call.bind(U);
        for (var u in e)
          if (f(e, u)) {
            var s = void 0;
            try {
              if (typeof e[u] != "function") {
                var p = Error((o || "React class") + ": " + t + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw p.name = "Invariant Violation", p;
              }
              s = e[u](r, u, o, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (d) {
              s = d;
            }
            s && !(s instanceof Error) && (V(c), w("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", t, u, typeof s), V(null)), s instanceof Error && !(s.message in fe) && (fe[s.message] = !0, V(c), w("Failed %s type: %s", t, s.message), V(null));
          }
      }
    }
    var Ve = Array.isArray;
    function z(e) {
      return Ve(e);
    }
    function Ie(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function qe(e) {
      try {
        return he(e), !1;
      } catch {
        return !0;
      }
    }
    function he(e) {
      return "" + e;
    }
    function ve(e) {
      if (qe(e))
        return w("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ie(e)), he(e);
    }
    var L = S.ReactCurrentOwner, He = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ge, we, J;
    J = {};
    function ze(e) {
      if (U.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Je(e) {
      if (U.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Ze(e, r) {
      if (typeof e.ref == "string" && L.current && r && L.current.stateNode !== r) {
        var t = k(L.current.type);
        J[t] || (w('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', k(L.current.type), e.ref), J[t] = !0);
      }
    }
    function Ge(e, r) {
      {
        var t = function() {
          ge || (ge = !0, w("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function Xe(e, r) {
      {
        var t = function() {
          we || (we = !0, w("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var Ke = function(e, r, t, o, c, f, u) {
      var s = {
        $$typeof: a,
        type: e,
        key: r,
        ref: t,
        props: u,
        _owner: f
      };
      return s._store = {}, Object.defineProperty(s._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(s, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: o
      }), Object.defineProperty(s, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: c
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    };
    function Qe(e, r, t, o, c) {
      {
        var f, u = {}, s = null, p = null;
        t !== void 0 && (ve(t), s = "" + t), Je(r) && (ve(r.key), s = "" + r.key), ze(r) && (p = r.ref, Ze(r, c));
        for (f in r)
          U.call(r, f) && !He.hasOwnProperty(f) && (u[f] = r[f]);
        if (e && e.defaultProps) {
          var d = e.defaultProps;
          for (f in d)
            u[f] === void 0 && (u[f] = d[f]);
        }
        if (s || p) {
          var h = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && Ge(u, h), p && Xe(u, h);
        }
        return Ke(e, s, p, c, o, L.current, u);
      }
    }
    var Z = S.ReactCurrentOwner, pe = S.ReactDebugCurrentFrame;
    function C(e) {
      if (e) {
        var r = e._owner, t = N(e.type, e._source, r ? r.type : null);
        pe.setExtraStackFrame(t);
      } else
        pe.setExtraStackFrame(null);
    }
    var G;
    G = !1;
    function X(e) {
      return typeof e == "object" && e !== null && e.$$typeof === a;
    }
    function be() {
      {
        if (Z.current) {
          var e = k(Z.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function er(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), t = e.lineNumber;
          return `

Check your code at ` + r + ":" + t + ".";
        }
        return "";
      }
    }
    var me = {};
    function rr(e) {
      {
        var r = be();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function ye(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = rr(r);
        if (me[t])
          return;
        me[t] = !0;
        var o = "";
        e && e._owner && e._owner !== Z.current && (o = " It was passed a child from " + k(e._owner.type) + "."), C(e), w('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, o), C(null);
      }
    }
    function ke(e, r) {
      {
        if (typeof e != "object")
          return;
        if (z(e))
          for (var t = 0; t < e.length; t++) {
            var o = e[t];
            X(o) && ye(o, r);
          }
        else if (X(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var c = Se(e);
          if (typeof c == "function" && c !== e.entries)
            for (var f = c.call(e), u; !(u = f.next()).done; )
              X(u.value) && ye(u.value, r);
        }
      }
    }
    function tr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === g || r.$$typeof === y))
          t = r.propTypes;
        else
          return;
        if (t) {
          var o = k(r);
          Ue(t, e.props, "prop", o, e);
        } else if (r.PropTypes !== void 0 && !G) {
          G = !0;
          var c = k(r);
          w("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", c || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && w("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function nr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var o = r[t];
          if (o !== "children" && o !== "key") {
            C(e), w("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), C(null);
            break;
          }
        }
        e.ref !== null && (C(e), w("Invalid attribute `ref` supplied to `React.Fragment`."), C(null));
      }
    }
    function _e(e, r, t, o, c, f) {
      {
        var u = We(e);
        if (!u) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var p = er(c);
          p ? s += p : s += be();
          var d;
          e === null ? d = "null" : z(e) ? d = "array" : e !== void 0 && e.$$typeof === a ? (d = "<" + (k(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : d = typeof e, w("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", d, s);
        }
        var h = Qe(e, r, t, c, f);
        if (h == null)
          return h;
        if (u) {
          var m = r.children;
          if (m !== void 0)
            if (o)
              if (z(m)) {
                for (var j = 0; j < m.length; j++)
                  ke(m[j], e);
                Object.freeze && Object.freeze(m);
              } else
                w("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ke(m, e);
        }
        return e === T ? nr(h) : tr(h), h;
      }
    }
    function ir(e, r, t) {
      return _e(e, r, t, !0);
    }
    function ar(e, r, t) {
      return _e(e, r, t, !1);
    }
    var or = ar, lr = ir;
    W.Fragment = T, W.jsx = or, W.jsxs = lr;
  }()), W;
}
(function(i) {
  process.env.NODE_ENV === "production" ? i.exports = sr() : i.exports = ur();
})(K);
const l = K.exports.jsx, v = K.exports.jsxs, fr = ({
  title: i,
  titleId: a,
  ...n
}) => /* @__PURE__ */ v("svg", {
  width: n.height,
  height: n.height,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  "aria-labelledby": a,
  ...n,
  children: [i ? /* @__PURE__ */ l("title", {
    id: a,
    children: i
  }) : null, /* @__PURE__ */ l("path", {
    d: "M12 10v2m0 4v.01M5 20h14a2 2 0 0 0 1.84-2.75L13.74 5a2 2 0 0 0-3.5 0l-7.1 12.25A2 2 0 0 0 4.89 20",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })]
}), dr = ({
  title: i,
  titleId: a,
  ...n
}) => /* @__PURE__ */ v("svg", {
  width: n.height,
  height: n.height,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  "aria-labelledby": a,
  ...n,
  children: [i ? /* @__PURE__ */ l("title", {
    id: a,
    children: i
  }) : null, /* @__PURE__ */ l("path", {
    d: "M12 20V10M12 20l4-4M12 20l-4-4M4 4h16",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })]
}), hr = ({
  title: i,
  titleId: a,
  ...n
}) => /* @__PURE__ */ v("svg", {
  width: n.height,
  height: n.height,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  "aria-labelledby": a,
  ...n,
  children: [i ? /* @__PURE__ */ l("title", {
    id: a,
    children: i
  }) : null, /* @__PURE__ */ l("path", {
    d: "M4 12h10M4 12l4 4M4 12l4-4M20 4v16",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })]
}), vr = ({
  title: i,
  titleId: a,
  ...n
}) => /* @__PURE__ */ v("svg", {
  width: n.height,
  height: n.height,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  "aria-labelledby": a,
  ...n,
  children: [i ? /* @__PURE__ */ l("title", {
    id: a,
    children: i
  }) : null, /* @__PURE__ */ l("path", {
    d: "M20 12H10M20 12l-4 4M20 12l-4-4M4 4v16",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })]
}), gr = ({
  title: i,
  titleId: a,
  ...n
}) => /* @__PURE__ */ v("svg", {
  width: n.height,
  height: n.height,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  "aria-labelledby": a,
  ...n,
  children: [i ? /* @__PURE__ */ l("title", {
    id: a,
    children: i
  }) : null, /* @__PURE__ */ l("path", {
    d: "M4 20h16M12 14V4M12 14l4-4M12 14l-4-4",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })]
}), wr = ({
  title: i,
  titleId: a,
  ...n
}) => /* @__PURE__ */ v("svg", {
  width: n.height,
  height: n.height,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  "aria-labelledby": a,
  ...n,
  children: [i ? /* @__PURE__ */ l("title", {
    id: a,
    children: i
  }) : null, /* @__PURE__ */ l("path", {
    d: "M10 12h10M10 12l4 4M10 12l4-4M4 4v16",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })]
}), pr = ({
  title: i,
  titleId: a,
  ...n
}) => /* @__PURE__ */ v("svg", {
  width: n.height,
  height: n.height,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  "aria-labelledby": a,
  ...n,
  children: [i ? /* @__PURE__ */ l("title", {
    id: a,
    children: i
  }) : null, /* @__PURE__ */ l("path", {
    d: "M14 12H4M14 12l-4 4M14 12l-4-4M20 4v16",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })]
}), br = ({
  title: i,
  titleId: a,
  ...n
}) => /* @__PURE__ */ v("svg", {
  width: n.height,
  height: n.height,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  "aria-labelledby": a,
  ...n,
  children: [i ? /* @__PURE__ */ l("title", {
    id: a,
    children: i
  }) : null, /* @__PURE__ */ l("path", {
    d: "M12 10v10M12 10l4 4M12 10l-4 4M4 4h16",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })]
}), mr = ({
  title: i,
  titleId: a,
  ...n
}) => /* @__PURE__ */ v("svg", {
  width: n.height,
  height: n.height,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  "aria-labelledby": a,
  ...n,
  children: [i ? /* @__PURE__ */ l("title", {
    id: a,
    children: i
  }) : null, /* @__PURE__ */ l("path", {
    d: "M12 4v10M12 4l4 4M12 4 8 8M4 20h16",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })]
}), yr = ({
  title: i,
  titleId: a,
  ...n
}) => /* @__PURE__ */ v("svg", {
  width: n.height,
  height: n.height,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  "aria-labelledby": a,
  ...n,
  children: [i ? /* @__PURE__ */ l("title", {
    id: a,
    children: i
  }) : null, /* @__PURE__ */ l("path", {
    d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ l("path", {
    d: "m9 12 2 2 4-4",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })]
}), kr = ({
  title: i,
  titleId: a,
  ...n
}) => /* @__PURE__ */ v("svg", {
  width: n.height,
  height: n.height,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  "aria-labelledby": a,
  ...n,
  children: [i ? /* @__PURE__ */ l("title", {
    id: a,
    children: i
  }) : null, /* @__PURE__ */ v("g", {
    clipPath: "url(#info-circle-outline_svg__a)",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/* @__PURE__ */ l("path", {
      d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 8h.01"
    }), /* @__PURE__ */ l("path", {
      d: "M11 12h1v4h1"
    })]
  }), /* @__PURE__ */ l("defs", {
    children: /* @__PURE__ */ l("clipPath", {
      id: "info-circle-outline_svg__a",
      children: /* @__PURE__ */ l("path", {
        fill: "#fff",
        d: "M0 0h24v24H0z"
      })
    })
  })]
}), _r = ({
  title: i,
  titleId: a,
  ...n
}) => /* @__PURE__ */ v("svg", {
  width: n.height,
  height: n.height,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  "aria-labelledby": a,
  ...n,
  children: [i ? /* @__PURE__ */ l("title", {
    id: a,
    children: i
  }) : null, /* @__PURE__ */ l("path", {
    d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9 12h6",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })]
}), Er = ({
  title: i,
  titleId: a,
  ...n
}) => /* @__PURE__ */ v("svg", {
  width: n.height,
  height: n.height,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  "aria-labelledby": a,
  ...n,
  children: [i ? /* @__PURE__ */ l("title", {
    id: a,
    children: i
  }) : null, /* @__PURE__ */ l("g", {
    clipPath: "url(#open-new-window_svg__a)",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: /* @__PURE__ */ l("path", {
      d: "M12 6H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-5M11 13 21 3M16 3h5v5"
    })
  }), /* @__PURE__ */ l("defs", {
    children: /* @__PURE__ */ l("clipPath", {
      id: "open-new-window_svg__a",
      children: /* @__PURE__ */ l("path", {
        fill: "#fff",
        d: "M0 0h24v24H0z"
      })
    })
  })]
}), Rr = ({
  title: i,
  titleId: a,
  ...n
}) => /* @__PURE__ */ v("svg", {
  width: n.height,
  height: n.height,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  "aria-labelledby": a,
  ...n,
  children: [i ? /* @__PURE__ */ l("title", {
    id: a,
    children: i
  }) : null, /* @__PURE__ */ l("path", {
    d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9 12h6M12 9v6",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })]
}), xr = ({
  title: i,
  titleId: a,
  ...n
}) => /* @__PURE__ */ v("svg", {
  width: n.height,
  height: n.height,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  "aria-labelledby": a,
  ...n,
  children: [i ? /* @__PURE__ */ l("title", {
    id: a,
    children: i
  }) : null, /* @__PURE__ */ l("path", {
    d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 17v.01",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ l("path", {
    d: "M12 13.5a1.5 1.5 0 0 1 1-1.5 2.6 2.6 0 1 0-3-4",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })]
}), Tr = ({
  title: i,
  titleId: a,
  ...n
}) => /* @__PURE__ */ v("svg", {
  width: n.height,
  height: n.height,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
  "aria-labelledby": a,
  ...n,
  children: [i ? /* @__PURE__ */ l("title", {
    id: a,
    children: i
  }) : null, /* @__PURE__ */ l("path", {
    d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM10 10l4 4m0-4-4 4",
    stroke: "#000",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })]
});
export {
  fr as AlertTriangleOutline,
  dr as ArrowBarDown,
  hr as ArrowBarLeft,
  vr as ArrowBarRight,
  gr as ArrowBarToDown,
  wr as ArrowBarToLeft,
  pr as ArrowBarToRight,
  br as ArrowBarToUp,
  mr as ArrowBarUp,
  yr as CheckCircleOutline,
  kr as InfoCircleOutline,
  _r as MinusCircleOutline,
  Er as OpenNewWindow,
  Rr as PlusCircleOutline,
  xr as QuestionCircleOutline,
  Tr as XCircleOutline
};
