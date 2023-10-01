//attach line numbers

/**
 * @param {HTMLElement} element 
 * @returns 
 */
function getElementPosition(element){
    var rect = element.getBoundingClientRect();
    return {x: rect.right, y: rect.top, right: rect.right, bottom: rect.bottom};
}


/**
 * Count the number of lines inside of an HTMLelement.
 * * line-height and font size need to be defined inside of the element style.
 * 
 * @param {HTMLElement} e Element whos 'innerHTML' will be counted as lines
 * @returns {Number} number of lines inside of {e}
 */
function getNumberOfLines(e) {
    let style = getComputedStyle(e);
    let heighttext = style.getPropertyValue('line-height').replace('px',"");

    var divHeight = e.offsetHeight
    var lineHeight = parseInt(heighttext);
    var lines = divHeight / lineHeight

    return Math.floor(lines);
}

function alignScrollValues() {
    const numbersmenu = document.getElementsByClassName("linenumberMenu")[0];
    let doc = document.documentElement;

    numbersmenu.scrollTo(0, doc.scrollTop, 'instant',);
}

function setLineNumbers(tabname)
{
    const collection = document.getElementById(tabname).getElementsByClassName("contentSection");
    const numbersmenu = document.getElementsByClassName("linenumberMenu")[0];
    numbersmenu.innerHTML = "";

    var linenumber = 1;
    var lastul = undefined;
    
    for (let i = 0; i < collection.length; i++) {
        var paragraghs = collection[i].getElementsByTagName("div");

        paragraghs = Array.prototype.slice.call(paragraghs);
        paragraghs = paragraghs.filter(function(v, x){
            return v.parentElement === collection[i]; 
        });

        for (let index = 0; index < paragraghs.length; index++) {
            var e = paragraghs[index];
            let lines = getNumberOfLines(e);
    
            let ul = document.createElement("ul");
            ul.className = "numbersList";
    
            let paddingtop = getElementPosition(e).y + e.style.paddingTop.replace("px","");
    
            if(lastul)
            { 
                let bottom = getElementPosition(lastul).bottom;
                paddingtop = paddingtop - bottom;
            }
    
            ul.style.paddingTop = paddingtop + "px";
    
            for (let j = 0; j < lines; j++) {
                let li = document.createElement("li");
                li.innerHTML = `${linenumber++}`;
                ul.appendChild(li);
            }
            numbersmenu.appendChild(ul);      
    
            lastul = ul;
        }
    }
    
    //for scroll offset
    let ul = document.createElement("ul");        
    ul.className = "numbersList";
    for (let i = 0; i < 100; i++) {
        let li = document.createElement("li")
        li.innerHTML = "<br>";
        ul.appendChild(li);
    }
   
    numbersmenu.appendChild(ul); 
}


var tabs = document.getElementsByClassName('tablink');

var current_tabid = ""

function reloadNumbers(tabid){
    current_tabid = tabid;
    let temp = document.documentElement.scrollTop;
    document.documentElement.scrollTop = 0;
    setLineNumbers(tabid);
    document.documentElement.scrollTop = temp;
}

function realoadNumbersCurrentTab(){
    if(current_tabid != ""){
        reloadNumbers(current_tabid);
    }
}

addEventListener("load", (event) => {
    document.documentElement.scrollTop = 0;

    setLineNumbers("welcomeTab"); 
    alignScrollValues();

    addEventListener("scroll", (event) => {alignScrollValues();});
});

addEventListener("fullscreenchange", (event) => {
    alignScrollValues();
});