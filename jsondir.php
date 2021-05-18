<?php

#ejecuta el comando ls de linux y lo convierte en lista
function listar($ruta){
    $listaLinux = shell_exec("ls ".$ruta);
    $lista=preg_split('/[\r\n]+/',$listaLinux);
    unset($lista[count($lista)-1]);

    
    $listaConTipo=array();

    #Se distingue si es u archivo o directorio para posteriormente almacenarlo en el
    #arreglo
    foreach($lista as $elemento){
        $propietario = shell_exec("stat -c %U $ruta/$elemento");
        $permisos = shell_exec("stat -c %a $ruta/$elemento");

        if(is_file("$ruta/$elemento")){
            $listaConTipo[]=array(
                'name' => $elemento,
                'tipo' => 'archivo',
                'propietario' => $propietario,
                'permiso' => $permisos     
            );
        }
        elseif(is_dir("$ruta/$elemento")){
            $listaConTipo[]=array(
                'name' => $elemento,
                'tipo' => 'carpeta',
                'propietario' => $propietario,
                'permiso' => $permisos     
            );
        }

    }

    $jsonstring = json_encode($listaConTipo);
    echo $jsonstring;
    #if(is_file("$ruta/$lista[0]")){
    #    return $lista;
    #}
    
}
$ruta = $_POST['ruta'];
listar($ruta)
?>