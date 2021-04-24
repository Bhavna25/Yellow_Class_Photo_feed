var msnry = new Masonry( '.grid', {
  itemSelector: '.photo-item',
  columnWidth: '.grid__col-sizer',
  gutter: '.grid__gutter-sizer',
  percentPosition: true,
  stagger: 30,
  visibleStyle: { transform: 'translateY(0)', opacity: 1 },
  hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
});
var unsplashID = 'eoBJAwcH5B7wLnXJmeyyti8RGbd9ViiVpvRlnbGZ1l4';

var infScroll = new InfiniteScroll( '.grid', {
  path: function() {
    return 'https://api.unsplash.com/photos?client_id='
      + unsplashID + '&page=' + this.pageIndex;
  },
  responseType: 'text',
  outlayer: msnry,
  status: '.page-load-status',
  history: false,
});
var proxyElem = document.createElement('div');

infScroll.on( 'load', function( response ) {
    var data = JSON.parse( response );
  var itemsHTML = data.map( getItemHTML ).join('');
  proxyElem.innerHTML = itemsHTML;
  var items = proxyElem.querySelectorAll('.photo-item');
  imagesLoaded( items, function() {
    infScroll.appendItems( items );
    msnry.appended( items );
  });
});
infScroll.loadNextPage();
var itemTemplateSrc = document.querySelector('#photo-item-template').innerHTML;

function getItemHTML( photo ) {
  return microTemplate( itemTemplateSrc, photo );
}
function microTemplate( src, data ) {
  return src.replace( /\{\{([\w\-_\.]+)\}\}/gi, function( match, key ) {
    var value = data;
    key.split('.').forEach( function( part ) {
      value = value[ part ];
    });
    return value;
  });
}
