var clientName;

// Sends message when send button is clicked
$(".btn-Send").click(function () {
  send();
});

// Sends message when enter key is pressed
$(document).keydown(function (e) {
  if (e.keyCode == 13) {
    send();
    if (e.preventDefault) e.preventDefault();
    return false;
  }
});

localStorage["chat-log"] ? console.log("true") : console.log("false");

// Checks for "chat-log" key in localStorage and if it exists it rerenders all user messages and bot responses
if (localStorage["chat-log"]) {
  $("#chat-icon").toggleClass("hidden");
  $(".chat-box").toggleClass("open");
  var arr = JSON.parse(localStorage["chat-log"]);
  for (i = 0; i < arr.length; i++) {
    if (arr[i].person === 1) {
      reRenderMessage(arr[i].text, arr[i].time);
    } else {
      reRenderResponse(arr[i].text, arr[i].time);
    }
  }
}

// Sends message to server
function send() {
  var message = document.getElementById("message").value;
  hideTyping();
  if (clientName === "") {
    console.log("clientName is" + clientName)
    clientName = message;
    addNameToSession(message);
    addMessage(message, "true");
    setTimeout(() => {
      addPrompt();
    }, 3000);
  } else {
    addMessage(message);
  }
}

// Adds Prompt with Client Name
function addPrompt() {
  hideTyping();
  var div = document.createElement("div");
  var msg = "Hello " + clientName + ", how can I help?<br /><br />Here are some examples of things you can ask:<ul><li>- How do I make a payment?</li><li>- Where do I get an online quote?</li><li>- How do I make a claim?</li><li>- How do I contact the agency?</li></ul>";
  div.innerHTML =  "<span></span><div class='chat-message response'>" +
  msg +
  "</div><span class='timestamp response'>" +
  getTimestamp() +
  "</span>";
  div.className = "chat-message-div";
  document.getElementById("chat-log").appendChild(div);
  addToSession(2, msg, getTimestamp());
  updateScroll();
}

// Adds message from user
function addMessage(msg, getResponse) {
  $(".common").css({ display: "none" });
  var div = document.createElement("div");
  div.innerHTML =
    "<span style='flex-grow:1'></span><span class='timestamp'>" +
    getTimestamp() +
    "</span><div class='chat-message message'>" +
    msg +
    "</div>";
  div.className = "chat-message-div";
  document.getElementById("chat-log").appendChild(div);
  $("#message").val("");
  addToSession(1, msg, getTimestamp());
  showTyping();
  if(getResponse === "") {
    setTimeout(() => {
      getResponse(msg);
    }, 3000);
  }
  updateScroll();
}

// Rerenders user's message upon reopening chat box and if value in localStorage exists
function reRenderMessage(msg, time) {
  $(".common").css({ display: "none" });
  var div = document.createElement("div");
  div.innerHTML =
    "<span style='flex-grow:1'></span><span class='timestamp'>" +
    time +
    "</span><div class='chat-message message'>" +
    msg +
    "</div>";
  div.className = "chat-message-div";
  document.getElementById("chat-log").appendChild(div);
  updateScroll();
}

// Adds response from bot
function addResponse(msg) {
  hideTyping();
  if (msg === "") {
    msg = "The bot is offline.";
  }
  var div = document.createElement("div");
  div.innerHTML =
    "<span></span><div class='chat-message response'>" +
    msg +
    "</div><span class='timestamp response'>" +
    getTimestamp() +
    "</span>";
  div.className = "chat-message-div";
  document.getElementById("chat-log").appendChild(div);
  addToSession(2, msg, getTimestamp());
  updateScroll();
}

// Rerenders bot's message upon reopening chat box and if value in localStorage exists
function reRenderResponse(msg, time) {
  var div = document.createElement("div");
  div.innerHTML =
    "<span></span><div class='chat-message response'>" +
    msg +
    "</div><span class='timestamp response'>" +
    time +
    "</span>";
  div.className = "chat-message-div";
  document.getElementById("chat-log").appendChild(div);
  updateScroll();
}

// Adds response links from bot
function addLinks(msg) {
  var div = document.createElement("div");
  div.innerHTML =
    "<span></span><div class='response-links'>" +
    msg +
    "</div><span class='timestamp'>" +
    getTimestamp() +
    "</span>";
  div.className = "chat-message-div";
  document.getElementById("chat-log").appendChild(div);
  addToSession(2, msg, getTimestamp());
  updateScroll();
}

// Sets local variable "log" to either the value of localStorage if it exists or empty array if it doesn't
var log;
function getLog() {
  if (localStorage["chat-log"]) {
    log = JSON.parse(localStorage["chat-log"]);
  } else {
    log = [];
  }
}

