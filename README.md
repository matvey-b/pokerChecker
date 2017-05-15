## My lab project for getting experience of web development process.
First of all, i must warn you, English is not my native language. Therefore i apologize for possible stupid mistakes in my notes =)

### Common goals:
1. Get some exp in web development;
2. Get some exp in development workflow;
3. Start using most important development tools, like git or babel for js developers;
4. Get litle exp in nonSQL DBs.

### Lab project discription:
It's micro web app based on Jquery client and nodejs on server side.

### App will do the following things:
* ##### Frontend:
	* allow to make a set of cards manually or generate automatically
	* send check request on server and display response
	* display five last req res pairs
* ##### Backend:
	* get requests from client and then checks cards combinations. There will be a separate module for handling hand combinations
	* http server will be based on Express js framework
	* and of course will be DB, i think it will be *MongoDB*, because it's more or less simple and fast for understanding

##### So, structure of project will look like this:
```sh
	./app/(backend)
		- server.js
		- pokerChecker.js
	./client/(frontend)
		- index.html
		- scripts/
				- app.js
				- jquery.js
		- css/style.css
		- images/*
```
