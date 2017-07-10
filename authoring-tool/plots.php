<html>
<head>
	<script src="js/lib/jquery-1.12.4.js"></script>
	<link href="https://fonts.googleapis.com/css?family=Raleway:400,700" rel="stylesheet">

	<link rel="stylesheet" href="css/bootstrap.min.css">
	<script src="js/lib/bootstrap.min.js"></script>
	<link rel="stylesheet" href="css/cacat.css"/>
	<link rel="stylesheet" href="css/plots.css"/>
</head>
<body>
	<header class="header">
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand" href="index.php">
						<img alt="Brand" style="padding: 8px;" src="images/beaconing_logo.png">
					</a>
				</div>
			</div>
		</nav>

		<div class="container-fluid">
			<div class="row">
				<ol class="breadcrumb">
					<li><a href="/beaconing"><span>Desktop</span></a></li>
					<li class="active"><span>Select plot</span></li>
				</ol>
			</div>
		</div>
	</header>

	<div class="container">
		<div class="col-md-12 description">
			<p class="descriptionText"><strong>Description: </strong>Select the type of location-based game that best suits your gamified lesson path and pedagogical content. Each type of game have different dynamics, mechanics and minigames to create an awesome playful real-life learning experience</p>
		</div>
	</div>

	<div class="container">
		<div class="official-row">
			<div class="row">
				<div class="col-md-3 gameType">
					<div class="plot">
						<a href="follow-the-path.php?id=0">
							<div class="zoomOnHover image">
								<img src="images/follow-the-path.jpg">
							</div>
							<div class="POIdescription">
								<p>Linear geolocation game where students have to find specific Points of Interest (POI) in the real world. All points are shown in the map from the begining and the winner is the one who arrives first to the last POI.</p>
							</div>
						</a>
					</div>
					<h2>Follow the Path</h2>
				</div>
				<div class="col-md-3 gameType">
					<div class="plot">
						<!--a href=""-->
							<div class="zoomOnHover image">
								<img src="images/treasure-hunt.jpg" style="opacity: 0.6;">
							</div>
							<div class="POIdescription">
								<p>Non-linear exploratory geolocation game where the goal is to find a hidden treasure in the real world. Individually or in groups, students will have to find clues with relevant information that has to be interpreted to find the final location of the treasure.</p>
							</div>
						<!--/a-->
					</div>
					<h2>Treasure Hunt</h2>
				</div>
				<div class="col-md-3 gameType">
					<div class="plot">
						<!--a href=""-->
							<div class="zoomOnHover image">
								<img src="images/scout.jpg" style="opacity: 0.6;">
							</div>
							<div class="POIdescription">
								<p>Non-linear geolocation game where students are teamed up in two different teams. Each team has a base where the flag is allocated. The goal of the game is to capture the enemy's’ flag and bring it to the base.</p>
							</div>
						<!--/a-->
					</div>
					<h2>Capture the flag</h2>
				</div>
				<div class="col-md-3 gameType">
					<div class="plot">
						<!--a href=""-->
							<div class="zoomOnHover image">
								<img src="images/rat-race.jpg" style="opacity: 0.6;">
							</div>
							<div class="POIdescription">
								<p>Linear competitive geolocation game where two or more teams of students have to participate on a race. The goal is to be the first to reach the finish line solving challenges on different POI (Points Of Interests).</p>
							</div>
						<!--/a-->
					</div>
					<h2>Rat Race</h2>
				</div>
			</div>
		</div>
		<div class="official-row">
			<div class="row">
				<div class="col-md-3 gameType">
					<div class="plot">
						<!--a href=""-->
							<div class="zoomOnHover image">
								<img src="images/conquest.jpg" style="opacity: 0.6;">
							</div>
							<div class="POIdescription">
								<p>Non-linear geolocation game where students teamed up in different teams have to conquer the real world solving challenges. The first team to conquer a certain number of zones wins the challenge.</p>
							</div>
						<!--/a-->
					</div>
					<h2>Conquest</h2>
				</div>
				<div class="col-md-3 gameType">
					<div class="plot">
						<!--a href=""-->
							<div class="zoomOnHover image">
								<img src="images/jigsaw.jpg" style="opacity: 0.6;">
							</div>
							<div class="POIdescription">
								<p style="font-size: 0.9em;">Linear geolocation game where the goal is to be the first team to arrive to a specific location overcoming challenges in different POI (Point Of Interest). Different teams start the race at different POI and every time a team solves the challenge of a POI a clue to the next one is shown.</p>
							</div>
						<!--/a-->
					</div>
					<h2>Jigsaw</h2>
				</div>
				<div class="col-md-3 gameType">
					<div class="plot">
						<!--a href=""-->
							<div class="zoomOnHover image">
								<img src="images/conquest.jpg" style="opacity: 0.6;">
							</div>
							<div class="POIdescription">
								<p style="font-size:0.9em;">Adapted from the board game "Stratego". Non-linear strategy geolocation game where students teamed up in 2 teams. Each player has a role and each team has a base where the flag is allocated. The goal of the game is to capture the enemy's’ flag and bring it to the base.</p>
							</div>
						<!--/a-->
					</div>
					<h2>Stratego</h2>
				</div>
			</div>
		</div>
	</div>

</body>
</html>