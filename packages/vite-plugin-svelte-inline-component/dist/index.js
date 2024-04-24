const r = typeof Buffer < "u", o = (e) => r ? Buffer.from(e, "base64").toString("ascii") : atob(e), t = "virtual:inline-svelte:", s = () => ({
  name: "svelte-inline-component",
  enforce: "pre",
  resolveId(e) {
    if (e.startsWith(t))
      return e;
  },
  load(e) {
    if (e.startsWith(t)) {
      const n = e.split(new RegExp(t))[1].replace(".svelte", "");
      return o(n);
    }
  }
});
export {
  t as INLINE_SVELTE_ID,
  s as svelteInlineComponent
};
