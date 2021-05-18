<?php
function cambiarNombre($viejo,$nuevo,$ruta){
    shell_exec("mv $ruta/$viejo $ruta/$nuevo");
    echo 'el nombre fue cambiado de';
}

#Funcion para cambiar los propietarios
function cambiarPropietario($ruta,$nombreDocumento,$nuevoPropietario){
    shell_exec("sudo chown $nuevoPropietario $ruta/$nombreDocumento");
    echo 'Se ha cambiado de usario';
}

#Función para cambiar los permisos
function cambiarPermisos($ruta,$nombreDocumento,$nuevosPermisos){
    shell_exec("sudo chmod $nuevosPermisos $ruta/$nombreDocumento");
    echo "Se cambiado los permisos";
}

$nuevo = $_POST['nuevo'];
$viejo = $_POST['nombre'];
$ruta = $_POST['ruta'];
$tipo = $_POST['tipo'];



if($tipo == 'Cambiar_Nombre'){
    cambiarNombre($viejo,$nuevo, $ruta);
}
elseif($tipo == 'Cambiar_permiso'){
    cambiarPermisos($ruta,$viejo,$nuevo);
}
elseif($tipo == 'Cambiar_Propietario'){
    cambiarPropietario($ruta, $viejo, $nuevo);
}
?>