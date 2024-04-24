// vite.config.ts
import { svelteInlineComponent } from "file:///Users/felix/Desktop/work/288-toolkit/packages/vite-plugin-svelte-inline-component/dist/index.js";
import { sveltekit } from "file:///Users/felix/Desktop/work/288-toolkit/node_modules/.pnpm/@sveltejs+kit@2.5.5_@sveltejs+vite-plugin-svelte@3.1.0_svelte@4.2.12_vite@5.2.10_@types+node@_zd5zloct4kd6xyh2rnnqsd7pwe/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import { defineConfig } from "file:///Users/felix/Desktop/work/288-toolkit/node_modules/.pnpm/vite@5.2.10_@types+node@20.12.7/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    plugins: [sveltekit(), mode === "test" && svelteInlineComponent()],
    test: {
      include: ["./test/**/*.spec.ts"],
      setupFiles: ["./test/setup.ts"],
      environment: "jsdom",
      css: true,
      globals: true,
      alias: [{ find: /^svelte$/, replacement: "svelte/internal" }]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZmVsaXgvRGVza3RvcC93b3JrLzI4OC10b29sa2l0L3BhY2thZ2VzL3ZpZGVvLWVtYmVkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZmVsaXgvRGVza3RvcC93b3JrLzI4OC10b29sa2l0L3BhY2thZ2VzL3ZpZGVvLWVtYmVkL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9mZWxpeC9EZXNrdG9wL3dvcmsvMjg4LXRvb2xraXQvcGFja2FnZXMvdmlkZW8tZW1iZWQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBzdmVsdGVJbmxpbmVDb21wb25lbnQgfSBmcm9tICdAMjg4LXRvb2xraXQvdml0ZS1wbHVnaW4tc3ZlbHRlLWlubGluZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgc3ZlbHRla2l0IH0gZnJvbSAnQHN2ZWx0ZWpzL2tpdC92aXRlJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG5cdHJldHVybiB7XG5cdFx0cGx1Z2luczogW3N2ZWx0ZWtpdCgpLCBtb2RlID09PSAndGVzdCcgJiYgc3ZlbHRlSW5saW5lQ29tcG9uZW50KCldLFxuXHRcdHRlc3Q6IHtcblx0XHRcdGluY2x1ZGU6IFsnLi90ZXN0LyoqLyouc3BlYy50cyddLFxuXHRcdFx0c2V0dXBGaWxlczogWycuL3Rlc3Qvc2V0dXAudHMnXSxcblx0XHRcdGVudmlyb25tZW50OiAnanNkb20nLFxuXHRcdFx0Y3NzOiB0cnVlLFxuXHRcdFx0Z2xvYmFsczogdHJ1ZSxcblx0XHRcdGFsaWFzOiBbeyBmaW5kOiAvXnN2ZWx0ZSQvLCByZXBsYWNlbWVudDogJ3N2ZWx0ZS9pbnRlcm5hbCcgfV1cblx0XHR9XG5cdH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1csU0FBUyw2QkFBNkI7QUFDdFksU0FBUyxpQkFBaUI7QUFDMUIsU0FBUyxvQkFBb0I7QUFFN0IsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDekMsU0FBTztBQUFBLElBQ04sU0FBUyxDQUFDLFVBQVUsR0FBRyxTQUFTLFVBQVUsc0JBQXNCLENBQUM7QUFBQSxJQUNqRSxNQUFNO0FBQUEsTUFDTCxTQUFTLENBQUMscUJBQXFCO0FBQUEsTUFDL0IsWUFBWSxDQUFDLGlCQUFpQjtBQUFBLE1BQzlCLGFBQWE7QUFBQSxNQUNiLEtBQUs7QUFBQSxNQUNMLFNBQVM7QUFBQSxNQUNULE9BQU8sQ0FBQyxFQUFFLE1BQU0sWUFBWSxhQUFhLGtCQUFrQixDQUFDO0FBQUEsSUFDN0Q7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
