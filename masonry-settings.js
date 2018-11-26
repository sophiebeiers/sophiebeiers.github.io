//init masonry grid
// $('.grid').masonry({
// // options
// itemSelector: '.grid-item',
// columnWidth: 245,
// gutter: 20
// });
$(window).on("load", function() {
	$('.items').masonry({
    itemSelector: '.items-grid',
  });
});
