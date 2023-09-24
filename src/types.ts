export type AlbumType = {
  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  artworkUrl100: string;
  releaseDate: string;
  trackCount: number;
};

export type UserType = {
  name: string;
  email: string;
  image: string;
  description: string;
};

export const UserIni = {
  name: '',
  email: '',
  image: '',
  description: '',
};

export type SongType = {
  trackId: number,
  trackName: string,
  previewUrl: string,
};

export type MusicType = {
  artistId: number,
  artistName: string,
  collectionId: number,
  collectionName: string,
  collectionPrice: number,
  artworkUrl100: string,
  releaseDate: string,
  trackCount: number,
  trackId: number,
  trackName: string,
  previewUrl: string,
  wrapperType: string,
};
