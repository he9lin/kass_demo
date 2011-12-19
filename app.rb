require 'compass'
# require 'barista'
require 'sinatra'

require './db'

class App < Sinatra::Base
  # register Barista::Integration::Sinatra
  
  before do
    @db = JSONDb.new "db-#{ENV['RACK_ENV']}.json"
  end
  
  configure do
    Compass.configuration do |config|
      config.project_path = File.dirname(__FILE__)
    end
    set :scss, Compass.sass_engine_options
  end

  get '/screen.css' do
    content_type 'text/css', :charset => 'utf-8'
    scss :screen
  end
  
  get "/" do
    send_file "public/index.html", :type => 'text/html', :disposition => 'inline'
  end
  
  get "/api/wishes" do
    content_type :json
    @db.members.to_json
  end
  
  get "/api/wishes/:id" do |id|
    record = @db.get id

    content_type :json
    record.to_json    
  end
  
  post "/api/wishes" do
    record = JSON.parse request.body.read
    record = @db.save_doc record
    @db.save
    
    content_type :json
    record.to_json
  end

  put "/api/wishes/:id" do |id|
    record = @db.get id
    record.merge! JSON.parse(request.body.read)
    @db.save

    content_type :json
    record.to_json
  end

  delete "/api/wishes/:id" do |id|
    @db.delete id
    @db.save
    [].to_json
  end
end