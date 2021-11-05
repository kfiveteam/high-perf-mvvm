import { articles } from './data';

export default {
    fetch() {
        return Promise.resolve({
            data: {
                articles,
                articlesCount: articles.length
            }
        });
    },

    addFavorite(slug) {
        const article = articles.find(item => item.slug === slug);
        return Promise.resolve({
            data: {
                article: {
                    ...article,
                    favorited: true,
                    favoritesCount: article.favoritesCount + 1
                }
            }
        });
    },

    removeFavorite(slug) {
        const article = articles.find(item => item.slug === slug);
        return Promise.resolve({
            data: {
                article: {
                    ...article,
                }
            }
        });
    }
}