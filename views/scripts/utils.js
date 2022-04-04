function makeRequest(route, parameters)
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function()
    {
        if ((this.readyState == 4) && (this.status == 200))
        {
            location.reload();
        }
    };
    
    xhttp.open("POST", route, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    xhttp.send(parameters);
}
