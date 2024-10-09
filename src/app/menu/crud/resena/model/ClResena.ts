export class ClResena{
    id: string;
    id_servicio: number;
    usuario: string;
    calificacion: number;
    comentario: string;
    fecha: string;

    constructor (obj: any){
        this.id = obj && obj.id || null
        this.id_servicio = obj && obj.id_servicio || null
        this.usuario = obj && obj.usuario || null
        this.calificacion = obj && obj.calificacion || null
        this.comentario = obj && obj.comentario || null
        this.fecha = obj && obj.fecha || null

    }        
}