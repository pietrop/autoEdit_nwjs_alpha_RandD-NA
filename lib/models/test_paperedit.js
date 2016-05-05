module.exports = {
    setUp: function (callback) {
    	var Paperedit = require('./paperedit');
        this.paperedit1 = new Paperedit;
        var Video = require('./video');
        this.video1 = new Video({fileName: 'something.mov', duration: 3000});
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    setName: function (test) {
    	this.paperedit1.setName('Name')
        test.equals('Name', this.paperedit1.name);
        test.done();
    },
    setDescription: function (test) {
    	this.paperedit1.setDescription('desc')
        test.equals('desc', this.paperedit1.description);
        test.done();
    // },
    // addVideo: function (test) {

    // 	this.paperedit1.addVideo(this.video1);
    //     test.equals(this.paperedit1.videosID, this.paperedit1.description);
    //     test.done();
    }
}