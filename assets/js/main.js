import * as mySitemapModule from './sitemap.js';
import * as myContentModule from './content.js';

var menu = [
    {
        "label": "Home",
        "href": "index.html?x=index"
    },
    {
        "label": "Social Media",
        "children": [
            {
                "label": "Instagram",
                "href": "index.html?x=social-media/instagram"
            },
            {
                "label": "Facebook",
                "href": "index.html?x=social-media/instagram"
            }
        ]
    },
    {
        "label": "VR Exercise",
        "children": [
            {
                "label": "Exercise",
                "href": "./vr-exercise"
            }
        ]
    }
];


//window.onload = function() {
    mySitemapModule.buildMenu(menu, "#main-nav", null, null);
    mySitemapModule.setMenuLocation("#main-nav");
    myContentModule.loadContentScriptFromQuery();

    function watchDivForChanges(divId, callback) {
        const observer = new MutationObserver((mutationsList) => {
          for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
              callback();
            }
          }
        });
        const targetDiv = document.getElementById(divId);
        observer.observe(targetDiv, { childList: true }); 
      
        // To stop observing later:
        // observer.disconnect();
      }
      watchDivForChanges('convertedHtml', () => {
        console.log('convertedHtml changed');
        mySitemapModule.buildSiteMap(menu, document.getElementById("site-map"), null);
        //mySitemapModule.buildAreaMap('/',menu, document.getElementById("area-map2"), null); 
      });
      watchDivForChanges('convertedMarkdown', () => {
        console.log('convertedMarkdown changed');
      });
//};

window.addEventListener("resize", function() {
    mySitemapModule.setMenuLocation("#main-nav");
});


