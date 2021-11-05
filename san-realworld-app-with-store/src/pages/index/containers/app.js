/**
 * @file 容器组件
 * @author waka
 */

import { Component } from 'san';
import './app.less';
import Header from '@components/header';
import ArticleList from '@components/article-list';
import { connect } from 'san-store';
import { Types as ActionTypes } from '../../../action';

export default connect.san({},
    {
        fetch: ActionTypes.FETCH
    }
)(class App extends Component {

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

    attached() {
        this.actions.fetch();
    }
});
