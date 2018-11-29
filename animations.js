var animate_lemon = new TimelineMax({repeat:200, repeatDelay:1, yoyo:true});
animate_lemon.to("#lemon", 2, {rotation:360, transformOrigin:"50% 50%", delay:0.1, ease:Power0.easeNone});



var animate_fire = new TimelineMax({repeat:100, repeatDelay:0});

animate_fire.fromTo("#truck", 8, {x: '-=250px'},{x:500, ease:Power0.easeNone})
animate_fire.fromTo("#truck", 1, {x: 500},{x:1000, ease:Power0.easeNone})
//animate_fire.to("#truck", 3, {x:0, ease:Power0.easeNone})
//TweenLite.fromTo("#truck", 6, {x: '-=200px'}, {x: 900, ease:Back.easeInOut, delay: 3, repeat:10});
