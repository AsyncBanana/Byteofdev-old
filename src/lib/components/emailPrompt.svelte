<script>
	export let primary = true;
</script>

<div
	class={`${
		primary ? 'text-white bg-primary' : 'bg-base-200'
	} rounded-md p-4 shadow-xl shadow-purple-500`}
>
	<h2 class="font-bold text-xl">Sign up for updates</h2>
	<form method="POST" action="/api/addcontact" class="form-control">
		<label for="email">Enter email here</label>
		<input type="input" class="shadow input" name="email" />
		<input type="submit" class="mt-4 w-min btn btn-md" />
	</form>
</div>
