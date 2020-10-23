import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList'

export class SearchResults extends React.Component{
    render(){
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList tracks={this.props.searchResults} 
                           onAdd={this.props.onAdd}
                           isRemoval={false} />
            </div>
        );
    }
}

export default SearchResults;

/********************************************************
 * - as a total, just renders a heading and a tracklist component with necessary props. 
 *        - required props it needs from app.js
 *        - is Removal set to false, because any song from searchResults should only have option to be sent to playlist
 * 
 * css (attached) sets a nice framework box for the search results field. 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */