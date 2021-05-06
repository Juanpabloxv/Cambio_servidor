
<?php 
    #Funcion para crear los directorios
    function crearDirectorio($directorio,$ruta){
        if (!is_dir($directorio)) {
            shell_exec("mkdir $ruta/$directorio");
            shell_exec("chmod 777 $ruta/$directorio");
            shell_exec("sudo chown creador $ruta/$directorio");
            echo 'Carpeta creada';
            
        }
        else{
            echo "<h1>Ya existe el directorio</h1>";
        }
    }
    #Funcion para crear los archivos
    function crearArchivo($archivo,$ruta){
        if (!is_file($archivo)) {
            shell_exec("touch $ruta/$archivo");
            shell_exec("chmod 777 $ruta/$archivo");
            shell_exec("sudo chown creador $ruta/$archivo");
            echo 'Archivo creado';
        }
        else{
            echo "<h1>Ya existe el archivo</h1>";
        }
    }

    $ruta = $_POST['ruta'];
    $name = $_POST['name'];
    $tipo = $_POST['tipo'];

    if($tipo == 'archivo'){
        crearArchivo($name, $ruta);
    }else{
        crearDirectorio($name, $ruta);
    }


?>
