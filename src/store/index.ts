// store.ts
import { StatsBase } from 'fs'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0
  },
  mutations:{
    setCount(state:State, count:number){
        state.count = count
    }
  },
  getters:{
      getCount(state:State){
        return state.count
      }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}