/**
 * Multi-Language Syntax Highlighter
 * A modular syntax highlighting library that supports multiple languages
 */

interface LanguageDefinition {
	keywords: string[];
	types?: string[];
	builtins?: string[];
	operators?: string[];
	comments: {
		line?: string;
		blockStart?: string;
		blockEnd?: string;
	};
	strings: {
		single?: boolean;
		double?: boolean;
		template?: boolean;
	};
}

interface LanguageConfig {
	[key: string]: LanguageDefinition;
}

interface CodeBlock {
	code: string;
	language: string;
	line?: string; // Line highlighting: "1" or "1,3,5" or "3-5" or "1,3-5,7"
}

export class SyntaxHighlighter {
	private languages: LanguageConfig = {
		javascript: {
			keywords: [
				'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for',
				'while', 'do', 'switch', 'case', 'break', 'continue', 'class',
				'extends', 'import', 'export', 'default', 'async', 'await', 'try',
				'catch', 'finally', 'throw', 'new', 'this', 'super', 'typeof',
				'instanceof', 'in', 'of', 'yield', 'static', 'get', 'set'
			],
			types: ['void', 'null', 'undefined', 'boolean', 'number', 'string', 'symbol', 'object'],
			builtins: ['console', 'Array', 'Object', 'String', 'Number', 'Boolean', 'Math', 'Date', 'Promise'],
			operators: ['+', '-', '*', '/', '=', '==', '===', '!=', '!==', '<', '>', '<=', '>=', '&&', '||', '!'],
			comments: {
				line: '//',
				blockStart: '/*',
				blockEnd: '*/'
			},
			strings: {
				single: true,
				double: true,
				template: true
			}
		},
		typescript: {
			keywords: [
				'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for',
				'while', 'do', 'switch', 'case', 'break', 'continue', 'class',
				'extends', 'import', 'export', 'default', 'async', 'await', 'try',
				'catch', 'finally', 'throw', 'new', 'this', 'super', 'typeof',
				'instanceof', 'in', 'of', 'yield', 'static', 'get', 'set',
				'interface', 'type', 'enum', 'namespace', 'module', 'declare',
				'abstract', 'implements', 'private', 'protected', 'public', 'readonly',
				'as', 'is', 'keyof', 'infer', 'never'
			],
			types: ['void', 'null', 'undefined', 'boolean', 'number', 'string', 'symbol', 'object', 'any', 'unknown'],
			builtins: ['console', 'Array', 'Object', 'String', 'Number', 'Boolean', 'Math', 'Date', 'Promise'],
			operators: ['+', '-', '*', '/', '=', '==', '===', '!=', '!==', '<', '>', '<=', '>=', '&&', '||', '!', '=>', "??=", "??"],
			comments: {
				line: '//',
				blockStart: '/*',
				blockEnd: '*/'
			},
			strings: {
				single: true,
				double: true,
				template: true
			}
		},
		python: {
			keywords: [
				'def', 'class', 'if', 'elif', 'else', 'for', 'while', 'return',
				'import', 'from', 'as', 'try', 'except', 'finally', 'raise',
				'with', 'pass', 'break', 'continue', 'lambda', 'yield', 'global',
				'nonlocal', 'assert', 'del', 'and', 'or', 'not', 'is', 'in',
				'async', 'await'
			],
			types: ['None', 'True', 'False', 'int', 'float', 'str', 'bool', 'list', 'dict', 'tuple', 'set'],
			builtins: ['print', 'len', 'range', 'enumerate', 'zip', 'map', 'filter', 'open', 'type', 'isinstance'],
			operators: ['+', '-', '*', '/', '//', '%', '**', '=', '==', '!=', '<', '>', '<=', '>='],
			comments: {
				line: '#'
			},
			strings: {
				single: true,
				double: true
			}
		},
		java: {
			keywords: [
				'public', 'private', 'protected', 'static', 'final', 'class', 'interface',
				'extends', 'implements', 'new', 'return', 'if', 'else', 'for', 'while',
				'do', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally',
				'throw', 'throws', 'this', 'super', 'abstract', 'synchronized', 'volatile',
				'transient', 'native', 'strictfp', 'package', 'import', 'instanceof'
			],
			types: ['void', 'int', 'long', 'short', 'byte', 'float', 'double', 'char', 'boolean', 'String'],
			builtins: ['System', 'Object', 'String', 'Integer', 'Double', 'Boolean', 'Math', 'Thread'],
			operators: ['+', '-', '*', '/', '%', '=', '==', '!=', '<', '>', '<=', '>=', '&&', '||', '!'],
			comments: {
				line: '//',
				blockStart: '/*',
				blockEnd: '*/'
			},
			strings: {
				single: false,
				double: true
			}
		},
		html: {
			keywords: [
				'html', 'head', 'body', 'title', 'meta', 'link', 'script', 'style',
				'div', 'span', 'p', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th',
				'form', 'input', 'button', 'select', 'option', 'textarea', 'label',
				'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'footer', 'nav', 'section',
				'article', 'aside', 'main', 'figure', 'figcaption', 'iframe', 'video',
				'audio', 'source', 'canvas', 'svg', 'br', 'hr', 'pre', 'code', 'strong',
				'em', 'b', 'i', 'u', 'small', 'mark', 'del', 'ins', 'sub', 'sup'
			],
			types: [],
			builtins: [
				'class', 'id', 'src', 'href', 'alt', 'title', 'style', 'type', 'name',
				'value', 'placeholder', 'action', 'method', 'target', 'rel', 'width',
				'height', 'charset', 'content', 'lang', 'data-'
			],
			operators: [],
			comments: {
				blockStart: '<!--',
				blockEnd: '-->'
			},
			strings: {
				single: true,
				double: true
			}
		}
	};

