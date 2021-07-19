
$(function(){
     //Inicializá el tablero
     let stack = []
     let ruta =  localStorage.getItem("raiz")? localStorage.getItem("raiz"): 'raiz'; 
     $('#ruta').attr('value',ruta)
     $('#rutaID').text(ruta)

     console.log(ruta)
     reloadApp(ruta)



     //Se crean los documentos
     $('#crearArchivos').submit(e => {
        ruta = $('#rutaID').text()
        e.preventDefault();
        
	const postData = {
            ruta : $('#ruta').val(),
            name : $('#nombre').val(),
            tipo : $('#tipo').val()
        };
        console.log(postData)
	$.post('crear.php', postData, (response)=>{
            $('#crearArchivos').trigger('reset');
            console.log(response)
            reloadApp(ruta);
            
        })
    })

    //render stack
    function renderStack(data){
        console.log('Renderiando stack')
        let template = ''
        data.forEach( elem =>{
           template += `
           <tr ID=${elem.id}>
                <td>${elem.nombre}</td>
                <td>${elem.ruta}</td>
                <td>${elem.hacer}</td>
                <td><button class="elem-delete-stack btn btn-danger" title="eliminar"><i class="fas fa-minus"></i></button></td>
            </tr>
            `
    })
    $('#StackTable').html(template)
    }


    //Se extrae los documentos
    function reloadApp(ruta='raiz'){
        $.post('jsondir.php', {ruta}, (response) => {
            if(!response.error){
                let arcDir = JSON.parse(response);
                console.log('Extración de archivos fue un éxito');
                let template = ''
                arcDir.forEach(elem =>{
                  
                    let tipe_element = elem.tipo === 'carpeta' ? `<a id="OpenCarpeta" href="#" class="elem-next">${elem.name}</a>`:`${elem.name}`
                    template += ` <tr nombreID="${elem.name+"/"+elem.tipo}"> 
                    <td>${tipe_element}</td>
                    <td>${elem.propietario}</td>
                    <td>${elem.permiso}</td>
                    <td>${elem.tipo}</td>
                    <td>
                        <button class="elem-delete btn btn-danger" title="eliminar"><i class="fas fa-trash-alt"></i></button>
                        <button class="elem-edit btn btn-success" title="editar" type="submit"><i class="far fa-edit"></i></button>
                        <button class="elem-perm btn btn-info" title="permisos" type="submit"><i class="far fa-user"></i></button>
                        <button class="elem-user btn btn-warning" title="informacion" type="submit"><i class="fas fa-question-circle"></i></button>
                        <button class="elem-plus btn btn-success" title="agg stack"><i class="fas fa-plus"></i></button>
                    </td>          
                </tr>`;
                });
                $('#idRenderElem').html(template)
            }
        })
    }

    //Eliminar un documento
    $(document).on('click', '.elem-delete', (e)=>{
        if(confirm('¿Estas seguro que quieres eliminarlo?')){
            let element = $(this)[0].activeElement.parentElement.parentElement;
            const value = $(element).attr('nombreID').split('/');
            const nombre = value[0]
            const tipo = value[1]

            console.log(nombre, tipo);
            var ruta = $('#rutaID').text();
             let postData ={
                elemento:nombre,
                ruta:ruta,
                tipo: tipo,
            }
            $.post('eliminar.php', postData,(response)=>{
                if(!response.error){
                    console.log(response)
                    reloadApp(ruta)
                }
            })
            
        }
    })

    //Estos van cambiar.php
    //Cambio de nombre del usuario
    $(document).on('click', '.elem-user', (e)=>{
        let element = $(this)[0].activeElement.parentElement.parentElement;
        const nombre = $(element).attr('nombreID').split('/')[0]; //se estrae el nombre del id
        ruta = $('#rutaID').text();

        $('#modalChangeProp').modal('toggle');

        $('#form-change-prop').submit(e => {
            e.preventDefault();
            let nuevo_propietario = $('#change-user').val();
          
            const postData = {
                nuevo : nuevo_propietario,
                nombre : nombre,
                ruta : ruta,
                tipo: 'Cambiar_Propietario'
            };
        	console.log(postData)   
	 $.post('cambiar.php', postData, (response)=>{
                console.log(response)
                console.log(response)
                $('#form-change-prop').trigger('reset');
                $('#modalChangeProp').modal('toggle');
                location.reload();
                
                
            })
            
        })
    }) 


    //Cambiar permisos
    $(document).on('click', '.elem-perm', (e)=>{

        console.log('Entré')
        let element = $(this)[0].activeElement.parentElement.parentElement;
        const nombre = $(element).attr('nombreID').split('/')[0];
         //se estrae el nombre del id
        ruta = $('#rutaID').text();
      
        $('#modalChangePer').modal('toggle');

        $('#form-change-per').submit(e => {
            e.preventDefault();
            let perPropietario = $('#NumPropietario').val();
            let perGrupo = $('#NumGrupo').val();
            let perOtros = $('#NumOtros').val();
           
            let nuevo_persimo = `${perPropietario}${perGrupo}${perOtros}`

    
            if(parseInt(nuevo_persimo.length) === 3){
               
		const postData = {
                    nuevo : nuevo_persimo,
                    nombre : nombre,
                    ruta : ruta,
                    tipo: 'Cambiar_permiso'
                };
		console.log(postData);
                $.post('cambiar.php', postData, (response)=>{
                    $('#form-change-per').trigger('reset');
                    $('#modalChangePer').modal('toggle');
                    console.log(response)
                   location.reload();
                })
            }
            
        })
    })


    //Cambio de nombre al elemento
    $(document).on('click', '.elem-edit', (e)=>{
        let element = $(this)[0].activeElement.parentElement.parentElement;
        const nombre = $(element).attr('nombreID').split('/')[0]; //se estrae el nombre del id
        ruta = $('#rutaID').text();


        $('#modalEdit').modal('toggle');

        $('#formEditId').submit(e => {
            e.preventDefault();
            let nuevo_nombre = $('#NuevoNombre').val();
            console.log(nuevo_nombre.length)
            if(parseInt(nuevo_nombre.length) !== 0){
                const postData = {
                    nuevo : nuevo_nombre,
                    nombre : nombre,
                    ruta : ruta,
                    tipo: 'Cambiar_Nombre'
                };
		console.log(postData);
                
                $('#formEditId').trigger('reset');
                $.post('cambiar.php', postData, (response)=>{
                    $('#formEditId').trigger('reset');
                    $('#modalEdit').modal('toggle');
                location.reload();
                   
               
                })
            }
            
        })
    })

    //abrir carpeta 
    $(document).on('click', '.elem-next',(e)=>{ 
        let element = $(this)[0].activeElement.parentElement.parentElement;
        const nombre = $(element).attr('nombreID').split('/')[0]; //se estrae el nombre del id
        ruta = $('#rutaID').text(); 
        ruta = `${ruta}/${nombre}` ;
        //localStorage.setItem('ruta', ruta);
        $('#rutaID').text(`${ruta}`);
        $('#ruta').attr('value',`${ruta}`);
        
        reloadApp(ruta)
    })


    //volver
    $('#volver').click((e)=>{
        ruta = $('#rutaID').text();
        if(ruta === 'raiz'){
            $('#rutaID').text(`${ruta}`);
            $('#ruta').attr('value',`${ruta}`);
            reloadApp(ruta)  
        }else{
            ruta =  $('#rutaID').text().split("/")
            ruta.pop()
            ruta = ruta.join('/')
            console.log(ruta)
            //localStorage.setItem('ruta', ruta);
            $('#rutaID').text(`${ruta}`);
            $('#ruta').attr('value',`${ruta}`);
            reloadApp(ruta)
        }
       
    })

    //Agregar a la pila
     //agregar elementos al stack
     $(document).on('click', '.elem-plus',(e)=>{ 
        let element = $(this)[0].activeElement.parentElement.parentElement;
        const IDelement = $(element).attr('nombreID').split('/'); //se estrae el nombre del id
        
        let nombre = IDelement[0];
        let tipo = IDelement[1];
        ruta = $('#rutaID').text(); 
        let hacer = $('#IdHacer').val()

        let elementExist = stack.filter(elem => elem.nombre === nombre && elem.tipo === tipo && elem.ruta === ruta)
        
        if(elementExist.length === 0){
            let data = {
                id : stack.length,
                nombre : nombre,
                ruta : ruta,
                hacer : hacer,
                tipo:  tipo
            }      
            
            stack.push(data)
            renderStack(stack)
        }
    })

    //Eliminar un elemento del stack
    $(document).on('click', '.elem-delete-stack', (e)=>{
        let element = $(this)[0].activeElement.parentElement.parentElement;
        let id =  parseInt($(element).attr('ID'));
        stack = stack.filter(elem => elem.id !== id)
        renderStack(stack)
    })

    $('#IdPegar').click((e)=>{
        if(stack.length>0){
            let ruta_destino = $('#rutaID').text();
            let sendFiles = []

            stack.forEach(elem =>{
                let nombre = elem.nombre;
                let ruta_antigua = elem.ruta;
                let hacer = elem.hacer

                let postData = {
                    ruta_nombre : `${ruta_antigua}/${nombre}`,
                    destino: ruta_destino,
                    hacer: hacer

                }
                sendFiles.push(postData)
            })
            stack = []

            $.post('copiar_pegar.php', {sendFiles}, (response) => {
                console.log('Respuesta copiar y pegar')
                console.log(response)
                localStorage.setItem("ruta", ('#rutaID').text())
                location.reload()
            })
        }
       
    })
})
