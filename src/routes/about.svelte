<script>
	import EmailPrompt from '$lib/components/emailPrompt.svelte';
</script>

<svelte:head>
	<title>About ByteofDev</title>
	<meta name="canonical" content="https://byteofdev.com/about" />
	<meta name="title" content="About ByteofDev" />
	<meta name="description" content="About ByteofDev and its origins, its tech stack, and credits" />
	<meta name="og:title" content="About Byteofdev" />
	<meta name="og:image" content="https://byteofdev.com/ByteofDevFrame.png" />
	<meta name="og:type" content="website" />
	<meta name="og:url" content="https://byteofdev.com/about" />
	<meta property="og:site_name" value="ByteofDev" />
	<meta property="twitter:card" content="summary_large_image" />
</svelte:head>
<div class="m-auto w-3/5">
	<h1 class="font-bold text-center mb-6 text-5xl">About</h1>
	<h2>Blog origins</h2>
	<p>
		I (AsyncBanana) created this blog for sharing my articles about web development and other forms
		of programming. It has started recently, and so it is still in heavy development.
	</p>
	<h2>Tech stack</h2>
	<p>This blog uses these tools:</p>
	<ul class="list-disc ml-6">
		<li>Hosting: Cloudflare Workers</li>
		<li>Frontend UI Framework: Svelte</li>
		<li>Backend SSR & Endpoints: SvelteKit</li>
		<li>CSS Framework: WindiCSS (inspired by TailwindCSS)</li>
		<li>CSS Components: DaisyUI</li>
		<li>Headless CMS: Storyblok</li>
		<li>Mailing list management: Sendgrid</li>
	</ul>
	<h2>Credits</h2>
	<p>
		Medium and CSS-Tricks have inspired many design elements for this blog. Additionally, WindiCSS,
		DaisyUI, and SvelteKit have been very helpful tools. Some of the icons are from FontAwesome
	</p>
	<br />
	<EmailPrompt />
</div>

<style lang="postcss">
	h2 {
		@apply text-4xl p-1 border-b-gray-400 border-b-2 border-opacity-25 mb-2 font-bold;
	}
</style>
