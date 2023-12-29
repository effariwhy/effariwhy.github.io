
export function buildSiteMap(items, parent) {    
    if (parent === null){
        return;
    }
    for (var i = 0; i < items.length; i++) {      
        var li = document.createElement("li");     
        if ("href" in items[i]) { 
            var a = document.createElement("a");
            a.textContent = items[i].label;    
            a.setAttribute("href", items[i].href);
            li.append(a);
        }  
        else if ("xhref" in items[i]) { 
            var a = document.createElement("a");
            a.textContent = items[i].label;    
            a.setAttribute("href", items[i].xhref);
            a.setAttribute("target", "_blank");
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

export function buildAreaMap(request_path,items, parent) {      
    if (parent === null){
        return;
    }
    for (var i = 0; i < items.length; i++) {      
        if("href" in items[i] && items[i].href.startsWith(request_path) && items[i].href != request_path){     
            var li = document.createElement("li");     
            li.textContent = items[i].label;    
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



