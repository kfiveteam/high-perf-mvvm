import './index.less';
import { connect } from 'san-store';
import { Types as ActionTypes } from '../../action';

export default connect.san(
    {},
    {
        like: ActionTypes.ADD_FAVORITE,
        dislike: ActionTypes.REMOVE_FAVORITE
    }
)({
    template: `
        <div class="article">
            <div class="author">
                <div
                    s-if="author"
                    class="left"
                >
                    <img
                        s-if="author.image"
                        src="{{ author.image }}"
                        class="avatar"
                    >
                    <div class="info">
                        <div
                            s-if="author.username"
                            class="name"
                        >
                            {{ author.username }}
                        </div>
                    </div>
                </div>
                <div
                    class="like {{ favorited ? 'liked' : '' }}"
                    on-click="handleClick"
                >
                    ❤ {{ favoritesCount }}
                </div>
            </div>
            <div
                s-if="title"
                class="title"
            >
                {{ title }}
            </div>
            <div
                s-if="description"
                class="desc"
            >
                {{ description }}
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
            more: '查看更多'
        };
    },
    handleClick: function (e) {
        if (this.data.get('favorited')) {
            this.actions.dislike(this.data.get('slug'));
        }
        else {
            this.actions.like(this.data.get('slug'));
        }
    }
});
