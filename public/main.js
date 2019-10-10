const saveArticle = (id) => {
    fetch("/api/news", {
        method: 'PUT',
        body: {id: id}
    })
}