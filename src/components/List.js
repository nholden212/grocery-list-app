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
      var items = this.state.items.concat(item);
      this.setState({ items: items });
    })

    this.itemsRef.on('child_changed', snapshot => {
      const item = snapshot.val();
      item.key = snapshot.key;
      var items = this.state.items;

      for(let i=0; i<items.length; i++){
        if(items[i].key === item.key){
          items[i].content = item.content;
          items[i].purchased = item.purchased;
        }
      }

      this.setState({ items: items });
    })

    this.itemsRef.on('child_removed', snapshot => {
      const item = snapshot.val();
      item.key = snapshot.key;
      var items = this.state.items;

      var index;

      for(let i=0; i<items.length; i++){
        if(items[i].key === item.key){
          index = i;
        }
      }

      items.splice(index, 1);

      this.setState({ items: items });
    })
  }

  updateText(e) {
    this.setState({ inputText: e.target.value });
  }

  addItem(e) {
    e.preventDefault();
    if(this.props.user === "Guest"){ return }
    if (!this.state.inputText) { return }
    this.itemsRef.push({
      content: this.state.inputText,
      listId: this.props.activeListId,
      purchased: false
    });
    this.setState({ inputText: "" });
  }

  setEditedItem(key) {
    if(this.props.user === "Guest"){ return }
    this.setState({ editedItem: key });
  }

  updateEditText(e) {
    this.setState({ editText: e.target.value });
  }

  updateItem(e, item) {
    e.preventDefault();
    if(this.props.user === "Guest"){ return }
    if (!this.state.editText) { return }
    var itemToUpdate = this.itemsRef.child(item.key);
    itemToUpdate.update({
      content: this.state.editText
    });
    this.setState({ editText: "", editedItem: "" });
  }

  deleteItem(item) {
    if(this.props.user === "Guest"){ return }
    var itemToDelete = this.itemsRef.child(item.key);
    itemToDelete.remove();
  }

  togglePurchased(item) {
    if(this.props.user === "Guest"){ return }
    var itemToToggle = this.itemsRef.child(item.key);
    var purchased = item.purchased;
    if(purchased){
      purchased = false;
    } else {
      purchased = true;
    }
    itemToToggle.update({
      purchased: purchased
    })
  }

  render(){

    var currentItems = (
      this.state.items.map( (item, index) => {
        if(item.listId === this.props.activeListId){

          if(item.key === this.state.editedItem){

            return  <div key={index}>
                      <p>{item.content}</p>
                      <form onSubmit={(e) => this.updateItem(e, item)}>
                        <label htmlFor="edit-input">New value: </label>
                        <input
                          type="text"
                          id="edit-input"
                          value={this.state.editText}
                          onChange={(e) => this.updateEditText(e)}>
                        </input>
                        <button type="submit">Update</button>
                      </form>
                    </div>

          } else if(item.purchased) {

            return  <div className="green-text" key={index}>
                      {item.content}
                      <i class="material-icons md-17 vert-align-middle" onClick={() => this.setEditedItem(item.key)}>create</i>
                      <i class="material-icons md-17 vert-align-middle" onClick={() => this.deleteItem(item)}>delete</i>
                      <i class="material-icons md-17 vert-align-middle" onClick={() => this.togglePurchased(item)}>clear</i>
                    </div>

          } else {

            return  <div className="red-text" key={index}>
                      {item.content}
                      <i class="material-icons md-17 vert-align-middle" onClick={() => this.setEditedItem(item.key)}>create</i>
                      <i class="material-icons md-17 vert-align-middle" onClick={() => this.deleteItem(item)}>delete</i>
                      <i class="material-icons md-17 vert-align-middle" onClick={() => this.togglePurchased(item)}>done</i>
                    </div>

          }
        }
        return null;
      })
    );

    var form = () => {
      if(this.props.activeList){
        return  <form id="addItem" onSubmit={(e) => this.addItem(e)}>
                  <label htmlFor="item-input">Add: </label>
                  <input
                    type="text"
                    id="item-input"
                    value={this.state.inputText}
                    onChange={(e) => this.updateText(e)}></input>
                  <button type="submit">Submit</button>
                </form>
      } else {
        return null;
      }
    }

    return(
      <div className="ListComponent full">
        <h2>{this.props.activeList}</h2>
        <div className="list">
          {currentItems}
        </div>
          {form()}
      </div>
    )
  }
}

export default List;
