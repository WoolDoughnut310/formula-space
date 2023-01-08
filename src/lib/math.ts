import type { AssignmentNode, MathNode, SymbolNode } from 'mathjs';

const CONSTANTS = [
	'e',
	'E',
	'pi',
	'PI',
	'i',
	'Infinity',
	'LN2',
	'LN10',
	'LOG2E',
	'LOG10E',
	'NaN',
	'phi',
	'SQRT1_2',
	'SQRT2',
	'tau'
];

const EXCLUDED_SYMBOL_PARENTS = ['AssignmentNode', 'FunctionNode'];

export function parseNodes(node: MathNode) {
	const symbols: string[] = [];
	const assignments: string[] = [];

	node.traverse((node, _path, parent) => {
		if (node.type === 'SymbolNode' && !EXCLUDED_SYMBOL_PARENTS.includes(parent.type)) {
			// If a symbol isn't part of the assignment
			// and isn't a function (e.g. sqrt, sin, tan)
			const name = (node as SymbolNode).name;
			if (!CONSTANTS.includes(name)) {
				// Don't allow constants to be changed
				symbols.push(name);
			}
		} else if (node.type === 'AssignmentNode') {
			assignments.push(((node as AssignmentNode).object as SymbolNode).name);
		}
	});

	return { symbols, assignments };
}
