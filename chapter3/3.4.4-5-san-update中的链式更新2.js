import {immutable} from 'san-update';

let source = {
    name: {
        firstName: 'Navy',
        lastName: 'Wong'
    },
    age: 20,
    children: ['Alice', 'Bob']
};
let updateable = immutable(source);

let nameUpdated = updateable.set('name.firstName', 'Petty');
let ageUpdated = nameUpdated.set('age', 21);

console.log(nameUpdated.value());
// 注意age并没有受影响
//
// {
//     name: {
//         firstName: 'Petty',
//         lastName: 'Wong'
//     },
//     age: 20,
//     children: ['Alice', 'Bob']
// }
