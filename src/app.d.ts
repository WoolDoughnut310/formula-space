// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

declare namespace svelte.JSX {
	interface HTMLProps<T> {
		onoutclick?: (e: CustomEvent<{ target: HTMLElement }>) => void;
	}
}
