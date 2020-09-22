<script>
    import { onMount } from 'svelte';
    import Loading from '../../components/Loading.svelte';

    export let id = '';
    $: isEditing = false;
    $: movie = {};
    $: console.log(movie)
    onMount(async () => {
        let res = await fetch(`http://localhost:1337/movies${id}`);
        movie = await res.json();
        if(movie.videos.length < 1) {
            movie.videos.push({})
        }
        if(movie.images.length < 1) {
            movie.images.push({})
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
<style>
    .img-wrapper, .img-wrapper img{
        width: 150px;
        height: 180px;
        border-radius: 10px;
    }
    .img-wrapper{
        background-color: gray;
    }
    .movie-wrapper{
        padding: 1%;
    }
    .movie {
        background-color: #fff;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        align-items: center;
        justify-content: center;
        padding-bottom: 10px;
    }
    .movie-info {
        display: flex;
        align-items: center;
        justify-content: space-around;
        min-width: 500px;
    }
    .movie-info .text-wrapper {
        width: calc(100% - 200px);
    }
    .editing-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 2%;
    }
    .editing-wrapper *{
        width: 90%;
        margin: 0 auto 5px auto;
        padding: 3px;
    }
    .editing-wrapper input, 
    .editing-wrapper textarea {
        border-radius: 5px;
        border: 1px solid black;
    }
    .editing-wrapper button {
        width: 200px;
    }
    .italic {
        font-style: italic;
    }
    iframe {
        width: 90%;
        height: 250px;
        max-width: 360px;
        margin: 10px auto;
    }
    button {
        width: 200px;
        padding: 3px;
        border-radius: 5px;
        border: 1px solid black;
    }
    @media (max-width: 525px) {
        .movie-info {
            display: flex;
            flex-direction: column;
            min-width: unset;
            padding: 2%;
        }
        .movie-info, .text-wrapper {
            width: 100%;
        }
    }
</style>

{#if !movie.id}
    <Loading />
{:else}
    <div class="movie-wrapper">
        <div class="movie">
            {#if isEditing}
                <div class="editing-wrapper">
                    <label for="thumbnail">Thumbnail url</label>
                    <input type="text"
                        bind:value={movie.images[0].thumbnail}
                    />
                    <label for="trailer">Trailer url</label>
                    <input type="text"
                        bind:value={movie.videos[0].url}
                    />
                    <label for="title">Title</label>
                    <input type="text" 
                        placeholder="Title"
                        bind:value={movie.title} 
                    />
                    <label for="release">Release Date</label>
                    <input type="date" 
                        placeholder="Release date"
                        bind:value={movie.release_date} 
                    />
                    <label for="tagline">Tagline</label>
                    <textarea type="text" 
                        placeholder="Tagline"
                        bind:value={movie.details[0].tagline} 
                        rows="2"
                    />
                    <label for="director">Director</label>
                    <input type="text" 
                        placeholder="Director"
                        bind:value={movie.details[0].director} 
                    />
                    <label for="cast">Cast</label>
                    <textarea type="text" 
                        placeholder="Cast"
                        bind:value={movie.details[0].cast} 
                        rows="5"
                    />
                    <label for="storyline">Storyline</label>
                    <textarea type="text" 
                        placeholder="Storyline"
                        bind:value={movie.details[0].storyline} 
                        rows="5"
                    />
                    <button on:click={update}>Update</button>
                </div>
            {:else}
                <div class="movie-info">                    
                    <div class="img-wrapper">
                        <img src={movie.images[0].thumbnail} alt="">
                    </div>
                    <div class="text-wrapper">
                        <h1 title={movie.title}>{movie.title}</h1>
                        <h4>({movie.release_date})</h4>
                        <p title={movie.details[0].director}>Director: {movie.details[0].director || "Unkown"}</p>
                        <p class="italic">{movie.details[0].tagline}</p>
                        <p>Cast: {movie.details[0].cast || "No information about cast"}</p>
                        <p class="italic">{movie.details[0].storyline}</p>
                    </div>
                </div>
                {#if movie.videos[0].url}
                    <iframe src={movie.videos[0].url} frameborder="0" title="trailer"></iframe>
                {/if}
            {/if}
            {#if !isEditing}
                <button on:click={edit}>Edit</button>
            {/if}
        </div>
    </div>
{/if}