jQuery ->
  
  class AppView extends Backbone.View
    el: '#main'
    initialize: (options) ->
      # @collection.bind 'reset', @render, @  # be careful
      @subviews = [
        new WishesMapView  collection: @collection
        new WishesListView collection: @collection
        ]
    render: ->  
      $(@el).empty()
      $(@el).append subview.render().el for subview in @subviews
      @renderMap()
      @
    renderMap: ->
      window.loadScript() # Load map api

  class NewWishView extends Backbone.View
    template: _.template $('#new-wish-template').html()
    id: 'new-wish'
    events:
      'click input#post-wish': 'save'
    render: ->
      $(@el).html @template()
      @
    save: (event) ->
      event.preventDefault()
      newAttributes = 
        title:      @$('input#new-wish-title').val()
        content:    @$('input#new-wish-content').val()
        price:      @$('input#new-wish-price').val()
        expired_at: @$('input#new-wish-expired-at').val()
      errorCallback = 
        error: @flashWarning
      if @collection.create newAttributes, errorCallback
        $(document).trigger 'close.facebox'
    flashWarning: (model, error) =>
      console.log error
      
  class WishesMapView extends Backbone.View
    template: _.template $('#wishes-map-template').html()
    id: 'wishes-map'
    events:
      'click a#launch-wish': 'showNewWishForm'
    render: ->
      $(@el).html @template()
      @resetDimension()
      @
    resetDimension: -> 
      $(@el).css
        width: $(window).width()
        height: $(window).height()
    showNewWishForm: ->
      $.facebox (new NewWishView collection: @collection).render().el
      
  class WishView extends Backbone.View
    initialize: (options) ->
      # Cache the detailed view
      @detailWishViewCache = (new DetailWishView model: @model).render().el
    template: _.template $('#unfilled-wish-template').html()
    className: 'wish'
    events:
      'click a.delete': 'destroy'
      'click div.info': 'show'
    render: ->
      $(@el).html @template @model.toJSON()
      @marker = @addMarker()
      @
    destroy: ->
      @model.destroy()
    show: (event) ->
      app.Map.focus @model.get('lat'), @model.get('lng'), @detailWishViewCache
    addMarker: ->
      app.Map.addMarker @model.get('lat'), @model.get('lng'), @detailWishViewCache
  
  class DetailWishView extends Backbone.View
    className: 'detail-wish'
    template: _.template $('#detail-wish-tempalte').html() 
    render: ->
      $(@el).html @template @model.toJSON()
      @

  class WishesListView extends Backbone.View
    template: _.template($('#wishes-menu-template').html())
    id: 'wishes-menu'
    initialize: (options) ->
      @collection.bind 'reset',  @render, @
      @collection.bind 'change', @render, @
      @collection.bind 'add',    @render, @
      @collection.bind 'remove', @render, @
    render: ->
      $(@el).html @template()
      for wish in @collection.models
        wishView = new WishView model: wish
        @$('div.wishes-list').append wishView.render().el
      @
    
  @app = window.app ? {}
  @app.AppView = AppView