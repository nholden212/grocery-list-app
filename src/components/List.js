import React, { Component } from 'react';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      inputText: "",
      editedItem: "",
      editText: ""
    }
    this.itemsRef = this.props.firebase.database().ref('items');
  }

  componentDidMount() {
    this.itemsRef.on('child_added', snapshot => {
      const item = snapshot.val();
      item.key = snapshot.key;
      var items = this.state.items.concat(item)
      this.setState({ items: items });
    })

    this.itemsRef.on('child_changed', snapshot => {
      const item = snapshot.val();
      item.key = snapshot.key;
      var items = this.state.items;

      for(let i=0; i<items.length; i++){
        if(items[i].key === item.key){
          items[i].content = item.content;
        }
      }

      this.setState({ items: items });
    })
  }

  updateText(e) {
    this.setState({ inputText: e.target.value });
  }

  addItem(e) {
    e.preventDefault();
    if (!this.state.inputText) { return }
    this.itemsRef.push({
      content: this.state.inputText,
      listId: this.props.activeListId
    });
    this.setState({ inputText: "" });
  }

  setEditedItem(key) {
    this.setState({ editedItem: key });
  }

  updateEditText(e) {
    this.setState({ editText: e.target.value });
  }

  updateItem(e, item) {
    e.preventDefault();
    if (!this.state.editText) { return }
    var key = item.key;
    var itemToUpdate = this.itemsRef.child(key);
    itemToUpdate.update({
      content: this.state.editText
    });
    this.setState({ editText: "" });
    this.setState({ editedItem: "" });
  }

  render(){
    var currentItems = (
      this.state.items.map( (item, index) => {
        if(item.listId === this.props.activeListId){
          if(item.key === this.state.editedItem){
            return  <div key={index}>
                      <p>{item.content}</p>
                      <form onSubmit={(e) => this.updateItem(e, item)}>
                        <input
                          type="text"
                          id="new-list-input"
                          value={this.state.editText}
                          onChange={(e) => this.updateEditText(e)}>
                        </input>
                        <button type="submit">Edit</button>
                      </form>
                    </div>
          } else {
            return  <div key={index}>
                      <p>{item.content}</p>
                      <button onClick={() => this.setEditedItem(item.key)}>Edit</button>
                    </div>
          }

        }
        return null;
      })
    );

    return(
      <div className="list">
        <h2>{this.props.activeList}</h2>
        <div className="items">
          {currentItems}
        </div>
        <form id="addItem" onSubmit={(e) => this.addItem(e)}>
          <label htmlFor="item-input">Add:</label>
          <input
            type="text"
            id="item-input"
            value={this.state.inputText}
            onChange={(e) => this.updateText(e)}></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

}

export default List;
