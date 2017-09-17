var carService = (function(){

    function init(){

        bindEvent();
    }

    function bindEvent(){
        //切換
        $("#page .content .my-item").on("click", function(){
           if($(this).is(".disable")) return;
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
        });
    }

    return {
      init: init
    };
})();

$(function(){
    carService.init();
});