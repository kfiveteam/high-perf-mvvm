import {builder} from 'san-update';
// 也可以使用以下别名，均为同一个函数
// import {macro} from 'san-update';
// import {updateBuilder} from 'san-update';

let source = {
    name: {
        firstName: 'Navy',
        lastName: 'Wong'
    }
};

let update = builder().set('name.firstName', 'Petty').build();
let target = update.withDiff(source);
// 也可以这么写：
// let withDiff = builder().set('name.firstName', 'Petty').buildWithDiff();
// let target = withDiff(source);

console.log(target);
// {
//     name: {
//         firstName: 'Petty',
//         lastName: 'Wong'
//     }
// }

console.log(diff);
// {
//     name: {
//         firstName: {
//             $change: 'change',
//             oldValue: 'Navy',
//             newValue: 'Petty'
//         }
//     }
// }
