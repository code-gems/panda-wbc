// types
import { PandaSelectChangeEvent } from "@panda-wbc/panda-select";
import { PandaCheckboxChangeEvent } from "@panda-wbc/panda-checkbox";

const enum BLOCK_SIZE {
	NORMAL = "NORMAL",
	SMALL = "SMALL",
	TINY = "TINY",
}

const enum BLOCK_TYPE {
	CLASSIC = "CLASSIC",
	WILD = "WILD",
	EXTREME = "EXTREME",
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

	private _blockSize = BLOCK_SIZE.NORMAL;

	private _blockSizeList: BLOCK_SIZE[] = [
		BLOCK_SIZE.NORMAL,
		BLOCK_SIZE.SMALL,
		BLOCK_SIZE.TINY,
	];

	@state()
	private _selectedBlockTypes = new Set<BLOCK_TYPE>([BLOCK_TYPE.CLASSIC]);

	private _grid: number[][] = [];

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
	private _showSettings: boolean = false;

	@state()
	private _gameOver: boolean = false;

	private _ctx!: CanvasRenderingContext2D;

	private _metadata: any = {
		blockType: [BLOCK_TYPE.CLASSIC],
		blockSize: BLOCK_SIZE.NORMAL,
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
				${this._renderSettings()}
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
					<panda-button @click="${this._toggleShowSettings}">
						SETTINGS
					</panda-button>
				</div>
			`;
		}
	}

	private _renderSettings(): TemplateResult | void {
		if (this._showSettings) {
			return html`
				<div class="menu">
					<h1 class="header">SETTINGS</h1>

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
							.name="${BLOCK_TYPE.CLASSIC}"
							.checked="${this._selectedBlockTypes.has(BLOCK_TYPE.CLASSIC)}"
						>
							DEFAULT
						</panda-checkbox>
						<panda-checkbox
							.name="${BLOCK_TYPE.WILD}"
							.checked="${this._selectedBlockTypes.has(BLOCK_TYPE.WILD)}"
						>
							WILD
						</panda-checkbox>
						<panda-checkbox
							.name="${BLOCK_TYPE.EXTREME}"
							.checked="${this._selectedBlockTypes.has(BLOCK_TYPE.EXTREME)}"
						>
							EXTREME
						</panda-checkbox>
					</panda-checkbox-group>

					<panda-button @click="${() => this._toggleShowSettings(false)}">
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

					<panda-button @click="${this._onNewGame}">
						NEW GAME
					</panda-button>
					<panda-button @click="${this._toggleShowSettings}">
						OPTIONS
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

	private _createGrid(): number[][] {
		return Array.from({ length: this._gridRows }, () => Array(this._gridColumns).fill(0));
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
			row.forEach((value, x) => {
				if (value !== 0) {
					this._drawSquare(
						x,
						y,
						"#0c3051"
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

				if (this._grid[newY][newX] !== 0) {
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
					this._grid[this._currentY + y][this._currentX + x] = value;
				}
			});
		});
		this._removeFullRows();
	}

	private _removeFullRows(): void {
		const rowsToRemove: number[] = [];
		this._grid.forEach((row, y) => {
			if (row.every(value => value !== 0)) {
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
			case BLOCK_SIZE.SMALL:
				this._gridColumns = 20;
				this._gridRows = 40;
				this._blockSizePx = 15;
				break;

			case BLOCK_SIZE.TINY:
				this._gridColumns = 30;
				this._gridRows = 60;
				this._blockSizePx = 10;
				break;

			case BLOCK_SIZE.NORMAL:
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
		if (this._selectedBlockTypes.has(BLOCK_TYPE.CLASSIC)) {
			this._pieces = this._pieces.concat(classicBlocks);
		}
		if (this._selectedBlockTypes.has(BLOCK_TYPE.WILD)) {
			this._pieces = this._pieces.concat(wildBlocks);
		}
		if (this._selectedBlockTypes.has(BLOCK_TYPE.EXTREME)) {
			this._pieces = this._pieces.concat(extremeBlocks);
		}

		// [VALIDATION]: add classic pieces if nothing was selected
		if (this._pieces.length === 0) {
			this._pieces = [...classicBlocks];
			this._selectedBlockTypes = new Set<BLOCK_TYPE>([BLOCK_TYPE.CLASSIC]);
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
		this._showSettings = false;
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
		this._showSettings = false;
	}

	private _onToggleGamePause(): void {
		this._gamePaused = !this._gamePaused;
		this._gameLoop();
	}

	private _toggleShowSettings(show: boolean = true): void {
		this._showSettings = show;
	}

	private _onChangeBlockSize(event: PandaSelectChangeEvent) {
		this._blockSize = event.detail.value ?? BLOCK_SIZE.NORMAL;
		this._applyBlockSize();
		// save settings
		this._saveMetadata();
	}

	_onChangeBlockType(event: PandaCheckboxChangeEvent) {
		const _optionName = event.detail.name;
		const _optionEnabled = event.detail.checked;

		// toggle block types
		if (_optionName === BLOCK_TYPE.CLASSIC) {
			if (_optionEnabled) {
				this._selectedBlockTypes.add(BLOCK_TYPE.CLASSIC);
			} else {
				this._selectedBlockTypes.delete(BLOCK_TYPE.CLASSIC);
			}
		}
		if (_optionName === BLOCK_TYPE.WILD) {
			if (_optionEnabled) {
				this._selectedBlockTypes.add(BLOCK_TYPE.WILD);
			} else {
				this._selectedBlockTypes.delete(BLOCK_TYPE.WILD);
			}
		}
		if (_optionName === BLOCK_TYPE.EXTREME) {
			if (_optionEnabled) {
				this._selectedBlockTypes.add(BLOCK_TYPE.EXTREME);
			} else {
				this._selectedBlockTypes.delete(BLOCK_TYPE.EXTREME);
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
