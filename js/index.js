//efeito de opacidade do video

 var delay_popuop = 5000;

 setTimeout("document.getElementById('blur').style.opacity='1'",delay_popuop);
 setTimeout("document.getElementById('blur').style.transition='3s'");

//função que faz o movimento dos elementos pra aparecer os cmapos de login
    function move()
    {
        logo = document.getElementById("logo-popup");
        div = document.getElementById("blur");
        btn = document.getElementById("click");
        form = document.getElementById("login"); 
       
        logo.style.width = "60%";
        logo.style.left = "21%";
        logo.style.top = "30px";

        div.style.height = "480px";
        div.style.top = "170px";

        btn.style.top = "79%";

        setTimeout("document.getElementById('login').style.opacity='1'",1000);

        setTimeout("document.getElementById('div-log').style.opacity='1'",2500);
    }