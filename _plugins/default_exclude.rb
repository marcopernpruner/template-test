Jekyll::Hooks.register :site, :after_init do |site|
  required_exclude = [
    "Gemfile",
    "clean-theme.gemspec",
    "Gemfile.lock",
    "node_modules",
    "vendor/bundle/",
    "vendor/cache/",
    "vendor/gems/",
    "vendor/ruby/",
    "*/template*.md",
    "*/_template*.md",
    "README*.md"
  ]

  site.config["exclude"] ||= []

  required_exclude.each do |exclude|
    site.config["exclude"] << exclude unless site.config["exclude"].include?(exclude)
  end
end