import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

export class Playlist extends React.Component{

    constructor(props){
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event){
        this.props.onNameChange(event.target.value);
    }

    render(){
        return (
            <div className="Playlist">
                <input defaultValue={"New Playlist"} onChange={this.handleNameChange}/>
                <TrackList tracks={this.props.playlistTracks}
                                  onRemove={this.props.onRemove}
                                  isRemoval={true} />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default Playlist;

/********************************
 * constructor: 
 * - binds event handler function created here.
 * 
 * handleNameChange():
 * - calls the updatePlaylistName() method in app.js, which was handed down as the onNameChange prop. This helper function is required, though, so it will be called with the necessary 
 *   input: the new name
 * 
 * render:
 * - creates an input box for the playlist name, a Tracklist component within itself to manage tracks, and a button to save a playlist. 
 * - passes necessary props to Tracklist
 *      - playlistTrack and onRemove (passed to Playlist.js from app.js) because these are required for Tracklist but tracklist was not created directly from app.js
 *      - isRemoval set to true, because this will need to be passed to track, and any track that is in a playlist should only have option to be removed from playlist. 
 * 
 *
 * css:
 * - The css on this component create an empty box with initial set size and some transparency to give the playlist section form before songs are in it. 
 * 
 */