	public code: CodeBlock[];
	private defaultLanguage: string;

	constructor(code: string | CodeBlock[], language?: string | string[]) {
		this.defaultLanguage = typeof language === 'string'
			? language
			: (language?.[0] || 'javascript');

		if (typeof code === 'string') {
			// Single code string with single or multiple languages
			if (Array.isArray(language)) {
				this.code = language.map((lang, idx) => ({
					code: idx === 0
						? code
						: '',
					language: lang
				}));
			} else {
				this.code = [{
					code,
					language: this.defaultLanguage
				}];
			}
		} else {
			// Array of code blocks
			this.code = code;
		}
	}

	/**
	 * Parse line highlight specification
	 * Examples: "1", "1,3,5", "3-5", "1,3-5,7"
	 */
	private parseLineSpec(lineSpec: string): Set<number> {
		const lines = new Set<number>();
		const parts = lineSpec.split(',').map(p => p.trim());

		for (const part of parts) {
			if (part.includes('-')) {
				// Range: "3-5"
				const [start, end] = part.split('-').map(n => parseInt(n.trim(), 10));
				if (!isNaN(start) && !isNaN(end)) {
					for (let i = start; i <= end; i++) {
						lines.add(i);
					}
				}
			} else {
				// Single line: "1"
				const lineNum = parseInt(part, 10);
				if (!isNaN(lineNum)) {
					lines.add(lineNum);
				}
			}
		}

		return lines;
	}

	/**
	 * Wrap code lines with highlight spans
	 */
	private wrapHighlightedLines(html: string, highlightedLines: Set<number>): string {
		if (highlightedLines.size === 0) {
			return html;
		}

		const lines = html.split('\n');
		return lines.map((line, idx) => {
			const lineNum = idx + 1;
			if (highlightedLines.has(lineNum)) {
				return `<div class="line-highlight">${line}</div>`;
			}
			return line;
		}).join('\n');
	}

	private addRows(html: string): string {
		const row = html.split('\n');
		console.log(`%c ⚡ rows`, "font-size: 24px; color: crimson; background: black;", row);
		let result = '';
		let i = 0;
		while (i < row.length) {
			result += `<div class="row-number">${row[i]}</div>\n`;
			i++;
		}
		return result;
	}

	/**
	 * Add a custom language definition
	 */
	addLanguage(name: string, definition: LanguageDefinition): void {
		this.languages[name.toLowerCase()] = definition;
	}

