var menu = [
{
    "label": "Home",
    "href": "index.html",
    "implicit": "Y"
},
{
    "label": "Test",
    "href": "index.html?x=test",
    "implicit": "Y",
    "children": [
        {
            "label": "Test",
            "href": "index.html?x=test/test",
            "implicit": "Y",
            "children": [
                {
                    "label": "Test",
                    "href": "index.html?x=test/test",
                    "implicit": "Y"
                }
            ]
        }
    ]
},
{
    "label": "Test 2",
    "href": "?x=test2",
    "implicit": "N",
    "children": [
        {
            "label": "Test",
            "href": "?x=test2/test",
            "implicit": "Y",
            "children": []
        }
    ]
}];

var iconOpen = "bi-chevron-right";
var iconClose = "bi-chevron-down";
var indentFactor = 6;
var mainNav = "#main-nav";

function buildMenu(items, navContainer, parent, level) {
    if (navContainer) {                
        var rootElement = document.createElement("ul");
        rootElement.classList.add("navbar-nav");                
        buildMenu(items, false, rootElement, 0);
        document.querySelector(navContainer).append(rootElement);            
    } else {    
        level++;            
        for (var i = 0; i < items.length; i++) {                          
            var li = document.createElement("li");
            var a = document.createElement("a");
            var id = '';   
            if (parent.classList.contains("navbar-nav")) {
                id = "dropdown-"+i;
                li.classList.add("nav-item");                        
                a.classList.add("nav-link");                
            } else {
                id = parent.getAttribute("id") + "-" + i;
                a.classList.add("dropdown-item");
            }                            
            if ("implicit" in items[i] && items[i].implicit == 'Y') { 
                a.setAttribute("href", items[i].href);
            }
            a.textContent = items[i].label;      
            li.append(a);
            if ("children" in items[i] && items[i].children.length > 0) {                        
                var d = document.createElement("div");
                if (level > 1) {
                    var ind = (level - 1) * indentFactor;
                    d.style.textIndent = ind + "px";
                }
                d.classList.add("dropdown-toggle");
                d.classList.add("float-start");
                d.setAttribute("data-bs-toggle", "dropdown");
                d.setAttribute("data-bs-target", id);

                var ii = document.createElement("i");
                ii.classList.add('bi');
                ii.classList.add(iconOpen);                                     
                d.appendChild(ii);
                li.prepend(d);
                
                var ul = document.createElement("ul");                
                ul.setAttribute("id", id);
                ul.classList.add("dropdown-menu");
                ul.classList.add("dropdown");                  
                buildMenu(items[i].children, false, ul, level);
                li.append(ul);
            } else {
                li.style.textIndent = level * (indentFactor) + (3 * indentFactor) +"px";
            }       
            parent.append(li);                    
        }                
    }           
}

function buildAreaMap(request_path,items, parent) {    
    for (var i = 0; i < items.length; i++) {      
        if(items[i].href.startsWith(request_path) && items[i].href != request_path){     
            var li = document.createElement("li");     
            if ("implicit" in items[i] && items[i].implicit == 'Y') { 
                var a = document.createElement("a");
                a.textContent = items[i].label;    
                a.setAttribute("href", items[i].href);
                li.append(a);
            }  
            else{
                li.textContent = items[i].label;    
            }
            if ("children" in items[i] && items[i].children.length > 0) {                  
                var ul = document.createElement("ul");                
                ul.setAttribute("id", parent.getAttribute("id") + "-" + i); 
                buildSiteMap(items[i].children, ul);
                li.append(ul);
            }
            parent.append(li);
        }
        else {
            if ("children" in items[i] && items[i].children.length > 0) {  
                buildAreaMap(request_path,items[i].children, parent);
            }
        }
    }     
}

function buildSiteMap(items, parent) {    
    for (var i = 0; i < items.length; i++) {      
        var li = document.createElement("li");     
        if ("implicit" in items[i] && items[i].implicit == 'Y') { 
            var a = document.createElement("a");
            a.textContent = items[i].label;    
            a.setAttribute("href", items[i].href);
            li.append(a);
        }  
        else{
            li.textContent = items[i].label;    
        }
        if ("children" in items[i] && items[i].children.length > 0) {                  
            var ul = document.createElement("ul");                
            ul.setAttribute("id", parent.getAttribute("id") + "-" + i); 
            buildSiteMap(items[i].children, ul);
            li.append(ul);
        }
        parent.append(li);
    }     
}

function setMenuLocation() {
    var toggler = document.querySelector('.navbar-toggler').getBoundingClientRect();            
    var bar = document.querySelector('.navbar').getBoundingClientRect();            
    var xpos = toggler.left;
    var ypos = bar.height;
    if (window.innerWidth < 768) {
        xpos = 0;
    }
    document.querySelector(mainNav).style.left = String(xpos)+"px";
    document.querySelector(mainNav).style.top = String(ypos)+"px";          
}

window.addEventListener("resize", function() {
    setMenuLocation();
});


