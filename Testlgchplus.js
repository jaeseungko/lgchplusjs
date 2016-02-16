/**
 * Created by jaeseung.ko on 2016. 2. 16..
 */

var Testlgchplus = new function() {

    this.TestInit = function() {
        lgchplus.init();

        var oipfConfig = document.getElementById('oipfConfig');
        var oipfAppMan = document.getElementById('oipfAppMan');
        var oipfVideo = document.getElementById('oipfVideo');

        if (oipfConfig) {
            console.log("Created oipfConfig plugin - PASS");
        } else {
            console.log("Create oipfConfig plugin - FAIL");
        }

        if (oipfAppMan) {
            console.log("Created oipfAppMgn plugin - PASS");
        } else {
            console.log("Create oipfAppMgn plugin - FAIL");
        }

        if (oipfVideo) {
            console.log("Created oipfVideo plugin - PASS");
        } else {
            console.log("Create oipfVideo plugin - FAIL");
        }
    };

    this.TestSetKeySet = function() {

        var keymask = 0x1 + 0x2 + 0x4 + 0x8 + 0x10;
        lgchplus.setKeySet(keymask);
    };

    this.TestChangeVideo = function() {

        var channelUrl = 'http://lgedge1.everyon.tv/lgetv1/phd1106/playlist.m3u8';
        var mediaType = 'application/mpegurl';

        lgchplus.changeVideo(mediaType, channelUrl);
    };

    this.TestStopVideo = function() {

        lgchplus.stopVideo();
    };

    this.TestChannelChange = function() {

        lgchplus.addChplusEventListener('channelChange', function(channel) {
            console.log(channel);
            console.log("Channel Title : " + channel.title);
            console.log("Channel id : " + channel.id);
            console.log("Channel Number : " + channel.channelNumber);
            console.log("Channel adsupported : " + channel.adsupported);
            console.log("Channel paid : " + channel.paid);
            console.log("Channel contact : " + channel.contact);
            console.log("Channel categories : " + channel.categories);
            console.log("Channel lock  : " + channel.lock);
            console.log("Channel lastupdated : " + channel.lastupdate);
        });
    };
};


