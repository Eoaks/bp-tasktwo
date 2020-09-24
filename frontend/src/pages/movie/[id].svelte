<script>
    import { onMount } from 'svelte';
    import Loading from '../../components/Loading.svelte';

    export let id = '';
    let isEditing = false;
    let movie = {};
    onMount(async () => {
        let res = await fetch(`http://localhost:1337/movies${id}`);
        movie = await res.json();
        if(movie.videos.length < 1) {
            movie.videos.push({})
        }
        if(movie.images.length < 1) {
            movie.images.push({})
        }
        //fix for youtube urls in order to embed the videos
        if(movie.videos[0] && movie.videos[0].url.includes('youtu.be/')) {
            movie.videos[0].url = movie.videos[0].url.replace('youtu.be/', 'youtube.com/embed/')
        }
    });
    function edit(){
        isEditing = true;
    }
    async function update(){
        fetch(`http://localhost:1337/movies${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        }).then(response => response.text().then(text =>console.log(text)));        
        isEditing = false;
    }
</script>

{#if !movie.id}
    <Loading />
{:else}
    <div class="p-2">
        <div class="bg-white flex flex-col rounded items-center justify-center pb-2">
            {#if isEditing}
                <form on:submit|preventDefault={update} class="flex flex-col items-center w-full p-2">
                    <label class="w-11/12 mx-auto mb-1 p1" for="thumbnail">Thumbnail url</label>
                    <input class="w-11/12 mx-auto mb-1 p1 rounded border border-black p-1" type="text"
                        id="thumbnail"
                        bind:value={movie.images[0].thumbnail}
                    />
                    <label class="w-11/12 mx-auto mb-1 p1" for="trailer">Trailer url</label>
                    <input class="w-11/12 mx-auto mb-1 p1 rounded border border-black p-1" type="text"
                        id="trailer"
                        bind:value={movie.videos[0].url}
                    />
                    <label class="w-11/12 mx-auto mb-1 p1" for="title">Title</label>
                    <input class="w-11/12 mx-auto mb-1 p1 rounded border border-black p-1" type="text" 
                        id="title"
                        placeholder="Title"
                        bind:value={movie.title}
                        required 
                    />
                    <label class="w-11/12 mx-auto mb-1 p1" for="release">Release Date</label>
                    <input class="w-11/12 mx-auto mb-1 p1 rounded border border-black p-1" type="date" 
                        id="release"
                        placeholder="Release date"
                        bind:value={movie.release_date} 
                    />
                    <label class="w-11/12 mx-auto mb-1 p1" for="tagline">Tagline</label>
                    <textarea class="w-11/12 mx-auto mb-1 p1 rounded border border-black p-1" type="text" 
                        id="tagline"
                        placeholder="Tagline"
                        bind:value={movie.details[0].tagline} 
                        rows="2"
                    />
                    <label class="w-11/12 mx-auto mb-1 p1" for="director">Director</label>
                    <input class="w-11/12 mx-auto mb-1 p1 rounded border border-black p-1" type="text" 
                        id="director"
                        placeholder="Director"
                        bind:value={movie.details[0].director} 
                    />
                    <label class="w-11/12 mx-auto mb-1 p1" for="cast">Cast</label>
                    <textarea class="w-11/12 mx-auto mb-1 p1 rounded border border-black p-1" type="text" 
                        id="cast"
                        placeholder="Cast"
                        bind:value={movie.details[0].cast} 
                        rows="5"
                    />
                    <label class="w-11/12 mx-auto mb-1 p1" for="storyline">Storyline</label>
                    <textarea class="w-11/12 mx-auto mb-1 p1 rounded border border-black p-1" type="text" 
                        id="storyline"
                        placeholder="Storyline"
                        bind:value={movie.details[0].storyline} 
                        rows="5"
                    />
                    <button class="border-2 border-blue-400 bg-blue-400 w-24 text-white text-center rounded hover:bg-blue-500">Update</button>
                </form>
            {:else}
                <div class="flex flex-col w-full sm:items-center justify-around sm:flex-row p-2">                    
                    <div class="bg-gray-500 rounded w-40 h-56 mr-1">
                        <img class="bg-gray-500 rounded w-40 h-56" src={movie.images[0].thumbnail} alt="">
                    </div>
                    <div class="w-full sm:w-8/12">
                        <h1 title={movie.title}>{movie.title}</h1>
                        <h4>({movie.release_date || "No release date"})</h4>
                        <p title={movie.details[0].director}>Director: {movie.details[0].director || "No details"}</p>
                        <p class="italic">{movie.details[0].tagline || ' '}</p>
                        <p>Cast: {movie.details[0].cast || "No details"}</p>
                        <p class="italic">{movie.details[0].storyline || ' '}</p>
                    </div>
                </div>
                {#if movie.videos[0].url}
                    <div class="w-11/12 pb-64 mx-auto my-5 relative">
                        <iframe class="w-full h-full absolute" src={movie.videos[0].url} frameborder="0" title="trailer" allowfullscreen></iframe>
                    </div>
                {/if}
            {/if}
            {#if !isEditing}
                <button class="border-2 border-blue-400 bg-blue-400 w-24 text-white text-center rounded hover:bg-blue-500" on:click={edit}>Edit</button>
            {/if}
        </div>
    </div>
{/if}