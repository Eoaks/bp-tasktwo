<script>
    $: movie = {
        images: [{}],
        videos: [{}],
        details: [{}]
    };
   
    async function save(){
        fetch(`http://localhost:1337/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        }).then(response => response.text().then(text =>console.log(text)));        
        isEditing = false;
    }
</script>
<style>
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
    button {
        width: 200px;
        padding: 3px;
        border-radius: 5px;
        border: 1px solid black;
    }
</style>

<div class="movie-wrapper">
    <div class="movie">
        
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
                <button on:click={save}>Save</button>
            </div>
    </div>
</div>