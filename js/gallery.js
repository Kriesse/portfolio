jQuery(document).ready(function($) {
  
  // highlight project
  
  if(location.hash) {
    $('a[href=' + location.hash.match(/#\w+/) + '-1]').addClass('active');
  } else {
    $('#project_list li a:first').addClass('active');
  }
  

  $("#project_list li a").click(function () {
    // Switch class="active" for list items
    $("#project_list li a").removeClass("active");
    $(this).addClass("active");          

    // Assign value of the link name
    var thisGallery = $(this).attr("href");
    var projectId = thisGallery.match(/#[^-]+/)[0];

    // show the content of the link and hide others
    $(".project_container").hide();
    $(projectId + " .gallery img").hide();
    $(projectId + " .gallery img:first").show();
    $(projectId).fadeIn();
    setAnchor(thisGallery);
    return false;
  });

  var projects = {};

  var setAnchor = function(anchor) {
    var location = window.location.href;
    var projectId = anchor.match(/#?([^-]+)-/)[1];
    var currentImage = projects[projectId].currentImage;
    var imageNr = "-" + (currentImage + 1);
    if(anchor.match(/-/)) {
      anchor = anchor.replace(/-\d+$/, imageNr);
    } else {
      anchor = anchor + imageNr;
    }
    window.location.hash = anchor;
  };

  $("div.project_container").each(function(project) {

    this.currentImage = 0;
    // find all images
    this.pics = $(this).find(".gallery img");
    
    var id = $(this).attr("id");
    var that = this;
    projects[id] = this;
    
    // write total number of images
    this.updateStatus = function() {
      $(that).find(".controls .status").html(that.currentImage + 1 + " / " + that.pics.length);
    };
    this.updateStatus();
    
    if(this.pics.length < 2) {
      $(this).find(".controls .next").addClass('disabled').click(function() {return false});
      $(this).find(".controls .prev").addClass('disabled').click(function() {return false});
      $(this).find(".gallery img").addClass('disabled').click(function() {return false});
      
    } else {
        var toNext = function() {
          $('#' + id + " .gallery img").hide();

          //$(that.pics[that.currentImage]).hide();
          if(that.currentImage == that.pics.length - 1) {
            that.currentImage = 0;
          } else {
            that.currentImage = that.currentImage + 1;
          }
          $(that.pics[that.currentImage]).fadeIn();
          that.updateStatus();
          setAnchor(id + "-" + (that.currentImage + 1));
        };

        $(this).find(".controls .next").click(toNext);

        $(this.pics).click(toNext);

        $(this).find(".controls .prev").click(function() {
          $('#' + id + " .gallery img").hide();
          if(that.currentImage == 0) {
            that.currentImage = that.pics.length - 1;
          } else {
            that.currentImage = that.currentImage - 1;
          }
          $(that.pics[that.currentImage]).fadeIn();
          that.updateStatus();
          setAnchor($(that).attr("id") + "-" + (that.currentImage + 1));
        });
    }    
  });
  
  // handle deep links
  var hash = window.location.hash;
  if(hash) {
    var projectId = hash.match(/#\w+/)[0];
    $(projectId).show();
    var imageNr = parseInt(hash.match(/-(\d+)$/)[1]) - 1;
    var project = projects[projectId.substr(1)];
    $(project.pics[imageNr]).show();
    project.currentImage = imageNr;
    project.updateStatus();
  } else { // by default, show the image in the first project
    $(".project_container:first").show();
    $(".project_container:first .gallery img:first").show();
  };
  

});

