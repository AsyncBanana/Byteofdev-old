<script context="module">
    import storyblokClient from "storyblok-js-client"
    const storyblok = new storyblokClient({
        // @ts-ignore
        accessToken: import.meta.env.STORYBLOK_KEY
    })
    /**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
        const res = await storyblok.get(`/cdn/stories/posts/${page.params.slug}`)
        return {
            props: {
                story: res.data.story
            }
        }
    }
</script>
<script>
    export let story;
</script>
<h1>{story.name}</h1>