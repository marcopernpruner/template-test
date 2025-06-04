Jekyll::Hooks.register :site, :after_init do |site|
  required_collections = {
    "collaborations" => {
      "output" => true,
      "layout" => "collaboration"
    },
    "complementary" => {
      "output" => true,
      "layout" => "complementary"
    },
    "events" => {
      "output" => true,
      "layout" => "page"
    },
    "news" => {
      "output" => true,
      "layout" => "news",
      "permalink" => "/news/:year/:month/:day/:title/"
    },
    "people" => {
      "output" => true,
      "layout" => "person"
    },
    "projects" => {
      "output" => true,
      "layout" => "project"
    },
    "teaching" => {
      "output" => true,
      "layout" => "page"
    },
    "tools" => {
      "output" => true,
      "layout" => "tool"
    },
    "topics" => {
      "output" => true,
      "layout" => "page"
    }
  }

  site.config["collections"] ||= {}

  required_collections.each do |key, value|
    site.config["collections"][key] ||= value
  end
end