import { errorHandler } from "./error.js";
import { notifyUser, showLoader, removeLoader, setTheme, addFormCSS } from "./uiFunctions.js";
import { $, setLink, fileSizeOk, fetchFile } from "./functions.js"

const nav = $(".nav")[0];
const sidebar = $(".sidebar")[0];
const sidebarItems = $(".sidebar-list")[0];
const palette = $(".pick-color")[0];

//main
palette.addEventListener("click", bindPaletteEvents);
sidebarItems.addEventListener("click", bindSidebarEvents);
nav.addEventListener("click", toggleSidebar);
nav.addEventListener("click", () => { //closes sidebar if click is outside the opened sidebar
    $(".container")[0].addEventListener("click", closeSideBarListener);
});

//definitions
function toggleSidebar() {
    if (sidebar.classList.contains("sidebar-hide")) {
        sidebar.classList.replace("sidebar-hide", "sidebar-show");
    }
}

const closeSideBarListener = (event) => {
    sidebar.classList.add("sidebar-hide");
    event.currentTarget.removeEventListener("click", closeSideBarListener);
};

function bindPaletteEvents(e) {
    let choice = e.target.closest(".pick-color-ico");
    if (choice) setTheme(choice);
}

function bindSidebarEvents(event) {
    let home = event.target.closest(".item-home");
    let countdowns = event.target.closest(".item-countdowns");
    let bg = event.target.closest(".item-bg");
    let theme = event.target.closest(".item-theme");
    let today = event.target.closest(".item-today");
    let about = event.target.closest(".item-about");

    if (home) {
        setLink("/index.html");
        return;
    }
    if (countdowns) {
        setLink("/html/countdown-list.html");
        return;
    }
    if (bg) {
        openBgPicker();
        return;
    }
    if (theme) {
        openColorPicker();
        return;
    }
    if (today) {
        setLink("/html/today.html")
        return;
    }
    if (about) {
        setLink("/html/about.html")
        return;
    }
}

function openColorPicker() {
    palette.classList.toggle("show-color");
}

function openBgPicker() {
    addFormCSS();
    showLoader();
    processForm().catch(err => {
        errorHandler("Unable to set custom background");
        console.log(err);
    });

    //defs
    async function processForm() {

        let formHtml = await fetchFile("/html/form-upload.html", "text");
        removeLoader();
        document.body.insertAdjacentHTML("afterbegin", formHtml);
        document.body.style.position = "fixed";
        
        //form DOM
        const filePicker = document.querySelector("input[type='file']");
        const closeFormBtn = $(".close-form")[0]
        const resetBtn = $(".reset")[0]
        const defaultImgs = $(".bg-presets-preview:not(.upload-preview) img");
        //main
        filePicker.onchange = () => {
            processImg(filePicker.files[0]);
        };
        closeFormBtn.addEventListener("click", closeFormPopUp);
        resetBtn.addEventListener("click", () => {
            localStorage.removeItem("userBg");
            document.body.style.backgroundImage = "";
            notifyUser("Default background restored");
            closeFormPopUp();
        });
        defaultImgs.forEach((img) => {
            img.addEventListener("click", async () => {
                    let imgBlob = await fetchFile(img.src,"blob");
                    processImg(imgBlob);
            });
        });
        //defs
        function closeFormPopUp() {
            document.getElementsByClassName("pop-up-container")[0].remove();
            document.body.style.position = "";
        }
        function processImg(uploadedPic) {
            let reader = new FileReader();
            if (fileSizeOk(uploadedPic)) {
                reader.readAsDataURL(uploadedPic);
            }
            else {
                notifyUser("Picture is too big");
            }

            reader.onload = function () {
                let uploadedPic64 = reader.result;
                localStorage.setItem("userBg", `${uploadedPic64}`);
                document.body.style.backgroundImage = `url(${uploadedPic64})`;
                notifyUser("Background is set");
                closeFormPopUp();
            };
            reader.onerror = function () {
                errorHandler("Unable to set background");
                console.log(reader.error);
            };
        }
    };
}

