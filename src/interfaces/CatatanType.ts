export type Catatan = {
  id: number;
  userId: number;
  judul: string;
  tanggal: Date;
  isi: string;
  publik: boolean;
}

export default Catatan;