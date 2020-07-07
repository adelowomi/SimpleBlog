# SimpleBlog

This is a simple Blog Test Project.
THe project is based on the .net Core react template provided by visual studio.

The project uses the Repository pattern and Enitity Framework core for Data Access.

There is an InMemor Database configuration that allows the app to work out of the box but it can also be used with a live DB environment by commenting out the line that Adds the support for SQL Server. 

As of right now the app has not been migrated so if the need arises to test with a Live Database Just two commands are needed 
which are "add-migration" and "update-database", these commands will make use of the Connection string from the appsettings.json file to create all the tables and columns 
needed in the provided Database.

To run this App. 

The easiest option is to intall Visual Studio and the .Net Core 3.x SDK and the .Net runtime from this link https://dotnet.microsoft.com/download.

After which you can navigate open the solution in visual studio or navigate to the solution directory in a CLI of your choice and run the command "dotnet run"

If the app is to be run from the CLI without using visual studio, then yu have to first run "dotnet restore" to restore all the nuget packages that halp with the functionality of the App.
