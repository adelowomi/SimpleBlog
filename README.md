# SimpleBlog

THis is a simple Blog Test Project.
THe project is based on the .net Core react template provided by visual studio.

The project uses the Repository pattern and Enitity Framework core for Data Access.

There is an Inmemory configuration that allows the app to work out of the box but it can also be used with a life environment by commenting out the line that Adds the support 
SQL Server. 

As of right now the app has not been migrated soo if the need arises to test with a Life Database Just two commands are needed 
which are add-migration and update-database, these commands will make use of the Connection string from the appsettings.json file to create all the tables and columns 
needed in the provided Database.
