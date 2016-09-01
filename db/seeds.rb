# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


@a = Employee.create(id: 1, first_name: "admin", last_name: "admin", ssn: "222555999", date_of_birth: 20.years.ago, phone: "6667771234", role: "admin", active: "true")
User.create(id: 1, email: "admin@admin.com", password: "admin", employee_id: 1)
