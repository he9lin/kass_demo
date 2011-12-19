# Wish model
# - has a coordinate array [lat, lng]

class Wish extends Backbone.Model
  defaults:
    'lat': 121.491
    'lng': 31.233

  validate: (attributes) ->
    # NOTE: attributes argument is ONLY the ones that changed.
    mergedAttributes = _.extend(_.clone(@attributes), attributes)
    if !mergedAttributes.title or mergedAttributes.title.trim() == ''
      return "Wish title must not be blank."
    if !mergedAttributes.expired_at or mergedAttributes.expired_at.trim() == ''
      return "Wish expiration time must not be blank."
  
@app = window.app ? {}
@app.Wish = Wish