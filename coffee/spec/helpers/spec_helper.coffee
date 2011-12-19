jasmine.Matchers.prototype.toBeRecent = ->
  @actual > ((new Date).getTime() - 5)

jasmine.Matchers.prototype.toBeCloseBy = ->
  (@actual.lat > 120 || @actual.lat < 122) && (@actual.lng > 30 || @actual.lng < 32)

beforeEach ->
  @addMatchers
    toBeNice : (someValue) -> 
      true