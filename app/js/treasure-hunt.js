
/*****************************************/
/*          TREASURE HUNG LOGIC          */
/*			  Geomotion Games			 */
/*****************************************/

var mapLoaded = false;
var dataLoaded = false;
var game = {};
var path = null;
var lastPOITime;
var lastPOIDistance = 0;
var totalDistance = 0;
var lastPosition = null;
var challengeType = "";
var startOpen = false;
var finished = false;
var inscreen = false;

function gameReady() {

	game = game_info["POIS"];
	var pointList = [];

	for (step in game) {

		var media = "";
		var classP = "p67vh";
		var textClass = "textOnly";
		var clue = "";
		var extras = document.getElementById("extras");

		/****** A ******/

		if (game[step]["A"].hasOwnProperty("mediaType") && game[step]["A"].mediaType != "") {
			switch(game[step]["A"].mediaType) {
			    case "image":
			    	if (game[step]["A"].hasOwnProperty("image") && game[step]["A"]["image"] != "") {
			        	media = "<img src=" + server_url + game[step]["A"].image + ">";
						classP = "p30vh";
						textClass = "textWithImage";
				    }
				    break;
			    case "youtubeOrVimeo":
			    	console.log("youtube!");
			    	if (game[step]["A"].hasOwnProperty("youtubeOrVimeoURL") && game[step]["A"].youtubeOrVimeoURL != "") {
			    		var url = parseYoutubeOrVimeoURL(game[step]["A"].youtubeOrVimeoURL);
			    		textClass = "textWithVideo";
			        	media = '<div class="videoWrapper"><iframe class="youtube-video-'+ step +'" width="100%" height="auto" src="' + url + '" frameborder="0" allowfullscreen></iframe></div>';
					}
			        break;
			    case "video":
			    	console.log("uploaded video!");
			    	if (game[step]["A"].hasOwnProperty("uploadedVideo") && game[step]["A"].uploadedVideo != "") {
			    		textClass = "textWithVideo";
			        	media = '<video class="youtube-video-'+ step +'" width="100%" height="auto" controls><source src="' + game[step]["A"].uploadedVideo + '" type="video/mp4"><source src="movie.ogg" type="video/ogg">'+ l("video_not_supported") +'</video>';
					}
			        break;
			    default:
			        break;
			}
		} else {
			if (game[step]["A"].hasOwnProperty("image") && game[step]["A"].image != "") {
				media = "<img src=" + server_url + game[step]["A"].image + ">";
				classP = "p30vh";
			}
		}

		var textButton = l("go_to_challenge");
		var uploadContentButton = "";

		if (game[step].hasOwnProperty("B") && step > 0 ) {

			if (game[step]["B"].hasOwnProperty("challenge")) {
				var challenge = game[step]["B"]["challenge"];
				if (challenge.hasOwnProperty("type")) {
					if (challenge["type"] == "checkin") {
						challengeType = "checkin";
					} else if (challenge["type"] == "upload_content") {
						challengeType = "upload_content";
						var contentType = "content";
						var acceptableType = "media_type";
						if (challenge["uploadType"] != "any") {
							contentType = challenge["uploadType"];
							acceptableType = challenge["uploadType"] + "/*";
						}
						uploadContentButton = `<input id="file` + step + `" type="file" accept="`+ acceptableType +`"><label class="goButton" for="file` + step + `"><span>Upload `+ contentType +`</span></label>` +
											  `<a style="display:none;" id="toChallenge` + step + `" href="#" >` + textButton + `</a>`;
						
						//TODO textbutton depending on the file type
					} else if (challenge["type"] == "minigame") {
						challengeType = "minigame";
					}
				} else { challengeType = "checkin"; }
			} else { challengeType = "checkin"; }
		} else { challengeType = "checkin"; }

		if (challengeType == "checkin") textButton = "Check-in";

		if (step == 0) { textButton = l("start_game"); }
		var button = "";
		var share = "";
		var bottomA = "";

		if (step == 999) {
			button = '<a style="margin-top: 5px;" id="show-inventory-finish" href="#" class="goButton">'+ l("show_inventory") +'</a>';
			if (device != "app") {
				share = `<div class="shareButtons" id="shareButtonsFinish">
							<a id="fbshare" onclick="fbshare()" href="javascript:void(0);"><button onclick="fbshare()" href="javascript:void(0); type="button" class="btn btn-facebook btn-lg"><i class="fa fa-facebook fa-2"></i>`+l("share")+`</button></a>
							<a class="twitter-share-button popup" href="https://twitter.com/intent/tweet?text=%23` + hashtag + `&url=%20&via=` + via + `" data-size="large">Tweet</a>
						</div>`;
			} else {
				bottomA = '<div class="bottomButton"><a id="go-out-finish" href="#" class="goButton">'+ l("go_out") +'</a></div>';
			}
		} else {
			var but = `<a id="toChallenge` + step + `" href="#" class="goButton" >` + textButton + `</a>`;
			if (challengeType == "upload_content") {
				but = uploadContentButton;
			}
			if (device == "app") {
				bottomA = `<div class="bottomButtonApp"><img class="exitbuttonA" src="app/images/exit-button.png">`+ but +`</div>`;
			} else {
				bottomA = `<div class="bottomButton">`+ but +`</div>`;
			}
		}

		var sumup = step == 999 ? '<div id="pointsTotal" class="totalPointsEarned"></div><div id="timeTotal" class="totalTimeSpent"></div>' : "";

		var POIBefore = `
			<a href="#modal` + step + `" id="openA` + step + `" style="display: none;">Open Modal</a>
			<div id="modal` + step + `" class="modalDialog screen">
				<div>
					<h2>` + game[step]["A"].title + `</h2>
					<div class="modalContent">` +
						media +
						`<p class="`+ classP +" "+ textClass +`">` + Autolinker.link(game[step]["A"].text) + `</p>
					</div>` +
					sumup +
					share +
					button +
					bottomA +
				`</div>
			</div>`;

		extras.innerHTML += POIBefore;

		/****** C ******/

		if (game[step].hasOwnProperty("C") && step > 0 ) {

			if (game[step].hasOwnProperty("item") && game[step].item != "" && game[step].item != "-" && game[step].item) {
				media = "<img src=" + server_url + game[step].item + ">";
				textClass = "textWithImage";
				classP = "p25vh";
			} else {
				media = "";
				textClass = "textOnly";
				classP = "p50vh";
			}

			var hashtag = "BeaconingEU";
			var via = "BeaconingEU";

			// Bobo
			if (game_id == 487) {
				hashtag = "bobopulpin";
				via = "bobopulpin";
			// Bella
			} else if (game_id == 488) {
				hashtag = "BellavistaBcn";
				via = "BellavistaBcn";
			}

			// TODO fer aqui el llistat de paràmetres i validar l'existencia de tots
			var points = game[step]["rewardPoints"] == 0 
						? "" : ("<p class='pointsWon'>"+l("you_won_points", "<span>"+game[step]["rewardPoints"]+"</span>") +"</p>");

			var share = "";
			if (device != "app") {
				share = `<div class="shareButtons">
							<a id="fbshare" onclick="fbshare()" href="javascript:void(0);"><button onclick="fbshare()" href="javascript:void(0); type="button" class="btn btn-facebook btn-lg"><i class="fa fa-facebook fa-2"></i>`+l("share")+`</button></a>
							<a class="twitter-share-button popup" href="https://twitter.com/intent/tweet?text=%23` + hashtag + `&url=%20&via=` + via + `" data-size="large">Tweet</a>
						</div>`;
			}

			var bottomB = `<div class="bottomButton"><a id="closeClue` + step + `" href="#" class="goButton">`+ l("continue") +`</a></div>`;
			if (device == "app") {
				bottomB = `<div class="bottomButtonApp"><img class="exitbuttonB" src="app/images/exit-button.png"><a id="closeClue` + step + `" href="#" class="goButton">`+ l("continue") +`</a></div>`;
			}

			var POIAfter = `
				<a href="#clue` + step + `" id="openC` + step + `" style="display: none;">Open Modal</a>
				<div id="clue` + step + `" class="modalDialog screen after">
					<div>
						<h2>` + game[step]["C"].title + `</h2>
						<div class="modalContent">` +
							media + 
							`<p class="`+ classP +" "+ textClass +`">` + Autolinker.link(game[step]["C"].text) + `</p>
						</div>` +
						points +
						share +
						bottomB +	
					`</div>
				</div>`;

			extras.innerHTML += POIAfter;
		}
	}

	if (tofinish) {
		console.log("to finish!");
		showFinishScreen();
	} else {

		if (nextPOI == 0) {
			if (!teleport && !finished && !inmap) {
				startOpen = true;
				document.getElementById('openA0').click();
			}
			nextPOI = getFollowingPOIId(nextPOI);
		} else {
			if (fromMinigame) {
				if (!challengeSuccess) {

					// forced flush before redirect
					flushTracking();

					var challenge = game[nextPOI]["B"]["challenge"];
					var minigameURL = challenge["url"];
					var inapp = device == "app" ? "%26device%3Dapp" : "%26device%3Dbrowser";
					var playerId = "playerid=" + encodeURI(tracker.playerId);
					var trackingCode = "trackingCode=" + tracker.settings.trackingCode;
					var tc = "%26trackingcode%3D" + tracker.settings.trackingCode;
					var cpoi = "%26step%3D" + currentPOI;

					var url = (window.location.href).indexOf("atcc-qa") !== -1 ?  
						"https%3A%2F%2Fatcc-qa.beaconing.eu/app.php%3Fgame%3D" : 
						"https%3A%2F%2Fatcc.beaconing.eu/app.php%3Fgame%3D";

					minigameURL += "&" + playerId + "&" + trackingCode + "&callbackurl=" + url + game_id + cpoi + inapp + tc;
					window.open(minigameURL, "_self");
					return;
				}

				fromMinigame = false;
				document.getElementById("openC" + nextPOI).click();
				nextPOI = getFollowingPOIId(nextPOI);

				updatePath();
				document.getElementById('main-progress').innerHTML = getInventoryProgressAsString(game);
			} else {
				nextPOI = getFollowingPOIId(nextPOI);
			}
		}
	}

	for (i=1; i<Object.keys(game).length-1; i++) {

		document.getElementById("toChallenge"+i).onclick = function() {

			if ($('.youtube-video-' + currentPOI)[0]) $('.youtube-video-' + currentPOI)[0].remove();

			if (device == "app") {
				console.log("tanca");
				window.location.href = "?closeview&success=1";
			} else {

				setTimeout(function() {

					if (game[currentPOI]["B"].hasOwnProperty("challenge")) {
						var challenge = game[currentPOI]["B"]["challenge"];

						if (challenge.hasOwnProperty("type")) {
							if (challenge["type"] == "upload_content") {
								document.getElementById("openC" + currentPOI).click();
							} else if (challenge["type"] == "minigame") {

								// forced flush before redirect
								flushTracking();

								var minigameURL = challenge["url"];
								if (minigameURL.length > 0) {

									if (minigameURL.indexOf("beaconing") !== -1) {
										var inapp = device == "app" ? "%26device%3Dapp" : "%26device%3Dbrowser";
										var playerId = "playerid=" + encodeURI(tracker.playerId);
										var trackingCode = "trackingCode=" + tracker.settings.trackingCode;
										var tc = "%26trackingcode%3D" + tracker.settings.trackingCode;
										var cpoi = "%26step%3D" + currentPOI;

										var url = (window.location.href).indexOf("atcc-qa") !== -1 ?  
											"https%3A%2F%2Fatcc-qa.beaconing.eu/app.php%3Fgame%3D" : 
											"https%3A%2F%2Fatcc.beaconing.eu/app.php%3Fgame%3D";

										minigameURL += "&" + playerId + "&" + trackingCode + "&callbackurl=" + url + game_id + cpoi + inapp + tc;
										window.open(minigameURL, "_self");
									} else {
										window.open(minigameURL, "_self");
									}
								}
							} else {
								document.getElementById("openC" + currentPOI).click();
							}
						} else {
							document.getElementById("openC" + currentPOI).click();
						}
					} else {
						document.getElementById("openC" + currentPOI).click();
					}
				}, 1000);
			}
		};
	}

	var lastPOIId = Object.keys(game)[Object.keys(game).length-2];

	for (var i=1; i<Object.keys(game).length-2; i++) {
		document.getElementById("closeClue" + i).onclick = function() {

			if (device == "app") {
				window.location.href = "?closeview&success=1";
			} else {
				inscreen = false;
				saveProgress();
			}
		}
	}

	document.getElementById("toChallenge0").onclick = function() {

		if (device == "app") {
			window.location.href = "?closeview&success=1";
		} else {
			startOpen = false;
			if ($('.youtube-video-0')[0]) $('.youtube-video-0')[0].remove();
		}
	}

	document.getElementById("show-inventory-finish").onclick = function(e) {
		e.preventDefault();
		showInventory();
		return false;
	}

	document.getElementById("show-inventory-time-over").onclick = function(e) {
		e.preventDefault();
		showInventory();
		return false;
	}

	if (device == "app") {

		Array.prototype.forEach.call(document.getElementsByClassName("exitbuttonA"), function(el) {
			el.onclick = function(e) {
				
				if (startOpen) {
					/****** START ******/
					window.location.href = "?closeview&success=manualClose";
				}
				else {
					/****** PRE MINIGAME ******/
					window.location.href = "?closeview&success=manualClose";
				}
				
				return false;
			}
		});

		/****** POST MINIGAME ******/

		Array.prototype.forEach.call(document.getElementsByClassName("exitbuttonB"), function(el) {
			el.onclick = function(e) {
				window.location.href = "?closeview&success=manualClose";
				return false;
			}
		});

		/****** MAP ******/

		document.getElementById("exitbuttonmap").onclick = function(e) {
			window.location.href = "?closeview&success=manualClose";
			return false;
		}

		/****** FINISH ******/

		document.getElementById("go-out-finish").onclick = function(e) {
			window.location.href = "?closeview&success=1";
			return false;
		}

		document.getElementById("go-out-time-over").onclick = function(e) {
			window.location.href = "?closeview&success=1";
			return false;
		}
	}

	document.getElementById("closeClue" + lastPOIId).onclick = function() {
		if (device == "app") {
			window.location.href = "?closeview&success=1";
		} else {
			setTimeout(function() {
				showFinishScreen();
			}, 1000);
		}
	}

	if (time_limit != 0) { 
		document.getElementById("main-progress").className = "time";
		document.getElementById("distance").className = "time";
		document.getElementById("topImageTime").className = "time";
	} else {
		document.getElementById("main-progress").className = "notime";
		document.getElementById("distance").className = "notime";
		document.getElementById("topImageNoTime").className = "notime";
	}


	attachUploadContentEvents();
	teleportIfNeeded();
	updatePath();

	if (device != "app") {

		$('.popup').click(function(event) {
		    var width  = 575,
		        height = 400,
		        left   = ($(window).width()  - width)  / 2,
		        top    = ($(window).height() - height) / 2,
		        url    = "http://beaconing.eu/",
		        opts   = 'status=1' +
		                 ',width='  + width  +
		                 ',height=' + height +
		                 ',top='    + top    +
		                 ',left='   + left;

		    window.open(url, 'twitter', opts);

		    return false;
		});

		$('#fbshare button').on('click touchstart', function(e) {
			e.preventDefault();

			var hashtag = "#BeaconingEU";
			var via = "@BeaconingEU";

			// Bobo
			if (game_id == 487) {
				hashtag = "#bobopulpin";
				via = "@bobopulpin";
			// Bella
			} else if (game_id == 488) {
				hashtag = "#BellavistaBcn";
				via = "@BellavistaBcn";
			}

			FB.ui({
				method: 'share',
				href: 'http://beaconing.eu/',
				hashtag: hashtag,	
				quote: via
			}, function(response){});
			return false;
		});
	}
}

