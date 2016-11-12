$(function () {
    const search =  $('.search')
    search.find(".search__button").on('click', function (event) {        
        search.find(".search__results").toggleClass("search__results_hidden")
    })
})
