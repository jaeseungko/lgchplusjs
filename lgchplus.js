/**
 * Created by jaeseung.ko on 2016. 2. 17..
 */


var lgchplus;

lgchplus = (function() {

    var addPluginElement = function(id, type, style) {
        var objElem = document.createElement('object');
        objElem.setAttribute('id', id);
        objElem.setAttribute('type', type);
        objElem.setAttribute('style', style);

        document.body.appendChild(objElem);
    };

    var getElementId = function(id) {
        return document.getElementById(id);
    };

    return {
        init : function(resultCb) {
            addPluginElement('dmostAppMgr', 'application/dmostApplicationManager','display: none');
            addPluginElement('dmostConfig', 'application/dmostConfiguration', 'display: none');
            addPluginElement('dmostVideo', 'video/dmostbroadcast','visibility:hidden');

            var oipfAppMan = document.getElementById('oipfAppMan').getOwnerApplication(document);
            if (oipfAppMan)
                oipfAppMan.show();

            if (resultCb) {
                if (getElementId('dmostAppMgr')
                    && getElementId('dmostConfig')
                    && getElementId('dmostVideo')) {

                    return resultCb('onSucceeded');
                } else {
                    return resultCb('onFailed');
                }
            }


        }
    }
})();

lgchplus.app = (function() {

    //private
    var cbChannelChange = Object;

    var onChannelChange = function(obj) {
        var channel = obj.channel;
        //console.log('onChannelChange', channel);

        var result = {};
        var description = JSON.parse(channel.description);

        //console.log(description);

        result.title = channel.name;
        result.id = description.IPChannelCode;
        result.channelNumber = description.channelNumber;
        result.adsupported = description.adFlag;
        result.paid = typeof description.payChan == 'number' ? description.payChan : 'notnumber';
        result.adult = description.adultFlag;
        result.contact = description.ipCallNumber;
        result.categories = description.ipChanCategory;
        result.lastupdate = description.lastUpdated;
        result.lock = typeof description.locked == 'number' ? description.locked : 'notnumber';

        if (cbChannelChange != null) {
            cbChannelChange(result);
        }
    };

    return {
        setKeySet : function(mask) {
            console.log("set KeySet  : " + mask);
            var oipfAppMan = document.getElementById('dmostAppMan').getOwnerApplication(document);
            oipfAppMan.privateData.keyset.setValue(mask);
        },

        addChplusEventListener : function(eventType, callback) {

            if (eventType == 'channelChange') {

                cbChannelChange = callback;
                var oipfVideo = document.getElementById('dmostVideo');
                oipfVideo.addEventListener('ChannelChangeSucceeded', onChannelChange);

            } else if ( eventType == 'systemLock') {
                console.log("registerSystemLockCallback : TBD");
            } else {
                console.log("Not proper eventType");
            }
        }
    }
})();

lgchplus.channel = (function() {

    return {

        startChannel : function(mediaType, mediaUrl, resultCb) {

            if ( mediaType == undefined ) {
                mediaType = 'application/mpegurl';
            }
            console.log("changeVideo type : " + mediaType  + " url : " +  mediaUrl);

            try {
                var vid = document.getElementsByTagName('video')[0];
                if (vid.hasChildNodes()) {
                    var childElem = document.getElementById('source');
                    if (childElem) {
                        vid.removeChild(childElem);
                    }
                }

                var sourceElem = document.createElement('source');
                sourceElem.setAttribute('id', 'source');
                sourceElem.setAttribute('src', mediaUrl);
                sourceElem.setAttribute('type', mediaType );

                vid.appendChild(sourceElem);

                vid.load();
                vid.play();

                if(resultCb)
                    resultCb('onSucceeded');

            } catch (e) {
                if (resultCb) {
                    resultCb('onFailed');
                }
            }

        },

        stopChannel : function() {
            console.log("Stop Video");

            var vid = document.getElementsByTagName('video')[0];
            if (vid.hasChildNodes()) {
                var sourceElem = document.getElementById('source');
                if (sourceElem) {
                    vid.removeChild(sourceElem);
                }
            }
        }
    }
})();

lgchplus.device = (function() {

})();