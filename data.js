/**
 * Created by jaeseung.ko on 2016. 2. 12..
 */

;var data;
data = {

    channelDB : [],

    loadJsonData: function (callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'ipchannellist.json', true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    },

    init: function () {
        data.loadJsonData(function (response) {
            var channelData = JSON.parse(response);

            var ipChanCodeIndex = channelData.names.IPChannelCode;
            var ipChanServerUrlIndex = channelData.names.ipChanServerUrl;
            var numberOfChannels = channelData.values.length;

            //console.log("IP Channel Code : " + channelData.values[0][ipChanCodeIndex]);
            //console.log("IP Channel Url : " + channelData.values[0][ipChanServerUrlIndex]);
            //console.log("Number of channel : " + channelData.values.length);

            var channelList = new Array();

            for (var i = 0; i < numberOfChannels; i++) {
                var ipCode = channelData.values[i][ipChanCodeIndex];
                var url = channelData.values[i][ipChanServerUrlIndex];

                var channel = {};
                channel.ipChannelCode = ipCode;
                channel.mediaUrl = url;

                channelList.push(channel);
            }

            this.channelDB = channelList;

            //console.log(this.channelDB[0].ipChannelCode);
            //console.log(this.channelDB[0].mediaUrl);

        });
    },

    printAllIPChannels: function () {
        console.log(this.channelDB);
    }
};