// types
import { LanguageDefinition } from "../../index";

// syntax highlighter
import { pandaSyntaxHighlighter } from "../panda-syntax-highlighter";

const javascript: LanguageDefinition = {
	name: "javascript",
	keywords: [
		"const", "let", "var", "function", "return", "if", "else", "for",
		"while", "do", "switch", "case", "break", "continue", "class",
		"extends", "import", "export", "default", "async", "await", "try",
		"catch", "finally", "throw", "new", "this", "super", "typeof",
		"instanceof", "in", "of", "yield", "static", "get", "set", "constructor",
		"void", "delete", "require", "module", "exports", "with", "debugger"
	],
	types: ["void", "null", "undefined", "boolean", "number", "string", "symbol", "object"],
	builtins: ["globalThis", "window", "console", "alert", "Array", "Object", "String", "Number", "Boolean", "Math", "Date", "Promise"],
	operators: ["+", "-", "*", "/", "=", "==", "===", "!=", "!==", "<", ">", "<=", ">=", "&&", "||", "!"],
	comments: {
		line: "//", // JavaScript uses line comments
		blockStart: "/*", // JavaScript uses block comments too
		blockEnd: "*/", // JavaScript uses block comments too
	},
	strings: {
		single: true, // JavaScript can use single quotes for strings
		double: true, // JavaScript uses double quotes for strings
		template: true, // JavaScript supports template literals
	}
};

// register language
pandaSyntaxHighlighter.registerLanguage(javascript);