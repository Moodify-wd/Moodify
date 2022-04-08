
function parseURLHash() {
    var search = location.hash.substring(1);
    var urlHash = search ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) { return key === "" ? value : decodeURIComponent(value) }) : {}
    return urlHash;
}
var urlHash = parseURLHash();
var access_token = urlHash.access_token;
console.log(access_token);

// function to initate playlist creation. Gets called when the "generate" button is clicked.
function moodSelector() {

    //gets the contents of element "moodValue"
    var pickedMood = document.getElementById("moodValue");

    //gets the users SELECTED mood from moodValue list
    var userMood = pickedMood.options[pickedMood.selectedIndex].value;

    // gets the content of element... by id..
    var moodDiv = document.getElementById("moodSelector");
    var moodHeading = document.getElementById("heading2");
    var favSong = document.getElementById("favSong").value;
    var favArtist = document.getElementById("favArtist").value;

    // debug purposes to check correct selection is being assigned to userMood
    // console.log("Your selected mood was: " + userMood);

    spinnerCreator();


    // switch statement for userMood.. eventually will be used to generate playlist based on picked mood.
    moodHeading.textContent = "";
    moodDiv.textContent = "Generating playlist...";
    playlistGenerate(access_token, userMood, favSong, favArtist);
}

function spinnerCreator() {
    var spinner = document.createElement('div');
    spinner.id = 'spinner'
    document.body.appendChild(spinner);
}

function spinnerRemover() {
    setTimeout(document.body.removeChild(spinner), 5000);
}

// Function creates a private playlist in the user account 
async function playlistGenerate(access_token, userMood, favSong, favArtist) {
    const userResponse = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + access_token }
    })
    const userData = await userResponse.json();
    var userId = userData.id; // user ID
    console.log(userId);

    /* 
    // Get available genres
    const getGenreSeeds = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + access_token }
    })
    const genreSeedsData = await getGenreSeeds.json();
    console.log(genreSeedsData.genres);
    */

    // Dictionary of seeds to get reccomendations limited to 3 
    let genreSeeds = {
        "happy": "happy,party,edm",
        "sad": "sad,indie,folk",
        "mad": "rock,emo,hardcore",
        "heartbroken": "sad,indie,folk",
        "chill": "rainy-day, chill, ambient",
    }

    var genreEncoded = encodeURIComponent(genreSeeds[userMood])
    var artistEncoded = encodeURIComponent(favArtist);
    var trackFormatted = "track:" + favSong;
    /*
    // get favorite artiest
    const getArtist = await fetch("https://api.spotify.com/v1/search?q=artist:" + artistEncoded + "&type=artist", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + access_token,
        }
    })
    const artistData = await getArtist.json();
    var artistId = artistData.artists.items[0].id;
    console.log('Artist ID' + artistId);

    // get favortie song
    const getFavTrack = await fetch("https://api.spotify.com/v1/search?q=" + encodeURIComponent(trackFormatted) + "&type=track&market=US", {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + access_token }
    })
    const trackData = await getFavTrack.json();

    var trackId = trackData.tracks.items[0].id;
    console.log(trackId);
    */

    // get favorite artiest
    const getArtist = await fetch("https://api.spotify.com/v1/search?q=artist:" + artistEncoded + "&type=artist", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + access_token,
        }
    })
    const artistData = await getArtist.json();
    var artistId = artistData.artists.items[0].id;
    console.log(artistId);

    // get favortie song
    const getFavTrack = await fetch("https://api.spotify.com/v1/search?q=" + encodeURIComponent(trackFormatted) + "&type=track&market=US", {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + access_token }
    })
    const trackData = await getFavTrack.json();

    var trackId = trackData.tracks.items[0].id;
    console.log(trackId);

    // create playlist 
    const createPlaylist = await fetch('https://api.spotify.com/v1/users/' + userId + '/playlists', {
        method: "POST",
        headers: { 'Authorization': 'Bearer ' + access_token },
        body: JSON.stringify({
            'name': "Moodify " + userMood,
            'public': false
        })
    })
    const playlistData = await createPlaylist.json();
    var playlistId = playlistData.id;
    console.log('Playlist id ' + playlistData.id);

    // get track recomendations based off of seed track artist and genres based off of mood
    const getTracks = await fetch("https://api.spotify.com/v1/recommendations?seed_artists=" + artistId + "&seed_genres=" + genreEncoded + "&seed_tracks=" + trackId + "&limit=50&market=US", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    })
    const getTracksData = await getTracks.json();
    var recomendedTracksId = [];

    // create list of track IDs 
    for (var i = 0; i < 25; i++) {
        recomendedTracksId.push(getTracksData.tracks[i].id);
    }

    // Add tracks to the playlist looping through track lists
    for (var j = 0; j < 25; j++) {
        console.log(recomendedTracksId[j]);
        var uris = "spotify:track:" + recomendedTracksId[j];
        const addTrack = await fetch("https://api.spotify.com/v1/playlists/" + playlistId + "/tracks?uris=" + encodeURIComponent(uris), {
            method: "POST",
            headers: { "Authorization": "Bearer " + access_token }
        })
    }

    // Alert to open new playlist in a new tab 
    if (confirm("Open playlist")) {
        var moodDiv = document.getElementById("moodSelector");
        moodDiv.textContent = "Playlist generated!";
        document.body.removeChild(spinner);
        window.open("https://open.spotify.com/playlist/" + playlistId);
        document.body.removeChild(spinner);


    } else {

    }


}
