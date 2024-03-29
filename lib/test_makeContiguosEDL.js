module.exports = {
    setUp: function (callback) {1.6200000000000045
    	var edlConverter = require('./makeContiguosEDL');
        this.edlConverter = edlConverter;
        this.samplePaperedit = [
        {"id":1,"src":"./media/video_HD.ogg","type":"video","tcin":44.4,"tcout":47.1,"duration":2.700000000000003,"sourceStart":44.4},
        {"id":2,"src":"./media/video_HD.ogg","type":"video","tcin":44.94,"tcout":46.56,"duration":1.6200000000000045,"sourceStart":44.94},
        {"id":3,"src":"./media/video_HD.ogg","type":"video","tcin":45.48,"tcout":47.1,"duration":1.6200000000000045,"sourceStart":45.48},
        {"id":4,"src":"./media/video_HD.ogg","type":"video","tcin":46.41,"tcout":47.82,"duration":1.4100000000000037,"sourceStart":46.41},
        {"id":5,"src":"./media/video_HD.ogg","type":"video","tcin":46.88,"tcout":49.23,"duration":2.3499999999999943,"sourceStart":46.88},
        {"id":6,"src":"./media/debate_test.ogg","type":"video","tcin":17.53,"tcout":20.3,"duration":2.7699999999999996,"sourceStart":17.53},
        {"id":7,"src":"./media/debate_test.ogg","type":"video","tcin":17.99,"tcout":18.91,"duration":0.9200000000000017,"sourceStart":17.99},
        {"id":8,"src":"./media/debate_test.ogg","type":"video","tcin":18.45,"tcout":22.14,"duration":3.6900000000000013,"sourceStart":18.45},
        {"id":9,"src":"./media/debate_test.ogg","type":"video","tcin":18.91,"tcout":21.68,"duration":2.7699999999999996,"sourceStart":18.91},
        {"id":10,"src":"./media/debate_test.ogg","type":"video","tcin":19.38,"tcout":20.76,"duration":1.3800000000000026,"sourceStart":19.38}
        ];
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },//9.7 dur 
    convert: function (test) {
    	var edlResult = this.edlConverter.makeEdlJson(this.samplePaperedit)
        var result = [ { type: 'video', id: 0, sourceStart: 44.4, src: './media/video_HD.ogg', duration: 4.829999999999998, start: 0 }, 
        { type: 'video', id: 1, sourceStart: 17.53, src: './media/debate_test.ogg', duration: 3.2300000000000004, start: 4.829999999999998 } ];
        test.equals(edlResult.toString(), result.toString());
        test.done();
    }
    // addVideo: function (test) {

    // 	this.paperedit1.addVideo(this.video1);
    //     test.equals(this.paperedit1.videosID, this.paperedit1.description);
    //     test.done();
    
}