$(function(){
    
//logic of the game
//variables
    var mode = 0;//App mode(true,false or 1,0)
    var timeCounter = 0;//time counter
    var lapCounter = 0;//lap counter
    var action;//variable for setInterval
    var lapNumber = 0;//Number of Laps
    //minutes,seconds,centirseconds for time and lap
    var timeMinutes,timeSeconds,timeCentiseconds,
        lapMinutes,lapSeconds,lapCentiseconds
    
//On App load show start and lap buttons
    hideShowButtons("#startButton","#lapButton");
    
//click on startButton
    $("#startButton").click(function(){
    //mode on
    mode = 1;
    //show stop and lap buttons
    hideShowButtons("#stopButton","#lapButton");
    //start counter
    startAction();
    });

//click on stopButton
    $("#stopButton").click(function(){
    //show resume and reset buttons
hideShowButtons("#resumeButton","#resetButton");   
    //stop counter    
    clearInterval(action);
    });


//click on resumeButton
    $("#resumeButton").click(function(){
    //show stop and lap button
hideShowButtons("#stopButton","#lapButton");   
    //start counter 
    startAction();
    });    

//click on resetButton
    $("#resetButton").click(function(){
    //reload the page
        location.reload();
    });  
    
//click on lapButton
    $("#lapButton").click(function(){
    //if mode is ON
        if (mode){
        //stop action
            clearInterval(action);
        //resetLap and print lap details
            lapCounter = 0; //reset lapcounter
            addLap();
        //start action
            startAction();
        }
    });  

//functions
    //hide and show Buttons
    function hideShowButtons(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    
    //starting the time and lap counters
    function startAction(){
        action = setInterval(function(){
                timeCounter++;
    //checking if timeCounter has crossed 100 minutes
            if (timeCounter == 100*60*100) {
                timeCounter = 0;
            }
                lapCounter++;
            
    //checking if lapCounter has crossed 100 minutes
            if (lapCounter == 100*60*100) {
                lapCounter = 0;
             }
                updateTime();
        },10) //1cs goes up by 1 every 10ms
    }
    
    //UpdateTime: converts counter values to min,sec,centisec
    
    function updateTime(){
    //1min = 60 * 100 = 6000 centiseconds(quotient for minutes)
    timeMinutes = Math.floor(timeCounter/6000);
    //1sec = 100 centiseconds(remainder for seconds)
    timeSeconds = Math.floor((timeCounter%6000)/100);
    timeCentiseconds = (timeCounter%6000)%100;
        
    $("#timeminute").text(format(timeMinutes));
    $("#timesecond").text(format(timeSeconds));
$("#timecentisecond").text(format(timeCentiseconds));
        
    //1min = 60 * 100 = 6000 centiseconds(quotient for minutes)
    lapMinutes = Math.floor(lapCounter/6000);
    //1sec = 100 centiseconds(remainder for seconds)
    lapSeconds = Math.floor((lapCounter%6000)/100);
    lapCentiseconds = (lapCounter%6000)%100;
        
        
    $("#lapminute").text(format(lapMinutes));
    $("#lapsecond").text(format(lapSeconds));
$("#lapcentisecond").text(format(lapCentiseconds));    
    }
    
    //format numbers
    function format(number){
        if (number < 10) {
            return '0' + number;
        }else{
            return number;
        }
    }
    
    //printing lap details in the lapsCounter div
    function addLap(){
        lapNumber++;
        var divcontent = 
            '<div class="lap">' +
                '<div class="laptimetitle">' + 
                    'Lap ' + lapNumber +
                '</div>' +
                '<div class="laptime">' +
'<span>' + format(lapMinutes) + '</span>' +
':<span>' + format(lapSeconds) + '</span>' +
':<span>' + format(lapCentiseconds) + '</span>' +
                '</div>' +
            '</div>'
        
        //appending div content to laps box
        //ascending order
//        $(divcontent).appendTo("#lapsCounter");
        //descending order
        $(divcontent).prependTo("#lapsCounter");
            
    }
});

//1s goes up by 1 every 1s
//1ms goes up by 1 every 1ms
//1cs goes up by 1 every 10ms
//1min = 60 sec
//1sec = 100 centiseconds
//1min = 60*100 = 6000 centiseconds