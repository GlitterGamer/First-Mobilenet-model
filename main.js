function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier= ml5.imageClassifier("MobileNet", modelLodaded)
}

function modelLodaded(){
  console.log("model is loaded")
}

function draw(){
  image(video,0,0,300,300)
  classifier.classify(video,gotResult)
}

var previousResult= ""

function gotResult(error,results){
  if (error) {
    console.log(error)
  } else {
    if ((results[0].confidence>0.5)&&(results[0].label!= previousResult)) {
      console.log(results)
      previousResult= results[0].label
      document.getElementById("result_object_name").innerHTML= results[0].label
      document.getElementById("result_object_accuracy").innerHTML= (results[0].confidence*100).toFixed(3)
      var synth= window.speechSynthesis
      speakData= "object detected " + results[0].label
      var utterThis= new SpeechSynthesisUtterance(speakData)
      synth.speak(utterThis)
    }
  }
}