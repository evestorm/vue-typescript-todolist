import Vue from 'vue';
import Vuex, { Commit } from 'vuex';
import Storage from './utils/storage';

Vue.use(Vuex);

const LOAD_LIST = 'LOAD_LIST'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'
const CLEAR_COMPLETED = 'CLEAR_COMPLETED'

export const TODO_LIST = 'todo-list'

export interface TodoItem {
  id: string,
  title: string,
  desc: string,
  status: boolean,
}

export interface State {
  todo_list: TodoItem[],
}

const initState = {
  todo_list: [],
}

const getters = {
  getList: (state: State) => {
    return (status: boolean | undefined) => {
      if (status) {
        return state.todo_list.filter((v) => v.status === true)
      } else if (status === false) {
        return state.todo_list.filter((v) => v.status === false)
      } else {
        return state.todo_list
      }
    }
  },
  // 如果getters的方法不需要传参，直接采用下面写法：
  // getList: (state: State) => {}
}

const mutations = {
  [LOAD_LIST](state: State, payload: TodoItem[]): void {
    state.todo_list = payload
  },
  [ADD_ITEM](state: State, payload: TodoItem): void {
    state.todo_list.unshift(payload)
  },
  [DELETE_ITEM](state: State, payload: string): void {
    state.todo_list = state.todo_list.filter((v) => v.id !== payload)
  },
  [UPDATE_ITEM](state: State, payload: string): void {
    state.todo_list.map((v) => {
      if (v.id === payload) {
        v.status = !v.status
      }
    })
  },
  [CLEAR_COMPLETED](state: State): void {
    state.todo_list = state.todo_list.filter((v) => !v.status)
  },
}

const actions = {
  loadList(context: {commit: Commit, state: State}, data: TodoItem[]): void {
    context.commit(LOAD_LIST, data)
  },
  addItem(context: {commit: Commit, state: State}, data: TodoItem): void {
    Storage.set(TODO_LIST, [data].concat(context.state.todo_list))
    context.commit(ADD_ITEM, data)
  },
  deleteItem(context: {commit: Commit, state: State}, id: string): void {
    let list = Storage.get<TodoItem>(TODO_LIST)
    if (list) {
      list = list.filter((v) => v.id !== id)
      Storage.set(TODO_LIST, list)
    }
    context.commit(DELETE_ITEM, id)
  },
  updateItem(context: {commit: Commit, state: State}, id: string): void {
    const list = Storage.get<TodoItem>(TODO_LIST)
    if (list) {
      const targetItem = list.find((v) => v.id === id)
      if (targetItem) {
        targetItem.status = !targetItem.status
      }
      Storage.set(TODO_LIST, list)
    }
    context.commit(UPDATE_ITEM, id)
  },
  clearCompleted(context: {commit: Commit, state: State}): void {
    let list = Storage.get<TodoItem>(TODO_LIST)
    if (list) {
      list = list.filter((v) => !v.status)
      Storage.set(TODO_LIST, list)
    }
    context.commit(CLEAR_COMPLETED)
  },
}

export default new Vuex.Store({
  state: initState,
  getters,
  mutations,
  actions,
});
