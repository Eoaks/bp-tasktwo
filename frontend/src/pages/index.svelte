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
	.list-wrapper {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		width: 90%;
		min-width: 280px;
	}
</style>

<div class="list-wrapper">
	<a href={$url('/new')}>Add movie</a>
	{#each movies.results as movie}
		<Card data={movie} link={$url(`movie/${movie.id}`)}/>
	{:else}
		<Loading />
	{/each}
</div>
