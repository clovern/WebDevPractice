import React from 'react';
import './Track.css';

export class Track extends React.Component{
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction(){
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        }
        else{
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }
    
    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    render() {
        return(
            <div className="Track">
            <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album} </p>
            </div>
            {this.renderAction()}
            </div>
        )
    }
}

export default Track;

/******************************************
 * constructor binds helper functions
 * 
 * helper functions add and remove track created to call the handler functions passed down from app.js for adding or removing songs with the necessary parameter
 * 
 * render:
 * - outputs and formatts information for each song using properties of the individual track passed to it through tracklist. 
 * - renders either a + or - button for adding or removing the track - determined in the helper renderAction function - based on whether the track is in the playlist 
 *   or searchResults section (isRemoval prop passed to)
 */
