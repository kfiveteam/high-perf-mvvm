import {builder} from 'san-update';

store.addAction('initCount', function (count, {getState}) {
    if (getState('count') == null) {
        return builder().set('count', count);
    }
});

store.dispatch('initCount', 10);
