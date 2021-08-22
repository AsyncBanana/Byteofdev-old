<script context="module">
	export function load({ error, status }) {
		console.log(error);
		console.log(status);
		return {
			props: {
				error: `${status}`
			}
		};
	}
</script>

<script>
	export let error;
</script>

<div class="min-h-screen bg-base-200 hero">
	<div class="text-center hero-content">
		<div class="max-w-md">
			<h1 class="font-bold mb-5 text-5xl">
				{error}
			</h1>
			<p class="text-xl mb-6">
				{error === '404' ? 'Looks like you got lost :(' : 'Woops, something went wrong'}
			</p>
			<a class="btn btn-primary" href="/">Return home</a>
		</div>
	</div>
</div>
