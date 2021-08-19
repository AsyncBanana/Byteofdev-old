<script context="module">
	import storyblokClient from 'storyblok-js-client';
	import { STORYBLOK_KEY } from '$lib/modules/env';
	const storyblok = new storyblokClient({
		// @ts-ignore
		accessToken: import.meta.env.STORYBLOK_KEY
	});
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		const json = await (
			await fetch(`https://gapi.storyblok.com/v1/api`, {
				method: 'POST',
				body: JSON.stringify({
					query: `query {
                    PostItem(id: "posts/${page.params.slug}") {
                        content {
                            intro
                            title
                            long_text
                            author(resolve_relations: "author.group") {
                                name
                            }
                            image
                        }
                        published_at
                        first_published_at
												tag_list
                    }
                }`
				}),
				headers: {
					token: STORYBLOK_KEY,
					version: 'published'
				}
			})
		).json();
		json.data.PostItem.content.long_text = storyblok.richTextResolver.render(
			json.data.PostItem.content.long_text
		);
		return {
			props: {
				story: json.data.PostItem,
				slug: page.params.slug
			}
		};
	}
</script>

<script>
	import { onMount } from 'svelte';
	import prismJS from 'prismjs';
	import 'prismjs/plugins/toolbar/prism-toolbar.js';
	import '$lib/stylesheets/prismTheme.css';
	import '$lib/stylesheets/prismLanguageBar.css';
	import languageBar from '$lib/modules/prismLanguageBar';
	prismJS.manual = false;
	languageBar(prismJS);
	onMount(() => {
		prismJS.highlightAll();
	});
	export let story;
	export let slug;
</script>

<svelte:head>
	<title>{story.content.title} - SyntaxHighlight</title>
	<meta name="description" content={story.content.intro} />
	<meta name="canonical" content={`https://syntaxhighlight.dev/posts/${slug}`} />
	<meta property="og:title" content={`${story.content.title} - SyntaxHighlight`} />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={story.first_published_at} />
	<meta property="article:author" content={story.content.author.name} />
	<meta property="article:modified_time" content={story.published_at} />
	<meta property="og:site_name" value="SyntaxHighlight.dev" />
	{#if story.content.image}
		<meta property="og:image" content={story.content.image} />
	{/if}
</svelte:head>
<article class="m-auto w-3/4">
	{#if story.content.image}
		<img src={story.content.image} alt="Story heading" class="rounded m-auto max-w-full" />
	{/if}
	<div class="flex">
		{#each story.tag_list as tag}
			<a
				style="color: hsla(var(--p))"
				class="font-sans font-bold mr-3 text-lg uppercase hover:underline"
				href="/tagged/${tag}">{tag}</a
			>
		{/each}
	</div>
	<h1 class="font-bold text-shadow-md shadow-warm-gray-600 text-4xl md:text-6xl">
		{story.content.title}
	</h1>
	<h2 class="font-normal text-xl">&emsp;By {story.content.author.name}</h2>
	<br />
	<span class="m-auto">{@html story.content.long_text}</span>
</article>
<h2 class="font-bold text-center text-2xl">Share</h2>
<div class="flex m-auto w-1/4 justify-around">
	<a
		class="h-24 p-2 w-24 btn btn-ghost"
		href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
			`${story.content.title} - SyntaxHighlight`
		)}&url=${encodeURIComponent(`https://syntaxhighlight.dev/posts/${slug}`)}`}
		target="_blank"
		aria-label="Share to twitter"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231.104 231.104">
			<g>
				<path
					style="fill:#3FA9F5;"
					d="M4.453,173.33c9.763-1.192,19.663,0.092,29.426-1.512c4.904-0.779,9.396-2.429,13.842-4.171   c-11-7.058-20.901-15.125-30.113-24.796c-3.3-3.438-0.917-9.213,3.896-9.35c3.942,0.183,7.792-0.137,11.55-0.917   c-9.58-12.146-17.005-25.209-22.78-39.876c-1.558-3.942,3.025-7.929,6.738-6.738c2.154,0.871,4.354,1.467,6.6,1.925   c-6.829-16.409-8.25-32.955-4.446-51.106c0.871-4.171,6.371-5.179,9.167-2.429c21.909,21.541,49.593,31.9,79.202,36.85   c-2.613-20.259,11.78-41.801,30.663-48.86c15.676-5.821,36.714-1.833,47.256,11.367c7.059-4.446,16.821-5.913,24.659-7.288   c4.125-0.688,8.113,3.346,5.684,7.425c-2.842,4.767-5.546,9.854-8.525,14.713c6.05-1.788,12.284-2.888,18.517-3.667   c4.492-0.596,7.196,6.325,3.759,9.075c-7.288,5.821-14.53,12.467-22.276,17.784c-0.229,51.472-15.263,94.649-61.235,123.937   c-38.319,24.477-109.546,20.352-142.867-12.97H3.124c-1.467-0.367-2.246-1.467-2.521-2.658c-1.283-1.925-0.367-4.308,1.329-5.225   C2.574,174.063,3.399,173.467,4.453,173.33z"
				/>
			</g>
		</svg>
	</a>
	<a
		class="h-24 p-2 w-24 btn btn-ghost"
		href={`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(
			`${story.content.title} - SyntaxHighlight`
		)}&u=${encodeURIComponent(`https://syntaxhighlight.dev/posts/${slug}`)}`}
		target="_blank"
		aria-label="Share to facebook"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<path
				style="fill:#385C8E;"
				d="M134.941,272.691h56.123v231.051c0,4.562,3.696,8.258,8.258,8.258h95.159  c4.562,0,8.258-3.696,8.258-8.258V273.78h64.519c4.195,0,7.725-3.148,8.204-7.315l9.799-85.061c0.269-2.34-0.472-4.684-2.038-6.44  c-1.567-1.757-3.81-2.763-6.164-2.763h-74.316V118.88c0-16.073,8.654-24.224,25.726-24.224c2.433,0,48.59,0,48.59,0  c4.562,0,8.258-3.698,8.258-8.258V8.319c0-4.562-3.696-8.258-8.258-8.258h-66.965C309.622,0.038,308.573,0,307.027,0  c-11.619,0-52.006,2.281-83.909,31.63c-35.348,32.524-30.434,71.465-29.26,78.217v62.352h-58.918c-4.562,0-8.258,3.696-8.258,8.258  v83.975C126.683,268.993,130.379,272.691,134.941,272.691z"
			/>
		</svg>
	</a>
</div>

<!-- <h2 class="font-bold text-center text-3xl">Comment</h2>
<div class="m-auto w-3/4 form-control" id="comments">
	<label class="label" for="comment">
		<span class="label-text">Comment text</span>
	</label>
	<textarea
		class="h-24 textarea textarea-bordered"
		placeholder="Enter your comment here"
		name="comment"
	/>

</div>
TODO -->
<style lang="postcss">
	:global(article) {
		font-family: 'Quattrocento', system-ui, serif;
	}
	:global(article :is(h1, h2, h3, h4, h5, h6)) {
		font-family: 'Inter', Verdana, Geneva, Tahoma, sans-serif;
		@apply font-bold;
	}
	:global(article h1) {
		@apply text-4xl;
	}
	:global(article h2) {
		@apply text-3xl;
	}
	:global(article h3) {
		@apply text-2xl;
	}
	:global(article h4) {
		@apply text-xl;
	}
	:global(article h5) {
		@apply text-lg;
	}
	:global(article h6) {
		@apply text-base;
	}
	:global(article pre) {
		@apply rounded p-3;
	}
</style>
