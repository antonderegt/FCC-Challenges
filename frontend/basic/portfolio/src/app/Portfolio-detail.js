import React from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import Subheader from 'material-ui/Subheader'

const PortfolioDetail = (props) => (
  <div style={props.styles.container}>
    <div style={props.styles.root}>
      <GridList cellHeight={180}>
        <Subheader>Click on a project to get detailed information</Subheader>
        {props.tilesData.map(tile => (
          <GridTile
            key={tile.img}
            title={tile.title}
            subtitle={<span>by <b>{tile.author}</b></span>}
            onTouchTap={() => {props.onTouchTap(tile.title)}}
          >
            <img src={tile.img} />
          </GridTile>
        ))}
      </GridList>
    </div>
  </div>
)

export default PortfolioDetail
