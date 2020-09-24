<script>
    import { goto } from '@sveltech/routify'
    let movie = {
        images: [{}],
        videos: [{}],
        details: [{}]
    };
   
    async function save(){
        await fetch(`http://localhost:1337/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        }).then(response => response.text().then(text =>console.log(text)));        
        $goto('/');
    }
</script>

<div class="p-2">
    <div class="bg-white flex flex-col rounded items-center justify-center pb-2">
        <form on:submit|preventDefault={save} class="flex flex-col items-center w-full p-2">
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
            <button class="border-2 border-blue-400 bg-blue-400 w-24 text-white text-center rounded hover:bg-blue-500" type="submit">Save</button>
        </form>
    </div>
</div>