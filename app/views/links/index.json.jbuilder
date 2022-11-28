@links.each do |link|
  json.set! link.id do
    json.partial! 'links/link', link: link
  end
end
