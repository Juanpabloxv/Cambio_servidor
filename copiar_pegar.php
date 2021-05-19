<?php
function cortar($nombre,$ruta){
    shell_exec("mv $nombre $ruta");
    echo 'ELemento fue cortado';
}

function copiar($nombre,$ruta){
    shell_exec("cp -r $nombre $ruta");
}
$cont = json_decode($_POST['sendFiles'], true);

echo $cont;


?>