/**
*
*/
var path = require('path');
var dirname = require('../../util.js').dirname;
var swig  = require('swig')
var Video = require('./video');
var Paperedit = require('./paperedit');
var edlConverter = require('../makeContiguosEDL');
var edlFileSaver = require('../edlFileMaker');
var fs = require('fs');

function App(){

	this.video =  Video;
	this.paperedit =  Paperedit;

	this.videos = Video.getVideos();
	this.paperedits = Paperedit.getPaperedits();

	this.videosView = function (){
		var content = swig.renderFile(path.join(dirname,'views/template/videos_list.html'), {
		    title: 'Video transcripts',
		    videos: Video.getVideos()
		});
		// document.location = "views/transcript.html"
		window.document.getElementById('mainView').innerHTML = content;

		// return content;
	}

	this.videoView = function (elem){
		videoId = elem.id;
		var content = swig.renderFile(path.join(dirname,'views/template/video.html'), {
		    title: 'Video transcript',
		    video: Video.getVideo(videoId),
		    paperedits: Paperedit.getPaperedits()
		});
		window.document.getElementById('mainView').innerHTML = content;
		// return content;

		 var search = require('../interactivity/search');
        // search.init();//"#search-criteria" 
	}

	this.videoNewView = function (){
		var content = swig.renderFile(path.join(dirname,'views/template/video_form.html'), {
		    title: 'New Video transcripts',
		    paperedits: Paperedit.getPaperedits()
		});
		window.document.getElementById('mainView').innerHTML = content;
		// return content;
	}



	this.paperEditsView = function (){
		var content = swig.renderFile(path.join(dirname,'views/template/paperedits_list.html'), {
		    title: 'Paperedits',
		    paperedits: Paperedit.getPaperedits()
		});
		window.document.getElementById('mainView').innerHTML = content;
		// return content;
	}

	this.paperEditNewView = function (){
		var content = swig.renderFile(path.join(dirname,'views/template/paperedit_form.html'), {
		    title: 'New Paperedit',
		    videos: Video.getVideos()
		});
		window.document.getElementById('mainView').innerHTML = content;
		// return content;
	}

	this.papereditView = function (papreditID){
		var content = swig.renderFile(path.join(dirname,'views/template/paperedit.html'), {
		    title: 'Paperedit',
		    videos: getVideosFromIds(Paperedit.getPaperedit(papreditID)),
		    paperedit: Paperedit.getPaperedit(papreditID)
		    
		});
		// window.document.getElementById('mainView').innerHTML = content;
		return content;
	}

	/**
	* helper function for papereditView
	*/
	function getVideosFromIds(papredit){
		var videoAr =[];
		var videoArIds = papredit.videosIDs;
		// var videoArIds = ['9f0e08028df84301b1e419f17f306161']

		for(var i=0; i < videoArIds.length ; i++){
			videoAr.push(Video.getVideo(videoArIds[i]))
		}
		console.log(videoAr);
		return videoAr;
		// return Video.getVideo('52e803ccb1124d56b8c24cfc331ac33d')
	}


	/**
	* Utility method that given an array of words objects, merges contiguos words from same transcript.
	* creating an edl json
	*/
	this.convertToEDLJson = function(sequence){
		var result = edlConverter.makeEdlJson(sequence);
		return result; 
	}


	this.writeEDLfile = function(fileNamePath, content){
		var fileNameArray  = fileNamePath.split("/");
		var fileTitle = fileNameArray[fileNameArray.length-1];
		var result = edlFileSaver.makeEdlFile(content, fileTitle);
		fs.writeFileSync(fileNamePath, result  );
	}

	this.writefile = function(fileNamePath, content){
		fs.writeFileSync(fileNamePath, content);
	}
	
}


// App.video =  Video;
// App.paperedit =  Paperedit;

// App.paperedit = Paperedit; 

module.exports = App;