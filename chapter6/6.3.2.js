const prompts = require('prompts');
const question = require('./question');

(async () => {
    // const response = await prompts({
    //     name: 'cssPreprocessor',
    //     type: 'select',
    //     message: '选择 CSS 预处理器',
    //     choices: [
    //         {
    //             title: 'Less（推荐）',
    //             value: 'less'
    //         },
    //         {
    //             title: 'Sass',
    //             value: 'sass'
    //         },
    //         {
    //             title: 'Stylus',
    //             value: 'stylus'
    //         }
    //     ]
    // });
    // console.log(`你选择了: ${response.cssPreprocessor}`);


    const response = await prompts(question);
    console.log({response});
})();
