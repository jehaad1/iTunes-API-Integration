export type TrackType = {
  trackId: number;
  artworkUrl100: string;
  trackName: string;
  shortDescription?: string;
};

export type StoredTrackType = TrackType & {
  lists: string[];
};

export type ListType = {
  listId: string;
  name: string;
};
