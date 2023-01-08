<script lang="ts">
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import IoLogoGoogle from 'svelte-icons/io/IoLogoGoogle.svelte';
	import AuthButton from './AuthButton.svelte';
	import { auth } from './firebase';

	const provider = new GoogleAuthProvider();
</script>

<AuthButton title="Sign in" on:click={() => signInWithPopup(auth, provider)}>
	<IoLogoGoogle slot="icon" />
</AuthButton>