	/**
	 * Escape HTML special characters
	 */
	private escapeHtml(text: string): string {
		const map: { [key: string]: string } = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;',
		};
		return text.replace(/[&<>"']/g, m => map[m]);
	}

	/**
	 * Highlight a single code block
	 */
	private highlightBlock(code: string, language: string): string {
		const lang = this.languages[language.toLowerCase()];
		if (!lang) {
			return `<span class="plain">${this.escapeHtml(code)}</span>`;
		}

		// Special handling for HTML
		if (language.toLowerCase() === 'html') {
			return this.highlightHTML(code, lang);
		}

		let result = '';
		let i = 0;

		while (i < code.length) {
			// Check for block comments
			if (lang.comments.blockStart && code.substring(i, i + lang.comments.blockStart.length) === lang.comments.blockStart) {
				const endIdx = code.indexOf(lang.comments.blockEnd!, i + lang.comments.blockStart.length);
				const end = endIdx === -1 ? code.length : endIdx + lang.comments.blockEnd!.length;

				console.log(
					`%c ⚡ (highlightBlock) comments`,
					"font-size: 24px; color: crimson; background: black;"
				);

				result += `<span class="comment">${this.escapeHtml(code.substring(i, end))}</span>`;
				i = end;
				continue;
			}

			// Check for line comments
			if (lang.comments.line && code.substring(i, i + lang.comments.line.length) === lang.comments.line) {
				const end = code.indexOf('\n', i);
				const lineEnd = end === -1 ? code.length : end + 1;
				result += `<span class="comment">${this.escapeHtml(code.substring(i, lineEnd))}</span>`;
				i = lineEnd;
				continue;
			}

			// Check for strings
			if (lang.strings.double && code[i] === '"') {
				let end = i + 1;
				while (end < code.length && (code[end] !== '"' || code[end - 1] === '\\')) {
					end++;
				}
				result += `<span class="string">${this.escapeHtml(code.substring(i, end + 1))}</span>`;
				i = end + 1;
				continue;
			}

			if (lang.strings.single && code[i] === "'") {
				let end = i + 1;
				while (end < code.length && (code[end] !== "'" || code[end - 1] === '\\')) {
					end++;
				}
				result += `<span class="string">${this.escapeHtml(code.substring(i, end + 1))}</span>`;
				i = end + 1;
				continue;
			}

			if (lang.strings.template && code[i] === '`') {
				let end = i + 1;
				while (end < code.length && (code[end] !== '`' || code[end - 1] === '\\')) {
					end++;
				}
				result += `<span class="string">${this.escapeHtml(code.substring(i, end + 1))}</span>`;
				i = end + 1;
				continue;
			}

			// Check for numbers
			if (/\d/.test(code[i])) {
				let end = i;
				while (end < code.length && /[\d.xXoObB]/.test(code[end])) {
					end++;
				}
				result += `<span class="number">${this.escapeHtml(code.substring(i, end))}</span>`;
				i = end;
				continue;
			}

			// Check for keywords, types, and builtins
			if (/[a-zA-Z_]/.test(code[i])) {
				let end = i;
				while (end < code.length && /[a-zA-Z0-9_]/.test(code[end])) {
					end++;
				}
				const word = code.substring(i, end);

				if (lang.keywords.includes(word)) {
					result += `<span class="keyword">${this.escapeHtml(word)}</span>`;
				} else if (lang.types && lang.types.includes(word)) {
					result += `<span class="type">${this.escapeHtml(word)}</span>`;
				} else if (lang.builtins && lang.builtins.includes(word)) {
					result += `<span class="builtin">${this.escapeHtml(word)}</span>`;
				} else {
					result += `<span class="identifier">${this.escapeHtml(word)}</span>`;
				}
				i = end;
				continue;
			}

			// Check for operators
			if (lang.operators) {
				let matched = false;
				for (const op of lang.operators.sort((a, b) => b.length - a.length)) {
					if (code.substr(i, op.length) === op) {
						result += `<span class="operator">${this.escapeHtml(op)}</span>`;
						i += op.length;
						matched = true;
						break;
					}
				}
				if (matched) continue;
			}

			// Default: plain character
			result += this.escapeHtml(code[i]);
			i++;
		}

		return result;
	}

	/**
	 * Special highlighting for HTML
	 */
	private highlightHTML(code: string, lang: LanguageDefinition): string {
		let result = '';
		let i = 0;

		while (i < code.length) {
			// Check for HTML comments
			if (code.substr(i, 4) === '<!--') {
				const endIdx = code.indexOf('-->', i + 4);
				const end = endIdx === -1 ? code.length : endIdx + 3;
				result += `<span class="comment">${this.escapeHtml(code.substring(i, end))}</span>`;
				i = end;
				continue;
			}

			// Check for tags
			if (code[i] === '<') {
				let end = i + 1;
				const isClosing = code[i + 1] === '/';
				if (isClosing) end++;

				// Get tag name
				let tagStart = end;
				while (end < code.length && /[a-zA-Z0-9]/.test(code[end])) {
					end++;
				}
				const tagName = code.substring(tagStart, end);

				result += this.escapeHtml('<');
				if (isClosing) result += this.escapeHtml('/');

				if (lang.keywords.includes(tagName.toLowerCase())) {
					result += `<span class="keyword">${this.escapeHtml(tagName)}</span>`;
				} else {
					result += this.escapeHtml(tagName);
				}

				// Parse attributes
				while (end < code.length && code[end] !== '>') {
					// Skip whitespace
					if (/\s/.test(code[end])) {
						result += this.escapeHtml(code[end]);
						end++;
						continue;
					}

					// Check for attribute name
					const attrStart = end;
					while (end < code.length && /[a-zA-Z0-9\-:]/.test(code[end])) {
						end++;
					}

					if (end > attrStart) {
						const attrName = code.substring(attrStart, end);
						const isBuiltin = lang.builtins?.some(b =>
							attrName === b || attrName.startsWith(b)
						);

						if (isBuiltin) {
							result += `<span class="builtin">${this.escapeHtml(attrName)}</span>`;
						} else {
							result += `<span class="attribute">${this.escapeHtml(attrName)}</span>`;
						}
					}

					// Skip whitespace
					while (end < code.length && /\s/.test(code[end])) {
						result += this.escapeHtml(code[end]);
						end++;
					}

					// Check for '='
					if (code[end] === '=') {
						result += `<span class="operator">${this.escapeHtml('=')}</span>`;
						end++;
					}

					// Skip whitespace
					while (end < code.length && /\s/.test(code[end])) {
						result += this.escapeHtml(code[end]);
						end++;
					}

					// Check for attribute value
					if (code[end] === '"' || code[end] === "'") {
						const quote = code[end];
						const valueStart = end;
						end++;
						while (end < code.length && code[end] !== quote) {
							end++;
						}
						if (code[end] === quote) end++;
						result += `<span class="string">${this.escapeHtml(code.substring(valueStart, end))}</span>`;
					}
				}

				// Closing >
				if (code[end] === '>') {
					result += this.escapeHtml('>');
					end++;
				}

				i = end;
				continue;
			}

			// Default: plain text
			result += this.escapeHtml(code[i]);
			i++;
		}

		return result;
	}

	/**
	 * Generate highlighted HTML for all code blocks
	 */
	highlight(): string {
		return this.code
			.map((block) => {
				let highlighted = this.highlightBlock(block.code, block.language);

				// Apply line highlighting if specified
				const finalHtml = block.line
					? this.wrapHighlightedLines(highlighted, this.parseLineSpec(block.line))
					: highlighted;

				const finalHtmlWithRows = this.addRows(finalHtml);

				return `<pre class="syntax-highlight syntax-${block.language}"><code>${finalHtmlWithRows}</code></pre>`;
			})
			.join('\n');
	}

	/**
	 * Generate CSS styles for syntax highlighting
	 */
	static getStyles(): string {
		return `
.syntax-highlight {
  background: #282c34;
  color: #abb2bf;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}

.syntax-highlight code {
  font-family: inherit;
}

.syntax-highlight .keyword {
  color: #c678dd;
  font-weight: bold;
}

.syntax-highlight .type {
  color: #e5c07b;
}

.syntax-highlight .builtin {
  color: #56b6c2;
}

.syntax-highlight .string {
  color: #98c379;
}

.syntax-highlight .number {
  color: #d19a66;
}

.syntax-highlight .comment {
  color: #5c6370;
  font-style: italic;
}

.syntax-highlight .operator {
  color: #56b6c2;
}

.syntax-highlight .identifier {
  color: #e06c75;
}

.syntax-highlight .attribute {
  color: #d19a66;
}

.syntax-highlight .line-highlight {
  display: block;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0 -16px;
  padding: 0 16px;
  border-left: 3px solid #61afef;
}

.syntax-highlight .plain {
  color: #abb2bf;
}
    `.trim();
	}
}