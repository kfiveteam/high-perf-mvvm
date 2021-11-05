
/**
 * @file index
 */

import AppComponent from './containers/app'

// 使用下面的代码使用 SSR
// eslint-disable-next-line
new AppComponent({ el: document.querySelector('#app .main') })

// 使用下面的代码使用 CSR
// import { defineComponent } from 'san'
// eslint-disable-next-line
// new AppComponent().attach(document.querySelector('#app'))
