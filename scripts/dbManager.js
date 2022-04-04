const { assert } = require("console");
const Firestore = require('@google-cloud/firestore');

var DbManager = function()
{
    this.firestore = new Firestore
    ({
        projectId : 'items-list-builder',
        keyFilename : __dirname + '../../service-account.json'
    });

    this.team = null;
    this.itemsDb = [];

    /* XXX
    this.teams = 
    [
        {
            id : '123', name : 'The Tributes',
            users : ['Henrique', 'Dodô', 'Matheus']
        },
        {
            id : '321', name : 'Hetfields',
            users : ['Integrante A', 'Integrante B']
        }
    ];

    this.itemsDb = 
    [
        {
            teamId : '123', items :
            [
                {item : 'R.E.M. - Losing My Religion', totalScore : 9, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 3}]},
                {item : "4 Non Blondes - What's Up", totalScore : 2, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 1}, {user : 'Matheus', score : 0}]},
                {item : "The Cure - Boys Don't Cry", totalScore : 6, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 0}, {user : 'Matheus', score : 3}]},
                {item : "The Cure - Fascination Street", totalScore : 4, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 0}]},
                {item : "Dire Straits - Sultans Of Swing", totalScore : 4, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 0}, {user : 'Matheus', score : 3}]},
                {item : "Pink Floyd - Another Brick In The Wall", totalScore : 7, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 3}]},
                {item : "The White Stripes - Seven Nation Army", totalScore : 6, scoreList : [{user : 'Henrique', score : 0}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 3}]},
                {item : "Placebo - The Bitter End", totalScore : 3, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 0}, {user : 'Matheus', score : 0}]},
                {item : "Steppenwolf - Born To Be Wild", totalScore : 4, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 0}, {user : 'Matheus', score : 3}]},
                {item : "Radiohead - Creep", totalScore : 7, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 3}]},
                {item : "RHCP - Parallel Universe", totalScore : 7, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 1}]},
                {item : "RHCP - Californication", totalScore : 9, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 3}]},
                {item : "RHCP - Can't Stop", totalScore : 6, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 0}, {user : 'Matheus', score : 3}]},
                {item : "Alice In Chains - Man In The Box", totalScore : 5, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 1}]},
                {item : "Alice In Chains - Would?", totalScore : 7, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 1}]},
                {item : "Nirvana - Come As You Are", totalScore : 3, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 1}, {user : 'Matheus', score : 1}]},
                {item : "Nirvana - The Man Who Sold The World", totalScore : 7, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 3}]},
                {item : "Foo Fighters - Everlong", totalScore : 9, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 3}]},
                {item : "Foo Fighters - My Hero", totalScore : 6, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 0}, {user : 'Matheus', score : 3}]},
                {item : "Pearl Jam - Alive", totalScore : 9, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 3}]},
                {item : "Pearl Jam - Black", totalScore : 6, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 0}, {user : 'Matheus', score : 3}]},
                {item : "Audioslave - Like A Stone", totalScore : 7, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 1}, {user : 'Matheus', score : 3}]},
                {item : "QOTSA - Go With The Flow", totalScore : 9, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 3}]},
                {item : "Deep Purple - Smoke On The Water", totalScore : 5, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 1}, {user : 'Matheus', score : 3}]},
                {item : "Metallica - Nothing Else Matters", totalScore : 7, scoreList : [{user : 'Henrique', score : 1}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 3}]},
                {item : "Metallica - Whiskey In The Jar", totalScore : 6, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 0}, {user : 'Matheus', score : 3}]},
                {item : "Linkin Park - In The End", totalScore : 9, scoreList : [{user : 'Henrique', score : 3}, {user : 'Dodô', score : 3}, {user : 'Matheus', score : 3}]},
                {item : "Limp Bizkit - My Way", totalScore : 6, scoreList : [{user : 'Henrique', score : 3}, {user : 'Matheus', score : 3}]},
                {item : "Soundgarden - Black hole sun", totalScore : 6, scoreList : [{user : 'Henrique', score : 3}, {user : 'Matheus', score : 3}]},
            ]
        },
        {
            teamId : '321', items :
            [
                {item : 'Metallica - Fuel', totalScore : 3, scoreList : [{user : 'Integrante A', score : 3}]},
            ]
        }
    ];
    */
}

