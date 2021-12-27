import {immutable} from 'san-update';

let source = {
    name: {
        firstName: 'Navy',
        lastName: 'Wong'
    },
    age: 20,
    children: ['Alice', 'Bob']
};
let target = immutable(source)
    .set('name.firstName', 'Petty')
    .set('age', 21)
    .push('children', 'Cary')
    .value();

console.log(target);
// {
//     name: {
//         firstName: 'Petty',
//         lastName: 'Wong'
//     },
//     age: 21,
//     children: ['Alice', 'Bob', 'Cary']
// }
