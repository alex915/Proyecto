let clientid = '0e318dc65ccf46169596f35901074ca8';
let secret = '81a7a8dcd6c849d0bc4baddbb188c600';
let token, token_type;
let code = `${token_type} ${token}`;

function getToken() {
    let url = 'https://accounts.spotify.com/api/token';
    let encoded = btoa(`${clientid}:${secret}`);
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${encoded}`
        },
        data: data,
        url,
    };

    axios(options).then(x => {
        token = x.data.access_token;
        token_type = x.data.token_type;

    });

};

async function searchResult(search) {
    let code = `${token_type} ${token}`;
    let url = `https://api.spotify.com/v1/search?q=${search}&type=album,artist,track`;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': code
        },
        url,
    };

    const dataPromise = await axios(options);
    return dataPromise.data;

}

async function getPlaylists() {
    let url = `https://api.spotify.com/v1/browse/featured-playlists`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': code
        },
        url,
    };
    const dataPromise = await axios(options);

    return dataPromise.data;
}

async function getPlaylist(playlist_id) {
    let url = `https://api.spotify.com/v1/playlists/${playlist_id}`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': code
        },
        url,
    };
    const dataPromise = await axios(options);

    return dataPromise.data;
}

async function getArtist(id) {
    let url = `https://api.spotify.com/v1/artists/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': code
        },
        url,
    };
    const dataPromise = await axios(options);

    return dataPromise.data;
}

async function getArtistAlbums(id) {
    let url = `	https://api.spotify.com/v1/artists/${id}/albums`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': code
        },
        url,
    };
    const dataPromise = await axios(options);

    return dataPromise.data;
}

async function getAlbum(id) {
    let code = `${token_type} ${token}`;
    let url = `	https://api.spotify.com/v1/albums/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': code
        },
        url,
    };
    const dataPromise = await axios(options);

    return dataPromise.data;
}

async function getAlbumTracks(id) {
    let code = `${token_type} ${token}`;
    let url = `	https://api.spotify.com/v1/albums/${id}/tracks`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': code
        },
        url,
    };
    const dataPromise = await axios(options);

    return dataPromise.data;
}

async function getTrack(id) {
    let code = `${token_type} ${token}`;
    let url = `	https://api.spotify.com/v1/tracks/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': code
        },
        url,
    };
    const dataPromise = await axios(options);

    return dataPromise.data;
}

async function getCategories() {

    let code = `${token_type} ${token}`;
    let url = `https://api.spotify.com/v1/browse/categories?country=ES&limit=50`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': code
        },
        url,
    };
    const dataPromise = await axios(options);

    return dataPromise.data;
}

async function getNewReleases() {
    let code = `${token_type} ${token}`;
    let url = `https://api.spotify.com/v1/browse/new-releases?country=es&limit=50`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': code
        },
        url,
    };
    const dataPromise = await axios(options);
    return dataPromise.data;
}

async function getCategoriesPlaylist(category_id) {
    let code = `${token_type} ${token}`;
    let url = `	https://api.spotify.com/v1/browse/categories/${category_id}/playlists?country=ES&limit=50`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': code
        },
        url,
    };
    const dataPromise = await axios(options);

    return dataPromise.data;
}
async function getPlaylistTrack(playlist_id) {
    let code = `${token_type} ${token}`;
    let url = `	https://api.spotify.com/v1/playlists/${playlist_id}/tracks?limit=100`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': code
        },
        url,
    };
    const dataPromise = await axios(options);

    return dataPromise.data;
}




function paintCategories(data) {
    const main = document.querySelector('.main');
    main.innerHTML = '';

    let div = document.createElement('DIV');
    div.setAttribute('class', 'tiles');
    for (let index = 0; index < data.length; index++) {
        let divImg = document.createElement('DIV');
        let img = document.createElement('IMG');
        let span = document.createElement('SPAN');
        img.setAttribute('src', data[index].icons[0].url);
        img.addEventListener('click', () => {
            showCategory(data[index].id);
        });
        span.addEventListener('click', () => {
            showCategory(data[index].id);
        });
        span.innerText = data[index].name;
        divImg.appendChild(img);
        divImg.appendChild(span);
        div.appendChild(divImg);

    }
    main.appendChild(div);
}


