<script lang="ts">
	import 'virtual:windi.css';
	import '$lib/stylesheets/theme.css';
	import mediaStore from '$lib/modules/mediaStore';
	import cookie from 'js-cookie';
	import { session, navigating } from '$app/stores';
	import nprogress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { onDestroy } from 'svelte';
	import { browser } from '$app/env';
	let theme = { value: null, override: false };
	const subscriptions = [
		session.subscribe((val) => {
			if (val.override) {
				theme = val.theme;

				cookie.set('theme', JSON.stringify(val.theme), { sameSite: 'strict' });
			}
		}),
		mediaStore.subscribe((val: Record<string, unknown>) => {
			if (!theme.override) {
				theme.value = val.dark ? 'dark' : 'light';
				theme = theme;
			}
		}),
		navigating.subscribe((value) => {
			if (value) {
				nprogress.start();
			} else {
				nprogress.done();
			}
		})
	];
	onDestroy(() => {
		subscriptions.forEach((val) => val());
	});
	if (browser) {
		console.log(document.querySelectorAll('.light'));
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Inter:wght@400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<div class={`shadow bg-base-200 drawer ${theme.value}`}>
	<input id="toggle" type="checkbox" class="drawer-toggle" />
	<div class="flex flex-col min-h-screen drawer-content" style="scroll-behavior: smooth;">
		<div class="rounded-box mx-auto bg-base-100 shadow-md mt-3 mb-6 top-0 z-30 navbar sm:w-3/4">
			<div class="flex-1 mx-2 px-2">
				<a class="flex flex-row font-extrabold text-xl align-middle" href="/"
					><img src="/favicon.svg" alt="Logo" class="h-8" /><span class="ml-2 hidden md:inline"
						>ByteofDev</span
					></a
				>
			</div>
			<button
				on:click={() => {
					session.update((value) => {
						console.log('toggle');
						value.theme.value = theme.value === 'light' ? 'dark' : 'light';
						value.theme.override = true;
						return value;
					});
				}}
				class="m-auto mr-4 p-3 btn btn-square align-bottom focus:outline-none"
				id="themeToggle"
				aria-label="Toggle theme"
				>{@html theme.value === 'dark'
					? `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg>`
					: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>`}</button
			>
			<div class="flex-none hidden lg:block">
				<ul class="menu horizontal">
					<li>
						<a href="/about">About</a>
					</li>
					<li>
						<a href="/tagged">Tags</a>
					</li>
				</ul>
			</div>
			<div class="flex-none lg:hidden">
				<label for="toggle" class="btn btn-square">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="h-6 stroke-current w-6 inline-block"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</label>
			</div>
		</div>
		<main>
			<slot />
		</main>
		<footer class="bg-neutral text-neutral-content p-10 footer">
			<div>
				<img src="/favicon.svg" alt="Logo" class="h-24" />
			</div>
			<div>
				<span class="footer-title">ByteofDev</span>
				<a class="link link-hover" href="/about">About</a>
				<a class="link link-hover" href="/tagged">Tags</a>
				<a
					class="link link-hover"
					href="https://github.com/AsyncBanana/Byteofdev"
					target="_blank"
					rel="noopener">GitHub</a
				>
			</div>
		</footer>
	</div>
	<div class="drawer-side">
		<label for="toggle" class="drawer-overlay" />
		<ul class="bg-base-100 p-4 w-80 overflow-y-auto menu">
			<li>
				<a href="/about">About</a>
			</li>
			<li>
				<a href="/tagged">Tags</a>
			</li>
		</ul>
	</div>
</div>

<style lang="postcss">
	a {
		@apply rounded-btn;
	}
	:is(h1, h2, h3, h4, h5, h6) {
		font-family: 'Inter', Verdana, Geneva, Tahoma, sans-serif;
	}
</style>
