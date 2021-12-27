import {builder} from 'san-update';

store.addAction('changeUserName', function (name) {
    return builder().set('user.name', name);
});

// 通过名称dispatch
store.dispatch('changeUserName', 'erik');
