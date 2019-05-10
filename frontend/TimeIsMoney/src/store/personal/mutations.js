import Vue from 'vue'
export const SET_ALERTS = 'SET_ALERTS'
export const CHANGE_STATUS = 'CHANGE_STATUS'

export default{
  [SET_ALERTS]  (state, alerts) {
      state.mailReceive = alerts
  },
  [CHANGE_STATUS] (state, index) {
      let temp = state.mailReceive[index]
      temp.status = 'default'
      Vue.set(state.mailReceive, index, temp)
  }
}