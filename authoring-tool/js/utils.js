function locate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                var coors = {lng: position.coords.longitude, lat: position.coords.latitude};
                map.panTo(coors);
                map.setZoom(15);
            });
    } else {
        coordinates.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showLocation(position) {
    var coords = {lng: position.coords.longitude, lat: position.coords.latitude};
    map.panTo(position);
}


function savePlot(plot) {
    $("#saving").text("Saving...");
    $("#saving").show();
    var plotJSON = plot.toJSON();

    var request = $.ajax({
        type: 'POST',
        url: 'savePlot.php',
        data: plotJSON
    });

    console.log("Saving...");
    request.done(function(data) {
        if(!savingTimeout)$("#saving").text("Saved");
        saved = true;
        plot.id = data;
        console.log("Plot saved!");
    });
    request.fail(function(error) {
        $("#saving").hide();
        console.log("Error saving..." + JSON.stringify(error));
    })
}

function removePlot(plot) {
    createSavingTimeout();

    var request = $.ajax({
        type: 'POST',
        url: 'removePlot.php',
        data: {id:plot.id}
    });

    console.log("Removing...");
    request.done(function(data) {
        if(!savingTimeout)$("#saving").text("Saved");
        saved = true;
        console.log("Plot removed!");
    });
    request.fail(function(error) {
        $("#saving").hide();
        console.log("Error removing..." + JSON.stringify(error));
    })
}

function savePOI(poi){
    createSavingTimeout();

    var poiJSON = poi.toJSON();
    var data = {
            plot: game.id,
            id: poiJSON.id,
            type: poiJSON.type,
            lat: poiJSON.lat,
            lng: poiJSON.lng,
            orderNumber: poiJSON.orderNumber,
            beaconId: poiJSON.beaconId,
            title: poiJSON.title
        }
    var request = $.ajax({
        type: 'POST',
        url: 'savePOI.php',
        data: data
    });

    console.log("Saving...");
    request.done(function(data) {
        if(!savingTimeout)$("#saving").text("Saved");
        saved = true;
        console.log("POI saved! ");
        poi.id = data;
    });
    request.fail(function(error) {
        $("#saving").hide();
        console.log("Error saving..." + JSON.stringify(error));
    })
}

function removePOI(poi) {
    createSavingTimeout();

    var request = $.ajax({
        type: 'POST',
        url: 'removePOI.php',
        data: {id:poi.id}
    });

    console.log("Removing...");
    request.done(function(data) {
        if(!savingTimeout)$("#saving").text("Saved");
        saved = true;
        console.log("POI removed!");
    });
    request.fail(function(error) {
        $("#saving").hide();
        console.log("Error removing..." + JSON.stringify(error));
    })
}

function parsePlotJSON(data){
    return new Game({
        id: data.id, 
        type: data.type,
        name: data.name, 
        description: data.description, 
        time: data.time, 
        public: data.public==1 ? true : false
    });
}

function parsePOIS(pois){
    var ps = [];
    pois.forEach(function(p){
        ps.push(new Step({
            id: p.id,
            title: p.title,
            orderNumber: p.orderNumber,
            type: p.type,
            marker: p.type == "normal" ? addMarker({lat: p.lat, lng: p.lng}) : null,
            beaconId: p.beaconId
        }));
    });
    return ps;
}

function parseStopsJSON(stopsJson){
    var stops = [];
    for(var s in stopsJson){
        var data = stopsJson[s];
        stops.push(new Step({
            idNumber: data.idNumber,
            type: data.type,
            marker: null, //TODO: create marker
            title: data.title,
            description: data.description,
            distance: data.distance,
            reward: data.reward,
            url: data.url,
            screens: parseScreensJSON(data.screens)
        }));
    }
    return stops;
}

function parseScreensJSON(screensJson){
    var screens = [];
    for(var s in screensJson){
        var data = screensJson[s];
        screens.push(new Screen({
            type: data.type,
            title: data.title,
            text: data.text,
            image: data.image,
        }));
    }
    return screens;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var saved = false;
var savingTimeout;
function createSavingTimeout(){
    saved = false;
    $("#saving").text("Saving...");
    $("#saving").show();
    if(savingTimeout != null) clearTimeout(savingTimeout);
    savingTimeout = setTimeout(function(){
        if(saved){
            $("#saving").text("Saved");
        }
        clearTimeout(savingTimeout);
        savingTimeout = null;
    }, 2000);
}