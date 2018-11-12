import React, { Component } from 'react';

class MainList extends Component {
  constructor(props){
    super(props);
    this.state = {
      lists: [],
      inputText: "",
      editedList: "",
      editText: ""
    };
    this.mainListRef = this.props.firebase.database().ref('lists');
  }

  componentDidMount(){

    this.mainListRef.on('child_added', snapshot => {
      const list = snapshot.val();
      list.key = snapshot.key;
      var lists = this.state.lists.concat(list);
      this.setState({ lists: lists });
    })

    this.mainListRef.on('child_changed', snapshot => {
      const list = snapshot.val();
      list.key = snapshot.key;
      var lists = this.state.lists;

      for(let i=0; i<lists.length; i++){
        if(lists[i].key === list.key){
          lists[i].name = list.name;
        }
      }

      this.setState({ lists: lists });
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

  setEditedList(key) {
    this.setState({ editedList: key });
  }

  updateEditText(e) {
    this.setState({ editText: e.target.value });
  }

  renameList(e, list) {
    e.preventDefault();
    if (!this.state.editText) { return }
    var listToRename = this.mainListRef.child(list.key);
    listToRename.update({
      name: this.state.editText
    });
    this.setState({ editText: "", editedList: "" });
  }

  render(){

    var lists = (
      this.state.lists.map( (list, index) => {
        if(list.key === this.state.editedList){
          return  <div key={index}>
                    <p onClick={() => this.props.activateList(list.key, list.name)}>{list.name}</p>
                    <form onSubmit={(e) => this.renameList(e, list)}>
                      <input
                        type="text"
                        id="rename-input"
                        value={this.state.editText}
                        onChange={(e) => this.updateEditText(e)}>
                      </input>
                      <button type="submit">Rename</button>
                    </form>
                  </div>
        } else {
          return  <div key={index}>
                    <p onClick={() => this.props.activateList(list.key, list.name)}>{list.name}</p>
                    <button onClick={() => this.setEditedList(list.key)}>Edit</button>
                  </div>
        }
    }));

    return(
      <div id="main-list">
        <div>
          <h1>Your lists:</h1>
          {lists}
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
