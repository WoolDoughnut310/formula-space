<script lang="ts">
	import '../app.css';
	import { firestore, auth } from '$lib/firebase';
	import { FirebaseApp } from 'sveltefire';
	import User from 'sveltefire/User.svelte';
	import GoogleLoginButton from '$lib/GoogleLoginButton.svelte';
	import LogoutButton from '$lib/LogoutButton.svelte';
</script>

<FirebaseApp {auth} {firestore}>
	<header class="flex flex-row items-center p-3 border-b-2  border-b-gray-300 shadow">
		<h1 class="text-3xl font-bold mr-auto"><a href="/">Formula Space</a></h1>
		<User let:user>
			<div class="flex items-center space-x-2">
				<LogoutButton />
				<div class="flex items-center space-x-3 px-4 py-1 bg-gray-300 rounded-2xl">
					<img alt="Profile" src={user.photoURL} referrerpolicy="no-referrer" class="w-8 h-8" />
					<span class="font-semibold">{user.displayName}</span>
				</div>
			</div>
			<GoogleLoginButton slot="signedOut" />
		</User>
	</header>
	<main>
		<slot />
	</main>
</FirebaseApp>
