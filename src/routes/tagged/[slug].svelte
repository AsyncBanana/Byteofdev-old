<script context="module">
	export async function load({ page, fetch, session, context }) {
		const json = await (
			await fetch(`https://gapi.storyblok.com/v1/api`, {
				method: 'POST',
				body: JSON.stringify({
					query: `query {
                    PostItems(per_page: 10, with_tag: "${page.params.slug}") {
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
				data: json.data,
				tag: page.params.slug
			}
		};
	}
</script>

<script>
	import StoryCard from '$lib/components/card.svelte';
	export let data;
	export let tag;
</script>

<h1 class="font-sans font-bold text-center text-4xl md:text-6xl">Tag: {tag}</h1>
<div class="m-auto grid w-3/4 gap-5 md:grid-cols-3 lg:grid-cols-4">
	{#each data.PostItems.items as item}
		<StoryCard {item} />
	{/each}
</div>
