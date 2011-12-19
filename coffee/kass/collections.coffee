class Wishes extends Backbone.Collection
  model: app.Wish
  url: '/api/wishes'

@app = window.app ? {}
@app.Wishes = new Wishes