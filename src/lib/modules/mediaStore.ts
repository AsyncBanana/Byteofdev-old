import watchMedia from 'svelte-media';

const mediaqueries = {
	dark: '(prefers-color-scheme: dark)'
};

export default watchMedia(mediaqueries);
