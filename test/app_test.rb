ENV['RACK_ENV'] = 'test'

$: << File.dirname(__FILE__) + "/.."

require "minitest/autorun"
require "rack/test"

require "app"

module DBSetup
  def setup_db
    @db = JSONDb.new("db-#{ENV['RACK_ENV']}.json")
    @db.delete!
  end
end

describe App do
  include Rack::Test::Methods
  include DBSetup

  before { setup_db }
  after  { setup_db }

  def app
    App.new
  end
  
  describe "/" do
    
    before do
      get "/"
    end

    it "responds with success" do
      assert_equal 200, response.status
    end

    it "emits HTML header" do
      assert_equal "text/html;charset=utf-8", response.headers['Content-type']
    end
    
  end

  describe "Create a new wish (POST /wishes)" do

    before do
      post "/api/wishes", {:title => "meet the princess"}.to_json
    end

    it "returns new record" do
      record = JSON.parse response.body
      assert_equal "meet the princess", record['title']
      assert record['id'], "The record should have an id."
    end

    it "saves record to disk" do
      @db.load_data
      assert_equal 1, @db.members.length
      assert_equal "meet the princess", @db.members[0]['title']
    end

  end

  describe "List tasks (GET /tasks)" do

    before do
      post "/api/wishes", {:title => "buy an iphone", :expired_at => Time.now}.to_json
      post "/api/wishes", {:title => "buy a horse"}.to_json
      get "/api/wishes"
    end

    it "returns success" do
      assert_equal 200, response.status
    end

    it "emits records as JSON" do
      wishes = JSON.parse response.body
      assert_equal 2, wishes.length
      wish = wishes[0]
      assert_equal "buy an iphone", wish['title']
    end

  end
  
  describe "Get a single record (GET /wishes/:id)" do

    before do
      post "/api/wishes", {:title => "ride on a horse", :price => 99}.to_json
      record = JSON.parse response.body
      @id = record['id']
      assert @id, "The record should have an id."
      get "/api/wishes/#{@id}"
    end

    it "returns success" do
      assert_equal 200, response.status
    end

    it "returns a record" do
      record = JSON.parse response.body
      assert_equal "ride on a horse", record['title']
    end

  end  
  
  describe "Update a single record (PUT /wishes/:id)" do

    before do
      post "/api/wishes", {:title => "ride on a horse"}.to_json
      record = JSON.parse response.body
      @id = record['id']
      assert @id, "The record should have an id."
      put "/api/wishes/#{@id}", {:title => "buy an iphone"}.to_json
    end

    it "returns success" do
      assert_equal 200, response.status
    end

    it "updates the record" do
      record = JSON.parse response.body
      assert_equal "buy an iphone", record['title']
    end

  end

  describe "Delete a single record (DELETE /wishes/:id)" do

    before do
      post "/api/wishes", {:title => "ride on a horse"}.to_json
      record = JSON.parse response.body
      @id = record['id']
      assert @id, "The record should have an id."
      delete "/api/wishes/#{@id}"
    end

    it "returns success" do
      assert_equal 200, response.status
    end

    it "deletes the record" do
      @db.load_data
      assert_equal 0, @db.members.length
    end

  end
  
  alias_method :request,  :last_request
  alias_method :response, :last_response
end