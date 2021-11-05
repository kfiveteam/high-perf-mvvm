const Child = san.defineComponent({
    template: `
        <div>{{ text }}</div>
    `
});

const Parent = san.defineComponent({
    components: {
        'x-child': Child
    },
    initData() {
        return {
            title: 'hello'
        }
    },
    handleClick() {
        this.data.set('title', 'world');
    },
    template: `
        <div on-click="handleClick" class="container">
            <x-child text="{{title}}"></x-child>
        </div>
    `
});

const myApp = new Parent();
myApp.attach(document.body);