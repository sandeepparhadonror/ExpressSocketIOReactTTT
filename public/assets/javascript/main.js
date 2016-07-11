document.ready(function(){

    //pages
    var $enter = $("#enter-page"),
        $waiting = $("#waiting-page"),
        $game = $("#game-page"),
        $result = $("#result-page");

        function switchPage(page) {
            $('.page').css({
                'display': 'none'
            });
            page.css({
                'display': 'block'
            });
        }


    // Init app
    switchPage($enter);

});
