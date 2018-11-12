import React, { Component } from 'react';

class MainList extends Component {
  constructor(props){
    super(props);
    this.state = {
      lists: []
    };
    this.mainListRef = this.props.firebase.database().ref('lists');
  }

  componentDidMount(){
    this.mainListRef.on('child_added', snapshot => {
      const list = snapshot.val();
      list.key = snapshot.key;
      this.setState({ lists: this.state.lists.concat( list )});
    })
  }

  render(){
    return(
      <div>
        {this.state.lists.map( (list, index) =>
          <div key={index}>{list.name}</div>
        )}
      </div>
    )
  }
}

export default MainList;
