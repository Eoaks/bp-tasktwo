<script>
    export let data = {};
    export let link = '/';
    if(data.images.length < 1) {
        data.images.push({})
    }
</script>

<div class="w-full p-1">
    <a href={link} class="border border-gray-500 flex rounded bg-white hover:border-gray-700">
        <div class="bg-gray-500 rounded w-40 h-56 mr-1">
            <img class="bg-gray-500 rounded w-40 h-56" src={data.images[0].thumbnail} alt="">
        </div>
        <span class="w-10/12 p-1">
            <h1 class="my-2 text-lg font-bold" title={data.title}>{data.title}</h1>
            <h4 class="my-2 font-bold" >({data.release_date || "No release date"})</h4>
            <p class="my-2" title={data.details[0].director}>Director: {data.details[0].director || 'No details'}</p>
        </span>
    </a>
</div>