DbManager.prototype.refreshTeam = async function(teamId)
{
    const teamDoc = await this.firestore.collection('teams').doc(teamId).get();
    const usersCollection = await this.firestore.collection('users').where('teamId', '==', teamId).get();

    this.team = teamDoc.data();
    this.team.users = [];

    usersCollection.forEach(userDoc =>
    {
        const user = userDoc.data();
        this.team.users.push(user.name);
    });
}

DbManager.prototype.refreshItems = async function(teamId)
{
    if (!this.team)
        await this.refreshTeam(teamId);

    this.itemsDb = [];

    const itemsCollection = await this.firestore.collection('itemsDb').get();
    const scoresCollection = await this.firestore.collection('scores').get();
    var scores = [];

    scoresCollection.forEach(scoreDoc =>
    {
        scores.push(scoreDoc.data());
    });

    itemsCollection.forEach(itemDoc => 
    {
        const score = scores.find(element => element.itemId == itemDoc.id);
        var totalScore = 0;
        score.users.forEach((element) => {totalScore += element.score;});

        var entry = 
        {
            id : itemDoc.id,
            totalScore : totalScore,
            scoreList : score.users,
            name : itemDoc.data().name
        };

        this.itemsDb.push(entry);
    });
}

DbManager.prototype.userExists = function (user)
{
	return this.team.users.includes(user);
}

DbManager.prototype.addUsersIfNotExists = async function (response, teamId, user)
{
	response.cookie('user', user);

    await this.refreshTeam(teamId);

	if (!this.team.users.includes(user))
    {
        this.team.users.push(user);
        await this.firestore.collection('users').doc(user).set({'name' : user, 'teamId' : teamId});

    }
}

DbManager.prototype.addItem = async function (teamId, user, item)
{
    const response = await this.firestore.collection('itemsDb').add({name : item, totalScore : 3});

    var itemId = response.id;
    var scoreList = [{name : user, score : 3}];
    var entry =
    {
        id : itemId,
        name : item, 
        scoreList : scoreList,
        totalScore : 3
    };

    this.itemsDb.push(entry);

    const scoreEntry = {itemId : itemId, users : [{name : user, score : 3}]};
    await this.firestore.collection('scores').add(scoreEntry);
}

DbManager.prototype.getItemToVote = function (user)
{
    var result = null;

    this.itemsDb.some(function (item)
    {
        var userVoted = false;
        item.scoreList.some(function (scoreItem)
        {
            if (user == scoreItem.name)
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

DbManager.prototype.voteItem = async function (user, itemName, score)
{
    var item = this.itemsDb.find(item => item.name == itemName);
    item.totalScore += score;
    const entry = {name : user, score : score};
    item.scoreList.push(entry);

    const scoreCollection = await this.firestore.collection('scores').where('itemId', '==', item.id).get();
    var scoreDoc = scoreCollection.docs[0];
    var scoreData = scoreDoc.data();
    scoreData.users.push(entry);

    await this.firestore.collection('scores').doc(scoreDoc.id).set(scoreData);
}

DbManager.prototype.getTeamName = function ()
{
    return this.team.name;
}

DbManager.prototype.getIndexOf = function (itemName)
{
    var result = -1;
    
    for (i = 0; i < this.itemsDb.length; i++)
    {
        if (this.itemsDb[i].name == itemName)
        {
            result = i;
            break;
        }
    }

    assert(result >= 0, 'getIndexOf - item not found!');

    return result;
}

DbManager.prototype.getTeamItems = function (teamId)
{
    return this.itemsDb.find(element => { return element.teamId == teamId;});
}

DbManager.prototype.resetVote = function (teamId, user, item)
{
    var teamItem = this.getTeamItems(teamId);
    const items = teamItem.items;
    const size = items.length;

    for (let i = 0; i < size; i++)
    {
        const element = items[i];
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
    var teamItem = this.getTeamItems(teamId);
    const items = teamItem.items;
    const size = items.length;

    for (let i = 0; i < size; i++)
    {
        const element = items[i];
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

    var teamItem = this.getTeamItems(teamId);
    const items = teamItem.items;
    const size = items.length;

    for (let i = 0; i < size; i++)
    {
        const element = items[i];
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
    var teamItem = this.getTeamItems(teamId);
    const items = teamItem.items;
    const size = items.length;

    for (let i = 0; i < size; i++)
    {
        const element = items[i];
        if (element.item == item)
        {
            items.splice(i, 1);
            break;
        }
    }
}

var DbManagerInstance = new DbManager();
exports.getDbManager = function () { return DbManagerInstance; }
