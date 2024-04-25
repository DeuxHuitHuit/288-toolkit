const o = typeof Buffer < "u", s = (t) => o ? Buffer.from(t).toString("base64") : btoa(t), a = (t) => o ? Buffer.from(t, "base64").toString("ascii") : atob(t), i = (t, ...e) => String.raw(t, ...e), n = "virtual:inline-svelte:", f = () => ({
  name: "svelte-inline-component",
  enforce: "pre",
  resolveId(t) {
    if (t.startsWith(n))
      return t;
  },
  load(t) {
    if (t.startsWith(n)) {
      const e = t.split(new RegExp(n))[1].replace(".svelte", "");
      return a(e);
    }
  }
}), c = async (t, ...e) => {
  const r = i(t, ...e);
  return import(`${n}${s(r)}.svelte`);
}, p = c;
export {
  n as INLINE_SVELTE_ID,
  p as html,
  c as svelte,
  f as svelteInlineComponent
};
