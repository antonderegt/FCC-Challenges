import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as BoxActions from '../actions/add_recipe'
import Box from './box'

class Recipes extends Component {
  render() {
    const RecipeItems = this.props.recipes.map((recipe, idx) => {
     return <li key={idx}>{recipe.name}: {recipe.ingredients}</li>
    })

    return (
      <div >
        <Box addItem={this.props.action.addRecipe} recipes={this.props.recipes}/>
        <h2>List</h2>
        <ol>
          {RecipeItems}
          {console.log('test: ',this.props.recipes[0])}
        </ol>
      </div>
    );
  }
}

function mapStateToProps(state, prop) {
  return {
    recipes: state.recipes.recipes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(BoxActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)
