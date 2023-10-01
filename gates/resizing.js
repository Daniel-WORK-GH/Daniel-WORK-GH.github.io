function setSize(){
    let width = window.screen.width;
    let height = window.screen.height;

    let expectedwidth = 2560;
    let expectedheight = 1140;

    if(height > expectedheight) return;

    let scale = height / expectedheight;

    let body = document.getElementsByTagName('body')[0];

    body.style.transform = `scale(${scale}`;
    body.style.transformOrigin = `0 0`;
}

var previousheight = -1;
const maxlines = 16;
var currentlines = 0;


function setTextareaSize(){
    function OnTxInput() {
        tx.style.height = 0;
        tx.style.height = (tx.scrollHeight) + "px";

        //not clean code, fix later
        if(previousheight != tx.scrollHeight){
            realoadNumbersCurrentTab();
            drawFoldLines();
            previousheight = tx.scrollHeight;
        }

        currentlines = Math.round(tx.scrollHeight / 27);
    }

    function OnTxKeyboard(e) {
        // Enter pressed
        if (e.keyCode == 13)
        {
            if(currentlines < maxlines){
                currentlines++;
                
            }
            else{
                //method to prevent from default behaviour
                e.preventDefault();
            }
        }

    }

    function onTxPaste(e) {
        var clipboardData, pastedData;

        // Stop data actually being pasted into div
        e.stopPropagation();
        e.preventDefault();
      
        // Get pasted data via clipboard API
        clipboardData = e.clipboardData || window.clipboardData;
        pastedData = clipboardData.getData('Text');
      
        pastedData = pastedData.split('\n');

        let i;
        for (i = 0; i < pastedData.length && currentlines < maxlines; currentlines++) {
            tx.value += pastedData[i++];
        }

        OnTxInput();
    }

    const tx = document.getElementsByTagName("textarea")[0];

    tx.setAttribute("style", "height:" + (27.3) + "px;overflow-y:hidden;");
    tx.addEventListener("input", OnTxInput, false);
    tx.addEventListener('keydown', OnTxKeyboard, true);
    tx.addEventListener('paste', onTxPaste, true);
}

setSize();
setTextareaSize();

