import React, { Component } from 'react'
import './App.css'

const API_URL = `https://swapi.co/api/films`

class App extends Component {
  state = { titles: [] }

  async componentDidMount() {
    const request = await fetch(API_URL)
    const json = await request.json()
    // this.setState({ data: json.results })  -- left here only to remember
    const arrTitles = json.results.map(item => {
      return {
        isSelected: false,
        title: item.title
      }
    })
    this.setState({ titles: arrTitles })
  }

  handleSelected = e => {
    const title = e.target.value
    const filterTitle = this.state.titles.filter(item => {
      if (item.title === title) item.isSelected = !item.isSelected
      return item
    })
    this.setState({ titles: filterTitle })
  }

  render() {
    if (this.state.data.length < 1) return <div />
    const { titles } = this.state
    return (
      <div>
        <select onChange={this.handleSelected}>
          <option key="0">Selecione</option>
          {titles.map(
            item =>
              !item.isSelected && <option key={item.title}>{item.title}</option>
          )}
        </select>
        <div>
          <ul>
            {titles.map(
              item =>
                item.isSelected && (
                  <li key={item.title}>
                    {item.title}{' '}
                    <button
                      type="button"
                      onClick={this.handleSelected}
                      value={item.title}
                    >
                      x
                    </button>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
