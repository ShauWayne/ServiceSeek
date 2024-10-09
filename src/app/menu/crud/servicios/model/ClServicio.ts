export class ClServicio{
    id: string;
    nombre: string;
    tipo: string;
    ubicacion: string;
    direccion: string;
    descripcion: string;
    telefono: string;
    horario: string;
    calificacion: number;
    num_resenas: number;

    constructor (obj: any){
        this.id = obj && obj.id || null
        this.nombre = obj && obj.nombre || null
        this.tipo = obj && obj.tipo || null
        this.ubicacion = obj && obj.ubicacion || null
        this.direccion = obj && obj.direccion || null
        this.descripcion = obj && obj.descripcion || null
        this.telefono = obj && obj.telefono || null
        this.horario = obj && obj.horario || null
        this.calificacion = obj && obj.calificacion || null
        this.num_resenas = obj && obj.num_resenas || null
    }        
}