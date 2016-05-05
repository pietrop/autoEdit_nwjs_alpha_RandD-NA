 // var samplePaperedit = [
//  {"id":1,"src":"./media/video_HD.ogg","type":"video","tcin":44.4,"tcout":47.1,"duration":2.700000000000003,"sourceStart":44.4},
// {"id":2,"src":"./media/video_HD.ogg","type":"video","tcin":44.94,"tcout":46.56,"duration":1.6200000000000045,"sourceStart":44.94},
// {"id":3,"src":"./media/video_HD.ogg","type":"video","tcin":45.48,"tcout":47.1,"duration":1.6200000000000045,"sourceStart":45.48},
// {"id":4,"src":"./media/video_HD.ogg","type":"video","tcin":46.41,"tcout":47.82,"duration":1.4100000000000037,"sourceStart":46.41},
// {"id":5,"src":"./media/video_HD.ogg","type":"video","tcin":46.88,"tcout":49.23,"duration":2.3499999999999943,"sourceStart":46.88},
// {"id":6,"src":"./media/debate_test.ogg","type":"video","tcin":17.53,"tcout":20.3,"duration":2.7699999999999996,"sourceStart":17.53},
// {"id":7,"src":"./media/debate_test.ogg","type":"video","tcin":17.99,"tcout":18.91,"duration":0.9200000000000017,"sourceStart":17.99},
// {"id":8,"src":"./media/debate_test.ogg","type":"video","tcin":18.45,"tcout":22.14,"duration":3.6900000000000013,"sourceStart":18.45},
// {"id":9,"src":"./media/debate_test.ogg","type":"video","tcin":18.91,"tcout":21.68,"duration":2.7699999999999996,"sourceStart":18.91},
// {"id":10,"src":"./media/debate_test.ogg","type":"video","tcin":19.38,"tcout":20.76,"duration":1.3800000000000026,"sourceStart":19.38}]
// console.log(wordSequence.length)

/**
* takes in a word sequence from paperedit like so 
* var samplePaperedit = [{"id":1,"src":"./media/video_HD.ogg","type":"video","tcin":44.4,"tcout":47.1,"duration":2.700000000000003,"sourceStart":44.4},{"id":2,"src":"./media/video_HD.ogg","type":"video","tcin":44.94,"tcout":46.56,"duration":1.6200000000000045,"sourceStart":44.94},{"id":3,"src":"./media/video_HD.ogg","type":"video","tcin":45.48,"tcout":47.1,"duration":1.6200000000000045,"sourceStart":45.48},{"id":4,"src":"./media/video_HD.ogg","type":"video","tcin":46.41,"tcout":47.82,"duration":1.4100000000000037,"sourceStart":46.41},{"id":5,"src":"./media/video_HD.ogg","type":"video","tcin":46.88,"tcout":49.23,"duration":2.3499999999999943,"sourceStart":46.88},{"id":6,"src":"./media/debate_test.ogg","type":"video","tcin":17.53,"tcout":20.3,"duration":2.7699999999999996,"sourceStart":17.53},{"id":7,"src":"./media/debate_test.ogg","type":"video","tcin":17.99,"tcout":18.91,"duration":0.9200000000000017,"sourceStart":17.99},{"id":8,"src":"./media/debate_test.ogg","type":"video","tcin":18.45,"tcout":22.14,"duration":3.6900000000000013,"sourceStart":18.45},{"id":9,"src":"./media/debate_test.ogg","type":"video","tcin":18.91,"tcout":21.68,"duration":2.7699999999999996,"sourceStart":18.91},{"id":10,"src":"./media/debate_test.ogg","type":"video","tcin":19.38,"tcout":20.76,"duration":1.3800000000000026,"sourceStart":19.38}]
* and makes and edl like so merging contiguos words
 [ { type: 'video',
    id: 0,
    sourceStart: 44.4,
    src: './media/video_HD.ogg',
    duration: 9.72,
    start: 0 },
  { type: 'video',
    id: 1,
    sourceStart: 17.52,
    src: './media/debate_test.ogg',
    duration: 11.52,
    start: 9.72 } ]
*/

function makeEdlJson(wordSequence){

  var sequence = [];
  var sentence = [];
  for(var i=0; i< wordSequence.length; i++){
    //first
    if(i==0){
      //contiguos
      if(checkContiguosNext(wordSequence, i )){
        // console.log("contiguos First");
        sentence.push(wordSequence[i])
      //not contiguos
      }else{
        // console.log("not contiguos First");
        sentence.push(wordSequence[i])
        sequence.push(sentence)
        sentence=[]
      }
    //Last 
    }else if(i == (wordSequence.length-1)){
      //contiguos
      if(checkContiguosPrevious(wordSequence, i )){
        // console.log("contiguos Last");
        sentence.push(wordSequence[i])
        sequence.push(sentence)
      //not contiguos
      }else{
        // console.log("not contiguos Last");
        sentence.push(wordSequence[i])
        sequence.push(sentence)   
      }
    //others
    }else{
      //contiguos
      if(checkContiguosNext(wordSequence, i )){
        // console.log("contiguos");
        //ad to sentence but not to sequence.
        sentence.push(wordSequence[i]) 
      //not contiguos
      }else{
        // console.log("not contiguos");
        sentence.push(wordSequence[i]);
        //add to sequence to close the sentence.
        sequence.push(sentence)
        sentence=[]  
      }
    }//if
  }//for 

  // reorganise sequence nested array into edl sequence 
  var len = sequence.length;
  var edlSequence = []
  for(var i = 0; i< sequence.length; i++){
    // console.log(sequence[i])
    // console.log("sequence[i]")
    var video = {};
    video.type ="video";
    video.id = i;
    video.sourceStart = sequence[i][0].tcin;
    video.src = sequence[i][0].src; 
    // var duration = 0;
    // // console.log(sequence[i][0]);
    // for(var j = 0; j< sequence[i].length; j++){
    //   // console.log(sequence[i][j])
    //   duration += sequence[i][j].duration;
    // }
    
    // video.duration = duration; 
    
    video.duration =  (sequence[i][((sequence[i].length) -1)].tcin)  - sequence[i][0].tcin ;

    if(i==0){
      video.start = 0.00; 
    }else{
      video.start = edlSequence[i-1].duration + edlSequence[i-1].start;
      // console.log(edlSequence[i-1].duration);
      // console.log(video.start);
    }
    // console.log("video");
    // console.log(video);
    edlSequence.push(video);
  }
// console.log(edlSequence);
// cb(edlSequence);
  return edlSequence;
}//makeEdlJson()


// makeEdlJson(samplePaperedit, function(data){
//  console.log(data)
// });
/*
* Hper function to Rounding to nearest integer number of frames
*/
function roundToIntFps(numberToRound){
    fps = 25; 
    result  = (Math.round(numberToRound*fps))/fps; 
    return result;
}

/*
* Hper function to checkContiguosNext
*/
function checkContiguosNext(list, elementN){
  var result =( (list[elementN].id == (list[elementN+1].id -1)) && (list[elementN].src == list[elementN+1].src) );
  return result;
}
/*
* Hper function to checkContiguos previous
*/
function checkContiguosPrevious(list, elementN){
  var result =( (list[elementN].id == (list[elementN-1].id +1)) && (list[elementN].src == list[elementN-1].src) ) ;
  return result;
}


//export
module.exports = {
  makeEdlJson: function(wordSequence, cb) {
    return makeEdlJson(wordSequence, cb);
  }
};