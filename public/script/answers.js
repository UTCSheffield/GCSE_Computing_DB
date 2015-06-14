$( document ).ready(function(){
    $("#start_presentation").click(function(){
        $(".answer").hide();
        $("body").addClass("presentation");
        var answer = -1;
        $(document).scrollTop(0);
        $("body").keypress(function(event){
            if(event.key === "`") {
                if(answer >= 0) {
                    var eOld = $(".answer").eq(answer);
                    eOld.parent().removeClass("current");
                }
                answer ++;
                answer = answer % $(".answer").length;
                var eAnswer = $(".answer").eq(answer);
                eAnswer.show();
                eAnswer.addClass("answered");
                eAnswer.parent().addClass("current");
                
                var fTop = eAnswer.offset().top;
                var fTarget = Math.max(0, fTop + (eAnswer.height()/2) - ($( window ).height() / 2));
                $(document).scrollTop(fTarget);
            }
        });
    });
});
