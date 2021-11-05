import './index.less'
import Article from '@components/article'

export default {
  components: {
    'ui-article': Article
  },
  template: `
        <div>
            <ui-article
                s-for="item in list"
            />
        </div>
    `,
  initData: function () {
    return {
      list: [
        {}, {}, {}, {}
      ]
    }
  }
}
