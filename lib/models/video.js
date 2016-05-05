/** 
 *  
 * Video
 */

// var exports = module.exports = {};

var db = require('diskdb');
var path = require('path');
var dirname = require('../../util.js').dirname;
db.connect(path.join(dirname,'db'), ['videos']);

var HP = require('./hyperTranscript.js');

function Video(){ 

	this.setDetails = function(details){
		this.name = details.name;
		this.description = details.description;
		var pathAr = details.filePathName.split('/');
		this.fileName = pathAr[pathAr.length-1];
		this.filePathName = details.filePathName;
		this.oggFileName = this.fileName.split('.')[0]+".ogg";
		pathAr.pop()
		//this join would need to use path method to make corss platform
		// this.oggFilePath = pathAr.join("/")+this.oggFileName;
		this.oggFilePath = "media/"+this.oggFileName;
		this.paperedit = details.paperedit;
		this.date = details.date; 
		this.reelName  =  details.reelName; 
		this.timecode =  details.timecode; 
		this.duration =  details.duration; 
		this.srtFile = details.srtFile;
		
		if(this.srtFile!= "NA"){
			var s = HP.fromSrtFile(this.srtFile)
			var h1 = new HP.HyperTranscript(this.name, this.description, s)
			this.hyperTranscript =h1;
		}else{
			this.hyperTranscript = {};	
		}



		//convert ogg
		var oggConverter = require(path.join(dirname,'/lib/convertToOgg.js'))

		oggConverter.convertToOgg(this.filePathName, this.oggFilePath, function(d){
          
        
          
          // this.update();
          
          console.log(d);
          console.log('transcoded ogg');
          
          return true;
         });
		//end convert ogg
	}//end set details
	

	this.setHyperTranscript = function(hp){
		this.hyperTranscript = hp;
	}
	

	this.setFileName = function(d){
		this.fileName = d;
	}

	this.setFilePathName = function(d){
		this.filePathName = d;
	}

	this.setName = function(d){
		this.name = d;
	}

	this.setDate = function(d){
		this.date = d;
	}

	this.setReelName = function(d){
		this.reelName = d;
	}

	this.setTimecode = function(d){
		this.timecode = d;
	}

	this.setDuration = function(d){
		this.duration = d;
	}

	this.setSrtFile = function(d){
		this.srtFile = d;
	}

	/**
	* Save method
	*/
	this.save = function(){
		//only save if it hasn't saved before otherwise should update
		if(this._id ==undefined){
			db.videos.save(this);
			var v = db.videos.findOne({fileName: this.fileName, duration: this.duration});
			this._id = v._id;
		}else{
			this.update();
		}
		
	}

	/**
	* update method
	*/
	this.update = function(){
		
		var options = {
		   multi: false,
		   upsert: false
		};

		// db.videos.update({_id: this._id}, this, options);
		db.videos.update({_id: this._id}, this, options);
	}

	/**
	* delete this video 
	*/
	this.delete = function(){
		
		db.videos.remove({_id : this.id}, false);
	}

	/**
	* delete all videos
	*/
	// this.deleteAll = function(){
		
	// 	db.videos.remove();
	// }

	// this.transcodeToOgg = function(){
	// var oggConverter = require(path.join(dirname,'/lib/convertToOgg.js'))

	// oggConverter.convertToOgg(this.filePathName, "./media/"+this._id+".ogg", function(d){
          
 //          this.oggFilePath ="./media/"+this._id+".ogg";
          
 //          this.update();
          
 //          console.log(d);
 //          console.log('transcoded ogg');
          
 //          return true;
 //         });
	// }

}


/**
* delete all videos
* static/class method
*/

Video.deleteAll = function () {
	db.videos.remove();
	db.connect(path.join(dirname,'db'), ['videos']);
};

/**
* get all videos in collection
*/

Video.getVideos = function () {
	return db.videos.find();
};

Video.getVideo = function (id) {
	return db.videos.findOne({_id: id});
};


// Video.transcodeToOgg = function(filePathName, cb){
// 	// var v =  db.videos.findOne({_id: id});

// 	var oggConverter = require(path.join(dirname,'/lib/convertToOgg.js'))
// 	// var fileAr = filePathName.split('.')
//     // var  fileNameNoExtension = fileAr[fileAr.length-2]
//     var fileNameNoExtension = "test";
// 	oggConverter.convertToOgg(filePathName, (path.join(dirname,"media/"+fileNameNoExtension+".ogg")), function(){
         
//           console.log();
//           console.log('transcoded ogg');
          
//           cb(path.join(dirname,"media/"+fileNameNoExtension+".ogg"));
//          });
// }
/**
* Exporting the video class
* var Video = require('./video.js')
* filename and duration are required to be able to save
* var v1 = new Video({fileName: 'file name',duration: '00:00:00'});
* v1.setDuration(1);
* v1.setHyperTranscript(h1);
*/
module.exports = Video;

// exports.create = function() {
//   return  new video();
// };


