var ViewsManager = require('./viewsManager');
var UsersManager = require('./usersManager');
var ItemsManager = require('./itemsManager')
var TeamsManager = require('./teamsManager');
const DbManager = require('./dbManager');

var Controller = function()
{
	this.viewsManager = ViewsManager.getViewsManager();
	this.usersManager = UsersManager.getUsersManager();
	this.itemsManager = ItemsManager.getItemsManager();
	this.teamsManager = TeamsManager.getTeamsManager();
	this.dbManager = DbManager.getDbManager();
}

Controller.prototype.handleHomePage = async function (request, response)
{
	var resultPage = null;
	var user = null;

	var teamId = this.teamsManager.getTeamIdFromRequest(request, response);
	if (teamId)
	{
		user = request.cookies['user'];
		if (user)
		{
			const userExists = await this.usersManager.userExists(teamId, user);
			if (userExists)
			{
				var homeData = await this.dbManager.getHomeData(user, teamId);
				resultPage = this.viewsManager.getHomePage(user, homeData.itemToVote, homeData.allUsers, homeData.allItems);
			}
		}
		
		if (!resultPage)
		{
			const teamName = await this.teamsManager.getTeamName(teamId);
			resultPage = this.viewsManager.getLoginPage(teamName);
		}
	}
	else
	{
		resultPage = this.viewsManager.getErrorPage('Equipe não existe!');
	}

	return resultPage;
}

Controller.prototype.addUserIfNotExists = async function (request, response)
{
	var user = request.body.user;
	user = user.trim();
	var teamId = request.cookies['teamId'];
	await this.usersManager.addIfNotExists(response, teamId, user);
}

Controller.prototype.addItem = async function (request)
{
	var user = request.cookies['user'];
	var teamId = request.cookies['teamId'];
	var item = request.body.item;
	item = item.trim();
	await this.itemsManager.addItem(teamId, user, item);
}

Controller.prototype.voteItem = async function (request)
{
	const user = request.cookies['user'];
	var teamId = request.cookies['teamId'];
	const itemName = request.body.item;
	const score = parseInt(request.body.score);
	await this.itemsManager.voteItem(teamId, user, itemName, score);
}

Controller.prototype.getErrorPage = function (errorMessage)
{
	return this.viewsManager.getErrorPage(errorMessage);
}

/*
Controller.prototype.resetVote = function (request)
{
	const teamId = request.body.teamId;
	const user = request.body.user;
	const item = request.body.item;

	this.itemsManager.resetVote(teamId, user, item);
}

Controller.prototype.removeUser = function (request)
{
	const teamId = request.body.teamId;
	const user = request.body.user;
	this.teamsManager.removeUser(teamId, user);
}

Controller.prototype.removeItem = function (request)
{
	const teamId = request.body.teamId;
	const item = request.body.item;
	this.itemsManager.removeItem(teamId, item);
}

Controller.prototype.resetAllVotes = function (request)
{
	const teamId = request.body.teamId;
	const item = request.body.item;
	this.itemsManager.resetAllVotes(teamId, item);
}
*/

var ControllerInstance = new Controller();
exports.getController = function () { return ControllerInstance; }
