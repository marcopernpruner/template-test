Jekyll::Hooks.register :site, :after_init do |site|
  layout_defaults = [
    {
      "scope" => {
        "path" => "",
        "type" => "pages",
      },
      "values" => {
        "show_sidebar" => false
      }
    },
    {
      "scope" => {
        "type" => "collaborations",
      },
      "values" => {
        "layout" => "collaboration"
      }
    },
    {
      "scope" => {
        "type" => "complementary",
      },
      "values" => {
        "layout" => "complementary"
      }
    },
    {
      "scope" => {
        "type" => "events",
      },
      "values" => {
        "layout" => "page"
      }
    },
    {
      "scope" => {
        "type" => "news",
      },
      "values" => {
        "layout" => "news"
      }
    },
    {
      "scope" => {
        "path" => "_news/*-paper*-accepted-*",
      },
      "values" => {
        "layout" => "news-accepted-paper",
        "tags" => ["papers"]
      }
    },
    {
      "scope" => {
        "path" => "_news/*seminar*",
      },
      "values" => {
        "layout" => "news-seminar",
        "tags" => ["seminars"]
      }
    },
    {
      "scope" => {
        "path" => "_news/*award*",
      },
      "values" => {
        "tags" => ["awards"]
      }
    },
    {
      "scope" => {
        "path" => "_people/*-*",
      },
      "values" => {
        "layout" => "person"
      }
    },
    {
      "scope" => {
        "path" => "_people/archive/*-*",
      },
      "values" => {
        "layout" => "person"
      }
    },
    {
      "scope" => {
        "type" => "projects",
      },
      "values" => {
        "layout" => "project"
      }
    },
    {
      "scope" => {
        "type" => "tools",
      },
      "values" => {
        "layout" => "tool"
      }
    },
    {
      "scope" => {
        "type" => "topics",
      },
      "values" => {
        "layout" => "topic"
      }
    },
  ]

  site.config["defaults"] ||= []

  layout_defaults.each do |default|
    site.config["defaults"] << default unless site.config["defaults"].include?(default)
  end
end