function showFinishScreen() {
	blockGame();
	document.getElementById("openA999").click();

	saveProgress();
	saveFinishedData();

	// TIME
	var spent = Math.round((new Date().getTime() - parseInt(startingTime))/1000);
	var seconds = spent%60;
	var timeSpent = "<h3>"+l("total_time_played")+": <span>" + (spent-seconds)/60 + ":" + (seconds < 10 ? "0"+seconds : seconds) + "</span><h3>";
	var timeDivs = document.getElementById('timeTotal');
	timeDivs.innerHTML = timeSpent;

	// POINTS
	var pointsEarned = getEarnedPoints();

	if (pointsEarned > 0) {
		var pointsDivs = document.getElementById('pointsTotal');
		pointsDivs.innerHTML = "<h3>"+l("you_won_points", "<span>"+pointsEarned+"</span>")+"</h3>";
	}

	//FINAL ANALYTICS
	var now = new Date().getTime();
	var time_spent = now - parseInt(startingTime);
	tracker.setVar("time", time_spent/1000);
	tracker.Completable.Completed("LB_GAME_" + game_id, tracker.Completable.CompletableType.Game, true, 1);
}

function attachUploadContentEvents() {
	for (step in game) {
		if (game[step].hasOwnProperty("B") && step > 0 && step < 999 ) {
			if (game[step]["B"].hasOwnProperty("challenge")) {
				var challenge = game[step]["B"]["challenge"];
				if (challenge.hasOwnProperty("type")) {
					if (challenge["type"] == "upload_content") {

						document.getElementById("file" + step).onchange = function (e) {
			    			var id = (this.id).substr(-1);
					        uploadImage({
					            gameId: game_id,
					            poiNum: id,
					            file: e.target.files[0],
					            postCallback: function(success){
					                document.getElementById("toChallenge" + id).click();
					            }
					        });
						}; 
					}
				}
			}
		}		
	}
}

