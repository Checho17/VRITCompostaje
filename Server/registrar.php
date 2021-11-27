<?php
include("con_db.php");

if ($conex){
    echo "Moviendonos con el corazon";
}

if (isset($_POST['register'])){
if (strlen($_POST['name']) >= 1 && strlen($_POST['email']) >= 1) {
    $name= trim($_POST['name']);
    $email= trim($_POST['email']);
    $fechareg= date("d/m/y");
    $consulta = "INSERT INTO datos( nombre, email, fecha-reg) VALUES ('$name','$email','$fechareg')";
    $resultado = mysqli_query($conex, $consulta);
    if ($resultado){
        ?>
        <h3 class="ok"> Te has registrado correctamente</h3>
        <?php
    }else{
        ?>
        <h3 class="bad"> Ups, ah ocurrido un error</h3>
        <?php
    } 
    
}   else{
        ?>
        <h3 class="bad"> Por favor complete todos los campos</h3>
        <?php
    }
}
?>