import React, { Component } from 'react';
import './Dungeon.css';

let grid = []
let rowLength = 80
let numberOfRows = 40
let totalSquares = rowLength * numberOfRows
let dungeon = 1
let monsterHealth = 10
let bossHealth = 100
let health = 100
let life = true
let attack = 5
let level = 1
let nextXp = 100
let weapon = 'Knuckles'

class Dungeon extends Component {
  constructor(props) {
    super(props)
    grid = this.initialStateRandom()
    let startSpot = this.emptySpot()
    this.state = {
      playerAt: startSpot
    }
    this.view(this.state.playerAt)
    grid[this.state.playerAt] = 'square player'
  }

  view(currentSpot) {
    grid = grid.map((grid, id) => {
      let temp = grid.split(' ')
      if(temp[2] !== 'dark') {
        return grid + ' dark'
      } else {
        return grid
      }
    })

    for(let i = 0; i < 10; i++) {
      for(let j = (currentSpot - ((5-i)*rowLength) - 5); j < (currentSpot - ((5-i)*rowLength) + 5); j++) {
        if(j >= 0 && j <= totalSquares) {
          let temp = grid[j].split(' ')
          grid[j] = temp[0] + ' ' + temp[1]
        }
      }
    }
  }

  emptySpot() {
    let randomNumber = Math.floor((Math.random() * totalSquares))
      if(grid[randomNumber] === 'square openSpace') {
        return randomNumber
      } else {
        return this.emptySpot()
      }
  }

  initialStateRandom() {
    let initialAray = []
    for(let i = 0; i < totalSquares; i++) {
      initialAray.push('square wall')
    }

    // Path 1 Horizontal
    for(let i = (10+ (5*rowLength)); i < (35*rowLength); i+=rowLength) {
      initialAray[i] = 'square openSpace'
    }

    // Path 2 Horizontal
    for(let i = (40+ (5*rowLength)); i < (35*rowLength); i+=rowLength) {
      initialAray[i] = 'square openSpace'
    }

    // Path 3 Horizontal
    for(let i = (70+ (5*rowLength)); i < (35*rowLength); i+=rowLength) {
      initialAray[i] = 'square openSpace'
    }

    // Path 4 Vertical
    for(let i = (10+ (7*rowLength)); i < ((8*rowLength)-10); i++) {
      initialAray[i] = 'square openSpace'
    }

    // Path 5 Vertical
    for(let i = (10+ (20*rowLength)); i < ((21*rowLength)-10); i++) {
      initialAray[i] = 'square openSpace'
    }

    // Path 6 Vertical
    for(let i = (10+ (33*rowLength)); i < ((34*rowLength)-10); i++) {
      initialAray[i] = 'square openSpace'
    }


    // Array, width, height, xOffset, yOffset
    // Room 1
    initialAray = this.randomRoom(initialAray, 15, 10, 5, 5)
    // Room 2
    initialAray = this.randomRoom(initialAray, 10, 5, 5, 20)
    //Room 3
    initialAray = this.randomRoom(initialAray, 20, 8, 7, 28)
    // Room 4
    initialAray = this.randomRoom(initialAray, 10, 10, 35, 5)
    // Room 5
    initialAray = this.randomRoom(initialAray, 10, 5, 35, 18)
    // Room 6
    initialAray = this.randomRoom(initialAray, 10, 10, 35, 26)
    // Room 7
    initialAray = this.randomRoom(initialAray, 12, 11, 63, 5)
    // Room 8
    initialAray = this.randomRoom(initialAray, 19, 9, 55, 20)
    // Room 9
    initialAray = this.randomRoom(initialAray, 8, 3, 65, 32)


    // Drop random monsters
    for(let i = 0; i < 15; i++) {
      let randomNumber = Math.floor((Math.random() * totalSquares))
      if(initialAray[randomNumber] !== 'square wall') {
        initialAray[randomNumber] = 'square monster'
      } else {
        i--
      }
    }

    // Drop random weapon
    for(let i = 0; i < 1; i++) {
      let randomNumber = Math.floor((Math.random() * totalSquares))
      if(initialAray[randomNumber] !== 'square wall') {
        initialAray[randomNumber] = 'square weapon'
      } else {
        i--
      }
    }

    // Drop random door
    if(dungeon < 4) {
      for(let i = 0; i < 1; i++) {
        let randomNumber = Math.floor((Math.random() * totalSquares))
        if(initialAray[randomNumber] !== 'square wall') {
          initialAray[randomNumber] = 'square door'
        } else {
          i--
        }
      }
    }

    // Drop random health
    for(let i = 0; i < 5; i++) {
      let randomNumber = Math.floor((Math.random() * totalSquares))
      if(initialAray[randomNumber] !== 'square wall') {
        initialAray[randomNumber] = 'square health'
      } else {
        i--
      }
    }

    return initialAray
  }

