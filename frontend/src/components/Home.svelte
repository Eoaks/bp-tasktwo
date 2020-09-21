<script>
	export let test = "";
</script>

<style type="postcss">
	.home-wrap {
		@apply flex flex-wrap justify-center items-center text-blue-600 font-black my-16 mx-12;
		font-size: 6rem;
	}
</style>

<div class="home-wrap">{test}</div>
