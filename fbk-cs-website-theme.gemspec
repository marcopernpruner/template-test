# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "fbk-cs-website-theme"
  spec.version       = "0.0.1"
  spec.authors       = ["chrisrhymes", "marcopernpruner"]
  spec.email         = ["csrhymes@gmail.com", "mpernpruner@fbk.eu"]

  spec.summary       = "Theme for FBK CS websites"
  spec.description   = "A customized version of the bulma-clean-theme by chrisrhymes, to serve as a remote theme for websites within the Center for Cybersecurity of Fondazione Bruno Kessler."
  spec.homepage      = "https://www.github.com/chrisrhymes/bulma-clean-theme"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|_posts|blog|LICENSE|README|package|node_modules|favicon)!i) }

  spec.add_runtime_dependency "jekyll", ">= 3.9", "< 5.0"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.15"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.7"
  spec.add_runtime_dependency "kramdown-parser-gfm", "~> 1.1"

  spec.add_development_dependency "bundler", "~> 2.0"
  spec.add_development_dependency "rake", "~> 12.0"
end