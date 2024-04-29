import { createFilter as g } from "@rollup/pluginutils";
import s from "chalk";
import { EventEmitter as D } from "node:events";
import R from "node:path";
const a = s.black.bgYellow("▲ [WARNING]"), j = 10, f = (e) => new Array(e.split(`
`).length - 1).fill(`
`).join(""), v = (e, n) => {
  let d = 1;
  for (let l = n; l >= 0; l--)
    e.charCodeAt(l) === j && d++;
  return d;
}, m = (e, n) => (d, l, r, c, t) => {
  const o = v(t, c), i = v(
    e ? l : r,
    e ? l.length - 1 : r.length - 1
  ), $ = o + i;
  return n == null || n.emit("whenDev", {
    offset: c,
    line: o,
    end: $,
    removed: e ? l : r,
    kept: e ? r : l
  }), d.replace(
    e ? l : r,
    f(e ? l : r)
  );
}, u = (e, n) => (d, l, r, c) => {
  if (!e)
    return d;
  const t = v(c, r), o = v(l, l.length - 1), i = t + o;
  return n == null || n.emit("ifDev", {
    offset: r,
    line: t,
    height: o,
    end: i,
    removed: l
  }), f(d);
}, y = (e, n) => (d, l, r, c) => {
  if (e)
    return d;
  const t = v(c, r), o = v(l, l.length - 1), i = t + o;
  return n == null || n.emit("ifNotDev", {
    offset: r,
    line: t,
    height: o,
    end: i,
    removed: l
  }), f(d);
}, p = (e, n) => (d, l, r, c) => {
  if (e)
    return d;
  const t = v(c, r), o = v(l, l.length - 1), i = t + o;
  return n == null || n.emit("deprecated", { offset: r, line: t, height: o, end: i, deprecated: d }), f(d);
}, A = (e, n) => ({
  html: [
    /<!--#when dev-->(?!(?:#when dev|:else|\/when))(.+?)<!--:else-->(?!(?:#when dev|:else|\/when))(.+?)<!--\/when-->/gis,
    m(e.production, n)
  ],
  js: [
    /\/\/#when dev(?!(?:#when dev|:else|\/when))(.+?)\/\/:else(?!(?:#when dev|:else|\/when))(.+?)\/\/\/when/gis,
    m(e.production, n)
  ]
}), N = (e, n) => ({
  html: [
    /<!--#if dev-->(?!(?:#if dev|\/if))(.*?)<!--\/if-->/gis,
    u(e.production, n)
  ],
  js: [
    /\/\/#if dev(?!(?:#if dev|\/if))(.*?)\/\/\/if/gis,
    u(e.production, n)
  ]
}), _ = (e, n) => ({
  html: [
    /<!--#ifnot dev-->(?!(?:#ifnot dev|\/ifnot))(.*?)<!--\/ifnot-->/is,
    y(e.production, n)
  ],
  js: [
    /\/\/#ifnot dev(?!(?:#ifnot dev|\/ifnot))(.*?)\/\/\/ifnot/gis,
    y(e.production, n)
  ]
}), b = (e, n) => ({
  html: [
    /[\s]*<!--[\s*]*?@deprecated(?!(?:@deprecated|@enddeprecated))(.*?)<!--\s*@enddeprecated\s*-->/gis,
    p(e.buildWithDeprecatedApi, n)
  ],
  js: [
    /[\s]*\/\*\*[\s*]*?@deprecated(?!(?:@deprecated|@enddeprecated))(.*?)\/\*\*?\s*@enddeprecated\s*\*\//gis,
    p(e.buildWithDeprecatedApi, n)
  ]
}), h = (e, n) => {
  const d = {
    production: !1,
    buildWithDeprecatedApi: !1,
    ...e || {}
  }, l = A(d, n), r = N(d, n), c = _(d, n), t = b(d, n);
  return [
    // Support preprocessor conditional code
    // which allows us to remove/replace content from production build
    // NOTE: The order IS important, the keywords NEED to be different
    l.html,
    r.html,
    c.html,
    t.html,
    l.js,
    r.js,
    c.js,
    t.js
  ];
}, w = (e, [n, d]) => e.replace(n, d), L = (e, n) => h(n).reduce(w, e), B = (e, n) => {
  const d = new D(), l = h(n, d), r = /* @__PURE__ */ new Set();
  let c;
  return d.on("whenDev", ({ line: t, end: o, removed: i, kept: $ }) => {
    i && r.add(
      `
${a} Removed "when dev" code in ${s.yellow(c)}:${s.gray(
        `${t}-${o}`
      )}
${s.gray(i)}
`
    ), $ && r.add(
      `
${a} Kept "when dev" code in ${s.yellow(c)}:${s.gray(
        `${t}-${o}`
      )}
${s.gray($)}
`
    );
  }), d.on("ifDev", ({ line: t, end: o, removed: i }) => {
    i && r.add(
      `
${a} Removed "if dev" code in ${s.yellow(c)}:${s.gray(
        `${t}-${o}`
      )}
${s.gray(i)}
`
    );
  }), d.on("ifNotDev", ({ line: t, end: o, removed: i }) => {
    i && r.add(
      `
${a} Removed "if not dev" code in ${s.yellow(c)}:${s.gray(
        `${t}-${o}`
      )}
${s.gray(i)}
`
    );
  }), d.on("deprecated", ({ line: t, end: o, deprecated: i }) => {
    r.add(
      `
${a} Removed deprecated code in ${s.yellow(c)}:${s.gray(
        `${t}-${o}`
      )}
${s.gray(i)}
`
    );
  }), {
    transform: (t, o) => (c = R.relative(e.root, o), l.reduce(w, t)),
    closeBundle: () => {
      for (const t of r)
        e.logger.warnOnce(t);
    }
  };
}, C = (e, n) => {
  const d = new D(), l = h(n, d);
  let r;
  return d.on("whenDev", ({ line: c, end: t, removed: o }) => {
    o && e.logger.warnOnce(
      `${a} Removed "when dev" code in ${s.yellow(r)}:${s.gray(
        `${c}-${t}`
      )}`
    );
  }), d.on("ifDev", ({ line: c, end: t, removed: o }) => {
    o && e.logger.warnOnce(
      `${a} Removed "if dev" code in ${s.yellow(r)}:${s.gray(
        `${c}-${t}`
      )}`
    );
  }), d.on("ifNotDev", ({ line: c, end: t, removed: o }) => {
    o && e.logger.warnOnce(
      `${a} Removed "if not dev" code in ${s.yellow(r)}:${s.gray(
        `${c}-${t}`
      )}`
    );
  }), d.on("deprecated", ({ line: c, end: t }) => {
    e.logger.warnOnce(
      `${a} Removed deprecated code in ${s.yellow(r)}:${s.gray(`${c}-${t}`)}`
    );
  }), {
    transform: (c, t) => (r = R.relative(e.root, t).replace("src/lib", "$lib"), l.reduce(w, c))
  };
}, k = (e) => {
  let n;
  const d = g(e == null ? void 0 : e.include, e == null ? void 0 : e.exclude), l = g(
    ["./src/**/*.svelte", "./src/**/*.html", "./src/**/*.ts", "./src/**/*.js"],
    ["node_modules/**", "vite/**"]
  );
  return {
    name: "svelte-replacers",
    enforce: "pre",
    configResolved(r) {
      n = r.command === "serve" ? C(r, e) : B(r, e);
    },
    transform(r, c, t) {
      if (!(!d(c) || !l(c)))
        return n.transform(r, c);
    },
    closeBundle() {
      var r;
      (r = n.closeBundle) == null || r.call(n);
    }
  };
};
export {
  h as createReplacers,
  b as deprecated,
  N as ifDev,
  _ as ifNotDev,
  w as reducer,
  L as transform,
  k as vitePluginSvelteReplacers,
  A as whenDev
};
