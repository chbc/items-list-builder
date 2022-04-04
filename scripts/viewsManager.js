var ViewsManager = function()
{
	this.LOGIN_PAGE = 'login.html';
	this.HOME_PAGE = 'home.html';
	this.ERROR_PAGE = 'error.html';
}

ViewsManager.prototype.getLoginPage = function (teamName)
{
	return this.getPage(this.LOGIN_PAGE, {teamName : teamName});
}

ViewsManager.prototype.getHomePage = function (user, itemToVote, allUsers, allItems)
{
	var parameters = 
	{
		user : user,
		itemToVote : itemToVote,
		allUsers : allUsers,
		allItems : allItems
	}
	return this.getPage(this.HOME_PAGE, parameters);
}

ViewsManager.prototype.getErrorPage = function (message)
{
	return this.getPage (this.ERROR_PAGE, {errorMessage : message});
}

ViewsManager.prototype.getPage = function (pageView, inputParameters)
{
	var result = 
	{
		page : pageView,
		parameters : inputParameters
	};

	return result;
}

var ViewsManagerInstance = new ViewsManager();
exports.getViewsManager = function () { return ViewsManagerInstance; }
