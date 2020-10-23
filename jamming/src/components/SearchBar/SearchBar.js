import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            term: ""
        }
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    handleTermChange(event){
        this.setState({term: event.target.value});
    }

    render(){
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" 
                        onChange={this.handleTermChange}/>
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        );
    }
}

export default SearchBar;

/*********************************************************
 * constructor:
 * - sets term (search term) as a state, since this will be changed by this components input box, and therefore cannot be a prop (because you should not change props within same component!)
 * - binds the 2 helper methods, because both use this and will be passed in as event handlers for components which are rendered later (button and input box)
 * 
 * handleTermChange();
 * - sets the term state to whatever your text is whenever you change the text in the search bar
 * 
 * search():
 * - this calls the onSearch prop which was passed down from app.js (search method), inputting the necessary search term into this. This coudl not be passed in to the search button directly 
 *   without creation of this helper method since the search term must be passed in from here. 
 * 
 * render:
 * - creates an input box with placeholder instructions and a search button, and sets the event handler functions for these. 
 * 
 * 
 * 
 * 
 * 
 * 
 */