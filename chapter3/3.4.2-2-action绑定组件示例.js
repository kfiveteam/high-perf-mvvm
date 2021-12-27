import {store, connect} from 'san-store';

let UserNameEditor = connect.san(
    {name: 'user.name'},
    {change: 'changeUserName'}
)(san.defineComponent({
    submit() {
        // 通过mapActions，可以把dispatch action简化成组件自身的方法调用
        // store.dispatch('changeUserName', this.data.get('name'));
        this.actions.change(this.data.get('name'));
    }
}));
