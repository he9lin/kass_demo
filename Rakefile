begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

require "rake/testtask"

Rake::TestTask.new do |t|
  t.libs << "test"
  t.test_files = FileList["test/*_test.rb"]
end

task :default => :test

desc "Run the server"
task :server do
  system "rackup config.ru -p 3000"
end

desc "Compile coffee script"
task :coffee do
  system "coffee -wc --output public/javascripts coffee"
end

desc "Environment stub for compatibility"
task :environment do
  
end

desc "Interact with code in IRB."
task :console do
  exec "irb -Ilib -rinit"
end