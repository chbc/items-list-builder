var DbManager = require('./dbManager');

var UsersManager = function ()
{
	this.dbManager = DbManager.getDbManager();
}

UsersManager.prototype.userExists = async function (teamId, user)
{
	await this.dbManager.refreshUsers(teamId)
	return (this.dbManager.userExists(user));
}

UsersManager.prototype.addIfNotExists = async function (response, teamId, user)
{
	await this.dbManager.refreshUsers(teamId);
	await this.dbManager.addUsersIfNotExists(response, teamId, user);
}

var UsersManagerInstance = new UsersManager();
exports.getUsersManager = function () { return UsersManagerInstance; }
