<?php
function cortar($nombre,$ruta){
    shell_exec("mv $nombre $ruta");
    echo 'ELemento fue cortado';
}

function copiar($nombre,$ruta){
    shell_exec("cp -r $nombre $ruta");
}
$cont = json_decode($_POST['sendFiles'], true);

foreach($cont as $files){
    if($files['hacer'] == 'copiar'){
        copiar($files['ruta_nombre'], $files['destino']);
    }
    else if($files['hacer'] == 'cortat'){
        cortar($files['ruta_nombre'], $files['destino']);
    }
}


?>