getLog();

// Sets local variable "clientName" to either the value of localStorage if it exists or empty string if it doesn't
function getClientName() {
  if (localStorage["clientName"]) {
    clientName = JSON.parse(localStorage["clientName"]);
  } else {
    clientName = "";
  }
}

getClientName();

// Adds message/response to session
function addToSession(num, msg, time) {
  var message = {
    person: num,
    text: msg,
    time,
  };
  log.push(message);
  localStorage.setItem("chat-log", JSON.stringify(log));

  if (localStorage["chat-log"]) {
    console.log(JSON.parse(localStorage["chat-log"]));
  }
}

// Adds Client's Name to session
function addNameToSession(name){
  localStorage.setItem("clientName", JSON.stringify(name));
}

// Sends user's inquiry to server and retrieves response
function getResponse(msg) {
  function sendXHRRequest(url, data, e) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onload = function () {
      var response = JSON.parse(this.responseText);
      console.log("response: ", response);
      addResponse(response.ChatResponse);
      var links = "";
      if (response.ChatUrl.length > 0) {
        for (i = 0; i < response.ChatUrl.length; i++) {
          links += `<br><a class="linkButton" href="${response.ChatUrl[i].Item1}" target="_blank">${response.ChatUrl[i].Item2}</a><br>`;
        }
        links += `<br>`;
        addResponse(links);
      } else {
        console.log(false);
      }
    };
    // xhttp.send(JSON.stringify(data));
    xhttp.send(data);
  }
  // var apiUrl = "http://jamesbakerins.com/controls/handlers/iwbchatbot.ashx";
  var apiUrl = "https://www.jamesbakerins.com/iwbchatbot.json";
  sendXHRRequest(apiUrl, msg, null);
  // addResponse(msg);
}

$("#close-icon").click(function () {
  $("#close-icon").css({ display: "none" });
  $("#chat-icon").css({ display: "none" });
});

$("#chat-icon").mouseover(function () {
  $("#close-icon").css({ display: "flex" });
});

$("#close-icon").mouseover(function () {
  $("#close-icon").css({ display: "flex" });
});

$("#chat-icon").mouseout(function () {
  $("#close-icon").css({ display: "none" });
});

// Clears localStorage key "chat-log" on close of chat box
$("#close").click(function () {
  $(".chat-box").removeClass("open");
  $("#chat-icon").removeClass("hidden");
  localStorage.removeItem("chat-log");
  localStorage.removeItem("clientName");
  $(".prompt").css({ display: "block" });
  $(".chat-message-div").remove();
  console.log("log before: ", log);
  getLog();
  console.log("log after: ", log);
  minimizeOff();
  clientName = "";
});

$("#chat-icon").click(function (e) {
  e.preventDefault();
  $("#chat-icon").toggleClass("hidden");
  $(".chat-box").toggleClass("open");
});

$("#minimize").click(function() {
  toggleWindow();
})

function toggleWindow() {
  if($(".chat-title").hasClass("minimized")){
    $(".chat-title").removeClass("minimized");
    $(".chat-box").removeClass("minimized");
    $(".chat-main").removeClass("minimized");
    $(".chat-footer").removeClass("minimized");
  } else {
    $(".chat-title").addClass("minimized");
    $(".chat-box").addClass("minimized");
    $(".chat-main").addClass("minimized");
    $(".chat-footer").addClass("minimized");
  }
}

function minimizeOff(){
  if($(".chat-title").hasClass("minimized")){
    $(".chat-title").removeClass("minimized");
    $(".chat-box").removeClass("minimized");
    $(".chat-main").removeClass("minimized");
    $(".chat-footer").removeClass("minimized");
  }
}

function showTyping() {
  var div = document.createElement("div");
  div.innerHTML =
    "<span></span><div class='chat-message'><i class='fas fa-ellipsis-h'></i></div>";
  div.className = "chat-message-div typing";
  document.getElementById("chat-log").appendChild(div);
  updateScroll();
}

function hideTyping() {
  $(".typing").remove();
}

// Scrolls div to the bottom
function updateScroll() {
  var element = document.getElementById("chat-log");
  element.scrollTop = element.scrollHeight;
}

// Shows and hides scrollbar based on hover
$(".chat-log").hover(
  function () {
    $(".chat-log").addClass("show-scroll");
  },
  function () {
    $(".chat-log").removeClass("show-scroll");
  }
);

function getTimestamp() {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var d = new Date();
  var day = days[d.getDay()];
  var hr = d.getHours();
  var min = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  var ampm = "am";
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }
  var date = d.getDate();
  var month = months[d.getMonth()];
  var year = d.getFullYear();
  return hr + ":" + min + ampm;
}

