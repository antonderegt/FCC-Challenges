import React, { Component } from 'react';
import './Dungeon.css';

let grid = []
let rowLength = 80
let numberOfRows = 40
let totalSquares = rowLength * numberOfRows
let dungeon = 1
let monsterHealth = 10 * dungeon
let health = 100
let life = true
let attack = 5

class Dungeon extends Component {
  constructor(props) {
    super(props)
    grid = this.initialStateRandom()
    this.state = {
      playerAt: rowLength + 1,
      weapon: 'Knuckles',
      level: 1,
      nextXp: 100
    }
    grid[this.state.playerAt] = 'square player'
  }

  initialStateRandom() {
    let initialAray = []
    for(let i = 0; i < totalSquares; i++) {
      if(i < rowLength || (i < totalSquares && i > totalSquares - rowLength)) {
        initialAray.push('square wall')
      } else if( i % rowLength === 0) {
        initialAray.push('square wall')
        initialAray[i-1] = 'square wall'
      } else {
        initialAray.push('square openSpace')
      }
    }

    // Drop random monsters
    for(let i = 0; i < 30; i++) {
      let randomNumber = Math.floor((Math.random() * totalSquares) + 1)
      if(initialAray[randomNumber] !== 'square wall') {
        initialAray[randomNumber] = 'square monster'
      } else {
        i--
      }
    }

    // Drop random weapon
    for(let i = 0; i < 1; i++) {
      let randomNumber = Math.floor((Math.random() * totalSquares) + 1)
      if(initialAray[randomNumber] !== 'square wall') {
        initialAray[randomNumber] = 'square weapon'
      } else {
        i--
      }
    }

    // Drop random health
    for(let i = 0; i < 5; i++) {
      let randomNumber = Math.floor((Math.random() * totalSquares) + 1)
      if(initialAray[randomNumber] !== 'square wall') {
        initialAray[randomNumber] = 'square health'
      } else {
        i--
      }
    }

    return initialAray
  }

  checkSquare(gridNumber) {
    switch (grid[gridNumber]) {
      case 'square health':
        health += 10
        return true
      case 'square weapon':
        let nextWeapon = ''
        if(dungeon === 1) {
          nextWeapon = 'Blade'
          attack = 10
        }
        if(dungeon === 2) {
          nextWeapon = 'Gun'
          attack = 20
        }
        this.setState({
          weapon: nextWeapon
        })
        return true
      case 'square monster':
        return this.fightMonster(gridNumber)
      default:
        return true
    }
  }

  resetGame() {
    grid = this.initialStateRandom()
    this.setState({
      playerAt: rowLength + 1,
      weapon: 'Knuckles',
      attack: '7',
      level: 1,
      nextXp: 100
    })
    dungeon = 1
    monsterHealth = 10 * dungeon
    health = 100
    life = false
    grid[this.state.playerAt] = 'square player'
  }

  fightMonster(gridNumber) {
    monsterHealth -= attack
    health -= 2
    if(health <= 0) {
      alert('You died')
      this.resetGame()
      return false
    }
    if(monsterHealth <= 0) {
      monsterHealth = 10 * dungeon
      return true
    } else {
      return false
    }
  }

  handleKeyDown (event) {
    let currentPlace = this.state.playerAt
    let nextPlace = currentPlace

    switch (event.keyCode) {
      case 39:
        if(currentPlace + 1 < totalSquares && grid[currentPlace + 1] !== 'square wall') {
          if(this.checkSquare(currentPlace + 1)) {
            nextPlace = currentPlace + 1
          }
        }
        break;
      case 37:
        if(currentPlace - 1 >= 0 && grid[currentPlace - 1] !== 'square wall') {
          if(this.checkSquare(currentPlace - 1)) {
            nextPlace = currentPlace - 1
          }
        }
        break;
      case 38:
        if(currentPlace - rowLength >= 0 && grid[currentPlace - rowLength] !== 'square wall') {
          if(this.checkSquare(currentPlace - rowLength)) {
            nextPlace = currentPlace - rowLength
          }
        }
        break;
      case 40:
        if(currentPlace + rowLength < totalSquares && grid[currentPlace + rowLength] !== 'square wall') {
          if(this.checkSquare(currentPlace + rowLength)) {
            nextPlace = currentPlace + rowLength
          }
        }
        break;
      default:

    }

    if(life) {
      grid[currentPlace] = 'square openSpace'
      grid[nextPlace] = 'square player'
    } else {
      life = true
      nextPlace = rowLength + 1
    }

    this.setState({
      playerAt: nextPlace
    })
  }

  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  render() {
    const board = grid.map((square, id) => {
      let createSquare = <div key={id} className={square}></div>
      if((id + 1) % rowLength === 0) {
        createSquare = <div key={id} className="grid"><div className={square}></div></div>
      }
      return createSquare
    })
    return (
      <div>
        <div className="stats">
          <p>Health: {health}</p>
          <p>Weapon: {this.state.weapon}</p>
          <p>Attack: {attack}</p>
          <p>Level: {this.state.level}</p>
          <p>Next level: {this.state.nextXp} xp</p>
          <p>Dungeon: {dungeon}</p>
        </div>
        <div className="container">
          <div className="grid gridBorder">
            { board }
          </div>
        </div>
      </div>
    );
  }
}

export default Dungeon;
