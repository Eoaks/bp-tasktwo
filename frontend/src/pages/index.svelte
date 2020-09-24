<script>
	import { onMount } from 'svelte';
	import { url } from '@sveltech/routify'
	import Card from '../components/Card.svelte';
	import Loading from '../components/Loading.svelte';
	let movies = {
		results: []
	}
	onMount(async () => {
		let res = await fetch('http://localhost:1337/movies');
		movies = await res.json();
	});
</script>

<style>
	:global(body) {
		background-color: #e6e6e6;
        font-family: Roboto, arial, sans-serif;
	}
</style>

<div class="w-11/12 flex flex-col mx-auto">
	<a 	class="ml-1 mt-3 border-2 border-blue-400 bg-blue-400 w-24 text-white text-center rounded hover:bg-blue-500"
		href={$url('/new')}>Add movie</a>
	{#each movies.results as movie}
		<Card data={movie} link={$url(`movie/${movie.id}`)}/>
	{:else}
		<Loading />
	{/each}
</div>
