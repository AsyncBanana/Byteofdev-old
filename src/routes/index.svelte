<script context="module">
    console.log(import.meta.env.VITE_STORYBLOK_KEY)
    export async function load({ page, fetch, session, context }){
        const json = await (await fetch(`https://gapi.storyblok.com/v1/api`,{
            method: 'POST',
            body: JSON.stringify({
                query: `query {
                    PostItems(per_page: 5) {
                     items {
                        content {
                            intro
                            title
                        }
                      }
                    }
                }`,
            }),
            headers: {
                token: import.meta.env.VITE_STORYBLOK_KEY,
                version: 'published'
            }
        })).json()
        return {props: {
            data: json.data
        }}
    }
</script>
<script>
    export let data
</script>
<div>
    {#each data.PostItems.items as item}
        <h1>{item.content.title}</h1>
    {/each}
</div>
