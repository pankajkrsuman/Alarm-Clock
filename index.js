const list = document.querySelector("#scroll-area-for-alarm");
const currentTime = document.querySelector("#current-time");
const addAlarmTile = document.querySelector("#add-alarm-tile");
const plusSign = document.querySelector(".plus-sign");

/*  set the alarm and for changing the currnt time */
setInterval(() => {
    var today = new Date();
    hours = today.getHours();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    minutes = today.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = today.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var time = hours + ":" + minutes + ":" + seconds;
    currentTime.innerHTML = time + " " + ampm;

    for(i=0; i< alarmTimeList.length; i++ ){
        if(alarmTimeList[i].status == "checked"){
            if(hours == alarmTimeList[i].hour && minutes == alarmTimeList[i].minute && seconds == alarmTimeList[i].second){
                alert("Alarm is going off");
                alarmTimeList[i].status = "unchecked";
                showAlarmCard();
            }
        }
    }

}, 1000)



/**
 * Create a card for the alarm with the given parameters
 * @param hour - The hour of the alarm
 * @param minutes - The minutes of the time you want to set the alarm for.
 * @param seconds - The seconds of the time.
 * @param ampm - AM or PM
 * @param status - The status of the alarm. If it's checked, it's on. If it's not checked, it's off.
 * @param index - The index of the alarm in the array.
 */
function createCard(hour, minutes, seconds, ampm, status,index) {
  let code = `   
    
  <div class="custom-card-for-alarm">
    <div class="alarm-time d-flex justify-content-between align-items-center px-3">
        
        <div class="time">
                ${hour} : ${minutes} : ${seconds} ${ampm} 
        </div>

        <div class="switche">
        <label class="switch" >
        <input type="checkbox" ${status} onclick="changeStatus(${index})">
        <span class="slider"></span>
        </label>
        </div>

    </div>

    <div class="alarm-delete d-flex justify-content-center">
        
        <div class="delete-icon white-color-svg">
        <img src="trash-solid.svg" height="15px" onClick="deleteAlarmTile(${index})">
        </div>
    </div>
</div>`;
list.innerHTML += code;
}

let alarmTimeList= [
    {hour: 10, minute: 30, second: 49 ,ampm: "PM", status: "checked" },
    {hour: 10, minute: 30, second: 49 ,ampm: "AM", status: "checked" },
    {hour: 10, minute: 30, second: 49 ,ampm: "PM", status: "unchecked" },
    {hour: 10, minute: 30, second: 49 ,ampm: "AM", status: "checked" }
]

/* create the cards that are used to display the alarm time. */
function showAlarmCard(){
    list.innerHTML = null
for(i=0; i< alarmTimeList.length; i++ ){
    createCard(alarmTimeList[i].hour, alarmTimeList[i].minute, alarmTimeList[i].second, alarmTimeList[i].ampm, alarmTimeList[i].status ,i);
}
};

showAlarmCard();

const changeStatus = (index) =>{
    /* Flipping the status of the checkbox. */
    if(alarmTimeList[index].status == "checked"){
        alarmTimeList[index].status = "unchecked";
    }else{
        alarmTimeList[index].status = "checked";
    }
}

/* create the button that is used to add the alarm time. */
let buttonForAlarmTile = document.querySelector("#button-for-alarm-tile");
let buttonForTickCode = `
<button
id="add-alarm-tile"
class="set-alarm-button d-flex align-items-center justify-content-center cursor-pointer"
onclick="addAlarmTimeInList()"
>
<img class="white-color-svg" src="check-solid.svg" alt="" height="20px"/>
</button>
`;
let buttonForCancel = `
<button
id="add-alarm-tile"
class="set-alarm-button d-flex align-items-center justify-content-center cursor-pointer mt-2"
onclick="cancelAdding()"
>
<img class="white-color-svg" src="times-solid.svg" alt="" height="30px"/>
</button>
`
let buttonForAddingAlarmCode = `   <button
id="add-alarm-tile"
class="set-alarm-button d-flex align-items-center justify-content-center cursor-pointer"
onclick="addAlarm()"
>
<img class="white-color-svg" src="plus-solid.svg" alt="" height="30px"/>
</button>`

/**
 * Create a card with a form that allows the user to enter the time they want to set an alarm for
 */
function addAlarm(){

    let alarmTimeCardCode = `
    <div class="create-alarm-card d-flex justify-content-around">
  <form class="d-flex align-items-center justify-content-center gap-3">
    <input type="number" id="hour" class="hour" min="1" max="12" value="12" oninput='format(this)'>
    <input type="number" id="minute" class="min" min="0" max="60" value="00" oninput='format(this)'>
    <input type="number" id="second" class="sec" min="0" max="60"value="00" oninput='format(this)'>
    <select name="ampm" id="amnpm">
      <option value="AM">AM</option>
      <option value="PM">PM</option>
    </select>
</form>
  </div>
  `; 
  list.innerHTML = alarmTimeCardCode; 
  buttonForAlarmTile.innerHTML = buttonForTickCode;
  buttonForAlarmTile.innerHTML += buttonForCancel;
  setTimeForAlarm();
}

/**
 * * Add the alarm time to the list of alarm times
 */
function addAlarmTimeInList(){
var alarmHour = document.getElementById("hour").value;
var alarmMinute = document.getElementById("minute").value;
var alarmSecond = document.getElementById("second").value;
var ampm = document.getElementById("amnpm").value;
var status = "checked"
alarmTimeList.push({hour: alarmHour, minute:  alarmMinute, second: alarmSecond ,ampm: ampm, status:  status })
showAlarmCard();
buttonForAlarmTile.innerHTML = buttonForAddingAlarmCode;
}

/**
 * *This function is called when the user clicks the button to cancel adding an alarm. It hides the
 * alarm card and shows the alarm tile.*
 */
function cancelAdding(){
    showAlarmCard();
    buttonForAlarmTile.innerHTML = buttonForAddingAlarmCode;
}

function deleteAlarmTile(index){
alarmTimeList.splice(index, 1);
showAlarmCard();
}

/* This is a function that is used to format the input value. */
function format(input){
    if(input.value.length === 1){
      input.value = "0" + input.value;
    }
    if(input.value.length >= 2){
      input.value = input.value.slice(0,2);
}
  }
