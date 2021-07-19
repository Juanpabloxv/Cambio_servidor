<?php
function cortar($nombre,$ruta){
    echo 'ELemento fue cortado';
    shell_exec("mv $nombre $ruta");
    
}
function copiar($nombre,$ruta){
   echo "Elemento fue copiado"; 
   shell_exec("cp -r $nombre $ruta");
   
}
if (isset($_POST['sendFiles'])){
    $cont = $_POST['sendFiles'];
    var_dump($_POST["sendFiles"][0]["ruta_nombre"]);    
    var_dump($cont);    
    foreach($cont as $files){
        if($files['hacer'] == 'copiar'){
            copiar($files['ruta_nombre'], $files['destino']);
        }
        else if($files['hacer'] == 'cortar'){
            cortar($files['ruta_nombre'], $files['destino']);
        }
        else echo "No hice nada :(";
    }
}else echo "No tengo nada en POST";
?>
