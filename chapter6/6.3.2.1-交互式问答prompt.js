/**
* @file prompt.js
*/

// ❶
// const prompts = require('prompts');
// const meta = require('./meta.js');
// (async () => {
//     const answers = {};
//     const keys = Object.keys(meta.prompts);
//     let name;
//     while ((name = keys.shift())) {        // ❶
//         const question = {          
//             name,
//             ...meta.prompts[name]
//         };
//         const response = await prompts(question);
//         answers[name] = response[name];
//     }
//     console.log('你的回答: ', answers);
// })();


// ❸
const prompts = require('prompts');
const evaluate = require('./evaluate.js');
const meta = require('./meta.js');
(async () => {
    const answers = {};
    const keys = Object.keys(meta.prompts);
    let name;
    while ((name = keys.shift())) {        
        const question = {
            name,
            ...meta.prompts[name]
        };
        // 当 when 起作用的时候跳过
        if (question.when && !evaluate(question.when, answers)) {
            continue;
        }
        const response = await prompts(question);
        answers[name] = response[name];
    }
    console.log('你的回答: ', answers);
})();
