import {update} from 'san-update';

let source = {
    name: {
        firstName: 'Navy',
        lastName: 'Wong'
    }
};
let target = update(source, {name: {firstName: {$set: 'Petty'}}});

console.log(target);
// {
//     name: {
//         firstName: 'Petty',
//         lastName: 'Wong'
//     }
// }
