watch('app.rb') {|md| system("ruby test/app_test.rb") }
watch('test/app_test.rb') {|md| system("ruby test/app_test.rb") }