it('should update the text', () => {
  const e = {
    target: {
      value: "test"
    }
  }

  updateText(e);

  expect(this.state.inputText).toBe("test");
});

it('should add an item to the list', () => {
  const e = {
    target: {
      content: "test-list-item",
      listId: "1"
    }
  }

  updateText(e);
  addItem(e);

  const list = findIndexOf(this.state.lists, "1");

  expect(list).toContain({ content: "test-list-item", listId: "1"});
})

it('should display the list items', () => {
  var currentItems;

  var component = render(<List />);

  expect(component).toContain(currentItems);
})
