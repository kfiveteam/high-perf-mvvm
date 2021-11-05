if (typeof require !== 'undefined') {
  var san = require("san");
}

var App = san.defineComponent({
    initData() {
        return {
            title: 'Click the button!',
            clickCount: 0
        }
    },
    handleClick() {
        let count = this.data.get('clickCount');
        this.data.set('clickCount', count + 1);
    },
    template: `
        <div id="root" class="container">
            <h1>{{title}}</h1>
            <p>{{name}} clicked {{clickCount}} times</p>
            <button on-click="handleClick">Click Here</button>
        </div>
    `
});
if (typeof module !== 'undefined') {
  module.exports = App;
}
