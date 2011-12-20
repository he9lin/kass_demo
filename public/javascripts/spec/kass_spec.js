(function() {
  var app, _ref;
  app = (_ref = window.app) != null ? _ref : {};
  describe('Wish', function() {
    beforeEach(function() {
      return this.later = 'tomorrow';
    });
    return describe('new wish', function() {
      beforeEach(function() {
        return this.wish = new app.Wish({
          title: 'Ride a pony',
          price: '9.99',
          expired_at: this.later
        });
      });
      it("sets latitude and longitude", function() {
        var coords;
        coords = {
          lat: this.wish.get('lat'),
          lng: this.wish.get('lng')
        };
        return expect(coords).toBeCloseBy();
      });
      it("sets created at time", function() {
        return expect(this.wish.price()).toEqual('$9.99');
      });
      it("sets created at time", function() {
        return expect(this.wish.get('created_at')).toBeRecent;
      });
      it("populates title", function() {
        return expect(this.wish.get('title')).toEqual('Ride a pony');
      });
      it("populates expired at time", function() {
        return expect(this.wish.get('expired_at')).toEqual(this.later);
      });
      return describe("validations", function() {
        beforeEach(function() {
          this.callback = sinon.spy();
          return this.wish.bind('error', this.callback);
        });
        it("is not valid without a title", function() {
          this.wish.set({
            title: ''
          });
          return expect(this.callback.called).toBeTruthy();
        });
        it("is not valid without a expiration time", function() {
          this.wish.set({
            expired_at: ''
          });
          return expect(this.callback.called).toBeTruthy();
        });
        it("is not valid if not in price formats", function() {
          this.wish.set({
            price: ''
          });
          return expect(this.callback.called).toBeTruthy();
        });
        it("is not valid if not in price formats", function() {
          this.wish.set({
            price: '.999'
          });
          return expect(this.callback.called).toBeTruthy();
        });
        return it("is not valid if not in price formats", function() {
          this.wish.set({
            price: '1.'
          });
          return expect(this.callback.called).toBeTruthy();
        });
      });
    });
  });
}).call(this);
