import * as types from './mutation-types'
import axios from 'axios'

export const getStock = ({commit}, symbol) => {
  axios.get(`/api/stock/symbol/${symbol}`)
  .then(response => {
    let newStock = {
      symbol: response.data.dataset_code,
      data: response.data.data
    }
    commit(types.GET_STOCK, newStock)
  })
}

export const getStocks = ({commit}) => {
  axios.get(`/api/stock/`)
  .then(response => {
    response.data.map(stock => {
      axios.get(`/api/stock/symbol/${stock.symbol}`)
      .then(response => {
        let newStock = {
          symbol: response.data.dataset_code,
          data: response.data.data
        }
        commit(types.GET_STOCK, newStock)
      })
    })
  })
}

export const resetStocks = ({commit}) => {
  commit(types.RESET_STOCKS)
}

export const deleteStock = ({commit}, symbol) => {
  axios.post(`/api/stock/delete/${symbol}`)
  .then(response => {
    commit(types.DELETE_STOCK, response.data.symbol)
  })
}
