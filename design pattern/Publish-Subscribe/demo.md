#发布订阅者模式
发布订阅者模式的应用很广泛，它可以用来解耦用户视图的更新，也可以用来解耦ajax应用获取数据之后所需进行的一系列操作。

例如下面的列子
html
``` html
<form id="flickrSearch">
 
   <input type="text" name="tag" id="query"/>
 
   <input type="submit" name="submit" value="submit"/>
 
</form>
 
 
 
<div id="lastQuery"></div>
 
<ol id="searchResults"></ol>
 
 
 
<script id="resultTemplate" type="text/html">
    <% _.each(items, function( item ){ %>
        <li><img src="<%= item.media.m %>"/></li>
    <% });%>
</script>
```

js
```js
(function( $ ) {
 
   // Pre-compile template and "cache" it using closure
   var resultTemplate = _.template($( "#resultTemplate" ).html());
 
   // Subscribe to the new search tags topic
   $.subscribe( "/search/tags", function( e, tags ) {
       $( "#lastQuery" )
                .html("<p>Searched for:<strong>" + tags + "</strong></p>");
   });
 
   // Subscribe to the new results topic
   $.subscribe( "/search/resultSet", function( e, results ){
 
       $( "#searchResults" ).empty().append(resultTemplate( results ));
 
   });
 
   // Submit a search query and publish tags on the /search/tags topic
   $( "#flickrSearch" ).submit( function( e ) {
 
       e.preventDefault();
       var tags = $(this).find( "#query").val();
 
       if ( !tags ){
        return;
       }
 
       $.publish( "/search/tags", [ $.trim(tags) ]);
 
   });
 
 
   // Subscribe to new tags being published and perform
   // a search query using them. Once data has returned
   // publish this data for the rest of the application
   // to consume
 
   $.subscribe("/search/tags", function( e, tags ) {
 
       $.getJSON( "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
              tags: tags,
              tagmode: "any",
              format: "json"
            },
 
          function( data ){
 
              if( !data.items.length ) {
                return;
              }
 
              $.publish( "/search/resultSet", { items: data.items } );
       });
 
   });
 
 
})( jQuery );
```