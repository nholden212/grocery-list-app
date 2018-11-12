import React, { Component } from 'react';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      inputText: ""
    }
    this.itemsRef = this.props.firebase.database().ref('items');
  }

  componentDidMount() {
    this.itemsRef.on('child_added', snapshot => {
      const item = snapshot.val();
      item.key = snapshot.key;
      this.setState({ items: this.state.items.concat( item ) });
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

  render(){
    var currentItems = (
      this.state.items.map( (item) => {
        if(item.listId === this.props.activeListId){
          return <div key={item.key}>
                  <div>{item.content}</div>
                </div>
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
