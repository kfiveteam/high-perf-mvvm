import './index.less'

export default {
  template: `
        <div class="article">
            <div class="author">
                <div
                    s-if="author"
                    class="left"
                >
                    <img
                        s-if="author.avatar"
                        src="{{ author.avatar }}"
                        class="avatar"
                    >
                    <div class="info">
                        <div
                            s-if="author.name"
                            class="name"
                        >
                            {{ author.name }}
                        </div>
                        <div
                            s-if="author.date"
                            class="date"
                        >
                            {{ author.date }}
                        </div>
                    </div>
                </div>
                <div
                    class="like"
                    on-click="handleClick"
                >
                    ❤ {{ likeNum }}
                </div>
            </div>
            <div
                s-if="title"
                class="title"
            >
                {{ title }}
            </div>
            <div
                s-if="desc"
                class="desc"
            >
                {{ desc }}
            </div>
            <div
                s-if="more"
                class="more"
            >
                {{ more }}
            </div>
        </div>
    `,
  initData: function () {
    return {
      title: '文章标题',
      desc: '文章描述',
      more: '查看更多',
      likeNum: 0,
      author: {
        avatar: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        name: '用户名',
        date: 'July 6, 2021'
      }
    }
  },
  handleClick: function (e) {
    // console.log('handleClick', e);
    let likeNum = this.data.get('likeNum')
    likeNum++
    this.data.set('likeNum', likeNum)
  }
}
