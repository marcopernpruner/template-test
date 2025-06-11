// FUNCTIONS
// Set default user picture if not set
function setDefaultUserPicture(picture) {
  picture.src = "/assets/images/no-user.jpg";
  return true;
}

// Handle iframes in a responsive way
function iframe16vs9() {
  var iframes = $("iframe");

  for (var i = 0; i < iframes.length; i++) {
    var element = $(iframes[i]);
    var width = $(element).width();
    $(element).height(width * 9 / 16);
  }
}

// Get URL parameters and return them as an array
function getURLParameter(parameter) {
  const urlParams = new URLSearchParams(window.location.search);

  const parameterString = urlParams.get(parameter);
  var parameterArray = null;

  if (parameterString) {
    if (parameterString.includes('|')) {
      parameterArray = parameterString.split('|');
    } else {
      parameterArray = [parameterString];
    }
  }

  return parameterArray;
}

// Update items based on selected filters
function updateItemsBasedOnFilter() {
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
}

// Update the number of publications for each year
function updateNumberOfPublications() {
  $("h1.year").each(function() {
    var year = $(this).clone().children().remove().end().text().trim();
    var numberPublications = $(this).next("ul.publications").children("li:visible").length;
    $("#number-publications-" + year).text(numberPublications);
  });
}

// CODE
// Open external links in a new tab
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

// Handle iframe in a responsive way
if ($("iframe").length > 0) {
  iframe16vs9();

  $(window).resize(function () {
    iframe16vs9();
  });
}

// Insert all tables into a scrollable div
if ($("table").length > 0) {
  $("table").wrap("<div class='table-scrollable'></div>");
}

// Handle TOC generation
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

// Set the hero title, if a value is set in the #set-title element
if ($("#set-title").length == 1) {
  var title = $("#set-title").text();
  var siteTitle = $("#site-title").text();
  $(".hero-body .title:first").text(title);
  $(document).prop("title", title + " - " + siteTitle);
}

// Set the hero subtitle, if a value is set in the #set-subtitle element
if ($("#set-subtitle").length == 1) {
  var subtitle = $("#set-subtitle").text();
  $(".hero-body .subtitle:first").text(subtitle);
}

// Filter based on URL parameters
if ($(".filter.filter-tag").length > 0) {
  var parameterUnits = getURLParameter("units");
  var parameterTopics = getURLParameter("topics");

  if (parameterUnits !== null) {
    parameterUnits.forEach(function (unit) {
      if (!$(".filter.filter-tag[data-id-tag='" + unit + "']").hasClass("filter-selected")) {
        $(".filter.filter-tag[data-id-tag='" + unit + "']").addClass("filter-selected");
      }
    });
  } else if (parameterTopics !== null) {
    parameterTopics.forEach(function (topic) {
      if (!$(".filter.filter-tag[data-id-tag='" + topic + "']").hasClass("filter-selected")) {
        $(".filter.filter-tag[data-id-tag='" + topic + "']").addClass("filter-selected");
      }
    });
  }

  updateItemsBasedOnFilter();
}

// Filter based on click
if ($(".filter.filter-tag").length > 0) {
  $(".filter.filter-tag").on("click", function () {
    $(this).toggleClass("filter-selected");
    updateItemsBasedOnFilter();
  });
}

// Update number of publications
if ($("ul.publications").length > 0) {
  updateNumberOfPublications();
}