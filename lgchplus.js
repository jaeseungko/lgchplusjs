/**
 * Created by jaeseung.ko on 2016. 2. 16..
 */


var lgchplus = new function() {

    this.cbChannelChange = Object;

    this.init = function () {

        //this.addPluginElement('dmost', 'application/dmost', 'visibility:hidden');
        this.addPluginElement('oipfAppMan', 'application/oipfApplicationManager','display: none');
        this.addPluginElement('oipfConfig', 'application/oipfConfiguration', 'display: none');
        this.addPluginElement('oipfVideo', 'video/broadcast','visibility:hidden');

        var oipfAppMan = document.getElementById('oipfAppMan').getOwnerApplication(document);
        if (oipfAppMan)
            oipfAppMan.show();
    };

    this.addPluginElement = function(id, type, style) {

        var objElem = document.createElement('object');
        objElem.setAttribute('id', id);
        objElem.setAttribute('type', type);
        objElem.setAttribute('style', style);

        document.body.appendChild(objElem);
    };

    this._onChannelChange = function(obj) {

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

        if (lgchplus.cbChannelChange != null) {
            lgchplus.cbChannelChange(result);
        }
    };

    this.addChplusEventListener = function(eventType, callback) {
        console.log("add Event Listener for EventType : " + eventType);

        if (eventType == 'channelChange') {
            lgchplus.cbChannelChange = callback;
            var oipfVideo = document.getElementById('oipfVideo');
            oipfVideo.addEventListener('ChannelChangeSucceeded', this._onChannelChange);

        } else if ( eventType == 'systemLock') {
            console.log("registerSystemLockCallback : TBD");
        } else {
            console.log("Not proper eventType");
        }
    };

    this.setKeySet = function(mask) {
        console.log("set KeySet  : " + mask);
        var oipfAppMan = document.getElementById('oipfAppMan').getOwnerApplication(document);
        oipfAppMan.privateData.keyset.setValue(mask);
    };

    this.changeVideo = function(mediaType, mediaUrl) {

        if ( mediaType == undefined ) {
            mediaType = 'application/mpegurl';
        }
        console.log("changeVideo type : " + mediaType  + " url : " +  mediaUrl);

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
    };

    this.stopVideo = function() {
        console.log("Stop Video");

        var vid = document.getElementsByTagName('video')[0];
        if (vid.hasChildNodes()) {
            var sourceElem = document.getElementById('source');
            if (sourceElem) {
                vid.removeChild(sourceElem);
            }
        }
    };

    this.getIPChannelList = function(callback) {
        console.log("getIPChannelList called");
    };

};