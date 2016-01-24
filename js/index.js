$(document).ready(function(){

  window.scrollTo(0,$("#intro").offset().top);

  $('#myModal').hide();

  window.addEventListener("onTouchMove", function() {
    if (window.scrollY > 100) {
      $('.navbar').style("background:#642c6e;");
    }
    else {
      $('.navbar').style("background:transparent;");
    }
  },false);

  $(document).bind('touchmove', function(e) {
    e.preventDefault();
  });

  $(window).resize(function(){
    var windowHeight = $(window).height();
    var scrollPosition = $(document).scrollTop();
    console.log("resizing");
    console.log("windowHeight: " + windowHeight - 100);
    console.log("scrollPosition: " + scrollPosition);
    if (scrollPosition < windowHeight){
      window.scrollTo(0,$("#intro").offset().top);
    }
    else if (scrollPosition < windowHeight*2){
      window.scrollTo(0,$("#proposal").offset().top);
    }
    else if (scrollPosition < windowHeight*3){
      window.scrollTo(0,$("#endorsements").offset().top);
    }
    else {
      window.scrollTo(0,$("#vote").offset().top)
    }
  });

});

$("#submitEmail").on("click", function() {
    name = $("#nameField").serialize();
    email = $("#emailField").serialize();
    if (name !== "name=" && email !== "email=") {
      $.ajax({
          url: "//formspree.io/eight.plus.four.campaign@gmail.com", 
          method: "POST",
          data: {name: name, email: email},
          dataType: "json"
      });
      $('#myModal').modal();
    }
    return false;
});