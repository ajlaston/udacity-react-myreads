import React, {Component} from 'react';
import Shelf from './Shelf';

class Shelves extends Component {
  	
      
	render(){
      	const {library, load} = this.props;
      
    	return(
        	 <div className="list-books-content">
          
              	  <div className="list-books-title">
              		<h1>MyReads</h1>
            	  </div>
          
          			<Shelf shelfName='currentlyReading' name='Currently Reading' load={load} library={library}/>
          			<Shelf shelfName='wantToRead'name='Want To Read' load={load} library={library}/>
          			<Shelf shelfName='read' name='Read' load={load} library={library}/>
            </div> 
        )
	}
}

export default Shelves;
