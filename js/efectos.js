// JavaScript Document
function initComparisons() {
    var overlays = document.getElementsByClassName("img-comp-overlay");
    for (let i = 0; i < overlays.length; i++) {
      compareImages(overlays[i]);
    }

    function compareImages(img) {
      let slider, clicked = false, startX, startWidth;

      // Configura el ancho inicial del recorte
      img.style.clip = `rect(0px, ${img.offsetWidth / 2}px, ${img.offsetHeight}px, 0px)`;

      // Crea el deslizador
      slider = document.createElement("DIV");
      slider.setAttribute("class", "img-comp-slider");
      img.parentElement.insertBefore(slider, img);

      // Posiciona el deslizador en el centro inicial
      slider.style.left = `${img.offsetWidth / 2}px`;
      slider.style.top = `${img.offsetHeight / 2}px`; // Centra verticalmente
      slider.style.transform = "translate(-50%, -50%)";

      // Agrega eventos para mover el deslizador
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

        // Ajusta el recorte de la imagen superpuesta
        img.style.clip = `rect(0px, ${newWidth}px, ${img.offsetHeight}px, 0px)`;

        // Ajusta la posición del deslizador
        slider.style.left = `${newWidth}px`;
      }

      function getCursorPos(e) {
        let rect = img.parentElement.getBoundingClientRect();
        return (e.touches ? e.touches[0].pageX : e.pageX) - rect.left;
      }
    }
  }

  window.onload = initComparisons;


//MODAL

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// Agregar un evento a cada botón para abrir el modal correspondiente
document.querySelectorAll('.btn-sm2').forEach(function(button) {
  button.addEventListener('click', function(event) {
    // Obtener el ID del modal desde el atributo data-modal del botón
    var modalId = event.target.getAttribute('data-modal');
    
    // Obtener el modal correspondiente
    var modal = document.getElementById(modalId);
    
    // Seleccionar el párrafo del modal para cambiar su contenido
    var modalContent = modal.querySelector('.modal-content p');
    
    // Cambiar el contenido según el ID del modal
    if (modalId === 'myModal1') {
      modalContent.textContent = 'Visitas escolares';
    } else if (modalId === 'myModal2') {
      modalContent.textContent = 'Visitas para nuestra comunidad';
    } else if (modalId === 'myModal3') {
      modalContent.textContent = 'Visitas dramatizadas';
    } else if (modalId === 'myModal4') {
      modalContent.textContent = 'Visitas virtuales';
    } else if (modalId === 'myModal5') {
      modalContent.textContent = 'Visitas privadas y empresariales';
    }
    
    // Mostrar el modal
    modal.style.display = 'block';
  });
});

// Agregar un evento de cierre a todos los botones de cierre (la "X")
document.querySelectorAll('.close').forEach(function(closeButton) {
  closeButton.addEventListener('click', function() {
    // Obtener el modal más cercano al botón de cierre
    var modal = closeButton.closest('.modal');
    
    // Cerrar el modal
    if (modal) {
      modal.style.display = 'none';
    }
  });
});

// Cerrar el modal si se hace clic fuera de él
window.addEventListener('click', function(event) {
  document.querySelectorAll('.modal').forEach(function(modal) {
    // Si el clic fue fuera del contenido del modal, cerramos el modal
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

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
//PORTAFOLIO CON FILTRO
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}