$( document ).ready(function() {
    
    var answer = -1;
        
    var nextQuestion = function() {
        if(answer >= 0) {
            var eOld = $(".answer").eq(answer);
            eOld.parent().removeClass("current");
        }
        answer ++;
        //answer = answer % $(".answer").length; // Loops
        answer = Math.min(answer , $(".answer").length - 1);
        var eAnswer = $(".answer").eq(answer);
        eAnswer.show();
        eAnswer.addClass("answered");
        eAnswer.parent().addClass("current");
        
        var fTop = eAnswer.offset().top;
        var fTarget = Math.max(0, fTop + (eAnswer.height()/2) - ($( window ).height() / 2));
        $(document).scrollTop(fTarget);
    };
        
    var startPresentation = function() {
        $(".answer").hide();
        $("body").addClass("presentation");
        
        $(document).scrollTop(0);
        $("body").keypress(function(event){
            if(event.key === "`") {
                nextQuestion();
            }
        }).click(function(event){
            nextQuestion();
        });
    };
    
    var stopPresentation = function() {
        $(".answer").show();
        $("body").removeClass("presentation");
        $(".current").removeClass("current");
        $(".answered").removeClass("answered");
    };        
    
    var togglePresentation = function() {
        if(localStorage.getItem("sPresentation") === "Started") {
            localStorage.setItem("sPresentation", "Stopped");
            stopPresentation();
            $("#start_presentation").html("Start Presentation Mode");
        } else {
            localStorage.setItem("sPresentation", "Started");
            startPresentation();
            $("#start_presentation").html("Exit Presentation Mode");
        }
    };
        
    if(localStorage.getItem("sPresentation") === "Started") {
        startPresentation();
        $("#start_presentation").html("Exit Presentation Mode");
    }
    
    $("#start_presentation").click(togglePresentation);
    
});
