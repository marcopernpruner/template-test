Jekyll::Hooks.register :site, :after_init do |site|
  required_plugins = [
    "jekyll-redirect-from",
    "jekyll-sitemap",
    "jekyll-paginate",
    "jekyll-feed",
    "jekyll-seo-tag",
    "kramdown-parser-gfm"
  ]

  site.config["plugins"] ||= []

  required_plugins.each do |plugin|
    site.config["plugins"] << plugin unless site.config["plugins"].include?(plugin)
  end
end