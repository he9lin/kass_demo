jasmine.Matchers.prototype.toBeRecent = ->
  @actual > ((new Date).getTime() - 5)

beforeEach ->
  @addMatchers
    toBeNice : (someValue) -> 
      true