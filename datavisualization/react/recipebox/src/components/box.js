import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import ModalViewer from './modal'

class Box extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: this.getRecipeNames(),
      showModal: false,
      titleVal: '',
      ingredientsVal: ''
    }
  }

// @TODO Let the reducer do this
  getRecipeNames() {
    if(localStorage.getItem('recipes') === null) {
      let recipes = [
        {"name":"Spaghetti", "ingredients": "Meat, Pasta"},
        {"name":"Bread", "ingredients": "Dough, Salt"},
      ]
      localStorage.setItem('recipes', JSON.stringify(recipes))
      this.addButton('Spaghetti', "Meat, Pasta")
      this.addButton('Bread', "Dough, Salt")
      return ['Spaghetti', 'Bread']
    } else {
      let localRecipes = JSON.parse(localStorage.getItem('recipes'))
      let localRecipeNames = localRecipes.map(recipe => {
        return recipe.name
      })
      return localRecipeNames
    }
  }

  getIngredients(name) {
    let localRecipes = JSON.parse(localStorage.getItem('recipes'))
    let localIngredients = localRecipes.map(recipe => {
      if(recipe.name === name) {
        return recipe.ingredients
      } else {
        return ''
      }
    })
    return localIngredients
  }

  close() {
    this.setState({
      showModal: false,
      titleVal: '',
      ingredientsVal: ''
    })
  }

  open(recipe = '', ingredients = '') {
    this.setState({
      showModal: true,
      titleVal: recipe,
      ingredientsVal: ingredients
    })
  }

  save() {
    this.close()
    this.addButton(this.state.titleVal, this.state.ingredientsVal)
  }

  getValidationState() {
    const length = this.state.ingredientsVal.length;
    if (length > 1) return 'success';
    else if (length > 0) return 'warning';
    else if (length === 0) return 'error';
  }

  handleChange(e, type) {
    type === 'title' ? (
      this.setState({
        titleVal: e.target.value
      })
    ) : (
      this.setState({
        ingredientsVal: e.target.value
      })
    )
  }

  addButton(title, ingredients) {
    this.props.addItem(title, ingredients)
  }

  render() {
    const recipes = this.state.recipes.map((recipe, idx) => {
      let ingredients = this.getIngredients(recipe)
      return <li key={idx}><Button
        bsStyle="primary"
        onClick={() => this.open(recipe, ingredients)}>Edit</Button>{recipe}</li>
    })

    return (
      <div>
        <h2>Box</h2>
        <ul>
          {recipes}
        </ul>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={() => this.open()}
          >
          Add Recipe
        </Button>

        <ModalViewer
          showModal={this.state.showModal}
          titleVal={this.state.titleVal}
          ingredientsVal={this.state.ingredientsVal}
          handleChange={e => this.handleChange(e, 'title')}
          handleChangeI={e => this.handleChange(e, 'ingredients')}
          getValidationState={() => this.getValidationState()}
          close={() => this.close()}
          save={() => this.save()}
          />

      </div>
    )
  }
}

export default Box
