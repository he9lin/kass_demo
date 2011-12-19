jQuery ->
  
  class KassRouter extends Backbone.Router
    routes:
      '': 'browseWishes'
    initialize: ->
      app.Wishes.fetch()
      @view = new app.AppView collection: app.Wishes
    browseWishes: ->
      
  @app = window.app ? {}
  @app.KassRouter = KassRouter