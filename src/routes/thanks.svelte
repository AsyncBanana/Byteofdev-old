<script context="module">
	export function load({ page }) {
		return {
			props: {
				returnTo: page.query.get('returnTo')
			}
		};
	}
</script>

<script>
	export let returnTo;
</script>

<div class="min-h-screen bg-base-200 hero">
	<div class="text-center hero-content">
		<div class="max-w-md">
			<h1 class="font-bold mb-5 text-5xl">Thanks for subscribing!</h1>
			<p class="text-xl mb-6">It really helps us out!</p>
			<a class="btn btn-primary" href={returnTo}>Return to previous page</a>
			<a class="btn btn-outline" href="/">Return home</a>
		</div>
	</div>
</div>