function teleportIfNeeded() {
	if ( teleport ) {
		var position = { coords : {longitude: game[currentPOI+1].lng, latitude: game[currentPOI+1].lat}};
		lastPosition = position;
		newLocation(position);
		mapLoaded = true;
	}
}

function updateTimeLabel() {
	if (!finished) {
		var remaining_time = remainingTime();

		if (remaining_time > 0) {
			var r_sec = remaining_time % 60;
			document.getElementById("remaining-time").innerHTML = (remaining_time - r_sec)/60 + ":" + (r_sec < 10 ? ("0" + r_sec) : r_sec);
		} else {
			document.getElementById('time-limit').style.zIndex = "9998";
			document.getElementById('time-limit').style.display = "block";
			document.getElementById("points-time-over").innerHTML = "<h3>"+l("you_won_points", "<span>"+getEarnedPoints()+"</span>")+ "</h3>";
			blockGame();
		}
	}
}

function blockGame() {
	finished = true;
}

function updateTopInfo( distanceToNextPOI ) {

	document.getElementById('distance').innerHTML = parseInt(distanceToNextPOI) + " " + l("meters");

	if (currentPOI == 0) {

		var clue = "";
		if (game[currentPOI]["A"].hasOwnProperty("clue")) {
			clue = game[currentPOI]["A"].clue;
		}

		document.getElementById('clueLayer').getElementsByTagName("p")[0].innerHTML = clue;
			
		document.getElementById('clueLayer').className = "shown";
		document.getElementById('left-icon-div').className = "shown";
		
	} else if (game[currentPOI]["C"].hasOwnProperty("clue")) {

		document.getElementById('clueLayer').getElementsByTagName("p")[0].innerHTML = game[currentPOI]["C"].clue;
		document.getElementById('clueLayer').className = "shown";
		document.getElementById('left-icon-div').className = "shown";

		var keys = Object.keys(game);
		var lastPOIId = keys[keys.length-2];
		if (nextPOI == lastPOIId) {
			document.getElementById("left-icon").src="app/images/ui-app-i-treasure-finish.png";
		}

	} else {
		document.getElementById('clueLayer').className = "hidden";
		document.getElementById('left-icon-div').className = "hidden";
	}

	document.getElementById('main-progress').innerHTML = getInventoryProgressAsString(game);
}


