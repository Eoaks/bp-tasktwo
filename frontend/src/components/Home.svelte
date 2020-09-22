<script>
	import { onMount } from 'svelte';
	let movies = {
		results: []
	}
	onMount(async () => {
		console.log('asd');
		let res = await fetch('http://localhost:1337/movies');
		movies = await res.json();
	});
	function test() {
		console.log(movies)
	}
</script>

<style type="postcss">
</style>

<div class="home-wrap" on:click={test}>
	{#each movies.results as movie}
		<h1>
			{movie.title}	
		</h1>
	{:else}
		<p>loading...</p>
	{/each}
</div>
