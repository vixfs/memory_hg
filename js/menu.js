function chooseLevelScreen() {
	const NewMenu = `
  	<div class="container start" id = "start_gameAsteroid">
	  	<div class="d-flex flex-column bd-highlight mb-3 justify-content-between" id = "menu_container">
				<div class="p-0 bd-highlight flex-fill backlineimg">
				  	<div class="d-flex flex-column bd-highlight mb-3 gameinfo text-center justify-content-around default_margin">
				  		<div class="p-2 bd-highlight" id = "topDiv">
						  	<div class="d-flex flex-column bd-highlight mb-3">	
						  		<div class="p-2 bd-highlight">
						  			<p class="gamenumber2 ">Игра №3</p>
						  		</div>
						  		<div class="p-0 bd-highlight">
						  			<div class="secretsofgalaxy">
						  				<div class = "menu_name_margin"></div>
						  				<div class="menu_name">
						  					Космические<br>рейнджеры
						  				</div>
						  			</div>
						 		</div>
						 		<div class="p-0 bd-highlight">
						  			<p class="helponstart">Твоя задача – сбивать астероиды, угрожающие нашей планете. Правильно посчитай мощность двух заряженных боеголовок и выстрели в нужный астеройд, нажав на него пальцем.</p>
						 		</div>
						 	</div>
						</div>
				 		<div class="p-0 bd-highlight startcardimgs">
				  			<img src="img/laserBeam2.svg" id = "menu_laser">
				 		</div>
				 		<div class="p-0 bd-highlight startcardimgs d-flex justify-content-center">
				  			<img src="img/spaceShipStanding.svg" id = "menu_spaceShip">
				 		</div>
					</div>
				</div>

				
				
				<div class="p-0 bd-highlight" id = "bottomDiv">

				</div>
		</div>
	</div>
</div>
`
	$("#screen").html(NewMenu);
	$("#screen").css({'backgroundColor' : '#261734', 'color':'#fff', 'padding':'0', 'transition':'null'});
	resizeMainMenu();

	if (q.platform === "android") {
		var $input = $(
			'<button class="button-start" id="nextbut">Начнём!</button>'
		);
		$input.appendTo($("#bottomDiv"));


		let z = document.getElementById("nextbut");
		z.onclick = function () {
			let url = "http://openother/#" + "asteroids/index.html" + window.location
				.search;
			console.log("ONCLICK", url)
			window.open(url, '_blank')
		}
	} else {
		var $input = $(
			'<a class="button-start" href="../asteroids/index.html" id="nextbut">Начнём!</a>'
		);
		$input.appendTo($("#bottomDiv"));

		let oldUrl = $('#nextbut').attr("href");
		let newUrl = oldUrl + window.location.search;

		$('#nextbut').attr("href", newUrl);

	}
}
