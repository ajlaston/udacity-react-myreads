import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';

class Shelf extends Component {
  
  	state = {
    	render : false
    }

	updateLib = (event, book) => {
      	
    	BooksAPI.update(book, event.target.value)
      		.then(this.setState({render : true}));
      		
    }

	componentDidUpdate(){
      
    	const {render} = this.state;

		if(render){ 
          this.props.load() && this.setState({render : false});
		}

	}

  
  	render(){
      
      	const {library, shelfName, name} = this.props;
      	
    	return(
        	     <div className="bookshelf">
                  <h2 className="bookshelf-title">{name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      	{library && library.length > 0 ? 
                	library.map(book=>( book.shelf === shelfName ? <li key={book.id}> 
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, 
                            backgroundImage: book.imageLinks === undefined ? null : `url(${book.imageLinks.smallThumbnail})` }}>											
							</div>
                            <div className="book-shelf-changer">
                              <select value={shelfName} onChange={(event)=>this.updateLib(event, book, event.target.value)}>
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
                      </li> : false)) : <li><h2>Add A Book</h2></li> 
                }
                    </ol>
                  </div>
                </div>
        )
    }
}

export default Shelf;