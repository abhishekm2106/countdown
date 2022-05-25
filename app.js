

import {Clock, NewYearClock  } from "./js/clock.js";
import { waitForAnimation, startTime,  updateDisplay } from "./js/appfunctions.js";

import {setInnerHtmlForNotNull } from "./js/functions.js";

// DOM nodes
// todo remove day clock and day count
let dayCount = document.getElementById("countDay");
let dayClock = new NewYearClock();
const animatedCountDuration = 800;

const body = document.body;
var dayNumber = document.getElementById('day-num');
var hourNumber = document.getElementById("hour-num");
var minNumber = document.getElementById("min-num");
var secNumber = document.getElementById("sec-num");
var dueDate = document.getElementById('dueDate');

//to stop the clock
let intervalID;
let customClockMovement = false;
// Initialize default Clock class
// var myclock = new Anniversary(new Date('5-5-2022'));
var myclock =  setMainClock();
setInnerHtmlForNotNull(dueDate, `${myclock.endDate.getDate() + ' ' + myclock.endDate.toLocaleString('default', { month: 'long' }) + ', ' + myclock.endDate.getFullYear()}`)
var customClock;

function setMainClock() {
    let myclock = new NewYearClock();
    let mainclock =  localStorage.getItem('mainClock');
    if (mainclock !== null && mainclock != undefined) { //countdown set to main
        mainclock = JSON.parse(mainclock)
        myclock = new Clock(new Date(mainclock.date));
        setMainText(mainclock.text)
    }
    return myclock;

}

function setMainText(countdownText) {
    const textDisplay = document.getElementById('countdown-text');
    setInnerHtmlForNotNull(textDisplay, countdownText)
}


// todo: remove this unused function 
function displayClockRow() {
    let customRow = document.getElementById("customDisplay");
    // show row
    customRow.style.display = 'block';
}
// todo: remove this unused function 
function restartTime() {
    if (customClockMovement) {
        return;
    } else {
        startClock();
    }
}


try {
    //show day value before animation runs
// setInnerHtmlForNotNull(dayCount, dayClock.countDays());
// startTime();
waitForAnimation(myclock,  { dayNumber, hourNumber, minNumber, secNumber }, animatedCountDuration, customClockMovement,);
// addWhatappEventHandler();
// as;
} catch (error) {
    errorHandler("Error in clock");
    console.log(error);
}

// service worker
/*
if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
    .then( (reg)=>{ 
        console.log('service worker registered', reg)
    })
        .catch((err)=> console.log('Service worker not registered', err));
  });
        
}*/
