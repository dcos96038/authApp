export interface LoginData {
  correo: string;
  password: string;
}

export interface RegisterData {
  correo: string;
  password: string;
  nombre: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

export interface Usuario {
  correo: string;
  estado: boolean;
  google: boolean;
  nombre: string;
  rol: string;
  uid: string;
}
