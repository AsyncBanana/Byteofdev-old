<script context="module">
	export async function load({ page, fetch, session, context }) {
		const json = await (
			await fetch(
				`https://api.storyblok.com/v1/cdn/tags/?token=${
					import.meta.env.VITE_STORYBLOK_KEY
				}&version=published`
			)
		).json();
		return {
			props: {
				tags: json.tags
			}
		};
	}
</script>

<script>
	export let tags;
</script>

<svelte:head>
	<title>Tag list - Byteofdev</title>
</svelte:head>

<h1 class="font-bold font-sans text-center text-2xl">List of tags</h1>
<div class="flex m-auto w-3/5 justify-center">
	{#each tags as tag}
		<a
			style="color: hsla(var(--p))"
			class="font-sans font-bold mr-3 text-lg uppercase hover:underline"
			href="/tagged/{tag.name}">{tag.name}({tag.taggings_count})</a
		>
	{/each}
</div>
