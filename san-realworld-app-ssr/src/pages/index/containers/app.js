/**
 * @file 容器组件
 * @author waka
 */

import { Component } from 'san'
import './app.less'
import Header from '@components/header'
import ArticleList from '@components/article-list'

export default class App extends Component {
    static components = {
      'ui-header': Header,
      'ui-article-list': ArticleList
    }

    static template = `
        <div class="main">
            <ui-header/>
            <div class="article-list-wrapper">
                <ui-article-list/>
            </div>
        </div>
    `;

    initData () {
      return {
      }
    }
}
