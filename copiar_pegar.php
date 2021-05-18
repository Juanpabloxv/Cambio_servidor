<?php
function cortar($nombre,$ruta){
    shell_exec("mv $nombre $ruta");
    echo 'ELemento fue cortado';
}

function copiar($nombre,$ruta){
    shell_exec("cp -r $nombre $ruta");
}
$ruta = $_POST['ruta_nombre'];
$Destino = $_POST['destino'];
$hacer = $_POST['hacer'];

if ($hacer == 'copiar'){
    copiar($Destino, $ruta);
}elseif($hacer == 'cortar'){
    cortar($Destino, $ruta);
}


?>