import { store } from 'san-store';
import { updateBuilder } from 'san-update';
import service from './service';

export const Types = {
    FETCH: 'articleFetch',
    FETCH_FILL: 'articleFetchFill',
    SET_LIST_ITEM: 'articleSetListItem',
    ADD_FAVORITE: 'articleAddFavorite',
    REMOVE_FAVORITE: 'articleRemoveFavorite'
};

store.addAction(Types.FETCH, function (payload, {dispatch}) {
    return service.fetch().then(response => {
        dispatch(Types.FETCH_FILL, response.data);
    });
});

store.addAction(Types.FETCH_FILL, function ({articles, articlesCount}) {
    return updateBuilder()
        .set('articles', articles)
        .set('articleCount', articlesCount)
});

store.addAction(Types.ADD_FAVORITE, function (slug, {dispatch}) {
    return service.addFavorite(slug).then(
        ({data}) => {
            dispatch(Types.SET_LIST_ITEM, data.article);
        }
    );
});

store.addAction(Types.REMOVE_FAVORITE, function (slug, {dispatch}) {
    return service.removeFavorite(slug).then(
        ({data}) => {
            dispatch(Types.SET_LIST_ITEM, data.article);
        }
    );
});

store.addAction(Types.SET_LIST_ITEM, function (article, {getState}) {
    let articles = getState('articles');

    if (articles) {
        for (let i = 0; i < articles.length; i++) {
            if (articles[i].slug === article.slug) {
                return updateBuilder().set('articles[' + i + ']', article);
            }
        }
    }
});





