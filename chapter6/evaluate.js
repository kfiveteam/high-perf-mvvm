/**
* @file evaluate.js
**/
module.exports = (exp, data) => {
    /* eslint-disable no-new-func */
    const fn = new Function('data', 'with (data) { return ' + exp + '}');
    try {
        return fn(data);
    } catch (e) {
        console.error(`Error when evaluating filter condition: ${exp}`);
    }
};
