$(document).ready(function() {
	
			$('.more').click(function () {
		 if($(this).hasClass('open')) {   	
				$(this).removeClass('open').siblings('.abstract').removeClass('show-text').parents('.testo').removeClass('open');
			}
			else {	$(this).addClass('open').siblings('.abstract').addClass('show-text').parents('.testo').addClass('open');
			}
});   
	
	    	$('#wsmore-sec').pagepiling({
	 			sectionsColor: ['#502D6D', '#502D6D', '#502D6D', '#502D6D'],
			    navigation: {
			    	'position': 'right',
			   		'tooltips': ['HOME', 'SHOWROOM VIRTUALE', 'MUSEO VIRTUALE', 'FOTOREALISMO', 'FORMAZIONE','GAMING', 'INTERACTION','VIDEO 360','METAVERSO','CONFERENCE','HOLOLENS','MIXED REALITY','SMART MANUFACTURING','EDUTAINMENT 360', 'MODEL VIEWER','VIDEO RENDER']
			   	},
			   	onLeave: function(index, nextIndex, direction){	 
				 
			   	if(index == 15){
				 setTimeout(function() {$('#section14').find('.3d-pano').find('canvas').remove(); }, 800);
				 }
				 
				 
				 width = $(window).width();
			    	console.log(width);
			    	if(width <= 480){ 
				    	if (direction =='down') {offset = parseInt($('#pp-nav').css('left')) - 42;} else {offset = parseInt($('#pp-nav').css('left')) + 42;}
				    	
				    	$('#pp-nav').css('left', offset);
			    	}
				 
			    },
			   	
			   	 afterLoad: function(anchorLink, index){
	
					$("video").each(function () { this.pause(); });
		
					if (index == 1) {
						$('#section1').find('video').get(0).play();
					}
		
					if (index == 2) {
						$('#section2').find('video').get(0).play();
					}
		
					if (index == 3) {
						$('#section3').find('video').get(0).play();
					}
					if (index == 4) {
						$('#section4').find('video').get(0).play();
					}
					if (index == 5) {
						$('#section5').find('video').get(0).play();
					}
					if (index == 6) {
						$('#section6').find('video').get(0).play();
					}
					if (index == 7) {
						$('#section7').find('video').get(0).play();
					}
					if (index == 8) {
						$('#section8').find('video').get(0).play();
					}
					if (index == 9) {
						$('#section9').find('video').get(0).play();
					}
					if (index == 10) {
						$('#section10').find('video').get(0).play();
					}
					if (index == 11) {
						$('#section11').find('video').get(0).play();
					}	
					if (index == 12) {
						$('#section12').find('video').get(0).play();
					}
					if (index == 13) {
						$('#section13').find('video').get(0).play();
					}
					if (index == 14) {
						setTimeout(function () {
							init_panorama($('.3d-pano'));
						}, 300);
					}
					if (index == 15) {
						// AR
					}	
					if (index == 16) {
						$('#section16').find('video').get(0).play();
					}																														
				},
			    
				afterRender: function () {
					$('#section1').find('video').get(0).play();
				}
			});
	    });
	    
	    
function emptyscene(elem) {
    while (elem.lastChild) elem.removeChild(elem.lastChild);
}



var WIDTH = 3000,
  HEIGHT = 1000,
  NUM_LINES = 50,
  NUM_POINTS = 50,
  LINE_HEIGHT = WIDTH / NUM_POINTS,
  G = document.getElementById('graphy'),
  DOT_POINTS = Array.from(range(0, WIDTH, WIDTH / NUM_POINTS));

function range(start, end, step) {
  var i = start,
    result = [];
  while (i <= end) {
    result.push(i);
    i += step;
  }
  return result;
}

function joyDivision(svgElement) {
  var points = [],
    noiseBackground = [];

  function getPoint(cx, cy, i, y) {
    return function(n) {
      var bg = noiseBackground[i][n / (WIDTH / NUM_POINTS)],
        dx = (cx - n) * 5,
        dy = (cy - y) * 1,
        distance = Math.sqrt(dx * dx + dy * dy) * 0.5 + 15,
        p_height = (bg / distance) * 5;

      return [n, p_height];
    }
  }

  function getPath(cx, cy, i) {
    var y = (HEIGHT / NUM_LINES) * i,
      heights = DOT_POINTS.map(getPoint(cx, cy, i, y));
    return 'M0,' + (y - heights[0][1]) + ' S' + heights.slice(1).map(function(ps) {
      return ps[0] + ',' + (y - ps[1]).toFixed(5)
    }).join(" ") + ' L' + WIDTH + ',' + HEIGHT + ' 0,' + HEIGHT + ' Z';
  }

  function init() {
    svgElement.innerHTML = `<path class="wave" d="M0,0 L${WIDTH},0 Z" />`;
    for (var i = 0; i < NUM_LINES; i++) {
      noiseBackground.push(DOT_POINTS.map(function(e) {
        return (Math.random() - 0.5) * 1500
      }));
      svgElement.innerHTML += '<path id="wave_' + i + '" class="wave" d="' + getPath(500, 500, i) + '" />';
    }
  }

  function draw(cx, cy) {
    for (var i = 0; i < NUM_LINES; i++) {
      document.getElementById("wave_" + i).setAttribute('d', getPath(cx, cy, i));
    }
  }

  init();
  return {
    draw: draw
  }
}

var j = joyDivision(G);

document.addEventListener("mousemove", function(e) {
  cx = e.offsetX;
  cy = e.offsetY;
  j.draw(cx, cy);
})

j.draw(1000, 1000);