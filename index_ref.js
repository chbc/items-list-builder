const DbManager = require('./scripts/dbManager');
const dbManager = DbManager.getDbManager();

const burgerHut = {
	docName: 'burgerHut',
	location: 'LA'
};

const save = async() =>
{
	await dbManager.save('restaurants', burgerHut);
}

const saveByPath = async() =>
{
	await dbManager.saveByPath('restaurants/burgerHut/reviews/firstReview',  {docName: 'firstReview', comments: 'Legal!'});
}

const refreshTeams = async() =>
{
	await dbManager.refreshTeams();
}

const refreshItems = async() =>
{
	await dbManager.refreshItems();
}

refreshItems();
