/** 
 * paperedit
 */

var db = require('diskdb');
var path = require('path');
var dirname = require('../../util.js').dirname;
db.connect(path.join(dirname,'db'), ['paperedits']);

function Paperedit(name,description,videosIDsArray){
	/**
	* attributes
	*/
	this.name = name;
	this.description = description;
	//it knows which videos it's using, by keeping track of the IDs.
	this.videosIDs = videosIDsArray;
	
	this.papercuts=[];

	/**
	* details
	*/
	this.setName = function(n){
		this.name= n;
	}

	this.setDescription = function(d){
		this.description= d;
	}

	/**
	* videos
	*/
	this.addVideos = function(videoID){
		this.videosIDs.concat(videoID);
	}
	this.addVideo = function(videoID){
		this.videosIDs.push(videoID);
	}
	this.removeVideo = function(videoID){
		var index = this.videosIDs.indexOf(videoID);
		//if it's in the array, indexOf returns -1 if doesn't find a match
		if (index > -1) {
		    this.videosIDs.splice(index, 1);
		}
	}

	this.getVideosIDs = function(){
		return this.videosIDs;
	}

	this.getVideos = function(){
		var videos =[]
		for(var i=0; i<this.videosIDs.length ;i++){
			videos.push(db.videos.findOne({_id: this.videosIDs[i] }));
		}
		return videos;	
	}
	/**
	* papercuts, rather then implementing crud, you just update the whole thing
	*/
	this.updatePapercuts = function(ps){
		// ?
		this.papercuts= ps;
	}


	this.save = function (){
		if(this._id ==undefined){
			db.paperedits.save(this);
			var v = db.paperedits.findOne({name: this.name});
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
		db.paperedits.update({_id: this._id}, this, options);
	}

	/**
	* delete this video 
	*/
	this.delete = function(){
		db.paperedits.remove({_id : this.id}, false);
	}


} 


/**
* delete all paperedits
* static/class method
*/

Paperedit.deleteAll = function () {
	db.paperedits.remove();
	db.connect(path.join(dirname,'db'), ['paperedits']);
};

/**
* get all paperedits in collection
*/

Paperedit.getPaperedits = function () {
	db.connect(path.join(dirname,'db'), ['paperedits']);
	return db.paperedits.find();
};

/**
* get all paperedit by id
*/
Paperedit.getPaperedit = function (id) {
	return db.paperedits.findOne({_id: id});
};



module.exports = Paperedit;

