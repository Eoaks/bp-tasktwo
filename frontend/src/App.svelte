<script>
	import Tailwindcss from "./Tailwindcss.svelte";
	import Home from "./components/Home.svelte";

	// if ("serviceWorker" in navigator) {
	// 	navigator.serviceWorker.register("/service-worker.js");
	// }
</script>

<svelte:head>
	<title>BlankPage - task 2</title>
</svelte:head>
<Tailwindcss />

<Home test="Hello World!" />
