var DbManager = require('./dbManager');

var ItemsManager = function()
{
	this.dbManager = DbManager.getDbManager();
}

ItemsManager.prototype.addItem = async function (teamId, user, item)
{
	await this.dbManager.addItem(teamId, user, item);
}

ItemsManager.prototype.getItemToVote = function (user)
{
	return this.dbManager.getItemToVote(user);
}

ItemsManager.prototype.getAllItems = function ()
{
	return this.dbManager.getAllItems();
}

ItemsManager.prototype.voteItem = async function (user, itemName, score)
{
	await this.dbManager.voteItem(user, itemName, score);
}

ItemsManager.prototype.resetVote = function (teamId, user, item)
{
	this.dbManager.resetVote(teamId, user, item);
}

ItemsManager.prototype.removeItem = function (teamId, item)
{
	this.dbManager.removeItem(teamId, item);
}

ItemsManager.prototype.resetAllVotes = function (teamId, item)
{
	this.dbManager.resetAllVotes(teamId, item);
}

ItemsManager.prototype.refreshItems = async function (teamId)
{
    await this.dbManager.refreshItems(teamId);
}

var ItemsManagerInstance = new ItemsManager();
exports.getItemsManager = function () { return ItemsManagerInstance; }
