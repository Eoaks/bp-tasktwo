<script>
    export let data = {};
    export let link = '/';
    if(data.images.length < 1) {
        data.images.push({})
    }
</script>
<style>
    .movie-card-wrapper {
        width: 100%;
        min-width: 280px;
        padding: 5px;
    }
    .movie-card {
        border: 1px solid #eee;
        display: flex;
        overflow: hidden;
        line-height: 1;
        cursor: pointer;
        background-color: #fff;
        border-radius: 10px;
    }
    .movie-card img,
    .img-wrapper {
        border-radius: 10px;
        width: 120px;
        height: 150px;
        margin-right: 10px;
        background-color: gray;
    }
    .movie-card h1 {
        font-size: 1.2em;
    }
    .movie-card span {
        padding: 5px;
        width: 100%;
    }
    .movie-card span * {
        margin: 5px 0;
    }
</style>
<div class="movie-card-wrapper">
    <a href={link} class="movie-card">
        <div class="img-wrapper">
            <img src={data.images[0].thumbnail} alt="">
        </div>
        <span>
            <h1 title={data.title}>{data.title}</h1>
            <h4>({data.release_date})</h4>
            <p title={data.details[0].director}>Director: {data.details[0].director}</p>
        </span>
    </a>
</div>