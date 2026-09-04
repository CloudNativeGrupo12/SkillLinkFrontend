export interface Region {
  id: number;
  nombre: string;
}

export interface Ciudad {
  id: number;
  nombre: string;
  regionId: number;
}

export interface Comuna {
  id: number;
  nombre: string;
  ciudadId: number;
}
