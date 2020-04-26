import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

 class Search extends Component {
   
   	state = {
    	value : '',
      	library : [],
      	render : false
    }

	updateLib = (event, book) => {
    	BooksAPI.update(book, event.target.value)
      		.then(this.setState({render : 'update'}))
    }
   
   	handleChange = (event) => {
    	this.setState({value : event.target.value, render : 'search'});
    }

	componentDidUpdate(){
      
      	const {value, render} = this.state;
		const {load} = this.props;

		if(render === 'update'){
        	load();
        }

    	return value !== '' && render === 'search' ? BooksAPI.search(value)
			.then(library=> library.length > 0 ?
               	 this.setState({library, render : false}) : this.setState({render: false, library: []})) : 
				(value === '' && render === 'search') ? this.setState({library : [], render : false}) : false;
    }
	
  	render(){
      
      	const {library} = this.state;

    	return(
        	  <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                
                <input value={this.state.value} onChange={this.handleChange} type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
				{library && library.length > 0 ? 
                	library.map(book=>( <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, 
                            backgroundImage: book.imageLinks === undefined ? null : `url(${book.imageLinks.smallThumbnail})` }}>											
							</div>
                            <div className="book-shelf-changer">
                              <select value='none' onChange={(event)=>this.updateLib(event, book )} >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>)) : <li><h2>No Books Found</h2></li>
                }
			  </ol>
            </div>
          </div>
        )
    }
}

export default Search;