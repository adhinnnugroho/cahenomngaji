export interface Doa {
    id: number;
    doa: string;
    ayat: string;
    latin: string;
    artinya: string;
}

export interface DoaDetail {
    id: number;
    judul: string;
    arab: string;
    latin: string;
    indo: string;
}

export type DoaCategory = string;
