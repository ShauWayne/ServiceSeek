export class ClUsuario{
    id: string;
    nombre: string;
    correo: string;
    contrasena: string;
    foto_perfil: string;
    fecha_registro: string;


    constructor (obj: any){
        this.id = obj && obj.id || null
        this.nombre = obj && obj.nombre || null
        this.correo = obj && obj.correo || null
        this.contrasena = obj && obj.contrasena || null
        this.foto_perfil = obj && obj.foto_perfil || null
        this.fecha_registro = obj && obj.fecha_registro || null
    }
}