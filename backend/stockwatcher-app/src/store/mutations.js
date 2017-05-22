import * as types from './mutation-types'

export const mutations = {
  [types.GET_STOCK] (state, stock_payload) {
    state.stocks.push(stock_payload)
  },
  [types.RESET_STOCKS] (state, stock_payload) {
    state.stocks = []
  },
  [types.DELETE_STOCK] (state, stock_payload) {
    state.stocks = state.stocks.filter(stock => {
      if(stock.symbol !== stock_payload) {
        return stock
      } else {
        return
      }
    })
  }
}
