class Wishes extends Backbone.Collection
  model: app.Wish
  url: '/api/wishes'
  addMarkers: ->
    @each (model) ->
      model.trigger 'marker:add'

@app = window.app ? {}
@app.Wishes = new Wishes