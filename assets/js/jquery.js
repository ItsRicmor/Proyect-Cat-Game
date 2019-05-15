$(document).ready(function () {
    $('.box').on('click', function () {
        let hasClassX = $(this).hasClass('img-x')
        if (hasClassX) {
            $(this).removeClass('img-x')
            $(this).addClass('img-o')
        } else {
            $(this).removeClass('img-o')
            $(this).addClass('img-x')
        }
    })
});