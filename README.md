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
	* allow to generate random cards hands and display it on main page
	* allow to choose set of desired combinations for generating
	* display history of operations
* ##### Backend:
	* get requests from client and then checks cards combinations. There will be a separate module for handling hand combinations
	* http server will be based on Express js framework
	* and of course will be DB, i think it will be *MongoDB*, because it's more or less simple and fast for understanding

##### So, structure of project will look like this:
```
	- index.js
	- package.json
	./server/
		- server.js
		- checkerCore.js
	./client/
		- index.html
		- scripts/
			- app.js
			- jquery.js
		- styles/
			- style.css
			- normalize.css
		- images/*
```

### Current status
At this time, the application can already be started. But it looks very dampy.
However, the main functions already implemented.

### Installation and running is very simple:
1. Run `git clone https://github.com/matvey-b/pokerChecker.git` for download sourcecode
2. In repository dir run `npm install` for installing dependencies
3. Run `npm start` for start web server
4. Go to `http://localhost:3000` for access to web app.
