// Vue 2.0 中的依赖监听代码
function defineReactive(obj, key, value) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        set: function reactiveSetter(newVal) {

            if (newVal === value || (newVal !== newVal && value !== value)) {
                return;
            }

            value = newVal;

            // 在这里响应数据变化，触发视图更新等操作。
            // dep.notify()
            console.log('data changed');
        }
    })
}


var data = {};

defineReactive(data, 'a', 123);

data.a = 456;