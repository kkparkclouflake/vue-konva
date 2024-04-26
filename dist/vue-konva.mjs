import { defineComponent as w, getCurrentInstance as k, reactive as m, ref as L, onMounted as S, onUpdated as C, onBeforeUnmount as O, watch as A, h as E, onUnmounted as b } from "vue";
import x from "konva";
function p(n) {
  if (!x.autoDrawEnabled) {
    const o = n.getLayer() || n.getStage();
    o && o.batchDraw();
  }
}
const y = { key: !0, style: !0, elm: !0, isRootInsert: !0 }, N = ".vue-konva-event";
function P(n, o, r, i) {
  const e = n.__konvaNode, a = {};
  let u = !1;
  for (let t in r) {
    if (y.hasOwnProperty(t))
      continue;
    const c = t.slice(0, 2) === "on", l = r[t] !== o[t];
    if (c && l) {
      let f = t.slice(2).toLowerCase();
      f.slice(0, 7) === "content" && (f = "content" + f.slice(7, 1).toUpperCase() + f.slice(8)), e == null || e.off(f + N, r[t]);
    }
    !o.hasOwnProperty(t) && (e == null || e.setAttr(t, void 0));
  }
  for (let t in o) {
    if (y.hasOwnProperty(t))
      continue;
    let c = t.slice(0, 2) === "on";
    const l = r[t] !== o[t];
    if (c && l) {
      let d = t.slice(2).toLowerCase();
      d.slice(0, 7) === "content" && (d = "content" + d.slice(7, 1).toUpperCase() + d.slice(8)), o[t] && (e == null || e.off(d + N), e == null || e.on(d + N, o[t]));
    }
    !c && (o[t] !== r[t] || i && o[t] !== (e == null ? void 0 : e.getAttr(t))) && (u = !0, a[t] = o[t]);
  }
  u && e && (e.setAttrs(a), p(e));
}
const M = "v";
function R(n) {
  function o(r) {
    return r != null && r.__konvaNode ? r : r != null && r.parent ? o(r.parent) : (console.error("vue-konva error: Can not find parent node"), null);
  }
  return o(n.parent);
}
function K(n) {
  return n.component ? n.component.__konvaNode || K(n.component.subTree) : null;
}
function U(n) {
  const { el: o, component: r } = n, i = K(n);
  if (o != null && o.tagName && r && !i) {
    const e = o.tagName.toLowerCase();
    return console.error(
      `vue-konva error: You are trying to render "${e}" inside your component tree. Looks like it is not a Konva node. You can render only Konva components inside the Stage.`
    ), null;
  }
  return i;
}
function I(n) {
  const o = (e) => !!(e != null && e.hasOwnProperty("component")), r = (e) => Array.isArray(e), i = (e) => o(e) ? [e, ...i(e.children)] : r(e) ? e.flatMap(i) : [];
  return i(n.children);
}
function T(n, o) {
  const r = I(n), i = [];
  r.forEach((a) => {
    const u = U(a);
    u && i.push(u);
  });
  let e = !1;
  i.forEach((a, u) => {
    a.getZIndex() !== u && (a.setZIndex(u), e = !0);
  }), e && p(o);
}
const V = w({
  name: "Stage",
  props: {
    config: {
      type: Object,
      default: function() {
        return {};
      }
    },
    __useStrictMode: {
      type: Boolean
    }
  },
  inheritAttrs: !1,
  setup(n, { attrs: o, slots: r, expose: i }) {
    const e = k();
    if (!e)
      return;
    const a = m({}), u = L(null), t = new window.Konva.Stage({
      width: n.config.width,
      height: n.config.height,
      container: document.createElement("div")
      // Fake container. Will be replaced
    });
    e.__konvaNode = t, d();
    function c() {
      return e == null ? void 0 : e.__konvaNode;
    }
    function l() {
      return e == null ? void 0 : e.__konvaNode;
    }
    function d() {
      if (!e)
        return;
      const f = a || {}, v = {
        ...o,
        ...n.config
      };
      P(e, v, f, n.__useStrictMode), Object.assign(a, v);
    }
    return S(() => {
      u.value && (u.value.innerHTML = "", t.container(u.value)), d();
    }), C(() => {
      d(), T(e.subTree, t);
    }), O(() => {
      t.destroy();
    }), A(() => n.config, d, { deep: !0 }), i({
      getStage: l,
      getNode: c
    }), () => {
      var f;
      return E("div", { ref: u }, (f = r.default) == null ? void 0 : f.call(r));
    };
  }
}), j = ".vue-konva-event", $ = {
  Group: !0,
  Layer: !0,
  FastLayer: !0,
  Label: !0
};
function B(n) {
  return w({
    name: n,
    props: {
      config: {
        type: Object,
        default: function() {
          return {};
        }
      },
      __useStrictMode: {
        type: Boolean
      }
    },
    setup(o, { attrs: r, slots: i, expose: e }) {
      const a = k();
      if (!a)
        return;
      const u = m({}), t = window.Konva[n];
      if (!t) {
        console.error("vue-konva error: Can not find node " + n);
        return;
      }
      const c = new t();
      a.__konvaNode = c, a.vnode.__konvaNode = c, f();
      function l() {
        return a == null ? void 0 : a.__konvaNode;
      }
      function d() {
        return a == null ? void 0 : a.__konvaNode;
      }
      function f() {
        if (!a)
          return;
        const s = {};
        for (const _ in a == null ? void 0 : a.vnode.props)
          _.slice(0, 2) === "on" && (s[_] = a.vnode.props[_]);
        const g = u || {}, h = {
          ...r,
          ...o.config,
          ...s
        };
        P(
          a,
          h,
          g,
          o.__useStrictMode
        ), Object.assign(u, h);
      }
      S(() => {
        var g;
        const s = (g = R(a)) == null ? void 0 : g.__konvaNode;
        s && "add" in s && s.add(c), p(c);
      }), b(() => {
        p(c), c.destroy(), c.off(j);
      }), C(() => {
        f(), T(a.subTree, c);
      }), A(() => o.config, f, { deep: !0 }), e({
        getStage: d,
        getNode: l
      });
      const v = $.hasOwnProperty(n);
      return () => {
        var s;
        return v ? E("template", {}, (s = i.default) == null ? void 0 : s.call(i)) : null;
      };
    }
  });
}
const D = [
  "Arc",
  "Arrow",
  "Circle",
  "Ellipse",
  "FastLayer",
  "Group",
  "Image",
  "Label",
  "Layer",
  "Line",
  "Path",
  "Rect",
  "RegularPolygon",
  "Ring",
  "Shape",
  "Sprite",
  "Star",
  "Tag",
  "Text",
  "TextPath",
  "Transformer",
  "Wedge"
];
typeof window < "u" && !window.Konva && require("konva");
const Y = {
  install: (n, o) => {
    let r = (o == null ? void 0 : o.prefix) || M;
    [V, ...D.map(B)].map((i) => {
      n.component(`${r}${i.name}`, i);
    });
  }
};
export {
  Y as default
};
