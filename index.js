var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var ControllerClass = require('./scripts/controller');
var controller = ControllerClass.getController();

const PORT = process.env.PORT || 8080;

var server = app.listen(PORT, _ =>
{
	console.log("Servidor iniciado!");
	showServerIp();
});
server.timeout = 0;

var logRequest = function (request)
{
	console.log('%s: %s', request.originalUrl, request.ip);
}

var renderPage = function (response, result)
{
	console.log('page: ', result.page);
	console.log('parameters: ', result.parameters);
	response.render(result.page, {parameters : result.parameters});
}

var processAndRender = async function (request, response, action)
{
	logRequest(request);

	var result = null;
	try 
	{ 
		result = await action();
	}
	catch (errorMessage)
	{
		result = controller.getErrorPage(errorMessage);
	}
	finally
	{
		renderPage(response, result);
	}
}

app.get('/', function (request, response) 
{
	processAndRender(request, response, function () {
		return controller.handleHomePage(request, response);
	});
});

app.post('/login', function (request, response)
{
	handleLogin(request, response);
});

app.post('/addItem', function (request, response)
{
	handleAddItem(request, response);
});

app.post('/voteItem', function (request, response)
{
	handleVoteItem(request, response);
});

app.post('/resetVote', function (request, response)
{
	controller.resetVote(request);
	response.sendStatus(200);
});

app.post('/removeUser', function (request, response)
{
	controller.removeUser(request);
	response.sendStatus(200);
});

app.post('/removeItem', function (request, response)
{
	controller.removeItem(request);
	response.sendStatus(200);
});

app.post('/resetAllVotes', function (request, response)
{
	controller.resetAllVotes(request);
	response.sendStatus(200);
});

const handleLogin = async function (request, response)
{
	await controller.addUserIfNotExists(request, response);
	response.sendStatus(200);
}

const handleAddItem = async function (request, response)
{
	await controller.addItem(request, response);
	response.sendStatus(200);
}

const handleVoteItem = async function (request, response)
{
	await controller.voteItem(request);
	response.sendStatus(200);
}

var showServerIp = function()
{
	var os = require('os');
	var ifaces = os.networkInterfaces();

	Object.keys(ifaces).forEach(function (ifname)
	{
		var alias = 0;

		ifaces[ifname].forEach(function (iface)
		{
			if ('IPv4' !== iface.family || iface.internal !== false)
				return;
			if (alias >= 1)
				console.log(ifname + ':' + alias, iface.address + ":" + PORT);
			else
				console.log(ifname, iface.address + ":" + PORT);

			++alias;
	  });
	});
}

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/views/scripts'));
app.use(express.static(__dirname + '/views/images'));
