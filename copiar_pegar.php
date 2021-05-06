function cortar($nombre,$ruta){
    shell_exec("mv $nombre $ruta");
}

function copiar($nombre,$ruta){
    shell_exec("cp -r $nombre $ruta");
}
