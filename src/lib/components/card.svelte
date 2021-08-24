<script>
	export let item;
	import dayjs from 'dayjs';
	import calender from 'dayjs/plugin/calendar.js';
	dayjs.extend(calender);
</script>

<a class="rounded-md bg-base-100 p-4" href={`/posts/${item.slug}`}>
	<img src={item.content.image} alt="Article header" class="rounded-md" />
	<h1 class="font-bold text-xl">{item.content.title}</h1>
	<p>{item.content.intro}</p>
	<p>By {item.content.author.name}</p>
	<p>{dayjs(item.published_at).calendar()}</p>
</a>
