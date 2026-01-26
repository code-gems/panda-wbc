// types
import type { LanguageDefinition } from '../../index.js';

// syntax highlighter
import { pandaSyntaxHighlighter } from "../panda-syntax-highlighter";

const java: LanguageDefinition = {
	name: "java",
	keywords: [
		"public", "private", "protected", "static", "final", "class", "interface",
		"extends", "implements", "new", "return", "if", "else", "for", "while",
		"do", "switch", "case", "break", "continue", "try", "catch", "finally",
		"throw", "throws", "this", "super", "abstract", "synchronized", "volatile",
		"transient", "native", "strictfp", "package", "import", "instanceof"
	],
	types: ["void", "int", "long", "short", "byte", "float", "double", "char", "boolean", "string"],
	builtins: [
		"System", "Object", "String", "Integer", "Double", "Boolean", "Math", "Thread", "Exception",
		"Runnable", "List", "Map", "Set", "ArrayList", "HashMap", "HashSet", "Arrays", "Collections",
		"PrintStream", "Scanner", "File", "InputStream", "OutputStream", "BufferedReader", "BufferedWriter",
		"StringBuilder", "StringBuffer", "Character", "ThreadLocal", "Enum", "Iterable", "Comparator",
		"Iterator", "Optional", "Stream", "Date", "Calendar", "UUID", "Locale", "TimeZone", "Math",
		"Runtime", "Process", "ProcessBuilder", "BigInteger", "BigDecimal", "Pattern", "Matcher",
		"Objects", "Files", "Paths", "StandardCharsets"
	],
	operators: ["+", "-", "*", "/", "%", "=", "==", "!=", "<", ">", "<=", ">=", "&&", "||", "!"],
	comments: {
		line: "//",
		blockStart: "/*",
		blockEnd: "*/"
	},
	strings: {
		single: false, // Java does not use single quotes for strings
		double: true, // Java uses double quotes for strings
	},
};

// register language
pandaSyntaxHighlighter.registerLanguage(java);