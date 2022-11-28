@blockers.each do |blocker|
  json.set! blocker.id do
    json.partial! 'blockers/blocker', blocker: blocker
  end
end