function updatePath() {

	var pointList = []

	for (step in game) {

		var marker;

		if (parseInt(step) < parseInt(nextPOI) && 
			parseInt(step) != 0 && 
			parseInt(step) != 999) {

			var latlng = { "lat": game[step].lat, "lng": game[step].lng };
			var poiIcon = step == 1 ? flagIcon : stopIcon;
			poiIcon = step == Object.keys(game)[Object.keys(game).length-2] ? treasureIcon : poiIcon;

			if (game[step].hasOwnProperty("title") && game[step]["title"] != "") {
				marker = L.marker(latlng, { icon: poiIcon }).bindTooltip( game[step]["title"],
							{
								permanent: true,
								direction: 'bottom'
							});
				marker.setOpacity(0.5);
				marker.addTo(map);
			} else {
				marker = L.marker(latlng, { icon: poiIcon });
				marker.setOpacity(0.5);
				marker.addTo(map);
			}

			pointList.push(latlng);
		}
	}

	if (path != null) {
		map.removeLayer(path);
	}

	path = new L.Polyline(pointList, {
    	color: '#1c3587',
    	weight: 4,
    	opacity: 0.5,
    	smoothFactor: 1
	});

	path.addTo(map);
}

function locate_browser() {

	if (navigator.geolocation) {
		setInterval(function() {
			flushTracking();

			navigator.geolocation.getCurrentPosition(function(position) {
				if (totalDistance == 0) {
					lastPosition = position.coords
				}
				newLocation(position);
				mapLoaded = true;
			}, errorHandler, { enableHighAccuracy: true });

		}, 3000);
	} else {
		console.log("no va");
		document.getElementById("message").innerHTML = l("geo_not_supported");
	}
}


