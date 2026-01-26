// types
import { LanguageDefinition } from "../../index";

// syntax highlighter
import { pandaSyntaxHighlighter } from "../panda-syntax-highlighter";

const typescript: LanguageDefinition = {
	name: "typescript",
	keywords: [
		"const", "let", "var", "function", "return", "if", "else", "for",
		"while", "do", "switch", "case", "break", "continue", "class",
		"extends", "import", "export", "exports", "default", "async", "await",
		"try", "catch", "finally", "throw", "new", "this", "super", "typeof",
		"instanceof", "in", "of", "yield", "static", "get", "set",
		"interface", "type", "enum", "namespace", "module", "declare",
		"abstract", "implements", "private", "protected", "public", "readonly",
		"as", "is", "keyof", "infer", "never", "debugger"
	],
	types: ["void", "null", "undefined", "boolean", "number", "string", "symbol", "object", "any", "unknown"],
	builtins: [
		"globalThis", "window", "console", "alert", "Array", "Object", "String", "Number",
		"Boolean", "Math", "Date", "Promise", "Map", "Set", "WeakMap", "WeakSet", "ReadonlyArray",
		"Partial", "Required", "Pick", "Omit", "Record", "Exclude", "Extract", "NonNullable",
		"ReturnType", "InstanceType", "ThisType", "Iterable", "Iterator", "AsyncIterable", "AsyncIterator",
		"Symbol", "BigInt",
	],
	operators: ["+", "-", "*", "/", "=", "==", "===", "!=", "!==", "<", ">", "<=", ">=", "&&", "||", "!", "=>", "??=", "??"],
	comments: {
		line: "//", // TypeScript uses line comments
		blockStart: "/*", // TypeScript uses block comments too
		blockEnd: "*/", // TypeScript uses block comments too
	},
	strings: {
		single: true, // TypeScript can use single quotes for strings
		double: true, // TypeScript uses double quotes for strings
		template: true, // TypeScript supports template literals
	},
};

// register language
pandaSyntaxHighlighter.registerLanguage(typescript);