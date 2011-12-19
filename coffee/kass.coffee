@app = window.app ? {}

jQuery ->
  @app.router = new app.KassRouter
  Backbone.history.start({pushState:true})