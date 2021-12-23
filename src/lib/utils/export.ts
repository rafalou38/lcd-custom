export function exportGridToArduino(name: string, grid: boolean[][]) {
	const transformedGrid = grid
		.map((row) => row.reduce((acc, cell) => acc + (cell ? '1' : '0'), '\tB'))
		.join(',\n');

	return `
byte ${name}[] = {
${transformedGrid}
};
`;
}
