import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  push,
  ref,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// import { initializeApp } from "firebase/app";
// import { getDatabase, push, ref } from "firebase/database";

const appSetting = {
  databaseURL:
    "https://shopping-list-webapp-d8edb-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
const applianceInDB = ref(database, "appliance");

onValue(applianceInDB, (snapshot) => {
  if (snapshot.exists()) {
    let applianceArray = Object.entries(snapshot.val());
    clearApplianceList();
    for (let i = 0; i < applianceArray.length; i++) {
      let currentAppliance = applianceArray[i];
      setApplianceToApplianceUlEle(currentAppliance);
    }
  } else {
    applianceUlEle.innerHTML = "No appliance yet...";
  }
});

const applianceInputEle = document.getElementById("appliance-input");
const addApplianceBtnEle = document.getElementById("btn-cart");
const applianceUlEle = document.getElementById("appliance-list");

addApplianceBtnEle.addEventListener("click", () => {
  let inputvalue = applianceInputEle.value;
  clearInput();
  push(applianceInDB, inputvalue);
});

function clearApplianceList() {
  applianceUlEle.innerHTML = "";
}

function clearInput() {
  applianceInputEle.value = "";
}

function setApplianceToApplianceUlEle(value) {
  let applianceID = value[0];
  let applianceValue = value[1];
  let newLiEle = document.createElement("li");

  newLiEle.addEventListener("dblclick", () => {
    let deleteApplianceLocation = ref(database, `appliance/${applianceID}`);
    remove(deleteApplianceLocation);
  });

  newLiEle.textContent = applianceValue;
  applianceUlEle.append(newLiEle);
}
