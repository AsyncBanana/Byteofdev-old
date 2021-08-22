<script context="module">
	export async function load({ page, fetch, session, context }) {
		const json = await (
			await fetch(`https://gapi.storyblok.com/v1/api`, {
				method: 'POST',
				body: JSON.stringify({
					query: `query {
                    PostItems(per_page: 5) {
                     items {
                        content {
                            intro
                            title
                            image
                            author(resolve_relations: "author.group") {
                                name
                            }
                        }
                        slug
                        published_at
                      }
                    }
                }`
				}),
				headers: {
					token: import.meta.env.VITE_STORYBLOK_KEY,
					version: 'published'
				}
			})
		).json();
		return {
			props: {
				data: json.data
			}
		};
	}
</script>

<script>
	import StoryCard from '$lib/components/card.svelte';
	export let data;
</script>

<svelte:head>
	<title>ByteofDev - bite sizes articles for developers</title>
	<meta name="description" content="ByteofDev - bite sizes articles for developers" />
	<meta name="canonical" content={`https://byteofdev.com`} />
	<meta property="og:title" content="ByteofDev - bite sized articles for developers" />
	<meta property="og:type" content="website" />
	<meta name="og:url" content="https://byteofdev.com/" />
	<meta property="og:site_name" value="byteofdev.com" />
	<meta property="og:image" content="/ByteofDevFrame.png" />
</svelte:head>
<h1 class="font-bold font-sans text-center text-4xl">ByteofDev</h1>
<h2 class="text-center italic ">Bite sizes articles for developers</h2>
<div class="m-auto grid w-3/4 gap-5 md:grid-cols-2 lg:grid-cols-3">
	{#each data.PostItems.items as item}
		<StoryCard {item} />
	{/each}
</div>
