var DbManager = function()
{
    this.team = 
    {
        id : '123', name : 'The Tributes',
        users : ['Henrique', 'Dodô', 'Matheus']
    };

    this.itemsDb = 
    [
        {name : "4 Non Blondes - What's Up", totalScore : 2, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 1}, {user : 'Matheus', score : 0}]},
        {name : "The Cure - Fascination Street", totalScore : 4, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 0}]},
        {name : "Dire Straits - Sultans Of Swing", totalScore : 4, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 0}, {user : 'Matheus', score : 3}]},
        {name : "Placebo - The Bitter End", totalScore : 3, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 0}, {user : 'Matheus', score : 0}]},
        {name : "Steppenwolf - Born To Be Wild", totalScore : 4, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 0}, {user : 'Matheus', score : 3}]},
        {name : "RHCP - Can't Stop", totalScore : 6, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 0}, {user : 'Matheus', score : 3}]},
        {name : "Alice In Chains - Man In The Box", totalScore : 5, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 1}]},
        {name : "Alice In Chains - Would?", totalScore : 7, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 1}]},
        {name : "Nirvana - Come As You Are", totalScore : 3, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 1}, {user : 'Matheus', score : 1}]},
        {name : "Nirvana - The Man Who Sold The World", totalScore : 7, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 3}]},
        {name : "Foo Fighters - Everlong", totalScore : 9, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 3}]},
        {name : "Pearl Jam - Alive", totalScore : 9, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 3}]},
        {name : "Deep Purple - Smoke On The Water", totalScore : 5, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 1}, {user : 'Matheus', score : 3}]},
        {name : "Limp Bizkit - My Way", totalScore : 6, scoreList : [{user : 'Henrique', score : 3}, {user : 'Matheus', score : 3}]},
        {name : "Soundgarden - Black hole sun", totalScore : 6, scoreList : [{user : 'Henrique', score : 3}, {user : 'Matheus', score : 3}]},
	{name : "Green Day - Basket Case", totalScore : 3, scoreList : [{user : 'Henrique', score : 3}]},
    	{name : "Depeche Mode - Enjoy The Silence", totalScore : 3, scoreList : [{user : 'Henrique', score : 3}]},
	{name : "Pearl Jam - Jeremy", totalScore : 3, scoreList : [{user : 'Henrique', score : 3}]},
	{name : "Pearl Jam - Better Man", totalScore : 3, scoreList : [{user : 'Henrique', score : 3}]},
    	{name : "Oasis - Don't Go Away", totalScore : 3, scoreList : [{user : 'Henrique', score : 3}]},
	{name : "Oasis - Don't Look Back In Anger", totalScore : 3, scoreList : [{user : 'Henrique', score : 3}]},
	{name : "The Strokes - Reptilla", totalScore : 3, scoreList : [{user : 'Henrique', score : 3}]},
    	{name : "Millencolin - No Cigar", totalScore : 3, scoreList : [{user : 'Henrique', score : 3}]},
	{name : "Silverchair - Freak", totalScore : 3, scoreList : [{user : 'Henrique', score : 3}]}
    ];
}

DbManager.prototype.userExists = function (user)
{
	return this.team.users.includes(user);
}

DbManager.prototype.addUsersIfNotExists = function (response, teamId, user)
{
	response.cookie('user', user);

	if (!this.team.users.includes(user))
    {
        this.team.users.push(user);
    }
}

DbManager.prototype.addItem = function (inputUser, itemName)
{
    var scoreList = [{user : inputUser, score : 3}];
    var entry =
    {
        id : itemId,
        name : itemName,
        scoreList : scoreList,
        totalScore : 3
    };

    this.itemsDb.push(entry);
}

DbManager.prototype.getItemToVote = function (inputUser)
{
    var result = null;

    this.itemsDb.some(function (item)
    {
        var userVoted = false;
        item.scoreList.some(function (scoreItem)
        {
            if (inputUser == scoreItem.user)
            {
                userVoted = true;
                return true;
            }
        });

        if (!userVoted)
        {
            result = item.name;
            return true;
        }
    });

    return result;
}

DbManager.prototype.getAllUsers = function ()
{
    return this.team.users;
}

DbManager.prototype.getAllItems = function ()
{
    this.itemsDb.sort((itemA, itemB) =>
    {
        return (itemB.totalScore - itemA.totalScore);
    });

    return this.itemsDb;
}

DbManager.prototype.voteItem = function (inputUser, itemName, score)
{
    var item = this.itemsDb.find(item => item.name == itemName);
    item.totalScore += score;
    const entry = {user : inputUser, score : score};
    item.scoreList.push(entry);
}

DbManager.prototype.getTeamName = function ()
{
    return this.team.name;
}

DbManager.prototype.resetVote = function (teamId, user, item)
{
    const size = this.itemsDb.length;

    for (let i = 0; i < size; i++)
    {
        const element = this.itemsDB[i];
        if ((element.item == item) && element.scoreList && (element.scoreList.length > 0))
        {
            for (let j = 0; j < element.scoreList.length; j++)
            {
                if (element.scoreList[j].user == user)
                {
                    element.scoreList.splice(j, 1);
                    break;
                }
            }
        }
    }
}

DbManager.prototype.resetAllVotes = function (teamId, item)
{
    const size = this.itemsDb.length;

    for (let i = 0; i < size; i++)
    {
        const element = this.itemsDB[i];
        if ((element.item == item) && element.scoreList && (element.scoreList.length > 0))
        {
            element.scoreList = [];
        }
    }
}

DbManager.prototype.removeUser = function (teamId, user)
{
    var teamUsers = this.getAllUsers(teamId);
    for (let i = 0; i < teamUsers.length; i++)
    {
        if (teamUsers[i] == user)
        {
            teamUsers.splice(i, 1);
        }
    }

    const size = this.itemsDB.length;

    for (let i = 0; i < size; i++)
    {
        const element = this.itemsDB[i];
        if (element.scoreList && (element.scoreList.length > 0))
        {
            for (let j = 0; j < element.scoreList.length; j++)
            {
                if (element.scoreList[j].user == user)
                {
                    element.totalScore -= element.scoreList[j].score;
                    element.scoreList.splice(j, 1);
                }
            }
        }
    }
}

DbManager.prototype.removeItem = function (teamId, item)
{
    const size = this.itemsDB.length;

    for (let i = 0; i < size; i++)
    {
        const element = this.itemsDB[i];
        if (element.item == item)
        {
            this.itemsDB.splice(i, 1);
            break;
        }
    }
}

var DbManagerInstance = new DbManager();
exports.getDbManager = function () { return DbManagerInstance; }
