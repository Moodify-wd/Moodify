
function getHashParams() {
    var hashParams = {};
    var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

let params = getHashParams();
let access_token = params.access_token;
console.log(access_token)


// function to initate playlist creation. Gets called when the "generate" button is clicked.
function moodSelector() {

    //gets the contents of element "moodValue"
    var pickedMood = document.getElementById("moodValue");

    //gets the users SELECTED mood from moodValue list
    var userMood = pickedMood.options[pickedMood.selectedIndex].value;

    // gets the content of element... by id..
    var moodDiv = document.getElementById("moodSelector");
    var moodHeading = document.getElementById("heading2");


    // debug purposes to check correct selection is being assigned to userMood
    console.log("Your selected mood was: " + userMood);

    spinnerCreator();

    setTimeout(function () {
        document.body.removeChild(spinner);
    }, 7000);

    // switch statement for userMood.. eventually will be used to generate playlist based on picked mood.
    switch (userMood) {
        case "happy":
            moodHeading.innerHTML = "";
            moodDiv.textContent = "You are happy!";
            break;

        case "sad":
            moodDiv.textContent = "You are sad!";
            break;

        case "angry":
            moodDiv.textContent = "You are angry!";
            break;

        case "heartbroken":
            moodDiv.textContent = "You are heartbroken!";
            break;
    }
    spotifyApi(access_token, userMood);
}

function spinnerCreator() {
    var spinner = document.createElement('div');
    spinner.id = 'spinner'
    document.body.appendChild(spinner);
}

function spinnerRemover() {
    setTimeout(document.body.removeChild(spinner), 5000);
}


// make calls to spotify API 
function spotifyApi(access_token, userMood) {
    console.log(userMood);

    playlistGenerate(access_token, userMood);

}


// Function creates a private playlist in the user accounts 
async function playlistGenerate(access_token, userMood) {
    const userResponse = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + access_token }
    })

    const userData = await userResponse.json();
    id = userData.id; // user ID
    console.log(id);

    const createPlaylist = await fetch('https://api.spotify.com/v1/users/' + id + '/playlists', {
        method: "POST",
        headers: { 'Authorization': 'Bearer ' + access_token },
        body: JSON.stringify({
            'name': userMood,
            'public': false
        })
    })

    const playlistData = await createPlaylist.json();
    console.log('Playlist data' + playlistData);
}

// search for tracks and add to spotify playlist 
async function searchTracks(access_token, userMood) {
    //use reccomendation endpoint
}

// Get track reccomendations
async function getTrackReccomendations(access_token, userMood) {

}