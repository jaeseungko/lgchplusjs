/**
 * Created by jaeseung.ko on 2016. 2. 11..
 */

var currentChannel = 0;

var onChannelChange = function(channelObj) {

};

document.addEventListener('DOMContentLoaded', function() {
    try {
        //lgchplus.init();
        //lgchplus.startVideo();
        data.init();

        var mediaUrl = data.channelDB[0].mediaUrl;

        var lgchplus = new lgchplus();
        lgchplus.addEventListener( 'channelChange', onChannelChange );



    } catch(error) {

    }
});

