export class ClUsuario {
    id: string | null = null;
    nombre: string | null = null;
    correo: string | null = null;
    contrasena: string | null = null;
    foto_perfil: string | null = null;
    fecha_registro: string | null = null;
    favoritos?: number[]; // Propiedad opcional
  
    constructor(obj: any) {
      this.id = obj && obj.id || null;
      this.nombre = obj && obj.nombre || null;
      this.correo = obj && obj.correo || null;
      this.contrasena = obj && obj.contrasena || null;
      this.foto_perfil = obj && obj.foto_perfil || null;
      this.fecha_registro = obj && obj.fecha_registro || null;
      this.favoritos = obj && obj.favoritos || [];
    }
  }
  