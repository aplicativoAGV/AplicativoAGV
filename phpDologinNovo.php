

    <?php

        //include(config.php);
    #$info_login_agv = "SELECT * FROM usuarios";
    //sesseion_start() 
        #if(!isset($_SESSION['username'])){

           
           

            #if(isset($_POST['acao'])){
                //$username = 'pessoa1';
                //$password='123';
               

                #$nome = $_GET['nome'];
                #$senha = $_GET_senha['senha'];
                //$usernameForm = $_POST['username'];
                //$passwordForm = $_POST['password'];

                #if($username == $usernameForm && $password == $passwordForm){
                    // Logado com sucesso
                    #$_SESSION['username'] = $username;
                    #header('Location: botao.php');
                #}else{
                    // Ocorreu um problema ao logar
                #}
            #}

            #include('index_copy.php');
        #}else{
            #include('index_copy.php');
        #}

       
    session_start();
    // print_r($_REQUEST);
    if(isset($_POST['submit']) && !empty($_POST['ssb']) && !empty($_POST['senha']))
    {
        // Acessa
        include_once('config.php');
        $ssb = $_POST['ssb'];
        $senha = $_POST['senha'];

        // print_r('Email: ' . $email);
        // print_r('<br>');
        // print_r('Senha: ' . $senha);

        $sql = "SELECT * FROM usuario WHERE ssb  = '$ssb' and senha = '$senha'";

        $result = $con->query($sql);

        // print_r($sql);
        // print_r($result);



        if(mysqli_num_rows($result) < 1)
        {
            unset($_SESSION['ssb']);
            unset($_SESSION['senha']);
            header('Location: index.php');
        }
        else
        {
            $_SESSION['ssb'] = $ssb;
            $_SESSION['senha'] = $senha;
            header('Location: botao.php');
        }

    }
    else
    {
        // Não acessa
        header('Location: index.php');
    
    }
   
    ?>
    
