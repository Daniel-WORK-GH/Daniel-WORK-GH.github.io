export {Editor, MenuField}

class MenuField{
    constructor(lable, inputtype, value="", additionalatrbs = ""){
        this.lable = lable;
        this.inputtype = inputtype;
        this.value = value;
        
        this.additionalatrbs = additionalatrbs;
    }
}

class Editor{
    static{
        this.isopen = true;

        this.menu = document.getElementById("atrbmenu");
        this.form = document.getElementById("atrbform");
        this.close = document.getElementById("closebtn");
        this.save = document.getElementById("savebtn");

        this.menu.addEventListener('submit', function(event){
            event.preventDefault();
            Editor.save.onclick();
        });

        this.close.onclick = function(){
            Editor.closeMenu();
        };


        this.inputtags = [];
        this.submitfunc = undefined;
        this.sender = undefined;

        this.save.onclick = function(){
            let arr = Editor.getInputArr();
            if(Editor.submitfunc){
                Editor.submitfunc(Editor.sender, arr);
            }
        }
    }

    /**
     * Returns array of input values of the form
     */
    static getInputArr(){
        var dict = []; // Create an empty array

        for (let i = 0; i < this.inputtags.length; i++) {
            const e = this.inputtags[i];

            let val;
            if(e.inputtype == "checkbox"){
                val = document.getElementById(`tag_${i}`).checked;
            }else{
                val = document.getElementById(`tag_${i}`).value;
            }

            dict.push({
                key: e.lable,
                value: val
            });
        }

        return dict;
    }

    /**
     * @param {Array<MenuField>} inputtags 
     */
    static openMenu(inputtags, sender = undefined, onSaveFunc = undefined){
        if(!inputtags) throw new Error("No menu tags");
        this.inputtags = inputtags;
        
        if(onSaveFunc){
            this.sender = sender;
            this.submitfunc = onSaveFunc;
        }

        if(this.isopen){    
            this.closeMenu();
        }

        this.form.innerHTML = "";
        for (let i = 0; i < inputtags.length; i++) {
            const e = inputtags[i];
            this.form.innerHTML += `<label for="tag_${i}">${e.lable}:</label>`;
            this.form.innerHTML += `<input type="${e.inputtype}" class="menu-${e.inputtype}" id="tag_${i}" name="tag_${i}" value="${e.value}" ${e.additionalatrbs}>`;
           this.form.innerHTML += `<br><br>`;
        }
        
        this.menu.style.display = "block";
        this.isopen = true;
    }

    static closeMenu(){
        if(!this.isopen) return;

        this.menu.style.display = "none";
        this.isopen = false;
        this.onSaveFunc = undefined;
    }
}