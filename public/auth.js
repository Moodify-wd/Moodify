const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;

const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = "6e7bda700d6449fe92f25f191e2e4cec";
const redirectUri = 'http://localhost:8888/mood.html';
const scopes = [
    'user-read-private',
    'playlist-modify-public',
    'playlist-modify-private'
];

// If no token found get token 
document.getElementById('login-button').addEventListener('click', function () {
    if (!_token) {
        window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
    }
}, false); 