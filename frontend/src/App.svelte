<script>
	import { Router } from "@sveltech/routify";
	import { routes } from "@sveltech/routify/tmp/routes";
	import Tailwindcss from "./Tailwindcss.svelte";

	// if ("serviceWorker" in navigator) {
	// 	navigator.serviceWorker.register("/service-worker.js");
	// }
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
	<title>BlankPage - task 2</title>
</svelte:head>
<Tailwindcss />
<Router {routes} />
