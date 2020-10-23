import React from "react"; 
import './TrackList.css';

import Track from "../Track/Track";

export class TrackList extends React.Component{
    render(){
        return(
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {
                        return <Track track={track} 
                                key={track.id}
                                onAdd={this.props.onAdd}
                                onRemove={this.props.onRemove}
                                isRemoval={this.props.isRemoval} />
                    })
                }
            </div>     
        )
    }
}

export default TrackList;

/********************************************
 * - sorts through list of tracks to create a track component for each one. (This is helpful because each track will be formatted nicely in the track comopnent)
 *      - gives each track a key, which is necesary for any list of items where we need to keep track of which order the items were in on additional renders
 * - renders Track components for each track in the list, passing along necessary props. 
 */