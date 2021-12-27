import {immutable} from 'san-update';
// 也可以使用以下别名，为同一个函数
// import {chain} from 'san-update';

let source = {
    name: {
        firstName: 'Navy',
        lastName: 'Wong'
    },
    age: 20,
    children: ['Alice', 'Bob']
};

let target = immutable(source)
    .set('ownedCar', {brand: 'Benz'})
    .merge('ownedCar', {type: 'C Class'})
    .value();
// 注意ownedCar.type并没有生效
//
// {
//     name: {
//         firstName: 'Navy',
//         lastName: 'Wong'
//     },
//     age: 20,
//     children: ['Alice', 'Bob'],
//     ownedCar: {
//         brand: 'Benz'
//     }
// }