function locate_app() {

	setInterval(function() {
		flushTracking();

		window.location.href = "?getGPSData";
	}, 3000);
}

function flushTracking() {
	if (connected) {
		tracker.Flush(function(result, error){
			console.log("flushed");
		});
	}
}

function setGPSData(data) {

	if (game[nextPOI].type == "beacon") return;

	var latpos = data.indexOf("lat");
	var lat = data.substr(latpos + 6,10);
	
	var lonpos = data.indexOf("lon");
	var lon = data.substr(lonpos + 6,10);

	//TODO fer-ho més safety tenint en compta longitud de decimals variable
	
	var position = {};
	position = { coords: {longitude: parseFloat(lon), latitude: parseFloat(lat) } };

	if (totalDistance == 0) {
		lastPosition = position.coords;
	}

	newLocation(position);
	mapLoaded = true;
}


function newLocation(position) {

	if (finished || inscreen) { return; }

	var coors = { lng: position.coords.longitude, lat: position.coords.latitude };

	tracker.Places.Moved("POI" + nextPOI, position.coords.latitude, position.coords.longitude, tracker.Places.PlaceType.POI);

	distanceToNextPOI += getDistanceFromLatLon(coors.lat, coors.lng, lastPosition.latitude, lastPosition.longitude);
	totalDistance     += getDistanceFromLatLon(coors.lat, coors.lng, lastPosition.latitude, lastPosition.longitude);
	lastPosition = position.coords;

	if (!located) {
		map.setZoom(18);
		map.panTo(coors);
		located = true;

		tracker.Completable.Initialized("LB_GAME_" + game_id, tracker.Completable.CompletableType.Game);
		lastPOITime  = new Date().getTime() / 1000;
		startingTime = startingTime != 0 ? startingTime : new Date().getTime();
		if (time_limit != 0) {
			setInterval(function() { updateTimeLabel(); }, 1000);
		}
	}

	if (nextPOI > 0 && nextPOI < 999 && !startOpen) {

    	var distanceToNextPOI = map.distance({ "lat": game[nextPOI].lat, "lng": game[nextPOI].lng }, coors);

    	// WITH BEACON
    	// MAP && NEAR => CLOSEVIEW
    	// TELEPORT && NEAR => SHOW openA

		if (distanceToNextPOI <= game[nextPOI].triggerDistance || distanceToNextPOI < 1) {
			trackProgress();

			if (device == "app" && teleport == false) { 
				window.location.href = "?closeview&success=1";
				return;
			}

			inscreen = true;

			document.getElementById('openA' + nextPOI).click();
			currentPOI = nextPOI;
			nextPOI = getFollowingPOIId(nextPOI);
			updatePath();
		}

		if (fromMinigame) { 
			updatePath();
		}

		updateTopInfo( distanceToNextPOI );
	}

	this.refreshUserMarker(coors);
}

