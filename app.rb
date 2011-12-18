require 'compass'
require 'barista'
require 'sinatra'

class App < Sinatra::Base
  register Barista::Integration::Sinatra
  
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
end