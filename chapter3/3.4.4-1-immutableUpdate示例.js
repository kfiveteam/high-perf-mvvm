// 方法一
function immutableUpdate(state) {
    return {
        ...state
    };
}

// 方法二
function immutableUpdate(state) {
    return {
        ...state,
        a: {
            ...state.a,
            b: {
                ...state.a.b,
                c: xxx
            }
        }
    };
}

// 方法三
function immutableUpdate(state) {
    const newArr = state.arr.slice();

    // 调用push、shift、splice等方法，对newArr进行修改

    return {
        ...state,
        arr: newArr
    }
}

// 方法四
function immutableUpdate(state) {
    const newState = deepClone(state);
    newState.a.b.c = 1;
    return newState;
}

