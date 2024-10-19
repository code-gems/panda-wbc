export const getColors = (): string[] => [
	"#1a78d1", "#15c68b", "#7f4ddb", "#eb8321",
	"#eb219a", "#c33838", "#0f894b", "#5f7d24",
	"#ff4778", "#6f36ba", "#281b32"
];

// classic TETRIS blocks (inc. reversed)
export const classicBlocks = [
	// long pipe / bar
	[
		[1, 1, 1, 1]
	],
	// square
	[
		[1, 1],
		[1, 1],
	],
	// pyramid
	[
		[1, 1, 1],
		[0, 1, 0],
	],
	// pyramid (reversed)
	[
		[0, 1, 0],
		[1, 1, 1],
	],
	// L-block
	[
		[1, 1, 1],
		[1, 0, 0]
	],
	// L-block (reversed)
	[
		[1, 1, 1],
		[0, 0, 1]
	],
	// Z-block
	[
		[1, 1, 0],
		[0, 1, 1]
	],
	// Z-block (reversed)
	[
		[0, 1, 1],
		[1, 1, 0]
	],
];

// wild TETRIS blocks (inc. reversed)
export const wildBlocks = [
	// cross block
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	// short pipe
	[
		[1, 1]
	],
	// mid pipe
	[
		[1, 1, 1]
	],
	// bridge
	[
		[1, 1, 1],
		[1, 0, 1],
	],
	// bridge (reversed)
	[
		[1, 0, 1],
		[1, 1, 1],
	],
	// V - block
	[
		[1, 0],
		[1, 1],
	],
	// V - block (reversed)
	[
		[0, 1],
		[1, 1],
	],
	// large L - block
	[
		[1, 1, 1],
		[1, 0, 0],
		[1, 0, 0],
	],
	// large L - block (reversed)
	[
		[1, 1, 1],
		[0, 0, 1],
		[0, 0, 1],
	],
];

// extreme TETRIS blocks (inc. reversed)
export const extremeBlocks = [
	// dot
	[
		[1]
	],
	// stairs
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 1],
	],
	// stairs (reversed)
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 1],
	],
	// long T-block
	[
		[1, 0, 0],
		[1, 1, 1],
		[1, 0, 0],
	],
	// long T-block (reversed)
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 1],
	],
	// long L-block
	[
		[1, 1, 1, 1],
		[1, 0, 0, 0],
	],
	// long L-block (reversed)
	[
		[1, 1, 1, 1],
		[0, 0, 0, 1],
	],

	// big box
	[
		[1, 1, 1, 1],
		[1, 1, 1, 1],
		[1, 1, 1, 1],
		[1, 1, 1, 1],
	],
	
	// long pipe
	[
		[1, 1, 1, 1, 1],
	],
];