function getDataCategories() {
    getCategories().then(data => {
            paintCategories(data.categories.items)
        }

    )
}

function paintPlaylists(data) {
    const main = document.querySelector('.main');
    main.innerHTML = '';
    let div = document.createElement('DIV');
    div.setAttribute('class', 'tiles');
    for (let index = 0; index < data.length; index++) {
        let divImg = document.createElement('DIV');
        let img = document.createElement('IMG');
        let span = document.createElement('DIV');
        //let span1 = document.createElement('DIV');

        img.setAttribute('src', data[index].images[0].url);
        divImg.addEventListener('click', () => {
            showTracks(data[index].id);
        });

        span.innerText = data[index].name;
        //span1.innerText = data[index].artists.map(x=>x.name).join(', ');
        divImg.appendChild(img);
        divImg.appendChild(span);
        //divImg.appendChild(span1);
        div.appendChild(divImg);

    }
    main.appendChild(div);
}

function paintAlbums(data) {
    const main = document.querySelector('.main');
    main.innerHTML = '';
    let div = document.createElement('DIV');
    div.setAttribute('class', 'tiles');
    for (let index = 0; index < data.length; index++) {
        let divImg = document.createElement('DIV');
        let img = document.createElement('IMG');
        let span = document.createElement('DIV');
        let span1 = document.createElement('DIV');

        img.setAttribute('src', data[index].images[0].url);
        divImg.addEventListener('click', () => {
            showAlbumTracks(data[index].id);
        });

        span.innerText = data[index].name;
        span1.innerText = data[index].artists.map(x => x.name).join(', ');
        divImg.appendChild(img);
        divImg.appendChild(span);
        divImg.appendChild(span1);
        div.appendChild(divImg);

    }
    main.appendChild(div);
}

function showCategory(category_id) {
    getCategoriesPlaylist(category_id).then(data => {

        paintPlaylists(data.playlists.items);

    });

}


function paintTracks(data) {
    const main = document.querySelector('.main');
    main.innerHTML = '';

    let div = document.createElement('DIV');
    div.setAttribute('class', 'list');
    for (let index = 0; index < data.length; index++) {
        let divTrack = document.createElement('DIV');
        let img = document.createElement('IMG');
        let title = document.createElement('DIV');
        let artist = document.createElement('DIV');
        let album = document.createElement('DIV');
        let duration = document.createElement('DIV');
        img.setAttribute('src', data[index].track.album.images[0].url);
        divTrack.addEventListener('click', () => {
            listenSong(data[index].track.id);
        });
        title.innerText = data[index].track.name;
        album.innerText = data[index].track.album.name;
        artist.innerText = data[index].track.artists.map(x => x.name).join(", ");
        duration.innerText = data[index].track.duration_ms;
        album.setAttribute('class', 'mobile-hidden');
        divTrack.setAttribute('class', 'list__item');
        duration.setAttribute('class', 'mobile-hidden');
        divTrack.appendChild(img);
        divTrack.appendChild(title);
        divTrack.appendChild(artist);
        divTrack.appendChild(album);
        divTrack.appendChild(duration);
        div.appendChild(divTrack);
    }
    main.appendChild(div);
}

