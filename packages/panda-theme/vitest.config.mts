import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		// force vitest to look for browser-compatible exports first
		conditions: ["browser", "import", "export", "default"],
	},
	test: {
		// globals: true,
		pool: "threads",
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		coverage: {
			provider: "istanbul",
			reporter: ["text", "json", "html"],
			exclude: ["**/node_modules/**", "**/tests/**", "**/__test__/**"]
		}
	}
});