require "jekyll/utils"

Jekyll::Hooks.register :site, :after_init do |site|
  defaults = {
    "lang" => "en",
    "permalink" => "pretty",
    "markdown" => "kramdown",
    "highlighter" => "rouge",
    "cookie_policy" => "/cookie-policy/",
    "footer_menu" => "example_footer_menu",
    "show_navbar_brand" => false,
    "show_link_fbk" => true,
    "sass" => {
      "style" => "compressed",
      "source_dir" => "_sass"
    },
    "logos" => {
      "center" => {
        "regular" => {
          "default" => "/assets/images/institutional/CS_regular.png",
          "white" => "/assets/images/institutional/CS_regular_white.png"
        }
      },
      "main" => {
        "regular" => {
          "default" => "/assets/images/institutional/FBK_regular.png",
          "white" => "/assets/images/institutional/FBK_regular_white.png"
        }
      }
    }
  }

  site.config = Jekyll::Utils.deep_merge_hashes(defaults, site.config)
end