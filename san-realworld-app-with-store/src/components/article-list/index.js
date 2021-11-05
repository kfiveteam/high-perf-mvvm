import './index.less';
import Article from '@components/article';
import { connect } from 'san-store';

export default connect.san(
    {
        list: 'articles'
    }
)({
    components: {
        'ui-article': Article
    },
    template: `
        <div>
            <ui-article
                s-for="item in list"
                s-bind="{{ item }}"
            />
        </div>
    `
});
