it('should update the text', () => {
  const e = {
    target: {
      value: "test"
    }
  }

  updateText(e);

  expect(this.state.inputText).toBe("test");
});

it('should add a list to the main list', () => {
  const e = {
    target: {
      value: "test-list-name"
    }
  }

  updateText(e);
  createRoom(e);

  expect(this.state.lists).toContain({ name: "test-list-name"});
})

it('should update the active list', () => {
  this.props.activateList(1, "test");
  expect(this.state.activeList).toBe("test");
})
