
let accessToken;
const clientId = "d578ee90d16c4505a5d4a1a7903dcc22";
const redirectUri = "http://localhost:3000/"

const Spotify = {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState("Access Token", null, '/');
            return accessToken;

        }
        else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    search(term){
        console.log("in Spotify.search")//FIXME
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
                {headers: 
                    {Authorization: `Bearer ${accessToken}`}
                })
        .then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            if (!jsonResponse.tracks) {
                console.log("returning nothing") //FIXME
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        })
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {
            headers: headers
        })
        .then(response => response.json())
        .then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            })

            .then(response => response.json())
            .then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                })
            })
        });
    }
}


export default Spotify;


/*******************************************************
 * this section handles getting an access token and then using the access token to make get or post requests to the API.
 * It is created as a Spotify object so it can be easily accessed and the methods used using Spotify.method
 * 
 * getAccessToken notes:
 * - gets access token required for spotify OAuth which is used later in the Playlist and search methods
 * - checks for 3 possible scenarios:
 *   1. Person has previously gotten an access token through an earlier search attempt. 
 *   2. Person just got an access token and so it is in their url and needs to be gotten out
 *          - window.location.href gets the url for the pase you are going to, and then .match find the access token part and/or expires token part that should be listed
 *            after that
 *          - we also set a timeout so that when the expiration time of the user is reached, user will be asked to get a new access token, and the access token and expiration time will be updated.
 *   3. Person has not gotten any form of access token yet, and must go to  spotify's redirect URL to give permission for this application to access spotify, through which they will receive an access url. 
 *          - window.location = accessUrl sets your window to the Url you made, so that you (the user) will be redirected there 
 * 
 * search() notes:
 * - used to search spotify to retrieve songs. Called in app.js when Search
 * Steps:
 * 1. gets access token
 * 2. Does fetch request to spotify to retrieve songs from <SearchResults> search term when <SearchResults> search (button onClick) => <app.js> search called 
 *      - fetch request has 1st parameter: href with term (searchterm) as endpoint query parameter, 2nd parameter: authroization header included access token
 * 3. Uses boilerplate fetch request to get tracks, if available, and to format them and return as a list of track objects with understadable variables for information we want (id, name, artist, etc.)
 * 
 * 
 * savePlaylist notes:
 * - called from <app.js> savePlaylist() (prop for <Playlist.js> button) to save playlist you made to Spotify.
 * 
 * Steps:
 * 1. gets input name (playlist name state) and trackUris (list of uri property of songs in playlistTracks list) from app.js.
 *      - if either of these are empty it does not proceed
 * 2. gets accessToken 
 * 3. Does an initial fetch request to get the userId of the user on spotify - which is necessary to save it to the correct account
 * 4. Chains with .then to a POST request which creates a playlist with that name on your account
 * 5. Chain with .then to a nother post request which adds the tracks by trackUri (the way spotify identifies the songs) to spotify
 * 
 * 
//in fetch requests as a total, the endpoint (thing after https://api.spotify.com) can be found here:
//https://developer.spotify.com/documentation/web-api/reference/playlists/
 * */

 /********************************
  * Notes on errors throughout process:
  * - was getting a 401 initially until I added window.location = accessUrl at end of getAccessToken().
  * - was getting invalid redirectUri error from spotify bc my accessUrl at end of getAccessToken() was on multiple lines, which apparently messed it up. 
  */
