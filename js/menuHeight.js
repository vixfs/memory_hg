// Сначала получаем высоту окна просмотра 
// и умножаем ее на 1%
let vh = window.innerHeight * 0.01;

// Затем устанавливаем значение свойства --vh
// для корневого элемента
document.documentElement.style.setProperty('--vh', `${vh}px`);

// слушаем событие resize
window.addEventListener('resize', () => {
  // получаем текущее значение высоты
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

function spaceShip_height() {
// Растояние между кнопкой и блоком описания уровней
				let height_For_laser_And_Ship, loadHeight;
				if ($(window).height()*0.9 < $("#topDiv").height()) loadHeight = $(window).height() * 0.6;
					else loadHeight = $("#topDiv").height();
				height_For_laser_And_Ship = $(window).height() - $("#topDiv").offset().top - loadHeight - 104;
				if (height_For_laser_And_Ship > 50) {
					if (height_For_laser_And_Ship * 0.55 < 93) $('#menu_spaceShip').height(height_For_laser_And_Ship * 0.55);
						else $('#menu_spaceShip').height("93px");
					if (height_For_laser_And_Ship * 0.55 < 66) $('#menu_laser').height(height_For_laser_And_Ship * 0.35);
						else $('#menu_laser').height("63px");
				}
				else {
					$('#menu_laser, #menu_spaceShip').height("0px");
				}
}

function resizeMainMenu(){
			var resize_Menu;
			// Фоновая картинка под размер блока
			//$('.start_game').height($(window).height() - 2);
			if ($('#start_gameAsteroid').height() > 0) {
				if ($('#start_gameAsteroid').width() * 2 > $('#start_gameAsteroid').height()) {
					$("#start_gameAsteroid").css({"background-size" : $('#start_gameAsteroid').width() + 35});
				} else {
					$("#start_gameAsteroid").css({"background-size" : "auto " + ($('#start_gameAsteroid').height() + 5) + "px"});
				}

				// Название посередине
				resize_Menu = ($(".secretsofgalaxy").height() - $(".menu_name").height()) / 2;
				$(".menu_name_margin").height(resize_Menu);

				spaceShip_height();
			}
		}

$(function(){
		var screenWidth = $(window).width();
		var screenHeight = $(window).innerHeight();

		window.addEventListener('resize', function(event){
  			setTimeout(resizeMainMenu, 1500);
		});

  		$(window).resize(function(){
    		resizeMainMenu();
  		});



		$(document).ready(function(){
    		window.scrollTo(1, 0);
    		setTimeout(resizeMainMenu(), 1500);
		});
	});