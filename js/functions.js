// for a single source for all the scattered functions
//  due to Uc browser fix

/**
 * Checks if a DOM element variable is null before setting innerHTML
 * @param {HTMLElement} element 
 * @param {String} value 
 */
 export function setInnerHtmlForNotNull(element, value){
    if(element)//check for null
        element.innerHTML = value;
}

export function closeFormPopUp() {
    document.getElementsByClassName("pop-up-container")[0].remove();
    document.body.style.position = "";
}

/**
 * add zero in front of numbers < 10
 * @param {Number} num 
 * @returns {String} number with 0 at the front
 */
export function addZeros(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

export function addWhatappEventHandler() {
    let whatsappIcon = document.getElementById('sendWhatsappButton');
    if (whatsappIcon) {
        whatsappIcon.addEventListener('click', exportToWhatsapp);
    }

}


export function exportToWhatsapp() {
    let dayNum = document.getElementById("countDay").innerText;
    window.open(`whatsapp://send?text= Day ${dayNum || 'rcountdown'}/365`);
}



/**
 * Stop the clock with global var intervalID
 */
 export function stopClock(interval) {
    clearTimeout(interval);
    // customClockMovement = false;
}

/**
 * Toggles an element from style.display =block if none and vice versa
 * @param {HTMLElement} element element to set to block or none
 */
export const toggleElementDisplayBlockOnScreen=(element)=>{
    if(element){
        if (element.style.display == "block") {
            element.style.display = "none";
        }
        else {
            element.style.display = "block";
        }
    }

}


export const removeElementSetDisplayNone=(element)=>{
    if(element)
    element.style.display = "none";
}
