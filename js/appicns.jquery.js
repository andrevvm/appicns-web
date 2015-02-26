jQuery.easing.def = "easeOutExpo";
var selectedEl,
    selectedIcon,
    timer;

$(function() {
 selectedEl = $("#icons_content");
 setBodyHeight();
 $(window).scroll(function() {
   selectedEl.css("top",-$(this).scrollTop());
   if(selectedEl.attr("id") == "single_content") {
      var icon_index = Math.round($(this).scrollTop() / 720);
      scrollto_label(icon_index);
   }
   if(selectedEl.attr("id") == "download") {
      scrollto_label($("#label_grid_download").index());
   }
  });
   
  $(window).resize(function() {
    timer = setTimeout(function() {
      var icon_index = 0;
      $("#faux-page").height(selectedEl.outerHeight());
      if(selectedEl.attr("id") == "single_content") {
        icon_index = Math.round($(window).scrollTop() / 720);
      }
      if(selectedEl.attr("id") == "download") {
        icon_index = $("#full_download").index();
      }
      if(selectedEl.attr("id") == "single_content") {
        scrollto_label(icon_index);
      }
      
    }, 500);
    set_page_margin(selectedEl);
  });

  
  $("#icons_content img.icon").fadeTo(0,0).click(function() {
     show_list_view();
     var icon = $(this).attr("id");
     var $icon = $("#full_"+icon);
     $(window).scrollTop($icon.position().top - (($(window).height() - $icon.height()) / 2));
     goto_label(icon);
     return false;
  }).load(function() {
      $(this).fadeTo(200,0.9, function() {
        $(this).css("opacity","");
      });
    }).each(function () {
      if(this.complete) {$(this).load();}
    });

    
  $("#grid_download").click(function() {
    show_download_view();
    goto_label("grid_download");
    return false;
  });
    
  $("#nav_download, #single_download, .icns").click(function(el) {
    show_download_view();
    scrollto_label($("#label_grid_download").index());
    return false;
  });

 $("#header h2").click(show_grid_view);
 
 $("#nav_grid").click(show_grid_view);
 $("#nav_list").click(show_list_view);
 
 $("#header h3").hide();
 icon_text();
 icon_labels();

 $("#download-link").click(function() {
  _gaq.push(['_trackEvent', 'Downloads', 'ZIP', 'appicns.zip']);
 });

});

function show_grid_view() {
  selectedEl.data("scrollPos",$(window).scrollTop());
   selectedEl = $("#icons_content");
   setBodyHeight();
   set_page_margin(selectedEl);
   icon_text();
   $("#icon_labels").stop(true).fadeTo(400,0,"linear");
   $("#nav .selected").removeClass("selected");
   $("#nav_grid").addClass("selected");
   return false;
}

function show_list_view() {
   selectedEl.data("scrollPos",$(window).scrollTop());
   selectedEl = $("#single_content");
   setBodyHeight();
   var icon_index = Math.round($(window).scrollTop() / 720);
   scrollto_label(icon_index);
   set_page_margin(selectedEl);
    $("#header h3").stop(true).fadeTo(100,1,"linear",function() {
      $("#header h3").hide();
      $("#icon_labels").css("opacity",1).show();
    });
    $(".icons img, #grid_download").unbind("mouseleave");
    $(".icons img, #grid_download").unbind("mouseenter");
    
    $("#nav .selected").removeClass("selected");
    $("#nav_list").addClass("selected");
    return false;
}

function show_download_view() {
   selectedEl.data("scrollPos",$(window).scrollTop());
   selectedEl = $("#download");
   setBodyHeight();
   set_page_margin(selectedEl);
    $("#header h3").stop(true).fadeTo(100,1,"linear",function() {
      $("#header h3").hide();
      $("#icon_labels").css("opacity",1).show();
    });
    $(".icons img, #grid_download").unbind("mouseleave");
    $(".icons img, #grid_download").unbind("mouseenter");
    
    $("#nav .selected").removeClass("selected");
    $("#nav_download").addClass("selected");
    return false;
}

function set_page_margin(el) {
  $("#pages").css({
    left: -(el.index() * $(window).width())
  });
}

function icon_text() {
  $(".icons img.icon, #grid_download").mouseenter(function(){
    $("#header h3").stop().text($(this).attr("title")).fadeTo(100,0.5,"linear");
  }).mouseleave(function(){
    $("#header h3").stop().fadeTo(400,0,"linear",function(){$(this).text("");});
  });
}

function icon_labels() {
  $(".icons img.icon").each(function() {
    $("#icon_labels ul").append("<li id='label_"+$(this).attr("id")+"'>"+$(this).attr("title")+"</li>");
  });
  $("#icon_labels ul").append("<li id='label_grid_download'>Download</li>");
}

function goto_label(icon) {
  var index = $("#label_"+icon).index('li');
  selectedIcon = index;
  var label_offset = $("#icon_labels li:eq("+ index +")").position().top;
  $("#icon_labels").removeClass("anim").css("marginTop",-label_offset);
  setTimeout(function() {
    $("#icon_labels").addClass("anim");
  }, 100);
}

function scrollto_label(index) {
  selectedIcon = index;
  var label_offset = $("#icon_labels li:eq("+ index +")").position().top;
  $("#icon_labels").css({"marginTop":-label_offset});
}

function setBodyHeight() {
 $("#faux-page").height(selectedEl.outerHeight());
  if(selectedEl.data("scrollPos")) {
    $(window).scrollTop(selectedEl.data("scrollPos"));
  } else {
    $(window).scrollTop(0);
  }
}