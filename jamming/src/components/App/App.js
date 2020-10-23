import React from 'react';
import './App.css';
import {Playlist} from "../../components/Playlist/Playlist.js";
import {SearchBar} from "../../components/SearchBar/SearchBar.js";
import {SearchResults} from "../../components/SearchResults/SearchResults.js";

import Spotify from '../../util/Spotify';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "My Playlist",
      playlistTracks: []

    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
    
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: []
      })
    })
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                            onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
    }
}

export default App;

/********************************************************************************************
 * App:
 * - brings together all the components and functionality of the page. Serves as the pivot point where all states are actually changed.
 * 
 * constructor:
 * 1. Sets states for the items that will need to be changed for the functionality of the playlist: playlistTracks, playlistName, searchResults (of songs)
 * 2. binds all of the handler functions for events, since all of these use this and will be passed and used in other .js files. 
 * 
 * 
 * 
 * 
 * Event Handling method endpoints:
 * addTrack(track) and removeTrack(track):
 * - passed to track through Tracklist, where they receive the track input. 
 * - activated with + or - button click for on a Track component. 
 * 1. For addtrack: checks if that song is already in your playlist by seeing if there there is already a track in playlistTracks[] with a matching id. If not, adds song to playlistTracks[].
 * 2. For removetrack: removes your song of choice by filtering playlistTracks[] to only include songs which do not match the id of the track parameter you passed in.
 * 
 * updatePlaylistName(name):
 * - activated by onChange for input item on Playlist.js. (passed as prop to this).
 * - updates playlist name state to the name of your choice. 
 * 
 * savePlaylist(track)
 * - Creates a playlist in your actual spotify account based on the information saved in playlistTracks[] state. 
 * 1. Makes a formatted list of the uris of all the track objects in your playlistTracks[] state. This will be used as a parameter in the upcoming fx call. 
 * 2. calls Spotify.savePlaylist() from Spotify.js to save those songs to a playlist on spotify through a POST request. 
 * 3. Once the songs are saved, clear the playlistTracks state so that your playlist will show as empty, and you can create additional playlists. 
 * 
 * search(term)
 * - uses helper function from Spotify.js to retrieve songs from spotify with information (artist, album, song name, etc.) matching your search term. 
 * - called when <SearchBar> button press => <SearchBar> search => <app.js> search(term). 
 *      - term parameter that is passed in is search bar input, and is passed in as a parameter in the call to the app.js fx from SearchBar helper fx. 
 * 1. calls search(term) from Spotify.js helper methods, which sends a get request to spotify and retrieves songs matching search term
 * 2. Changes the state of searchResults to the songs which were returned from this get request. 
 * 
 * 
 * 
 * 
 * render:
 * -renders the framework of the app - basically everything that doesn't require interaction throughout app. 
 *      - input box, buttons, and tracks for basic search results and Playlist song list are rendered within individual components, but all other framework (the containers that hold these thing)
 *        are in here. 
 * 1. Renders jamming header and sets the background image in the attached CSS file. 
 * 2. renders next "tree" level of components (passing needed handler functions and states in as props):
 *      a. searchBar
 *          - renders a search Button and input box
 *      b. searchResults
 *          - renders buttons for + and -
 *          - renders a Tracklist => renders tracks
 *      c. Playlist
 *          - renders buttons for + and -
 *          - renders a Tracklist => renders tracks
 * 
 * 
 * export:
 * - is exported to index.js, where it is rendered and run. 
 * 
 * 
 * 
 * 
 * 
 */

 ///URL FOR WALKTHROUGH VIDEO AS NEEDED:
 //https://youtu.be/DH991Dzb9iE
 
