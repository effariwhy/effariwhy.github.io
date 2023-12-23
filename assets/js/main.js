window.onload = function() {
    loadMarkdownScriptFromQuery();  
};

$(document).ready(function() {
    var queryParams = getQueryParams();
    console.log(queryParams); // Log the query parameters object
});
///////////////////////////////////////////////////////////////////////////////

function getQueryParams() {
    var queryParams = {};
    var queryString = window.location.search.substring(1); // Remove the '?' at the start
    var params = queryString.split("&");

    for (var i = 0; i < params.length; i++) {
        var pair = params[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1] || "");

        queryParams[key] = value;
    }

    return queryParams;
}

function loadMarkdownScriptFromQuery() {
    var queryParams = getQueryParams();
    if (queryParams['x'] === undefined) {
        window.location.href = 'index.html?x=index';
        return;
    }
    var scriptPath = 'content/js/' +  queryParams['x'] + '.js'; 
    if (scriptPath) {
        var script = document.createElement('script');
        script.src = scriptPath;
        script.type = 'text/javascript';
        script.onload = function() {
            console.log('Script loaded and executed.');
            var converter = new showdown.Converter();
            var htmlContent = converter.makeHtml(markdownContent);
            document.getElementById('convertedMarkdown').innerHTML = htmlContent;
            return;
        };
        script.onerror = function() {
            window.location.href = 'index.html?x=404';
            return;
        };
        document.head.appendChild(script);
    } else {
        window.location.href = 'index.html?x=index';
        return;
    }

    
}