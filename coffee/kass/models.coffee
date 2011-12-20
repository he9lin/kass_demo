# Wish model
# - has a coordinate array [lat, lng]

class Wish extends Backbone.Model
  defaults: ->
    'lat': 121.491 + Math.floor(Math.random()*1000) / 1000
    'lng': 31.233 + Math.floor(Math.random()*1000) / 1000
    
  price: ->
    '$' + @get('price')

  validate: (attributes) ->
    # NOTE: attributes argument is ONLY the ones that changed.
    mergedAttributes = _.extend(_.clone(@attributes), attributes)
    
    if !mergedAttributes.title or mergedAttributes.title.trim() == ''
      return "Wish title must not be blank."
    if !mergedAttributes.expired_at or mergedAttributes.expired_at.trim() == ''
      return "Wish expiration time must not be blank."
    if !mergedAttributes.price or mergedAttributes.price.trim() == ''
      return "Wish price must not be blank."
    if !(mergedAttributes.price.match(/^\d+$/) || mergedAttributes.price.match(/\d*\.\d{1,2}$/))
      return "Wish price must be in format: 11 or 1.1 or 1.11"
  
@app = window.app ? {}
@app.Wish = Wish