const MySQL = require('mysql2/promise');

var DbManager = function()
{
    // XXX guardar num mapa tendo o teamId como chave
    this.team = null;
    this.users = null;
    this.scores = null;
    this.items = null;
    this.itemToVote = null; // XXX armazenar todos
    this.homeData = null;

/*
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
*/

    // const LOCAL_URL = 'mysql://henrique:henrique@localhost:3306/coop_items_db';

    this.CONNECTION_LIMIT = 20;
    this.HOST = process.env.HOST ? process.env.HOST : 'localhost';
    this.USER = process.env.USER ? process.env.USER : 'henrique';
    this.PASSWORD = process.env.PASSWORD ? process.env.PASSWORD : 'henrique';
    this.DATABASE = process.env.DATABASE ? process.env.DATABASE : 'coop_items_db';

    this.pool = null;
}

DbManager.prototype.getHomeData = async function (user, teamId)
{
    await this.refreshAllData(user, teamId);
    return this.homeData;
}

DbManager.prototype.refreshAllData = async function (user, teamId)
{
    this.team = null;
    this.users = null;
    this.scores = null;
    this.items = null;
    this.itemToVote = null;
    this.homeData = null;

    await this.refreshTeam(teamId);
    await this.refreshUsers(teamId);
    await this.refreshScores(teamId);
    await this.refreshItems(teamId);
    await this.refreshItemToVote(teamId, user);

    this.createHomeData();
}

DbManager.prototype.createHomeData = function ()
{
    this.homeData = {
        itemToVote : this.itemToVote,
        allUsers : this.users,
        teamName : this.team.name,
        allItems : []
    };

    this.items.forEach(inputItem => {
        var item = {
            name : inputItem.name,
            totalScore : inputItem.totalScore,
            scoreList : this.createScoreList(inputItem.scoreListId)
        }

        this.homeData.allItems.push(item);
    });

    this.sortItems();
}

DbManager.prototype.refreshTeam = async function (teamId)
{
    const sql = `CALL GetTeam("${teamId}")`;
    const result = await this.execute(sql);

    this.team = {id : teamId, name : result[0].name};
}

DbManager.prototype.refreshUsers = async function (teamId)
{
    const sql = `CALL GetUsers("${teamId}")`;
    const result = await this.execute(sql);

    this.users = [];
    result.forEach((item) =>{
        this.users.push(item.name);
    });
}

DbManager.prototype.refreshScores = async function (teamId)
{
    const sql = `CALL GetScores("${teamId}")`;
    this.scores = await this.execute(sql);
}

DbManager.prototype.refreshItems = async function (teamId)
{
    const sql = `CALL GetItems("${teamId}")`;
    this.items = await this.execute(sql);
}

DbManager.prototype.refreshItemToVote = async function (teamId, user)
{
    const sql = `CALL GetItemToVote("${teamId}", "${user}")`;
    const result = await this.execute(sql);

    this.itemToVote = (result && result.length > 0) ? result[0].name : null;
}

DbManager.prototype.addUsersIfNotExists = async function (response, teamId, user)
{
    response.cookie('user', user);

    const sql = `CALL AddUserIfNotExists("${teamId}", "${user}")`;
    await this.execute(sql);
}

DbManager.prototype.addItem = async function (teamId, user, item)
{
    const sql = `CALL AddItem("${teamId}", "${user}", "${item}")`;
    await this.execute(sql);
}

DbManager.prototype.voteItem = async function (teamId, user, itemName, score)
{
    const sql = `CALL VoteItem("${teamId}", "${user}", "${itemName}", "${score}")`;
    await this.execute(sql);
}

DbManager.prototype.execute = async function (sql)
{
    if (!this.pool)
    {
        this.pool = MySQL.createPool({
            connectionLimit : this.CONNECTION_LIMIT,
            host : this.HOST,
            user : this.USER,
            password : this.PASSWORD,
            database : this.DATABASE
        });
    }

    const [result] = await this.pool.query(sql);
    return (result ? result[0] : null);
}

DbManager.prototype.createScoreList = function (id)
{
    var result = [];
    this.scores.forEach((item) => {
        if (item.scoreListId == id)
            result.push({user : item.userName, score : item.score});
    });

    return result;
}

DbManager.prototype.userExists = function (user)
{
	return this.users.includes(user);
}

DbManager.prototype.getTeamName = function ()
{
    return this.team.name;
}

DbManager.prototype.sortItems = function ()
{
    this.homeData.allItems.sort((itemA, itemB) =>
    {
        return (itemB.totalScore - itemA.totalScore);
    });
}

/*
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
*/

var DbManagerInstance = new DbManager();
exports.getDbManager = function () { return DbManagerInstance; }
