var DbManager = require('./dbManager');

var UsersManager = function ()
{
	this.dbManager = DbManager.getDbManager();
}

UsersManager.prototype.userExists = function (user)
{
	return ((user != undefined) && this.dbManager.userExists(user));
}

UsersManager.prototype.addIfNotExists = async function (response, teamId, user)
{
	await this.dbManager.addUsersIfNotExists(response, teamId, user);
}

UsersManager.prototype.getAllUsers = function ()
{
	return this.dbManager.getAllUsers();
}

var UsersManagerInstance = new UsersManager();
exports.getUsersManager = function () { return UsersManagerInstance; }
