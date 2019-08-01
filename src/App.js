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

  deleteButton = id => { //id should be a letter
    const cards = {...this.state.allCards};
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
      allCards: cards,
      lists: newLists
    });
  }

  newRandomCard = () => {
    const id = Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }
  }

  addNewCard = id => {
    const newCard = this.newRandomCard();

    const newList = this.state.lists.map(list => {
      if(list.id === id){
        list.cardIds.push(newCard.id);
      }
      return list;
    })

    this.setState({
      allCards: {...this.state.allCards, [newCard.id]:newCard},
      lists: newList
    });
  }

  render() {
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
              deleteButton={this.deleteButton}
              addNewCard={this.addNewCard}
              id={list.id} // is there a way to get the 'Key' as a prop
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
