app = window.app ? {}

describe 'Wish', ->
  
  beforeEach ->
    @later = 'tomorrow' # (new Date).getTime() + 1000
      
  describe 'new wish', ->
    beforeEach ->
      @wish = new app.Wish
        title: 'Ride a pony'
        price: '9.99'
        expired_at: @later
    
    it "sets latitude and longitude", ->
      coords =
        lat: @wish.get 'lat'
        lng: @wish.get 'lng'
      expect(coords).toBeCloseBy()

    it "sets created at time", ->
      expect(@wish.price()).toEqual '$9.99'
    
    it "sets created at time", ->
      expect(@wish.get 'created_at').toBeRecent
      
    it "populates title", ->
      expect(@wish.get 'title').toEqual 'Ride a pony'
      
    it "populates expired at time", ->
      expect(@wish.get 'expired_at').toEqual @later
  
    describe "validations", ->
      beforeEach ->
        @callback = sinon.spy()
        @wish.bind 'error', @callback
      
      it "is not valid without a title", ->
        @wish.set title: ''
        expect(@callback.called).toBeTruthy()
        
      it "is not valid without a expiration time", ->
        @wish.set expired_at: ''
        expect(@callback.called).toBeTruthy()
    
      it "is not valid if not in price formats", ->
        @wish.set price: ''
        expect(@callback.called).toBeTruthy()
    
      it "is not valid if not in price formats", ->
        @wish.set price: '.999'
        expect(@callback.called).toBeTruthy()
    
      it "is not valid if not in price formats", ->
        @wish.set price: '1.'
        expect(@callback.called).toBeTruthy()
      
      
    