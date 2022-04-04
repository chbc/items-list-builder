function setupItemsOverview(allItems, allUsers)
{
	var table = document.getElementById('itemsOverviewTable');
    initializeTable(table);

    for (i = 0; i < allUsers.length; i++)
    {
        table.rows[0].style.backgroundColor = 'darkblue';
        var cell = table.rows[0].insertCell(2 + i);
        cell.innerHTML = allUsers[i];
    }

    for (i = 0; i < allItems.length; i++)
    {
        const item = allItems[i];
        var row = table.insertRow(1 + i);
        row.style.backgroundColor = (i % 2 == 0) ? 'black' : 'darkslategray';

        var cell = row.insertCell(0);
        cell.innerHTML = (item.name) ? item.name : 'Erro!';

        cell = row.insertCell(1);
        cell.innerHTML = item.totalScore;

        allUsers.forEach(user =>
        {
            cell = row.insertCell(-1);
            const score = getScoreFromUser(item.scoreList, user);
            cell.innerHTML = score;
        });
    }
}

function initializeTable(table)
{
    var size = table.rows.length;
    for (i = 1; i < size; i++)
       table.deleteRow(1);

    var header = table.rows[0];
    size = header.cells.length;
    for (i = 2; i < size; i++)
        header.deleteCell(-1);
}

function getScoreFromUser(scoreList, user)
{
    var result = 0;

    scoreList.some(item =>
    {
        if (item.name == user)
        {
            result = item.score;
            return true;
        }
    });

    return result;
}
