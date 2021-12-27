san.defineComponent({
    template: '<a>{{name}}</a>',

    // name数据项由firstName和lastName计算得来
    computed: {
        name: function () {
            return this.data.get('firstName') + ' ' + this.data.get('lastName');
        }
    }
});
