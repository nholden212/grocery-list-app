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
    this.itemsRef = this.props.firebase.database().ref('items');
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

    this.mainListRef.on('child_removed', snapshot => {
      const list = snapshot.val();
      list.key = snapshot.key;
      var lists = this.state.lists;

      var index;

      for(let i=0; i<lists.length; i++){
        if(lists[i].key === list.key){
          index = i;
        }
      }

      lists.splice(index, 1);

      this.setState({ lists: lists });
    })

  }

  updateText(e){
    this.setState({ inputText: e.target.value });
  }

  createList(e){
    e.preventDefault();
    if(this.props.user === "Guest"){ return }
    if(!this.state.inputText){ return }
    this.mainListRef.push({
      name: this.state.inputText
    });
    this.setState({ inputText: "" });
  }

  setEditedList(key) {
    if(this.props.user === "Guest"){ return }
    this.setState({ editedList: key });
  }

  updateEditText(e) {
    this.setState({ editText: e.target.value });
  }

  renameList(e, list) {
    e.preventDefault();
    if(this.props.user === "Guest"){ return }
    if (!this.state.editText) { return }
    var listToRename = this.mainListRef.child(list.key);
    listToRename.update({
      name: this.state.editText
    });
    this.setState({ editText: "", editedList: "" });
  }

  deleteList(list) {
    if(this.props.user === "Guest"){ return }
    var listToDelete = this.mainListRef.child(list.key);
    if(this.props.activeListId === list.key){
      this.props.deactivateList();
    }
    listToDelete.remove();
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
          return  <div className="list-item" key={index}>
                    <span onClick={() => this.props.activateList(list.key, list.name)}>{list.name}</span>
                    <i class="material-icons md-17 vert-align-middle" onClick={() => this.setEditedList(list.key)}>create</i>
                    <i class="material-icons md-17 vert-align-middle" onClick={() => this.deleteList(list)}>delete</i>
                  </div>
        }
    }));

    return(
      <div>
        <div className="list">
          <h1>Select list:</h1>
          {lists}
        </div>
        <form onSubmit={(e) => this.createList(e)}>
          <div>
            <label htmlFor="new-list-input">New: </label>
            <input
              type="text"
              id="new-list-input"
              value={this.state.inputText}
              onChange={(e) => this.updateText(e)}>
            </input>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default MainList;
