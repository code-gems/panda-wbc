// types
import { PandaSelectChangeEvent } from "@panda-wbc/panda-select";
import { PandaCheckboxChangeEvent } from "@panda-wbc/panda-checkbox";

const enum ScreenType {
	HOME,
	OPTIONS,
	PAUSE,
	GAME_OVER,
}

const enum BlockSize {
	NORMAL = "NORMAL",
	SMALL = "SMALL",
	TINY = "TINY",
}

const enum BlockType {
	CLASSIC = "CLASSIC",
	WILD = "WILD",
	EXTREME = "EXTREME",
}

type GridCell = {
	filled: boolean;
	color: string;
}

export type Piece = {
	shape: number[][];
	color: string;
};

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-button";
import "@panda-wbc/panda-checkbox";
import "@panda-wbc/panda-select";

// utils
import { LitElement, TemplateResult, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import {
	getColors,
	classicBlocks,
	wildBlocks,
	extremeBlocks,
} from "./game-config";

@customElement("panda-tetris")
export class PandaTetris extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	private _blockSize = BlockSize.NORMAL;

	private _blockSizeList: BlockSize[] = [
		BlockSize.NORMAL,
		BlockSize.SMALL,
		BlockSize.TINY,
	];

	@state()
	private _selectedBlockTypes = new Set<BlockType>([BlockType.CLASSIC]);

	private _grid: GridCell[][] = [];

	@state()
	private _pieces: number[][][] = [...classicBlocks];

	private _currentPiece!: Piece;

	private _nextPiece!: Piece;

	private _gridColumns: number = 10;

	private _gridRows: number = 20;

	private _blockSizePx: number = 30; // [px]

	private _currentX!: number;

	private _currentY!: number;

	private _colors: string[] = getColors();

	private _score: number = 0;

	private _blocksPlaced: number = 0;

	private _topScore: number = 0;

	private _topBlocksPlaced: number = 0;

	@state()
	private _gameStarted: boolean = false;

	@state()
	private _gamePaused: boolean = false;

	@state()
	private _showOptions: boolean = false;

	@state()
	private _gameOver: boolean = false;
	
	@state()
	private _showScreen: ScreenType = ScreenType.HOME;

	private readonly _computedStyle: CSSStyleDeclaration = getComputedStyle(this);

	private _borderColor!: string;

	private _ctx!: CanvasRenderingContext2D;

	private _metadata: any = {
		blockType: [BlockType.CLASSIC],
		blockSize: BlockSize.NORMAL,
		topScore: 0,
		topBlocksPlaced: 0,
	};

	// timers
	private _gameLoopTimer!: ReturnType<typeof setTimeout>;

	// elements
	@query("#game")
	private _canvasEl!: HTMLCanvasElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	firstUpdated(): void {
		// load user settings
		this._loadMetadata();
		// get canvas context
		this._ctx = this._canvasEl.getContext('2d')!;
		// add events
		document.addEventListener("keydown", this._onKeyPress.bind(this));
		// get colors
		this._borderColor = this._computedStyle.getPropertyValue("--panda-border-color");
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// clear timers
		clearTimeout(this._gameLoopTimer);
		// remove events
		document.removeEventListener("keydown", this._onKeyPress.bind(this));
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<div class="menu-cont">
				${this._renderHomeScreen()}
				${this._renderOptions()}
				${this._renderPauseScreen()}
				${this._renderGameOverScreen()}
				<canvas id="game" width="300" height="600"></canvas>
			</div>
		`;
	}

	private _renderHomeScreen(): TemplateResult | void {
		if (!this._gameStarted) {
			return html`
				<div class="menu">
					<h1 class="header">PANDA TETRIS</h1>
					<p>
						High Score: ${this._topScore}<br />
						Blocks:${this._topBlocksPlaced}
					</p>
					<panda-button @click="${this._onNewGame}">
						NEW GAME
					</panda-button>
					<panda-button @click="${this._toggleShowOptions}">
						OPTIONS
					</panda-button>
				</div>
			`;
		}
	}

	private _renderOptions(): TemplateResult | void {
		if (this._showOptions) {
			return html`
				<div class="menu">
					<h1 class="header">OPTIONS</h1>

					<!-- BLOCK SIZE -->
					<panda-select
						label="BOCK SIZE"
						.value="${this._blockSize}"
						.items="${this._blockSizeList}"
						@change="${this._onChangeBlockSize}"
					>
					</panda-select>
					
					<!-- BLOCK TYPES -->
					<panda-checkbox-group
						label="BOCK TYPES"
						@change="${this._onChangeBlockType}"
					>
						<panda-checkbox
							.name="${BlockType.CLASSIC}"
							.checked="${this._selectedBlockTypes.has(BlockType.CLASSIC)}"
						>
							DEFAULT
						</panda-checkbox>
						<panda-checkbox
							.name="${BlockType.WILD}"
							.checked="${this._selectedBlockTypes.has(BlockType.WILD)}"
						>
							WILD
						</panda-checkbox>
						<panda-checkbox
							.name="${BlockType.EXTREME}"
							.checked="${this._selectedBlockTypes.has(BlockType.EXTREME)}"
						>
							EXTREME
						</panda-checkbox>
					</panda-checkbox-group>

					<panda-button @click="${() => this._toggleShowOptions(false)}">
						BACK
					</panda-button>
				</div>
			`;
		}
	}

	private _renderPauseScreen(): TemplateResult | void {
		if (this._gamePaused) {
			return html`
				<div class="menu">
					<h1 class="header">PAUSE</h1>

					<panda-button @click="${this._onToggleGamePause}">
						RESUME
					</panda-button>
					<panda-button @click="${this._onEndGame}">
						END GAME
					</panda-button>
				</div>
			`;
		}
	}

	private _renderGameOverScreen(): TemplateResult | void {
		if (this._gameOver) {
			return html`
				<div class="menu">
					<h1 class="header">GAME OVER</h1>
					<p>
						Score: ${this._score}<br />
						Blocks:${this._blocksPlaced}
					</p>

					<panda-button @click="${this._onNewGame}">
						NEW GAME
					</panda-button>
					<panda-button @click="${this._onEndGame}">
						BACK
					</panda-button>
				</div>
			`;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _loadMetadata(): void {
		if (localStorage.getItem("__TETRIS_METADATA")) {
			// load data from storage
			const _metadataString = localStorage.getItem("__TETRIS_METADATA");
			if (_metadataString) {
				this._metadata = JSON.parse(_metadataString);

				this._blockSize = this._metadata.blockSize;
				this._applyBlockSize();

				this._selectedBlockTypes = new Set([...this._metadata.blockType]);
				this._applyBlockTypes();

				// load top score
				this._topScore = this._metadata.topScore;
				this._topBlocksPlaced = this._metadata.topBlocksPlaced;
			}
		}
	}

	private _saveMetadata(): void {
		const _metadata = {
			blockType: [...this._selectedBlockTypes.values()],
			blockSize: this._blockSize,
			topScore: this._topScore,
			topBlocksPlaced: this._topBlocksPlaced,
		};
		console.log("%c (SAVE)", "font-size: 24px; color: green;", _metadata);
		localStorage.setItem("__TETRIS_METADATA", JSON.stringify(_metadata));
	}

	private _createGrid(): GridCell[][] {
		return Array.from({ length: this._gridRows }, () => Array(this._gridColumns).fill({ filled: false, color: "" }));
	}

	private _getRandomPiece(): Piece {
		// get random block index
		const _pieceId = Math.floor(Math.random() * this._pieces.length);
		// get random color index
		const _colorId = Math.floor(Math.random() * this._colors.length);
		return {
			shape: this._pieces[_pieceId],
			color: this._colors[_colorId],
		};
	}

	private _drawSquare(x: number, y: number, color: string, size: number = 0): void {
		const _blockSize = size || this._blockSizePx
		this._ctx.fillStyle = color;
		this._ctx.fillRect(
			x * _blockSize,
			y * _blockSize,
			_blockSize,
			_blockSize
		);

		this._ctx.strokeStyle = "hsl(0deg 0% 100% / 50%)";
		this._ctx.strokeRect(x * _blockSize,
			y * _blockSize,
			_blockSize,
			_blockSize
		);
	}

	private _drawPiece(piece: Piece): void {
		piece.shape.forEach((row, y) => {
			row.forEach((column, x) => {
				if (column !== 0) {
					// draw cell
					this._drawSquare(
						this._currentX + x,
						this._currentY + y,
						piece.color,
					);
				}
			});
		});
	}

	private _drawNextPiece(): void {
		const _positionX = 25;
		this._nextPiece.shape.forEach((row, y) => {
			row.forEach((column, x) => {
				if (column !== 0) {
					// draw cell
					this._drawSquare(
						_positionX + x,
						1 + y,
						this._nextPiece.color,
						10
					);
				}
			});
		});
	}

	private _drawBoard(): void {
		this._grid.forEach((row, y) => {
			row.forEach(({ filled, color }, x) => {
				if (filled) {
					this._drawSquare(
						x,
						y,
						color
					);
				}
			});
		});
	}

	private _detectCollision(x: number, y: number, piece: number[][]): boolean {
		for (let row = 0; row < piece.length; row++) {
			for (let column = 0; column < piece[row].length; column++) {
				// check for empty block fragments
				if (!piece[row][column]) {
					continue;
				}
				const newX = x + column;
				const newY = y + row;

				// check for grid boundaries
				if (newX < 0 || newX >= this._gridColumns || newY >= this._gridRows) {
					return true;
				}

				if (newY < 0) {
					continue;
				}

				const cell = this._grid[newY][newX];
				if (cell.filled) {
					return true;
				}
			}
		}
		return false;
	}

	private _rotatePiece(): void {
		const _newShape = this._currentPiece.shape[0].map((value, index) => {
			return this._currentPiece.shape.map((row) => row[index]).reverse();
		});
		if (!this._detectCollision(this._currentX, this._currentY, _newShape)) {
			this._currentPiece.shape = _newShape;
		}
	}

	private _moveDown(): void {
		if (!this._detectCollision(this._currentX, this._currentY + 1, this._currentPiece.shape)) {
			this._currentY++;
		} else {
			this._lock();
			this._currentPiece = this._nextPiece;
			this._nextPiece = this._getRandomPiece();
			this._currentX = Math.ceil(this._gridColumns / 2) - 2;
			this._currentY = 1;
			this._blocksPlaced++;

			// check if new piece collides (game over)
			if (this._detectCollision(this._currentX, this._currentY, this._currentPiece.shape)) {
				this._gameOver = true;
				this._updateTopScore();
			}
		}
	}

	private _moveRight(): void {
		if (!this._detectCollision(this._currentX + 1, this._currentY, this._currentPiece.shape)) {
			this._currentX++;
		}
	}

	private _moveLeft(): void {
		if (!this._detectCollision(this._currentX - 1, this._currentY, this._currentPiece.shape)) {
			this._currentX--;
		}
	}

	private _lock(): void {
		this._currentPiece.shape.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0) {
					this._grid[this._currentY + y][this._currentX + x] = {
						filled: !!value,
						color: this._currentPiece.color,
					};
				}
			});
		});
		this._removeFullRows();
	}

	private _removeFullRows(): void {
		const rowsToRemove: number[] = [];
		this._grid.forEach((row, y) => {
			if (row.every(({ filled }) => filled)) {
				rowsToRemove.push(y);
			}
		});
		rowsToRemove.forEach((y) => {
			this._grid.splice(y, 1);
			this._grid.unshift(Array(this._gridColumns).fill(0));
		});
		this._score += (rowsToRemove.length * rowsToRemove.length) * 10;
	}

	private _draw(): void {
		// clear board
		this._ctx.clearRect(0, 0, this._canvasEl.width, this._canvasEl.height);

		// draw grid
		this._ctx.strokeStyle = this._borderColor;
		for (let x = 0; x < this._gridColumns; x++) {
			const _canvasHeight = this._gridRows * this._blockSizePx;
			const _currentX = x * this._blockSizePx;
			this._ctx.moveTo(_currentX, 0);
			this._ctx.lineTo(_currentX, _canvasHeight);
		}
		// draw row lines
		for (let y = 0; y < this._gridRows; y++) {
			const _canvasWidth = this._gridColumns * this._blockSizePx;
			const _currentY = y * this._blockSizePx;

			this._ctx.moveTo(0, _currentY);
			this._ctx.lineTo(_canvasWidth, _currentY);
		}
		this._ctx.stroke();

		// show score
		this._ctx.filter = "blur(0px)";
		this._ctx.fillStyle = "#3d4043";
		this._ctx.font = "14px monospace";
		this._ctx.fillText(`Score: ${this._score} Blocks: ${this._blocksPlaced}`, 10, 20);
		// add blur effect when paused
		if (this._gamePaused || this._gameOver) {
			this._ctx.filter = `blur(5px)`;
		}
		this._drawBoard();
		this._drawPiece(this._currentPiece);
		this._drawNextPiece();
	}

	private _gameLoop(): void {
		if (this._gameStarted && !this._gamePaused && !this._gameOver) {
			requestAnimationFrame(() => {
				this._moveDown();
				this._draw();
				this._gameLoopTimer = setTimeout(() => this._gameLoop(), 550);
			});
		}
	}

	private _updateTopScore(): void {
		if (this._topScore < this._score) {
			this._topScore = this._score;
			this._topBlocksPlaced = this._blocksPlaced;
			// save score
			this._saveMetadata();
		}
	}

	private _applyBlockSize(): void {
		// apply block size change
		switch (this._blockSize) {
			case BlockSize.SMALL:
				this._gridColumns = 20;
				this._gridRows = 40;
				this._blockSizePx = 15;
				break;

			case BlockSize.TINY:
				this._gridColumns = 30;
				this._gridRows = 60;
				this._blockSizePx = 10;
				break;

			case BlockSize.NORMAL:
			default:
				this._gridColumns = 10;
				this._gridRows = 20;
				this._blockSizePx = 30;
				break;
		}
	}

	private _applyBlockTypes(): void {
		// reset block list
		this._pieces = [];
		if (this._selectedBlockTypes.has(BlockType.CLASSIC)) {
			this._pieces = this._pieces.concat(classicBlocks);
		}
		if (this._selectedBlockTypes.has(BlockType.WILD)) {
			this._pieces = this._pieces.concat(wildBlocks);
		}
		if (this._selectedBlockTypes.has(BlockType.EXTREME)) {
			this._pieces = this._pieces.concat(extremeBlocks);
		}

		// [VALIDATION]: add classic pieces if nothing was selected
		if (this._pieces.length === 0) {
			this._pieces = [...classicBlocks];
			this._selectedBlockTypes = new Set<BlockType>([BlockType.CLASSIC]);
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onNewGame(): void {
		// create clear grid
		this._grid = this._createGrid();
		// create piece
		this._currentPiece = this._getRandomPiece();
		this._nextPiece = this._getRandomPiece();
		this._currentX = Math.ceil(this._gridColumns / 2) - 2;
		this._currentY = 1;
		// reset score and stats
		this._score = 0;
		this._blocksPlaced = 0;
		// reset view
		this._gameStarted = true;
		this._gameOver = false;
		this._gamePaused = false;
		this._showOptions = false;
		// start game
		this._gameLoop();
	}

	private _onEndGame(): void {
		this._updateTopScore();
		this._grid = this._createGrid();
		// reset score and stats
		this._score = 0;
		this._blocksPlaced = 0;
		// reset view
		this._gameStarted = false;
		this._gameOver = false;
		this._gamePaused = false;
		this._showOptions = false;
	}

	private _onToggleGamePause(): void {
		this._gamePaused = !this._gamePaused;
		this._gameLoop();
	}

	private _toggleShowOptions(show: boolean = true): void {
		this._showOptions = show;
	}

	private _onChangeBlockSize(event: PandaSelectChangeEvent) {
		this._blockSize = event.detail.value ?? BlockSize.NORMAL;
		this._applyBlockSize();
		// save settings
		this._saveMetadata();
	}

	_onChangeBlockType(event: PandaCheckboxChangeEvent) {
		const _optionName = event.detail.name;
		const _optionEnabled = event.detail.checked;

		// toggle block types
		if (_optionName === BlockType.CLASSIC) {
			if (_optionEnabled) {
				this._selectedBlockTypes.add(BlockType.CLASSIC);
			} else {
				this._selectedBlockTypes.delete(BlockType.CLASSIC);
			}
		}
		if (_optionName === BlockType.WILD) {
			if (_optionEnabled) {
				this._selectedBlockTypes.add(BlockType.WILD);
			} else {
				this._selectedBlockTypes.delete(BlockType.WILD);
			}
		}
		if (_optionName === BlockType.EXTREME) {
			if (_optionEnabled) {
				this._selectedBlockTypes.add(BlockType.EXTREME);
			} else {
				this._selectedBlockTypes.delete(BlockType.EXTREME);
			}
		}
		this._applyBlockTypes();
		// save settings
		this._saveMetadata();
	}

	private _onKeyPress(event: KeyboardEvent): void {
		event.stopPropagation();
		event.preventDefault();
		// toggle pause screen
		if (this._gameStarted && event.code === "Escape") {
			this._onToggleGamePause();
			this._draw();
		}
		// ignore controls in certain cases
		if (
			!this._gameStarted ||
			this._gameOver ||
			this._gamePaused
		) {
			return;
		}

		switch (event.code) {
			case "ArrowLeft":
				this._moveLeft();
				break;
			case "ArrowUp":
				this._rotatePiece();
				break;
			case "ArrowRight":
				this._moveRight();
				break;
			case "Space":
			case "ArrowDown":
				this._moveDown();
				break;
		}
		this._draw();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-tetris": PandaTetris;
	}
}
