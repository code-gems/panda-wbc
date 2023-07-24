// types
import { IconDetails } from "panda-icon-typings";

export const getIconListDetails = (): IconDetails[] => {
	return [
		// System =============================================
		{ name: "apps", 					iconPack: "default", group: ["System"], keywords: ["applications", "menu"] },
		{ name: "info", 					iconPack: "default", group: ["System"], keywords: ["interface", "message"] },
		{ name: "info-outline",				iconPack: "default", group: ["System"], keywords: ["interface", "message", "outline"] },
		{ name: "error",					iconPack: "default", group: ["System"], keywords: ["interface", "message"] },
		{ name: "error-outline",			iconPack: "default", group: ["System"], keywords: ["interface", "message", "outline"] },
		{ name: "warning",					iconPack: "default", group: ["System"], keywords: ["interface", "message"] },
		{ name: "warning-box",				iconPack: "default", group: ["System"], keywords: ["interface", "message, box"] },
		{ name: "help",						iconPack: "default", group: ["System"], keywords: ["interface", "message"] },
		{ name: "help-outline",				iconPack: "default", group: ["System"], keywords: ["interface", "message", "outline"] },
		{ name: "settings",					iconPack: "default", group: ["System"], keywords: ["interface", "gear"] },
		{ name: "more",						iconPack: "default", group: ["System"], keywords: ["interface", "dots", "options", "menu"] },
		{ name: "check", 					iconPack: "default", group: ["System"], keywords: ["interface", "checkbox", "completed", "confirmation", "success", "done"] },
		{ name: "check-circle", 			iconPack: "default", group: ["System"], keywords: ["interface", "checkbox", "completed", "confirmation", "success", "done"] },
		{ name: "check-circle-outline",		iconPack: "default", group: ["System"], keywords: ["interface", "checkbox", "completed", "confirmation", "success", "done"] },

		// Files ==============================================
		{ name: "folder", 					iconPack: "default", group: ["Files"], keywords: ["file", "directory", "system", "i/o"] },

		// date & time ========================================
		{ name: "calendar", 				iconPack: "default", group: ["Date & Time"], keywords: ["date", "time", "month", "day"] },

		// Arrows & Chevrons ==================================
		{ name: "arrow-back", 				iconPack: "default", group: ["Arrows & Chevrons"], keywords: ["arrow", "chevron", "navigate", "left"] },
		{ name: "arrow-forward", 			iconPack: "default", group: ["Arrows & Chevrons"], keywords: ["arrow", "chevron", "navigate", "right"] },
		{ name: "arrow-upward", 			iconPack: "default", group: ["Arrows & Chevrons"], keywords: ["arrow", "chevron", "navigate"] },
		{ name: "arrow-downward", 			iconPack: "default", group: ["Arrows & Chevrons"], keywords: ["arrow", "chevron", "navigate"] },
		{ name: "chevron-left", 			iconPack: "default", group: ["Arrows & Chevrons"], keywords: ["arrow", "chevron"] },
		{ name: "chevron-right", 			iconPack: "default", group: ["Arrows & Chevrons"], keywords: ["arrow", "chevron"] },
		{ name: "chevron-up", 				iconPack: "default", group: ["Arrows & Chevrons"], keywords: ["arrow", "chevron", "expand less"] },
		{ name: "chevron-down", 			iconPack: "default", group: ["Arrows & Chevrons"], keywords: ["arrow", "chevron", "expand more"] },
		{ name: "expand", 					iconPack: "default", group: ["Arrows & Chevrons"], keywords: ["arrow", "full screen"] },
		{ name: "expand-up", 				iconPack: "default", group: ["Arrows & Chevrons"], keywords: ["arrow", "chevron", "expand up", "double arrow"] },
		{ name: "expand-down", 				iconPack: "default", group: ["Arrows & Chevrons"], keywords: ["arrow", "chevron", "expand down", "double arrow"] },
		{ name: "expand-left", 				iconPack: "default", group: ["Arrows & Chevrons"], keywords: ["arrow", "chevron", "expand left", "double arrow"] },
		{ name: "expand-right", 			iconPack: "default", group: ["Arrows & Chevrons"], keywords: ["arrow", "chevron", "expand right", "double arrow"] },

		// text editor icons ==================================
		{ name: "code", 					iconPack: "default", group: ["Editor"], keywords: ["source", "text"] },
		{ name: "copy", 					iconPack: "default", group: ["Editor"], keywords: ["clipboard"] },
		{ name: "cut", 						iconPack: "default", group: ["Editor"], keywords: ["clipboard"] },
		{ name: "edit", 					iconPack: "default", group: ["Editor"], keywords: ["create"] },
		{ name: "format-align-center", 		iconPack: "default", group: ["Editor"], keywords: ["editor", "text", "justify"] },
		{ name: "format-align-justify", 	iconPack: "default", group: ["Editor"], keywords: ["editor", "text"] },
		{ name: "format-align-left", 		iconPack: "default", group: ["Editor"], keywords: ["editor", "text", "justify"] },
		{ name: "format-align-right", 		iconPack: "default", group: ["Editor"], keywords: ["editor", "text", "justify"] },
		{ name: "format-blockquote", 		iconPack: "default", group: ["Editor"], keywords: ["editor", "text", "quote"] },
		{ name: "format-bold", 				iconPack: "default", group: ["Editor"], keywords: ["editor", "text"] },
		{ name: "format-clear", 			iconPack: "default", group: ["Editor"], keywords: ["editor", "text"] },
		{ name: "format-indent-decrease", 	iconPack: "default", group: ["Editor"], keywords: ["editor", "text"] },
		{ name: "format-indent-increase", 	iconPack: "default", group: ["Editor"], keywords: ["editor", "text"] },
		{ name: "format-italic", 			iconPack: "default", group: ["Editor"], keywords: ["editor", "text"] },
		{ name: "format-list-bulleted", 	iconPack: "default", group: ["Editor"], keywords: ["editor", "text", "list"] },
		{ name: "format-list-numbered", 	iconPack: "default", group: ["Editor"], keywords: ["editor", "text", "list"] },
		{ name: "format-strikethrough", 	iconPack: "default", group: ["Editor"], keywords: ["editor", "text"] },
		{ name: "format-underline", 		iconPack: "default", group: ["Editor"], keywords: ["editor", "text"] },
		{ name: "paste", 					iconPack: "default", group: ["Editor"], keywords: ["editor", "text", "clipboard"] },
		{ name: "redo", 					iconPack: "default", group: ["Editor"], keywords: ["editor", "text", "history"] },
		{ name: "undo", 					iconPack: "default", group: ["Editor"], keywords: ["editor", "text", "history"] },
		
		// Social ===============================================
		{ name: "profile", 					iconPack: "default", group: ["Social"], keywords: ["social", "account", "avatar"] },
		{ name: "user", 					iconPack: "default", group: ["Social"], keywords: ["social", "account", "client"] },
		{ name: "user-outline",				iconPack: "default", group: ["Social"], keywords: ["social", "account", "client", "outline"] },
		{ name: "heart", 					iconPack: "default", group: ["Social"], keywords: ["social", "favorite", "love"] },
		{ name: "heart-outline", 			iconPack: "default", group: ["Social"], keywords: ["social", "favorite", "love", "outline"] },
		{ name: "notification-active",		iconPack: "default", group: ["Social"], keywords: ["social", "alert", "bell"] },
		{ name: "notification", 			iconPack: "default", group: ["Social"], keywords: ["social", "alert", "bell"] },
		{ name: "notification-outline", 	iconPack: "default", group: ["Social"], keywords: ["social", "alert", "bell", "outline"] },
		{ name: "notification-add", 		iconPack: "default", group: ["Social"], keywords: ["social", "alert", "bell", "outline", "new"] },
		
		// E-commerce ===========================================
		{ name: "credit-card", 				iconPack: "default", group: ["E-commerce"], keywords: ["payment", "money", "shop"] },
		
		// Cloud ================================================
		{ name: "cloud", 					iconPack: "default", group: ["Cloud"], keywords: ["cloud"] },
		{ name: "cloud-outline",			iconPack: "default", group: ["Cloud"], keywords: ["cloud", "outline"] },

		// Misc =================================================
		{ name: "add", 						iconPack: "default", group: ["Miscellaneous"], keywords: ["plus", "new", "increase", "calculate", "sum", "math"] },
		{ name: "add-box", 					iconPack: "default", group: ["Miscellaneous"], keywords: ["plus", "new", "increase", "calculate", "sum", "math"] },
		{ name: "add-circle", 				iconPack: "default", group: ["Miscellaneous"], keywords: ["plus", "new", "increase", "calculate", "sum", "math"] },
		{ name: "add-circle-outline", 		iconPack: "default", group: ["Miscellaneous"], keywords: ["plus", "new", "increase", "calculate", "sum", "math"] },
		{ name: "close", 					iconPack: "default", group: ["Miscellaneous"], keywords: ["delete", "remove"] },
		{ name: "menu",						iconPack: "default", group: ["Miscellaneous"], keywords: ["hamburger", "options"] },

		{ name: "exclamation",				iconPack: "default", group: ["Miscellaneous"], keywords: ["important", "priority"] },
		{ name: "unlink",					iconPack: "default", group: ["Miscellaneous"], keywords: ["link", "anchor"] },
		{ name: "pin",						iconPack: "default", group: ["Miscellaneous"], keywords: ["push-pin", "on top"] },
		{ name: "pin-outline",				iconPack: "default", group: ["Miscellaneous"], keywords: ["push-pin", "on top"] },
		{ name: "flag",						iconPack: "default", group: ["Miscellaneous"], keywords: ["important", "priority", "country", "map"] },
		{ name: "flash",					iconPack: "default", group: ["Miscellaneous"], keywords: ["fast", "bolt", "thunder"] },
		{ name: "school",					iconPack: "default", group: ["Miscellaneous"], keywords: ["learn", "study", "tutorial", "education"] },
		{ name: "wrench",					iconPack: "default", group: ["Miscellaneous"], keywords: ["build", "fix", "repair", "tool"] },
		{ name: "sync",						iconPack: "default", group: ["Miscellaneous"], keywords: ["exchange"] },
		{ name: "sync-error",				iconPack: "default", group: ["Miscellaneous"], keywords: ["exchange", "problem", "warning"] },
		{ name: "sync-disabled",			iconPack: "default", group: ["Miscellaneous"], keywords: ["exchange", "off"] },

		// Food Icon Pack =======================================
		{ name: "cake", 					iconPack: "food-icons-pack", group: ["Food"], keywords: ["food", "birthday", "celebration", "anniversary"] },
		
		// AV Icon Pack =========================================
		{ name: "full-screen", 				iconPack: "av-icons-pack", group: ["Audio & Video"], keywords: ["expand"] },

		// Map Icon Pack ========================================

		// Mobile Icon Pack =====================================
	];
}