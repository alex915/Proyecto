let clientid = '0e318dc65ccf46169596f35901074ca8';
let secret = '81a7a8dcd6c849d0bc4baddbb188c600';
let token, token_type;

//CALLS
//use
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
//use
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
//use
async function getPlaylists() {
    let code = `${token_type} ${token}`;
    let url = `https://api.spotify.com/v1/browse/featured-playlists?limit=50`;
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
async function getTracksAudioFeatures(tracks_ids) {
    let code = `${token_type} ${token}`;
    let url = ` https://api.spotify.com/v1/audio-features?ids=${tracks_ids}`;
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
//use
async function getPlaylist(playlist_id) {
    let code = `${token_type} ${token}`;
    let url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
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
//not use
async function getArtist(id) {
    let code = `${token_type} ${token}`;
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
//not use
async function getArtistAlbums(id) {
    let code = `${token_type} ${token}`;
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
//use
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
//use
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
//use
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
//use
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
//use
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
//use
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
//use
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

//PAINTS
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
        divImg.addEventListener('click', () => {
            showCategory(data[index].id);
        });
        span.innerText = data[index].name;
        divImg.appendChild(img);
        divImg.appendChild(span);
        div.appendChild(divImg);
    }
    main.appendChild(div);
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
        img.setAttribute('src', data[index].images[0].url);
        divImg.addEventListener('click', () => {
            showTracks(data[index].id);
        });
        span.innerText = data[index].name;
        divImg.appendChild(img);
        divImg.appendChild(span);
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

function paintTracks(data, x) {
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
        let stats = document.createElement('DIV');

        img.setAttribute('src', data[index].track.album.images[0].url);
        divTrack.addEventListener('click', () => {
            listenSong(data[index].track.id);
            paintSelectedTrack(divTrack);
        });
        album.addEventListener('click', () => {
            showAlbumTracks(data[index].track.album.id);
        });
        if (+x.audio_features[index].energy > 0.8) {
            stats.insertAdjacentHTML("afterbegin", '<i class="fas fa-fire-alt tooltip" tooltip" aria-hidden="true" style="padding-right: 5px;"><span class="tooltiptext">Energía</span></i>');
        }
        if (+x.audio_features[index].valence > 0.8) {
            stats.insertAdjacentHTML("afterbegin", '<i class="fas fa-medal tooltip" aria-hidden="true" style="padding-right: 5px;"><span class="tooltiptext">Éxito</span></i>');
        }
        if (+x.audio_features[index].danceability > 0.8) {
            stats.insertAdjacentHTML("afterbegin", '<i class="fas fa-glass-cheers tooltip" aria-hidden="true" style="padding-right: 5px;"><span class="tooltiptext">Bailable</span></i>');
        }
        title.innerText = data[index].track.name;
        album.innerText = data[index].track.album.name;
        artist.innerText = data[index].track.artists.map(x => x.name).join(", ");
        duration.innerText = durationFormatter(data[index].track.duration_ms);
        album.setAttribute('class', 'remarkable');
        stats.style.display = 'flex';
        divTrack.setAttribute('class', 'list__item');
        duration.setAttribute('class', 'mobile-hidden');
        divTrack.appendChild(img);
        divTrack.appendChild(title);
        divTrack.appendChild(artist);
        divTrack.appendChild(album);
        divTrack.appendChild(stats);
        divTrack.appendChild(duration);
        div.appendChild(divTrack);
    }
    main.appendChild(div);
}

function paintTracksAlbums(data, album, x) {
    const main = document.querySelector('.main');
    main.innerHTML = '';
    let albumHeader = document.createElement('DIV');
    albumHeader.setAttribute('class', 'album__header');
    let img = document.createElement('IMG');
    let albumdiv = document.createElement('DIV');
    img.setAttribute('src', album.images[0].url);
    albumdiv.innerText = album.name;
    albumdiv.setAttribute('class', 'title__header');
    albumHeader.appendChild(albumdiv);
    albumHeader.appendChild(img);
    let div = document.createElement('DIV');
    div.setAttribute('class', 'list');
    for (let index = 0; index < data.length; index++) {
        let divTrack = document.createElement('DIV');
        let title = document.createElement('DIV');
        let artist = document.createElement('DIV');
        let stats = document.createElement('DIV');
        let duration = document.createElement('DIV');
        divTrack.addEventListener('click', () => {
            listenSong(data[index].id);
            paintSelectedTrack(divTrack);
        });
        if (+x.audio_features[index].energy > 0.8) {
            stats.insertAdjacentHTML("afterbegin", '<i class="fas fa-fire-alt tooltip" tooltip" aria-hidden="true" style="padding-right: 5px;"><span class="tooltiptext">Energía</span></i>');
        }
        if (+x.audio_features[index].valence > 0.8) {
            stats.insertAdjacentHTML("afterbegin", '<i class="fas fa-medal tooltip" aria-hidden="true" style="padding-right: 5px;"><span class="tooltiptext">Éxito</span></i>');
        }
        if (+x.audio_features[index].danceability > 0.8) {
            stats.insertAdjacentHTML("afterbegin", '<i class="fas fa-glass-cheers tooltip" aria-hidden="true" style="padding-right: 5px;"><span class="tooltiptext">Bailable</span></i>');
        }
        title.innerText = data[index].name;
        artist.innerText = data[index].artists.map(x => x.name).join(", ");
        duration.innerText = durationFormatter(data[index].duration_ms);
        divTrack.setAttribute('class', 'list__item list__item__album');
        duration.setAttribute('class', 'mobile-hidden');
        divTrack.appendChild(title);
        divTrack.appendChild(artist);
        divTrack.appendChild(stats);
        divTrack.appendChild(duration);
        div.appendChild(divTrack);
    }
    main.appendChild(albumHeader);
    main.appendChild(div);
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
            paintSelectedTrack(divTrack);
        });
        album.addEventListener('click', () => {
            showAlbumTracks(data[index].album.id);
        });

        album.innerText = data[index].album.name;
        title.innerText = data[index].name;
        artist.innerText = data[index].artists.map(x => x.name).join(", ");
        duration.innerText = durationFormatter(data[index].duration_ms);
        album.setAttribute('class', 'remarkable');
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

function paintSelectedTrack(divTrack) {
    document.querySelectorAll('.main .list div.list__item').forEach(x => x.classList.remove('selectedItem'));
    let icon = document.getElementById('play');
    if (icon != null) {
        icon.remove();
    }
    divTrack.classList.add('selectedItem');
    divTrack.children[0].insertAdjacentHTML("afterbegin", '<i class="fas fa-play" id="play" aria-hidden="true" style="padding-right: 9px;"></i>');
}

function show() {
    let spinner = document.querySelector('.spinner');
    spinner.classList.add('show');
}

function unShow() {
    setTimeout(()=>{
        let spinner = document.querySelector('.spinner');
        spinner.classList.remove('show');
    }, 800);
}

//EVENTS
function listenSong(id_track) {
    show();
    let iframe = document.querySelector('footer > iframe');
    iframe.src = `https://open.spotify.com/embed/track/${id_track}`;
    getTrack(id_track).then(x => {
        var s = document.createElement("script");
        s.src = `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=generateLyrics&track_isrc=${x.external_ids.isrc}&apikey=985dd2d2c4519de96b536b418188dfb4`;
        document.querySelector('body').appendChild(s);
        unShow();
    }).catch(() => unShow());
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
    if (x.message.body.lyrics != undefined) {
        let text = x.message.body.lyrics.lyrics_body;
        box.innerHTML = `<span class="times" onclick="removeLyrics()">&times;</span>
        <textarea disabled>${text==''?'No hay letra que mostrar =(':text.substring(0, text.indexOf('*******'))}</textarea>`;
    } else {
        box.innerHTML = `<span class="times" onclick="removeLyrics()">&times;</span>
        <textarea disabled>No hay letra que mostrar =(</textarea>`;
    }

}

function removeLyrics() {
    let box = document.querySelector('#lyricsBox');
    box.remove();
}

function removeSearch() {
    let search = document.querySelector(".nav > .nav__link > input");
    search.value = '';
}

function search() {
    show();
    let search = document.querySelector(".nav > .nav__link > input").value;
    if (search != null || search != undefined || search != '') {
        searchResult(search).then(x => {
            paintTracksSearch(x.tracks.items);
            unShow();
        }).catch(() => unShow());
    }
}

function showAlbumTracks(album_id) {
    show();
    getAlbum(album_id).then(album => {
        getAlbumTracks(album_id).then(data => {
            let ids = data.items.map(x => x.id).join(",");
            getTracksAudioFeatures(ids).then(
                x => {
                    paintTracksAlbums(data.items, album, x);
                    unShow()
                }).catch(() => unShow())
        });
    });
}

function showCategory(category_id) {
    show();
    getCategoriesPlaylist(category_id).then(data => {
        paintPlaylists(data.playlists.items);
        unShow();
    }).catch(() => unShow());

}

function showTracks(playlist_id) {
    show()
    getPlaylistTrack(playlist_id).then(data => {
        let ids = data.items.map(x => x.track.id).join(',');
        getTracksAudioFeatures(ids).then(
            x => {
                paintTracks(data.items, x);
                unShow()
            }
        ).catch(() => unShow());
    });

}

function getDataNews() {
    show();
    getNewReleases().then(x => {
        paintAlbums(x.albums.items);
        unShow()
    }).catch(() => unShow());
}

function getDataPlaylists() {
    show();
    getPlaylists().then(data => {
        paintPlaylists(data.playlists.items);
        unShow();
    }).catch(() => unShow());
}

function getDataCategories() {
    show();
    getCategories().then(data => {
        paintCategories(data.categories.items);
        unShow();
    }).catch(() => unShow())
}

//UTILS
function durationFormatter(miliseconds) {
    let seg = miliseconds / 1000;
    let min = (seg / 60).toFixed();
    let resto = (seg / 60) % 1;
    seg = (resto * 60).toFixed();
    let text = '';
    if (min < 10) {
        text = `0`;
    }
    text += `${min}:`;
    if (seg < 10) {
        text += `0`;
    }
    text += seg;
    return text;
}