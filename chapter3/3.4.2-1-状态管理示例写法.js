import {store, connect} from 'san-store';

// 写法一
let connector = connect.san(
    {name: 'user.name'}
);
let NewUserNameEditor = connector(UserNameEditor);


// 写法二
let UserNameEditor = connect.san(
    {name: 'user.name'}
)(san.defineComponent({
    // ...
}));