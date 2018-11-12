import React, { Component } from 'react';

class MainList extends Component {
  constructor(props){
    super(props);
    this.state = {
      lists: [],
      inputText: "",
      activeList: this.props.activeList
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

  updateText(e){
    this.setState({ inputText: e.target.value });
  }

  createList(e){
    e.preventDefault();
    if(!this.state.inputText){ return }
    this.mainListRef.push({
      name: this.state.inputText
    });
    this.setState({ inputText: "" });
  }

  render(){
    return(
      <div id="main-list">
        <div>
          <h1>Your lists:</h1>
          {this.state.lists.map( (list, index) =>
            <div key={index} onClick={() => this.props.activateList(list.key, list.name)}>{list.name}</div>
          )}
        </div>
        <form onSubmit={(e) => this.createList(e)}>
          <h3>New list:</h3>
          <label htmlFor="new-list-input">Name:</label>
          <input
            type="text"
            id="new-list-input"
            value={this.state.inputText}
            onChange={(e) => this.updateText(e)}>
          </input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default MainList;
