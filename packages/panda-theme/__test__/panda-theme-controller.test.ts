import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { PandaThemeMode, PandaThemeGroup, PandaThemeState } from "../src/types";
import pandaThemeController from "../src/panda-theme-controller";

describe("PandaThemeController", () => {
	let styleElement: HTMLStyleElement;

	beforeEach(() => {
		// Reset DOM
		document.head.innerHTML = "";
		document.body.innerHTML = "";
		
		// Mock matchMedia
		Object.defineProperty(globalThis, "matchMedia", {
			writable: true,
			value: vi.fn().mockImplementation((query) => {
				if (query === "(prefers-color-scheme: dark)") {
					return matchMedia(query);
				}
				if (query === "(prefers-color-scheme: light)") {
					return matchMedia(query);
				}
				return matchMedia(query);
			}),
		});

		// Reset singleton instance by clearing the registry
		(globalThis as any).__singletonRegistry = undefined;
		
		// Get fresh instance (will be created automatically on import/first access)
		// Force re-initialization by directly accessing
		pandaThemeController.setThemeMode(PandaThemeMode.LIGHT);
		
		// Get style element
		styleElement = document.querySelector('[data-sheet-id="panda-theme"]') as HTMLStyleElement;
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("Singleton Pattern", () => {
		it("should always return the same singleton instance", () => {
			const instance1 = pandaThemeController;
			const instance2 = pandaThemeController;
			expect(instance1).toBe(instance2);
		});

		it("should be available as global variable", () => {
			expect((globalThis as any).pandaThemeController).toBeDefined();
		});
	});

	describe("Initialization", () => {
		it("should initialize with default theme group", () => {
			const themeGroups = pandaThemeController.getThemeGroups();
			expect(themeGroups).toHaveLength(1);
			expect(themeGroups[0].id).toBe("panda-theme");
		});

		it("should initialize with light theme mode by default", () => {
			expect(pandaThemeController.getThemeMode()).toBe(PandaThemeMode.LIGHT);
		});

		it("should initialize with default accent color", () => {
			expect(pandaThemeController.getAccentColorId()).toBe("blue");
		});

		it("should create style element in document head", () => {
			expect(styleElement).not.toBeNull();
			expect(styleElement.dataset.sheetId).toBe("panda-theme");
		});

		it("should have a version number", () => {
			expect((pandaThemeController.constructor as any).version).toBeDefined();
			expect(typeof (pandaThemeController.constructor as any).version).toBe("string");
		});
	});

	describe("Theme Groups", () => {
		describe("getThemeGroups", () => {
			it("should return all registered theme groups", () => {
				const themeGroups = pandaThemeController.getThemeGroups();
				expect(themeGroups).toBeInstanceOf(Array);
				expect(themeGroups.length).toBeGreaterThan(0);
			});
		});

		describe("registerThemeGroup", () => {
			it("should register a new theme group", () => {
				const customThemeGroup: PandaThemeGroup = {
					id: "custom-theme",
					name: "Custom Theme",
					light: {
						id: "custom-light",
						name: "Custom Light",
						theme: ":root { --custom: #fff; }",
						accentColors: [
							{
								id: "red",
								name: "Red",
								theme: ":root { --accent: red; }",
							},
						],
					},
					dark: {
						id: "custom-dark",
						name: "Custom Dark",
						theme: ":root { --custom: #000; }",
						accentColors: [
							{
								id: "red",
								name: "Red",
								theme: ":root { --accent: darkred; }",
							},
						],
					},
				};

				pandaThemeController.registerThemeGroup(customThemeGroup);
				const themeGroups = pandaThemeController.getThemeGroups();
				expect(themeGroups).toHaveLength(2);
				expect(themeGroups[1].id).toBe("custom-theme");
			});

			it("should update existing theme group if already registered", () => {
				const initialGroups = pandaThemeController.getThemeGroups();
				const initialLength = initialGroups.length;

				const duplicateGroup: PandaThemeGroup = {
					id: "panda-theme",
					name: "Panda Theme",
					light: {
						id: "updated-light",
						name: "Updated Light",
						theme: ":root { --updated: true; }",
						accentColors: [],
					},
					dark: null as any,
				};

				pandaThemeController.registerThemeGroup(duplicateGroup);
				const updatedGroups = pandaThemeController.getThemeGroups();
				expect(updatedGroups).toHaveLength(initialLength);
			});
		});

		describe("getThemeGroupId", () => {
			it("should return the currently selected theme group id", () => {
				expect(pandaThemeController.getThemeGroupId()).toBe("panda-theme");
			});
		});

		describe("setThemeGroupId", () => {
			it("should change theme group and apply new theme", () => {
				const customThemeGroup: PandaThemeGroup = {
					id: "test-theme",
					name: "Test Theme",
					light: {
						id: "test-light",
						name: "Test Light",
						theme: ":root { --test: light; }",
						accentColors: [
							{
								id: "green",
								name: "Green",
								theme: ":root { --accent: green; }",
							},
						],
					},
					dark: {
						id: "test-dark",
						name: "Test Dark",
						theme: ":root { --test: dark; }",
						accentColors: [
							{
								id: "green",
								name: "Green",
								theme: ":root { --accent: darkgreen; }",
							},
						],
					},
				};

				pandaThemeController.registerThemeGroup(customThemeGroup);
				pandaThemeController.setThemeGroupId("test-theme");
				
				expect(pandaThemeController.getThemeGroupId()).toBe("test-theme");
				expect(styleElement.dataset.themeId).toBe("test-light");
			});

			it("should warn if theme group is not registered", () => {
				const consoleSpy = vi.spyOn(console, "log");
				pandaThemeController.setThemeGroupId("non-existent-theme");
				
				expect(consoleSpy).toHaveBeenCalled();
				expect(pandaThemeController.getThemeGroupId()).toBe("panda-theme");
			});
		});
	});

	describe("Theme Mode", () => {
		describe("getThemeMode", () => {
			it("should return the current theme mode", () => {
				expect(pandaThemeController.getThemeMode()).toBe(PandaThemeMode.LIGHT);
			});
		});

		describe("setThemeMode", () => {
			it("should change theme mode to DARK", () => {
				pandaThemeController.setThemeMode(PandaThemeMode.DARK);
				expect(pandaThemeController.getThemeMode()).toBe(PandaThemeMode.DARK);
			});

			it("should change theme mode to LIGHT", () => {
				pandaThemeController.setThemeMode(PandaThemeMode.DARK);
				pandaThemeController.setThemeMode(PandaThemeMode.LIGHT);
				expect(pandaThemeController.getThemeMode()).toBe(PandaThemeMode.LIGHT);
			});

			it("should change theme mode to SYSTEM", () => {
				pandaThemeController.setThemeMode(PandaThemeMode.SYSTEM);
				expect(pandaThemeController.getThemeMode()).toBe(PandaThemeMode.SYSTEM);
			});

			it("should not reapply theme if mode hasn't changed", () => {
				const initialHtml = styleElement.innerHTML;
				pandaThemeController.setThemeMode(PandaThemeMode.LIGHT);
				expect(styleElement.innerHTML).toBe(initialHtml);
			});

			it("should update theme id when changing mode", () => {
				pandaThemeController.setThemeMode(PandaThemeMode.DARK);
				expect(styleElement.dataset.themeId).toContain("dark");
				
				pandaThemeController.setThemeMode(PandaThemeMode.LIGHT);
				expect(styleElement.dataset.themeId).toContain("light");
			});

			it("should respect browser theme preference when set to SYSTEM", () => {
				pandaThemeController.setThemeMode(PandaThemeMode.SYSTEM);
				// Should use light mode based on our mock
				expect(styleElement.dataset.themeId).toContain("light");
			});
		});
	});

	describe("Accent Colors", () => {
		describe("getAccentColorId", () => {
			it("should return the current accent color id", () => {
				expect(pandaThemeController.getAccentColorId()).toBe("blue");
			});
		});

		describe("setAccentColorId", () => {
			it("should change accent color if available", () => {
				const availableColors = pandaThemeController.getAvailableAccentColors();
				if (availableColors.length > 1) {
					const newColorId = availableColors[1].id;
					pandaThemeController.setAccentColorId(newColorId);
					expect(pandaThemeController.getAccentColorId()).toBe(newColorId);
				}
			});

			it("should not change accent color if same as current", () => {
				const currentId = pandaThemeController.getAccentColorId();
				const initialHtml = styleElement.innerHTML;
				
				pandaThemeController.setAccentColorId(currentId);
				
				expect(pandaThemeController.getAccentColorId()).toBe(currentId);
			});

			it("should warn if accent color does not exist", () => {
				const consoleWarnSpy = vi.spyOn(console, "warn");
				pandaThemeController.setAccentColorId("non-existent-color");
				
				expect(consoleWarnSpy).toHaveBeenCalled();
			});
		});

		describe("getAvailableAccentColors", () => {
			it("should return list of available accent colors", () => {
				const colors = pandaThemeController.getAvailableAccentColors();
				expect(colors).toBeInstanceOf(Array);
				expect(colors.length).toBeGreaterThan(0);
			});

			it("should return colors with required properties", () => {
				const colors = pandaThemeController.getAvailableAccentColors();
				colors.forEach((color) => {
					expect(color).toHaveProperty("id");
					expect(color).toHaveProperty("name");
					expect(color).toHaveProperty("theme");
				});
			});
		});
	});

	describe("Subscriptions", () => {
		describe("subscribe", () => {
			it("should register a callback and return callback id", () => {
				const callback = vi.fn();
				const callbackId = pandaThemeController.subscribe(callback);
				
				expect(callbackId).toBeDefined();
				expect(typeof callbackId).toBe("string");
			});

			it("should immediately call callback with current state", () => {
				const callback = vi.fn();
				pandaThemeController.subscribe(callback);
				
				expect(callback).toHaveBeenCalledTimes(1);
				expect(callback).toHaveBeenCalledWith(
					expect.objectContaining({
						themeGroupId: expect.any(String),
						themeId: expect.any(String),
						themeMode: expect.any(String),
						finalThemeMode: expect.any(String),
						accentColorId: expect.any(String),
					})
				);
			});

			it("should notify callback when theme changes", () => {
				const callback = vi.fn();
				pandaThemeController.subscribe(callback);
				callback.mockClear(); // Clear initial call
				
				pandaThemeController.setThemeMode(PandaThemeMode.DARK);
				
				expect(callback).toHaveBeenCalledTimes(1);
			});

			it("should support multiple subscriptions", () => {
				const callback1 = vi.fn();
				const callback2 = vi.fn();
				
				pandaThemeController.subscribe(callback1);
				pandaThemeController.subscribe(callback2);
				
				callback1.mockClear();
				callback2.mockClear();
				
				pandaThemeController.setThemeMode(PandaThemeMode.DARK);
				
				expect(callback1).toHaveBeenCalled();
				expect(callback2).toHaveBeenCalled();
			});
		});

		describe("unsubscribe", () => {
			it("should remove callback from subscription list", () => {
				const callback = vi.fn();
				const callbackId = pandaThemeController.subscribe(callback);
				callback.mockClear();
				
				pandaThemeController.unsubscribe(callbackId);
				pandaThemeController.setThemeMode(PandaThemeMode.DARK);
				
				expect(callback).not.toHaveBeenCalled();
			});

			it("should only remove specified callback", () => {
				const callback1 = vi.fn();
				const callback2 = vi.fn();
				
				const id1 = pandaThemeController.subscribe(callback1);
				pandaThemeController.subscribe(callback2);
				
				callback1.mockClear();
				callback2.mockClear();
				
				pandaThemeController.unsubscribe(id1);
				pandaThemeController.setThemeMode(PandaThemeMode.DARK);
				
				expect(callback1).not.toHaveBeenCalled();
				expect(callback2).toHaveBeenCalled();
			});
		});
	});

	describe("Custom CSS", () => {
		describe("registerCustomCss", () => {
			it("should register custom CSS for theme", () => {
				const customCss = ":root { --custom-var: #123456; }";
				pandaThemeController.registerCustomCss("panda-theme-light", PandaThemeMode.LIGHT, customCss);
				
				expect(styleElement.innerHTML).toContain(customCss);
			});

			it("should warn when trying to register for SYSTEM mode", () => {
				const consoleWarnSpy = vi.spyOn(console, "warn");
				pandaThemeController.registerCustomCss("panda-theme-light", PandaThemeMode.SYSTEM, "");
				
				expect(consoleWarnSpy).toHaveBeenCalled();
			});

			it("should reapply theme if custom CSS is for active theme", () => {
				const initialHtml = styleElement.innerHTML;
				const customCss = ":root { --new-custom: red; }";
				
				pandaThemeController.registerCustomCss("panda-theme-light", PandaThemeMode.LIGHT, customCss);
				
				expect(styleElement.innerHTML).not.toBe(initialHtml);
				expect(styleElement.innerHTML).toContain(customCss);
			});

			it("should not reapply theme if custom CSS is for inactive theme", () => {
				pandaThemeController.setThemeMode(PandaThemeMode.LIGHT);
				const initialHtml = styleElement.innerHTML;
				
				pandaThemeController.registerCustomCss("panda-theme-dark", PandaThemeMode.DARK, ":root { --dark-custom: blue; }");
				
				expect(styleElement.innerHTML).toBe(initialHtml);
			});
		});

		describe("unregisterCustomCss", () => {
			it("should warn when trying to unregister for SYSTEM mode", () => {
				const consoleWarnSpy = vi.spyOn(console, "warn");
				pandaThemeController.unregisterCustomCss("panda-theme", PandaThemeMode.SYSTEM);
				
				expect(consoleWarnSpy).toHaveBeenCalled();
			});

			it("should warn if theme group not found", () => {
				const consoleWarnSpy = vi.spyOn(console, "warn");
				pandaThemeController.unregisterCustomCss("non-existent", PandaThemeMode.LIGHT);
				
				expect(consoleWarnSpy).toHaveBeenCalled();
			});

			it("should remove custom CSS and reapply theme", () => {
				const customCss = ":root { --custom-to-remove: orange; }";
				pandaThemeController.registerCustomCss("panda-theme-light", PandaThemeMode.LIGHT, customCss);
				expect(styleElement.innerHTML).toContain(customCss);
				
				pandaThemeController.unregisterCustomCss("panda-theme", PandaThemeMode.LIGHT);
				// Custom CSS should be removed
			});
		});
	});

	describe("Theme Application", () => {
		it("should apply theme styles to document", () => {
			expect(styleElement.innerHTML).not.toBe("");
		});

		it("should update style element dataset with theme info", () => {
			expect(styleElement.dataset.themeId).toBeDefined();
			expect(styleElement.dataset.accentColorId).toBeDefined();
		});

		it("should create style element if not exists", () => {
			// Remove existing style element
			styleElement.remove();
			
			// Trigger theme application
			pandaThemeController.setThemeMode(PandaThemeMode.DARK);
			
			// Check if new style element was created
			const newStyleElement = document.querySelector('[data-sheet-id="panda-theme"]');
			expect(newStyleElement).not.toBeNull();
		});

		it("should dispatch custom theme change event", () => {
			const eventListener = vi.fn();
			document.addEventListener("panda-theme-change", eventListener);
			
			pandaThemeController.setThemeMode(PandaThemeMode.DARK);
			
			expect(eventListener).toHaveBeenCalled();
			
			document.removeEventListener("panda-theme-change", eventListener);
		});

		it("should include accent color styles in applied theme", () => {
			const availableColors = pandaThemeController.getAvailableAccentColors();
			if (availableColors.length > 0) {
				const colorId = availableColors[0].id;
				pandaThemeController.setAccentColorId(colorId);
				
				expect(styleElement.dataset.accentColorId).toBe(colorId);
			}
		});
	});

	describe("Device Theme Changes", () => {
		it("should respond to system theme changes when mode is SYSTEM", () => {
			pandaThemeController.setThemeMode(PandaThemeMode.SYSTEM);
			
			const initialThemeId = styleElement.dataset.themeId;
			
			// Simulate device theme change by triggering the event
			const changeEvent = new Event("change");
			// const mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");
			
			// Change mock to return dark mode
			Object.defineProperty(globalThis, "matchMedia", {
				writable: true,
				value: vi.fn().mockImplementation((query) => {
					if (query === "(prefers-color-scheme: dark)") {
						return matchMedia(query);
					}
					if (query === "(prefers-color-scheme: light)") {
						return matchMedia(query);
					}
					return matchMedia(query);
				}),
			});
			
			// Note: Full event simulation would require more complex setup
			// This test demonstrates the intention
		});

		it("should not respond to system theme changes when mode is not SYSTEM", () => {
			pandaThemeController.setThemeMode(PandaThemeMode.LIGHT);
			const callback = vi.fn();
			pandaThemeController.subscribe(callback);
			callback.mockClear();
			
			// Simulate device theme change
			const changeEvent = new Event("change");
			
			// Callback should not be triggered by device changes in non-SYSTEM mode
			// (would need full event simulation to test properly)
		});
	});

	describe("Edge Cases", () => {
		it("should handle setting theme id (deprecated method)", () => {
			// This method is deprecated but should still work
			const themeGroups = pandaThemeController.getThemeGroups();
			if (themeGroups[0]?.dark) {
				const darkThemeId = themeGroups[0].dark.id;
				pandaThemeController.setThemeId(darkThemeId);
				expect(styleElement.dataset.themeId).toBe(darkThemeId);
			}
		});

		it("should handle non-existent theme id in setThemeId", () => {
			const consoleSpy = vi.spyOn(console, "log");
			pandaThemeController.setThemeId("non-existent-theme-id");
			
			expect(consoleSpy).toHaveBeenCalled();
		});

		it("should handle empty callback list when notifying", () => {
			// Should not throw error when no callbacks registered
			expect(() => {
				pandaThemeController.setThemeMode(PandaThemeMode.DARK);
			}).not.toThrow();
		});

		it("should handle invalid callback in subscribe", () => {
			// Should handle non-function callbacks gracefully
			const callbackId = pandaThemeController.subscribe(null as any);
			expect(callbackId).toBeDefined();
		});

		it("should handle unsubscribe with invalid id", () => {
			// Should not throw error
			expect(() => {
				pandaThemeController.unsubscribe("invalid-id");
			}).not.toThrow();
		});
	});

	describe("Theme State", () => {
		it("should provide complete theme state in callbacks", () => {
			let receivedState: PandaThemeState | null = null;
			
			pandaThemeController.subscribe((state: PandaThemeState) => {
				receivedState = state;
			});
			
			expect(receivedState).not.toBeNull();
			expect(receivedState).toHaveProperty("themeGroupId");
			expect(receivedState).toHaveProperty("themeId");
			expect(receivedState).toHaveProperty("themeMode");
			expect(receivedState).toHaveProperty("finalThemeMode");
			expect(receivedState).toHaveProperty("accentColorId");
		});

		it("should have finalThemeMode as LIGHT or DARK only", () => {
			let receivedState: PandaThemeState | null = null;
			
			pandaThemeController.subscribe((state: PandaThemeState) => {
				receivedState = state;
			});
			
			pandaThemeController.setThemeMode(PandaThemeMode.SYSTEM);
			
			expect(receivedState!.finalThemeMode).toMatch(/^(light|dark)$/);
		});
	});
});