function saveProgress() {
	setCookie("progress_game_" + game_id, currentPOI, 365);
}

function saveFinishedData() {
	setCookie("finished_" + game_id, true, 365);
	setCookie("finished_time_" + game_id, true, 365);
	setCookie("finished_points_" + game_id, true, 365);
}

function trackProgress() {

	var progress = nextPOI > 0 ? nextPOI / (Object.keys(game).length - 2) : 0;
	console.log("new progress: " + progress);

	var t = new Date().getTime() / 1000;
	var timeSpent = t - lastPOITime;
	lastPOITime = t;
	var poiId = "POI" + nextPOI;

	var distance = 100; //TODO
	var speed = 12; //TODO distance / lastPOITime

	//tracker.setVar("time", timeSpent);
	tracker.setVar("time", Math.floor(Math.random() * 20) + 20);
	tracker.setVar("poiId", poiId);
	tracker.setVar("averageSpeed", lastPOIDistance / timeSpent);
	tracker.setVar("distance", lastPOIDistance);

	tracker.Completable.Progressed("LB_GAME_" + game_id, tracker.Completable.CompletableType.Game, progress);
}

function refreshUserMarker(coors) {
	if (mapLoaded != 0) {
		map.removeLayer(marker);
	}

	marker = L.marker(coors, { icon: locationIcon }).addTo(map);
}

