import * as mySitemapModule from './sitemap.js';
import * as myContentModule from './content.js';
import * as myMenuModule from './menu.js';

var menu_items = [
  {"label": "Home", "href": "index.html?x=index"},
  {"label": "VR", "href": "index.html?x=vr/index", "children": [
    {"label": "moonrider.xyz clone w/o walls", "xhref": "./vr-exercise"},
    {"label": "wolvic browser", "xhref": "https://wolvic.com"},    
    {"label": "VR enabled sites", "children": [
      {"label": "Exercise", "href": "./vr-exercise"},
    ]},
  ]},
  {"label": "Social Media", "children": [
    {"label": "Instagram", "xhref": "index.html?x=social-media/instagram"},
    {"label": "Facebook", "xhref": "index.html?x=social-media/instagram"},
  ]},
];

//myMenuModule.buildMenu(menu_items, "#main-nav", null, null);
//mySitemapModule.buildMenu(menu_items, "#main-nav", null, null);
//mySitemapModule.setMenuLocation("#main-nav");
myContentModule.loadContentScriptFromQuery();

function watchElementForChanges(elemId, callback) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        callback();
      }
    }
  });
  const targetElement = document.getElementById(elemId);
  observer.observe(targetElement, { childList: true }); 
  // To stop observing later:
  // observer.disconnect();
}

watchElementForChanges('convertedHtml', () => {
  console.log('convertedHtml changed');
  mySitemapModule.buildSiteMap(menu_items, document.getElementById("site-map"), null);
  //mySitemapModule.buildAreaMap('/',menu_items, document.getElementById("area-map2"), null); 
});

watchElementForChanges('convertedMarkdown', () => {
  console.log('convertedMarkdown changed');
});

window.addEventListener("resize", function() {
  mySitemapModule.setMenuLocation("#main-nav");
});

document.getElementById('menu-right').innerHTML = myMenuModule.buildMenuItems(menu_items,'right', 'RIGHT MENU','menu-right', 0);
document.getElementById('menu-left').innerHTML = myMenuModule.buildMenuItems(menu_items,'left', 'LEFT MENU','menu-left', 0);