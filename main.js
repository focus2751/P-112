Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
perdiction_1 = "";
camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);


classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/CthruUeW5/model.json',modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results)
{
    if (error)
    {
        console.error(error)
    }

    else 
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "pointing index")
        {
            document.getElementById("update_emmoji").innerHTML = "&#9757;";      
        }
        if(results[0].label == "peace!")
        {
            document.getElementById("update_emmoji").innerHTML = "&#9996;";      
        }
        if(results[0].label == "heads up!")
        {
            document.getElementById("update_emmoji").innerHTML = "&#9995;";      
        }
        if(results[0].label == "amazing!!")
        {
            document.getElementById("update_emmoji").innerHTML = "&#128076;";      
        }
    }
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is "+ prediction;
    var utterThis = new SpeechSynthesisisUtterance(speak_data_1);
    synth.speak(utterThis);
}