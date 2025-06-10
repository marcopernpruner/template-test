$('a').each(function () {
  var a = new RegExp('/' + window.location.host + '/');
  if (!a.test(this.href) && this.href != "" && this.href != "#") {
    $(this).click(function (event) {
      event.preventDefault();
      event.stopPropagation();
      window.open(this.href, '_blank');
    });
  }
});

function setDefaultUserPicture(picture) {
  picture.src = "/assets/images/no-user.jpg";
  return true;
}

function iframe16vs9() {
  var iframes = $("iframe");

  for (var i = 0; i < iframes.length; i++) {
    var element = $(iframes[i]);
    var width = $(element).width();
    $(element).height(width * 9 / 16);
  }
}

if ($("iframe").length > 0) {
  iframe16vs9();

  $(window).resize(function () {
    iframe16vs9();
  });
}

if ($("table").length > 0) {
  $("table").wrap("<div class='table-scrollable'></div>");
}

if ($("#toc").length > 0) {
  $("#toc").html(' \
      <nav> \
          <div class="contents"> \
              <div class="menu" markdown="1"> \
                  <p class="menu-label">Contents</p> \
              </div> \
          </div> \
      </nav> \
  ');

  $("#toc nav .contents .menu").append('<ul id="markdown-toc"></ul>');

  if ($(":header:not(.no-toc)").length > 0) {
    var prevH1List = null;
    var prevH1Item = null;
    var prevH2List = null;
    var prevH2Item = null;
    var prevH3List = null;

    $(":header:not(.no-toc)").each(function (index) {
      if ($(this).attr("id") == undefined) {
        var id = $(this).text().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();
        $(this).attr("id", id);
      }

      if ($("#markdown-toc li[data-ref='#" + $(this).attr("id") + "'").length == 0) {
        var text = $(this).clone();
        text.find(".no-toc").remove();
        text = $(text).html().trim();
        var toAppend = $('<li data-ref="#' + $(this).attr("id") + '"><a href="#' + $(this).attr("id") + '">' + text + '</a></li>');

        if ($(this).is("h1")) {
          prevH1List = $("#markdown-toc");
          $(prevH1List).append(toAppend);
          prevH1Item = toAppend;
          prevH2List = null;
        } else if ($(this).is("h2")) {
          if (prevH2List == null) {
            prevH2List = $("<ul></ul>");
            $(prevH1Item).append(prevH2List);
          }
          $(prevH2List).append(toAppend);
          prevH2Item = toAppend;
          prevH3List = null;
        } else {
          if (prevH3List == null) {
            prevH3List = $("<ul></ul>");
            $(prevH2Item).append(prevH3List);
          }
          $(prevH3List).append(toAppend);
        }
      }
    });
  }

  if ($("#markdown-toc li").length == 0) {
    $("#toc nav").remove();
  }
}

if ($("#set-title").length == 1) {
  var title = $("#set-title").text();
  var siteTitle = $("#site-title").text();
  $(".hero-body .title:first").text(title);
  $(document).prop("title", title + " - " + siteTitle);
}

if ($("#set-subtitle").length == 1) {
  var subtitle = $("#set-subtitle").text();
  $(".hero-body .subtitle:first").text(subtitle);
}

$(".filter.filter-tag").on("click", function () {
  // Add filter-selected class to the selected tag
  $(this).toggleClass("filter-selected");

  // Define list of selected tags and relative IDs
  const selectedTags = $(".filter.filter-tag.filter-selected");
  const selectedTagsID = $.map(selectedTags, function(element) {
    return $(element).data("id-tag");
  });

  // Handle filter classes for styling
  $(".filter.filter-tag.filter-unselected").removeClass("filter-unselected");
  if ($(selectedTags).length > 0) {
    $(".filter.filter-tag:not(.filter-selected)").addClass("filter-unselected");
  }

  $("[data-tags]").each(function () {
    var elementTagsString = $(this).data("tags");
    var elementTags = elementTagsString.split("|");

    // If there are no active tags OR all tags of the current publication are in the active tags, show it
    if (selectedTagsID.length == 0 || selectedTagsID.every(tag => elementTags.includes(tag))) {
      $(this).show();
    } else {
      $(this).hide();
    }    
  });

  updateNumberOfPublications();
});

function updateNumberOfPublications() {
  $("h1.year").each(function() {
    var year = $(this).clone().children().remove().end().text().trim();
    var numberPublications = $(this).next("ul.publications").children("li:visible").length;
    $("#number-publications-" + year).text(numberPublications);
  });
}

if ($("ul.publications").length > 0) {
  console.log("Updating number of publications");
  updateNumberOfPublications();
} 