<script context="module">
	import storyblokClient from 'storyblok-js-client';
	import { STORYBLOK_KEY } from '$lib/modules/env';
	const storyblok = new storyblokClient({
		// @ts-ignore
		accessToken: STORYBLOK_KEY
	});
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
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
	import 'balloon-css/balloon.css';
	import '$lib/stylesheets/prismLanguageBar.css';
	import Icon from 'svelte-fa';
	import {
		faTwitterSquare,
		faFacebookSquare,
		faLinkedin
	} from '@fortawesome/free-brands-svg-icons';
	import { faLink } from '@fortawesome/free-solid-svg-icons';
	import EmailPrompt from '$lib/components/emailPrompt.svelte';
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
	<title>{story.content.title} - byteofdev</title>
	<meta name="description" content={story.content.intro} />
	<meta name="canonical" content={`https://byteofdev.com/posts/${slug}`} />
	<meta property="og:title" content={story.content.title} />
	<meta property="og:type" content="article" />
	<meta name="og:url" content={`https://byteofdev.com/posts/${slug}`} />
	<meta property="article:published_time" content={story.first_published_at} />
	<meta property="article:author" content={story.content.author.name} />
	<meta property="article:modified_time" content={story.published_at} />
	<meta property="og:site_name" value="ByteofDev" />
	{#if story.content.image}
		<meta property="og:image" content={story.content.image} />
		<meta property="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>
<div class="mt-1/2 max-w-1/5 p-6 top-1/3 sticky float-left hidden lg:block">
	<h2 class="font-bold border-b-gray-400  border-b-2 border-opacity-25 text-lg mb-2">
		{story.content.title}
	</h2>
	<div class="grid grid-cols-4">
		<a
			class="btn-ghost btn btn-square hover:bg-base-content hover:bg-opacity-20 hover:border-opacity-0"
			href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
				story.content.title
			)}&url=${encodeURIComponent(`https://byteofdev.com/posts/${slug}`)}`}
			target="_blank"
			aria-label="Share to Twitter"
			rel="noopener"
			data-balloon-pos="down"><Icon icon={faTwitterSquare} size="2x" /></a
		>
		<a
			class="btn-ghost btn btn-square hover:bg-base-content hover:bg-opacity-20 hover:border-opacity-0"
			href={`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(
				story.content.title
			)}&u=${encodeURIComponent(`https://byteofdev.com/posts/${slug}`)}`}
			target="_blank"
			rel="noopener"
			aria-label="Share to Facebook"
			data-balloon-pos="down"><Icon icon={faFacebookSquare} size="2x" /></a
		>
		<a
			class="btn-ghost btn btn-square hover:bg-base-content hover:bg-opacity-20 hover:border-opacity-0"
			href={`https://www.linkedin.com/sharing/share-offsite?url=${encodeURIComponent(
				`https://byteofdev.com/posts/${slug}`
			)}`}
			target="_blank"
			rel="noopener"
			aria-label="Share to LinkedIn"
			data-balloon-pos="down"><Icon icon={faLinkedin} size="2x" /></a
		>
		<button
			class="btn-ghost btn btn-square hover:bg-base-content hover:bg-opacity-20 hover:border-opacity-0"
			aria-label="Copy Link"
			data-balloon-pos="down"
			><Icon
				icon={faLink}
				size="2x"
				on:click={() => {
					navigator.clipboard.writeText(`https://byteofdev.com/posts/${slug}`);
				}}
			/></button
		>
	</div>
	<EmailPrompt primary={false} />
</div>
<article class="m-auto p-4 lg:w-3/5">
	{#if story.content.image}
		<img
			src={story.content.image}
			alt="Story heading"
			class="rounded m-auto max-w-full max-h-70vh"
		/>
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

	<span class="m-auto leading-relaxed">{@html story.content.long_text}</span>
</article>
<h2 class="font-bold text-center text-2xl">Share</h2>
<div class="flex m-auto w-1/4 justify-around" />

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
<div class="m-auto mb-6 w-3/4 md:w-1/2">
	<EmailPrompt />
</div>

<style lang="postcss">
	:global(article) {
		font-family: 'Quattrocento', system-ui, serif;
	}
	:global(article :is(h1, h2, h3, h4, h5, h6)) {
		font-family: 'Inter', Verdana, Geneva, Tahoma, sans-serif;
		@apply font-bold;
	}
	:global(article a) {
		@apply underline-blue-500 underline;
	}
	:global(article a:visited) {
		@apply underline-purple-600;
	}
	:global(article h1) {
		@apply text-4xl p-1 border-b-gray-400 border-b-2 border-opacity-25 mb-2;
	}
	:global(article h2) {
		@apply text-2xl;
	}
	:global(article h3) {
		@apply text-1xl;
	}
	:global(article h4) {
		@apply text-lg;
	}
	:global(article h5) {
		@apply text-base;
	}
	:global(article h6) {
		@apply text-sm;
	}
	:global(article pre) {
		@apply rounded p-3;
	}
</style>
