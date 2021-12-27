store.addAction('addArticle', function (article) {
    return axios.post(url, article);
});
