export interface Formula {
	// To check if the current user owns the formula,
	// so they can edit it if needed
	userId: string;
	title: string;
	// Displays the name of the formula creator
	author: string;
	formula: string;
	variables: { [key: string]: { label: string; base: number } };
}
