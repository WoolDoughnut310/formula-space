<script lang="ts">
	import { signOut } from 'firebase/auth';
	import { auth } from './firebase';
	import AuthButton from './AuthButton.svelte';
</script>

<AuthButton title="Sign out" on:click={() => signOut(auth)} />
