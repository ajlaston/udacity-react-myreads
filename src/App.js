import React from 'react';
import './App.css';
import {Link, Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Search from './components/Search';
import Shelves from './components/Shelves';

class BooksApp extends React.Component {
	state = {
    	library : []
    }

	loadLib = () => {
    	BooksAPI.getAll()
      		.then(library=>this.setState({library}));
    }

	componentDidMount(){
    	this.loadLib()
    }
  
  render() {
    const {library} = this.state;
    
    return (
      <div className="app">
      
          <div className="list-books">
 
            	<Route exact path='/' render={()=> <Shelves load={this.loadLib} library={library}/> } />
      			<Route exact path='/search' render={()=> <Search load={this.loadLib}/>} />

            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        
      </div>
    )
  }
}

export default BooksApp
