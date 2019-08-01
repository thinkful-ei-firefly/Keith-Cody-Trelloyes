import React, { Component } from 'react';
import List from './List'
import './App.css';

class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };

  state = {
    lists: this.props.store.lists,
    allCards: this.props.store.allCards
  };

  deleteButton = id =>{ //id should be a letter
    console.log(id);
    const cards = this.state.allCards;
    delete cards[id];
    const newLists = this.state.lists.map(list => {
      const newCards = list.cardIds.filter(cardId => cardId !== id)
      return {
        id: list.id,
        header: list.header,
        cardIds: newCards
      }
    });
    this.setState({
      lists: newLists,
      allCards: cards
    });
  }

  newCardButton(){

  }

  render() {
    console.log(this.state);
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.allCards[id])}
              deleteButton = {this.deleteButton}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