function paintTracksNews(data,album) {
    const main = document.querySelector('.main');
    main.innerHTML = '';

    let div = document.createElement('DIV');
    div.setAttribute('class', 'list');
    for (let index = 0; index < data.length; index++) {
        let divTrack = document.createElement('DIV');
        let img = document.createElement('IMG');
        let title = document.createElement('DIV');
        let artist = document.createElement('DIV');
        let albumdiv = document.createElement('DIV');
        let duration = document.createElement('DIV');
        img.setAttribute('src', album.images[0].url);
        divTrack.addEventListener('click', () => {
            listenSong(data[index].id);
        });
        title.innerText = data[index].name;
        albumdiv.innerText = album.name;
        artist.innerText = data[index].artists.map(x => x.name).join(", ");
        duration.innerText = data[index].duration_ms;
        albumdiv.setAttribute('class', 'mobile-hidden');
        divTrack.setAttribute('class', 'list__item');
        duration.setAttribute('class', 'mobile-hidden');
        divTrack.appendChild(img);
        divTrack.appendChild(title);
        divTrack.appendChild(artist);
        divTrack.appendChild(albumdiv);
        divTrack.appendChild(duration);
        div.appendChild(divTrack);
    }
    main.appendChild(div);
}

function showTracks(playlist_id) {

    getPlaylistTrack(playlist_id).then(data => {
        paintTracks(data.items)
    });

}

function listenSong(id_track) {
    let iframe = document.querySelector('footer > iframe');
    iframe.src = `https://open.spotify.com/embed/track/${id_track}`;
    getTrack(id_track).then(x => {
        var s = document.createElement("script");
        s.src = `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=generateLyrics&track_isrc=${x.external_ids.isrc}&apikey=985dd2d2c4519de96b536b418188dfb4`;
        document.querySelector('footer.footer').appendChild(s);
    });
    let lyricBox = document.getElementById("lyricsBox");
    if (lyricBox != undefined) {
        lyricBox.remove();
    }

    let lyrics = document.createElement("DIV");
    lyrics.setAttribute('id', "lyricsBox");
    document.querySelector('main.main').appendChild(lyrics);
}

function generateLyrics(x) {


    let box = document.querySelector('#lyricsBox');
    box.innerHTML = '';

    box.innerHTML = `<span class="times" onclick="removeLyrics()">&times;</span>
    <textarea>${x.message.body.lyrics.lyrics_body}</textarea>`;
}

function removeLyrics() {
    let box = document.querySelector('#lyricsBox');
    box.innerHTML = '';
}


function paintTracksSearch(data) {
    const main = document.querySelector('.main');
    main.innerHTML = '';

    let div = document.createElement('DIV');
    div.setAttribute('class', 'list');
    for (let index = 0; index < data.length; index++) {
        let divTrack = document.createElement('DIV');
        let img = document.createElement('IMG');
        let title = document.createElement('DIV');
        let artist = document.createElement('DIV');
        let album = document.createElement('DIV');
        let duration = document.createElement('DIV');
        img.setAttribute('src', data[index].album.images[0].url);
        divTrack.addEventListener('click', () => {
            listenSong(data[index].id);
        });
        title.innerText = data[index].name;
        album.innerText = data[index].album.name;
        artist.innerText = data[index].artists.map(x => x.name).join(", ");
        duration.innerText = data[index].duration_ms;
        album.setAttribute('class', 'mobile-hidden');
        divTrack.setAttribute('class', 'list__item');
        duration.setAttribute('class', 'mobile-hidden');
        divTrack.appendChild(img);
        divTrack.appendChild(title);
        divTrack.appendChild(artist);
        divTrack.appendChild(album);
        divTrack.appendChild(duration);
        div.appendChild(divTrack);
    }
    main.appendChild(div);
}

function search() {

    let search = document.querySelector(".nav > .nav__link > input").value;
    if (search != null || search != undefined || search != '') {
        searchResult(search).then(x => paintTracksSearch(x.tracks.items));
    }

}

function showAlbumTracks(album_id) {
    getAlbum(album_id).then(album => {
        console.log(album)
        getAlbumTracks(album_id).then(data => {
            paintTracksNews(data.items, album);
        });
    });
}

function removeSearch() {
    let search = document.querySelector(".nav > .nav__link > input");
    search.value = '';
}

function getDataNews() {
    getNewReleases().then(x => paintAlbums(x.albums.items));
}

function getDataPlaylists() {

}