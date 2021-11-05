/**
 * @file san store 类的基本封装
 */

import { Store, connect as sanConnect } from 'san-store'

const createConnector = sanConnect.createConnector

class NewStore extends Store {
  /**
     * 初始化数据
     * @param {Object} data 初始化数据
     */
  initData (data) {
    // 这里有风险，如果 store 类的实现变了名称，会影响
    // 升级注意！
    if (typeof data === 'object') {
      const raw = this.raw

      Object.keys(data).forEach(name => {
        if (raw[name]) {
          throw new Error('Store.initData: ' + name + ' exists!')
        } else {
          // console.log(name)
          raw[name] = data[name]
        }
      })
    }
    return this
  }

  /**
     * 批量添加 action
     * @param  {Object} actions 添加的 action 数据，key：function
     */
  addActions (actions) {
    const addAction = this.addAction.bind(this)
    if (typeof actions === 'object') {
      Object.keys(actions).forEach(name => {
        addAction(name, actions[name])
      })
    } else {
      throw new Error('Store.addActions: actions type should be an object')
    }
    return this
  }
}

/**
 * 默认的全局 Store 实例
 * 通常我们认为在一个应用应该具有一个全局唯一的 store，管理整个应用状态
 *
 * @type {Store}
 */
export const store = new NewStore({ name: '__default__' })

export { Store }

export const connect = {
  san: createConnector(store),
  createConnector
}