function getFollowingPOIId(nextPOI) {

	var followingId = -2;
	for (poi in game)
	{
		if (poi == nextPOI)
		{ 
			followingId = -1;
		}
		else if (followingId == -1)
		{ 
			return poi;
		}
	}

	// -2 does not exist 
	// -1 is the last
	return followingId;
}

function errorHandler(err) {

	switch(err.code) {
        case err.TIMEOUT:
            document.getElementById("message").innerHTML = 'Geolocation Timeout';
            break;
        case err.POSITION_UNAVAILABLE:
            document.getElementById("message").innerHTML = 'Geolocation Position unavailable';
            break;
        case err.PERMISSION_DENIED:
            document.getElementById("message").innerHTML = 'Geolocation Permission denied';
            break;
        default:
            document.getElementById("message").innerHTML = 'Geolocation returned an error.code';
    }
    console.log(err);
}


function showInventory(id) {

	addCollectablesToInventory();

	// TODO omplir al principi amb totes les imatges i posarles hidden o shown
	document.getElementById('inventory').style.zIndex = "9999";
	document.getElementById('inventory').style.opacity = "1";
}


function hideInventory(id) {
	document.getElementById('inventory').style.zIndex = "-1";
	document.getElementById('inventory').style.opacity = "0";
}


function addCollectablesToInventory() {

	game = game_info["POIS"];

	var inventory = document.getElementById('inventory-grid');
	var progress = document.getElementById('inventory-progress');
	inventory.innerHTML = "";
	var rowHTML = "";
	var i = 0; //Number of collectables

	for (step in game) {

		if (game[step].hasOwnProperty("item") && game[step].item !="" && game[step].item!="-" && game[step].item) {

			var itemName = l("item")+" "+(i+1);
			if (game[step].hasOwnProperty("itemName") && game[step].itemName != "" && game[step].itemName) {
				itemName = game[step].itemName;
			}

			if (i % 2 == 0) {

				if (parseInt(currentPOI) >= parseInt(step) || tofinish) {

					rowHTML = `<div class="row">
										<div class="collectable">
											<div class="collectable-image" style="
												background-image:url('`+ server_url + game[step].item +`');
											"></div>
											<div class="collectable-name">
												<p>`+ itemName +`</p>
											</div>
										</div>`;
				} else {
					rowHTML = `<div class="row">
								<div class="collectable">
									<div class="no-collectable-question-mark">
										<p>?</p>
									</div>
								</div>`;
				}
				
			} else {

				if (parseInt(currentPOI) >= parseInt(step) || tofinish) {

					rowHTML += `
							<div class="collectable">
								<div class="collectable-image" style="
									background-image:url('`+ server_url + game[step].item +`');
								"></div>
								<div class="collectable-name">
									<p>`+ itemName +`</p>
								</div>
							</div>
						</div>`;
				} else {
					rowHTML += `
							<div class="collectable">
								<div class="no-collectable-question-mark">
									<p>?</p>
								</div>
							</div>
						</div>`;
				}

				inventory.innerHTML += rowHTML;
				rowHTML = "";
			}
			i++;
		}
	}

	if (rowHTML != "") {
		inventory.innerHTML += rowHTML + "</div>";
	}

	progress.innerHTML = getInventoryProgressAsString(game); //TODO current POI no, contar quants en porta

	/*`<div class="row">
		<div class="collectable">
			<div class="collectable-image"></div>
			<div class="collectable-name">
				<p>hoalhoalhoasd</p>
			</div>
		</div>
		<div class="collectable">
			<div class="no-collectable-question-mark">
				<p>?</p>
			</div>
		</div>
	</div>`*/
}

/*
function uploadContent() {
	if ( !isUploadSupported() ) {
		//TODO disable or show error message
	}
}

function isUploadSupported() {
    if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
        return false;
    }
    var elem = document.createElement('input');
    elem.type = 'file';
    return !elem.disabled;
};

*/
