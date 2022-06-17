var DbManager = require('./dbManager');

var TeamsManager = function ()
{
    this.teams = [123];
    this.dbManager = DbManager.getDbManager();
}

TeamsManager.prototype.getTeamIdFromRequest = function (request, response)
{
    var teamId = request.cookies['teamId'];
    if (!teamId)
        teamId = request.query.teamId;
    
    if (teamId)
        response.cookie('teamId', teamId);
    
    return teamId;
}

TeamsManager.prototype.getTeamName = function ()
{
    return this.dbManager.getTeamName();
}

TeamsManager.prototype.removeUser = function (teamId, user)
{
    this.dbManager.removeUser(teamId, user);
}

var TeamsManagerInstance = new TeamsManager();
exports.getTeamsManager = function () { return TeamsManagerInstance; }