  randomRoom(arr, width, height, xOffset, yOffset) {
    for(let i = 0; i < height; i++) {
      for(let j = (xOffset + ((yOffset+i) * rowLength)); j < (xOffset+ width + (yOffset+i) * rowLength); j++) {
        arr[j] = 'square openSpace'
      }
    }
    return arr
  }

  checkSquare(gridNumber) {
    switch (grid[gridNumber]) {
      case 'square health':
        health += 10
        return true
      case 'square weapon':
        switch (dungeon) {
          case 1:
            weapon = 'Blade'
            attack = 10
            break;
          case 2:
            weapon = 'Gun'
            attack = 20
            break;
          case 3:
            weapon = 'Paper Cut'
            attack = 40
            break;
          case 4:
            weapon = 'Water Balloons'
            attack = 50
            break;
          default:
        }
        return true
      case 'square monster':
        return this.fightMonster(gridNumber)
      case 'square boss':
        return this.fightBoss(gridNumber)
      case 'square door':
        return this.nextLevel()
      default:
        return true
    }
  }

  fightMonster(gridNumber) {
    monsterHealth -= attack * 0.45 + Math.floor(Math.random() * level)
    health -= Math.floor(Math.random() * dungeon) + dungeon
    if(health <= 0) {
      alert('You died')
      this.resetGame()
      return false
    } else if(monsterHealth <= 0) {
      monsterHealth = 10 * dungeon
      nextXp -= monsterHealth
      if(nextXp <= 0) {
        level++
        nextXp = 100 * level
      }
      return true
    } else {
      return false
    }
  }

  fightBoss(gridNumber) {
    bossHealth -= (10*(level-2)) + Math.floor(Math.random() * level)
    health -= 15 + Math.floor(Math.random() * 5)
    if(health <= 0) {
      alert('You died')
      this.resetGame()
      return false
    } else if(bossHealth <= 0) {
      this.resetGame()
      alert('You won!')
      return true
    } else {
      return false
    }
  }

  nextLevel() {
    dungeon++
    grid = this.initialStateRandom()
    if(dungeon >= 4) {
      // Drop The Boss
      for(let i = 0; i < 1; i++) {
        let randomNumber = Math.floor((Math.random() * totalSquares))
        if(grid[randomNumber] !== 'square wall' && grid[randomNumber + 1] !== 'square wall' && grid[randomNumber + rowLength] !== 'square wall' && grid[randomNumber + 1 + rowLength] !== 'square wall') {
          grid[randomNumber] = 'square boss'
          grid[randomNumber + 1] = 'square boss'
          grid[randomNumber + rowLength] = 'square boss'
          grid[randomNumber + rowLength + 1] = 'square boss'
        } else {
          i--
        }
      }
    }
    monsterHealth = 10 * dungeon
    life = false
    nextXp -= 50
    if(nextXp <= 0) {
      level++
      nextXp = 100 * level
    }
    return false
  }

  resetGame() {
    dungeon = 1
    grid = this.initialStateRandom()
    monsterHealth = 10
    health = 100
    life = false
    attack = 5
    level = 1
    nextXp = 100
    weapon = 'Knuckles'
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
      grid[currentPlace] = 'square openSpace'
      nextPlace = this.emptySpot()
      grid[nextPlace] = 'square player'
    }

    this.view(nextPlace)


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
          <p>Weapon: {weapon}</p>
          <p>Attack: {attack}</p>
          <p>Level: {level}</p>
          <p>Next level: {nextXp} xp</p>
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
