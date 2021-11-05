import './index.less';

export default {
    template: `
        <div class="header">
            <div class="title">
                {{ title }}
            </div>
        </div>
    `,
    initData: function () {
        return {
            title: 'Blog'
        };
    }
};
