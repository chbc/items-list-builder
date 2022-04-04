function setupVoteItemView(itemToVote)
{
    const itemLabel = document.getElementById('itemToVoteLabel');
    itemLabel.innerHTML = itemToVote;
}

function voteItem(item, score)
{
    setLoading();
    const message = 'item=' + item + '&score=' + score;
    makeRequest('voteItem', message);
}

function setLoading()
{
    const itemLabel = document.getElementById('itemToVoteLabel');
    itemLabel.innerHTML = 'Carregando...';

    const images = document.getElementById('voteImages');
    images.style.display = 'none';
}
