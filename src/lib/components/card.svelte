<script>
	export let item;
	import dayjs from 'dayjs';
	import calender from 'dayjs/plugin/calendar.js';
	dayjs.extend(calender);
</script>

<a class="rounded-md bg-base-100 p-4" href={`/posts/${item.slug}`}>
	<img src={item.content.image} alt="Article header" />
	<h1 class="font-bold text-xl">{item.content.title}</h1>
	<h3>{item.content.intro}</h3>
	<h4>By {item.content.author.name}</h4>
	<h4>{dayjs(item.published_at).calendar()}</h4>
</a>
