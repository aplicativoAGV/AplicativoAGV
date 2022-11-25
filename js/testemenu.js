window.onload = start();

function sair(){
    
    logout = document.getElementById("logout-popup");

    if (logout.style.opacity == "0"){
        logout.style.opacity = "1";
        logout.style.transition = "1s";
    }else{
        logout.style.opacity = "0";
        logout.style.transition = "1s";

    }
}


function circSelecionado(){
    
  circ = document.getElementById("circ-seleciona1");

  if (circ.style.opacity == "0"){
      circ.style.opacity = "1";
      circ.style.transition = "1s";
  }else{
      circ.style.opacity = "0";
      circ.style.transition = "1s";

  }
}

function circSelecionado2(){
    
  circ = document.getElementById("circ-seleciona2");

  if (circ.style.opacity == "0"){
      circ.style.opacity = "1";
      circ.style.transition = "1s";
  }else{
      circ.style.opacity = "0";
      circ.style.transition = "1s";

  }
}


function circSelecionado3(){
    
  circ1 = document.getElementById("circ-seleciona1");
  circ = document.getElementById("circ-seleciona3");

  if (circ.style.opacity == "0"){
      circ.style.opacity = "1";
      circ1.style.opacity = "0";
      circ.style.transition = "1s";
  }else{
      circ.style.opacity = "0";
      circ1.style.opacity = "1";
      circ.style.transition = "1s";
  }

}


function circSelecionado4(){

  circ = document.getElementById("circ-seleciona4");

  if (circ.style.opacity == "0"){
      circ.style.opacity = "1";
      circ.style.transition = "1s";
  }else{
      circ.style.opacity = "0";
      circ.style.transition = "1s";
  }
}

          function start(){
            circSelecionado3();
            circSelecionado4();
            sair();
          }

