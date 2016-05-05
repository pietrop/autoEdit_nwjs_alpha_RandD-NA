module.exports = {
    setUp: function (callback) {
    	var Video = require('./video');
        this.video1 = new Video;
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    setName: function (test) {
    	this.video1.setName('Name')
        test.equals('Name', this.video1.name);
        test.done();
    },
    setFileName: function (test) {
    	this.video1.setFileName('File Name')
        test.equals('File Name', this.video1.fileName);
        test.done();
    },
    setFilePathName: function (test) {
    	this.video1.setFilePathName('File path+ Name')
        test.equals('File path+ Name', this.video1.filePathName);
        test.done();
    },
    setDate: function (test) {
    	this.video1.setDate('Time Now')
        test.equals('Time Now', this.video1.date);
        test.done();
    },
    setReelName: function (test) {
    	this.video1.setReelName('Reel Name')
        test.equals('Reel Name', this.video1.reelName);
        test.done();
    },
    setTimecode: function (test) {
    	this.video1.setTimecode('00:00:00:00')
        test.equals('00:00:00:00', this.video1.timecode);
        test.done();
    },
    setDuration: function (test) {
    	this.video1.setDuration('300')
        test.equals('300', this.video1.duration);
        test.done();
    },
    setSrtFile: function (test) {
    	this.video1.setSrtFile('data.srt')
        test.equals('data.srt', this.video1.srtFile);
        test.done();
    }
};