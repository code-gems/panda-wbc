// types
import { LanguageDefinition } from "../../index";

// syntax highlighter
import { pandaSyntaxHighlighter } from "../panda-syntax-highlighter";

const python: LanguageDefinition = {
	name: "python",
	keywords: [
		"def", "class", "if", "elif", "else", "for", "while", "return",
		"import", "from", "as", "try", "except", "finally", "raise",
		"with", "pass", "break", "continue", "lambda", "yield", "global",
		"nonlocal", "assert", "del", "and", "or", "not", "is", "in",
		"async", "await"
	],
	types: ["None", "True", "False", "int", "float", "str", "bool", "list", "dict", "tuple", "set"],
	builtins: ["print", "len", "range", "enumerate", "zip", "map", "filter", "open", "type", "isinstance"],
	operators: ["+", "-", "*", "/", "//", "%", "**", "=", "==", "!=", "<", ">", "<=", ">="],
	comments: {
		line: "#", // Python uses line comments
	},
	strings: {
		single: true, // Python can use single quotes for strings
		double: true, // Python can use double quotes for strings
	}
};

// register language
pandaSyntaxHighlighter.registerLanguage(python);