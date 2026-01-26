// types
import type { LanguageDefinition } from '../../index.js';

// syntax highlighter
import { pandaSyntaxHighlighter } from "../panda-syntax-highlighter";

const html: LanguageDefinition = {
	name: "html",
	keywords: [
		"html", "head", "body", "title", "meta", "link", "script", "style",
		"div", "span", "p", "a", "img", "ul", "ol", "li", "table", "tr", "td", "th",
		"form", "input", "button", "select", "option", "textarea", "label",
		"h1", "h2", "h3", "h4", "h5", "h6", "header", "footer", "nav", "section",
		"article", "aside", "main", "figure", "figcaption", "iframe", "video",
		"audio", "source", "canvas", "svg", "br", "hr", "pre", "code", "strong",
		"em", "b", "i", "u", "small", "mark", "del", "ins", "sub", "sup"
	],
	types: [],
	builtins: [
		"class", "id", "src", "href", "alt", "title", "style", "type", "name",
		"value", "placeholder", "action", "method", "target", "rel", "width",
		"height", "charset", "content", "lang", "data-"
	],
	operators: [],
	comments: {
		blockStart: "<!--", // HTML uses block comments only
		blockEnd: "-->", // HTML uses block comments only
	},
	strings: {
		single: true, // HTML can use single quotes for attribute values
		double: true, // HTML can use double quotes for attribute values
	},
};

// register language
pandaSyntaxHighlighter.registerLanguage(html);