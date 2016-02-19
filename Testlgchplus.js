/**
 * Created by jaeseung.ko on 2016. 2. 16..
 */


var Testlgchplus = new function() {

    this.TestInit = function() {

        lgchplus.init();

        var dmostConfig = document.getElementById('dmostConfig');
        var dmostAppMan = document.getElementById('dmostAppMan');
        var dmostVideo = document.getElementById('dmostVideo');
        var dmostPlugin = document.getElementById('dmostPlugin');

        if (dmostConfig) {
            console.log("Created dmostConfig plugin - PASS");
        } else {
            console.log("Create dmostConfig plugin - FAIL");
        }

        if (dmostAppMan) {
            console.log("Created dmostAppMgn plugin - PASS");
        } else {
            console.log("Create dmostAppMgn plugin - FAIL");
        }

        if (dmostVideo) {
            console.log("Created dmostVideo plugin - PASS");
        } else {
            console.log("Create dmostVideo plugin - FAIL");
        }

        if (dmostPlugin) {
            console.log("Created dmostPlugin plugin - PASS");
        } else {
            console.log("Create dmostPlugin plugin - FAIL");
        }
    };

    this.TestSetKeySet = function() {

        var keymask = 0x1 + 0x2 + 0x4 + 0x8 + 0x10;
        lgchplus.app.setKeySet(keymask);
    };

    this.TestChangeVideo = function() {

        var channelUrl = 'http://lgedge1.everyon.tv/lgetv1/phd1106/playlist.m3u8';
        var mediaType = 'application/mpegurl';

        lgchplus.channel.startChannel(mediaType, channelUrl);
    };

    //this.TestStopVideo = function() {
    //
    //    lgchplus.channel.stopChannel();
    //};

    this.TestChannelChange = function() {

       /* lgchplus.addChplusEventListener('channelChange', function(channel) {
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
        });*/

        lgchplus.app.addChplusEventListener('channelChange', function(channel) {
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


