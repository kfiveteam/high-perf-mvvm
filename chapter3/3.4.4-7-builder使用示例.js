import {builder} from 'san-update';
// 也可以使用以下别名，均为同一个函数
// import {macro} from 'san-update';
// import {updateBuilder} from 'san-update';

// 构建一个用于升级当前角色的函数
let levelUp = builder()
    .apply('level', level => level + 1)
    .apply('hp', hp => Math.round(hp * 1.19)) // 增加19%的HP
    .apply('str', str => str + 2) // 增加2点力量
    .apply('int', int => int + 1) // 增加1点智力
    .apply('agi', agi => agi + 5) // 增加5点敏捷
    .apply('bag.capacity', capacity => capacity + 2) // 背包增加2格空间
    .set('debuff', []) // 清除所有负面状态
    .build(); // 最终生成更新的函数

let hero = game.getMyHero();
console.log(hero);
// {
//     level: 1,
//     hp: 100,
//     str: 4,
//     int: 2,
//     agi: 5,
//     bag: {
//         items: [],
//         capacity: 12
//     },
//     debuff: []
// }

hero = levelUp(hero);
console.log(hero);
// {
//     level: 2,
//     hp: 119,
//     str: 6,
//     int: 3,
//     agi: 10,
//     bag: {
//         items: [],
//         capacity: 14
//     },
//     debuff: []
// }

hero = levelUp(hero);
console.log(hero);
// {
//     level: 3,
//     hp: 142,
//     str: 8,
//     int: 4,
//     agi: 15,
//     bag: {
//         items: [],
//         capacity: 16
//     },
//     debuff: []
// }
