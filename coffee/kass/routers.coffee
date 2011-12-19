jQuery ->
  
  class KassRouter extends Backbone.Router
    routes:
      '': 'browseWishes'
    initialize: ->
      @view = new app.AppView collection: app.Wishes
      @view.render()
    browseWishes: ->
      
  @app = window.app ? {}
  @app.KassRouter = KassRouter