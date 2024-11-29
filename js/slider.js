function initComparisons() {
    var overlays = document.getElementsByClassName("img-comp-overlay");
    for (let i = 0; i < overlays.length; i++) {
      compareImages(overlays[i]);
    }
    function compareImages(img) {
      let slider, clicked = false, startX, startWidth;

      img.style.clip = `rect(0px, ${img.offsetWidth /2 }px, ${img.offsetHeight}px, 0px)`;
      slider = document.createElement("DIV");
      slider.setAttribute("class", "img-comp-slider");
      img.parentElement.insertBefore(slider, img);
      slider.style.left = `${img.offsetWidth / 2}px`;
      slider.style.top = `${img.offsetHeight / 2}px`; // Centra verticalmente
      slider.style.transform = "translate(-50%, -50%)";
      slider.addEventListener("mousedown", slideReady);
      window.addEventListener("mouseup", slideFinish);
      window.addEventListener("mousemove", slideMove);

      slider.addEventListener("touchstart", slideReady);
      window.addEventListener("touchend", slideFinish);
      window.addEventListener("touchmove", slideMove);

      function slideReady(e) {
        e.preventDefault();
        clicked = true;
        startX = getCursorPos(e);
        startWidth = parseFloat(img.style.clip.split(",")[1]);
      }

      function slideFinish() {
        clicked = false;
      }

      function slideMove(e) {
        if (!clicked) return;
        let pos = getCursorPos(e);
        let newWidth = Math.max(0, Math.min(img.offsetWidth, startWidth + (pos - startX)));
        img.style.clip = `rect(0px, ${newWidth}px, ${img.offsetHeight}px, 0px)`;
        slider.style.left = `${newWidth}px`;
      }

      function getCursorPos(e) {
        let rect = img.parentElement.getBoundingClientRect();
        return (e.touches ? e.touches[0].pageX : e.pageX) - rect.left;
      }
    }
  }
  window.onload = initComparisons;

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}