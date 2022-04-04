function onAddItemPressed()
{
    setAddItemsLoading();

    const group = document.getElementById('inputGroup').value;
    const item = document.getElementById('inputItem').value;

    if ((group == '') || (item == ''))
        alert('Campo vazio!');
    else
    {
        const message = 'item=' + group + ' - ' + item;
        makeRequest('addItem', message);
    }
}

function setAddItemsLoading()
{
    var item = document.getElementById('newItemView');
    item.style.display = 'none';
    console.log(item.style);
}
