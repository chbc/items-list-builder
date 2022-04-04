var ViewsManager = require('./viewsManager');
var UsersManager = require('./usersManager');
var ItemsManager = require('./itemsManager')
var TeamsManager = require('./teamsManager');

var Controller = function()
{
	this.viewsManager = ViewsManager.getViewsManager();
	this.usersManager = UsersManager.getUsersManager();
	this.itemsManager = ItemsManager.getItemsManager();
	this.teamsManager = TeamsManager.getTeamsManager();
}

Controller.prototype.handleHomePage = async function (request, response)
{
	var resultPage = null;

	var teamId = this.teamsManager.handleHomeRequest(request, response);
	if (!teamId)
	{
		resultPage = this.viewsManager.getErrorPage('Team not found!');
	}
	else
	{
		var user = request.cookies['user'];

		await this.teamsManager.refreshTeam(teamId);

		if (this.usersManager.userExists(user))
		{
			await this.itemsManager.refreshItems(teamId);

			var itemToVote = this.itemsManager.getItemToVote(user);
			var allUsers = this.usersManager.getAllUsers();
			var allItems = this.itemsManager.getAllItems();
			resultPage = this.viewsManager.getHomePage(user, itemToVote, allUsers, allItems);
		}
		else
		{
			var teamName = this.teamsManager.getTeamName();
			resultPage = this.viewsManager.getLoginPage(teamName);
		}
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
	const itemName = request.body.item;
	const score = parseInt(request.body.score);
	await this.itemsManager.voteItem(user, itemName, score);
}

Controller.prototype.getErrorPage = function (errorMessage)
{
	return this.viewsManager.getErrorPage(errorMessage);
}

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

var ControllerInstance = new Controller();
exports.getController = function () { return ControllerInstance; }
