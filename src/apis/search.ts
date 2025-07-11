import axios, { AxiosResponse } from "axios";

type GetSearchParamsT = {
  term: string;
  media: string;
};

type ResultItemT = {
  wrapperType: string
  kind: string
  collectionId: number
  trackId: number
  artistName: string
  collectionName: string
  trackName: string
  collectionCensoredName: string
  trackCensoredName: string
  collectionViewUrl: string
  feedUrl: string
  trackViewUrl: string
  artworkUrl30: string
  artworkUrl60: string
  artworkUrl100: string
  collectionPrice: number;
  trackPrice: number;
  collectionHdPrice: number;
  releaseDate: string
  collectionExplicitness: string
  trackExplicitness: string
  trackCount: number;
  trackTimeMillis: number
  country: string
  currency: string
  primaryGenreName: string
  contentAdvisoryRating: string
  artworkUrl600: string
  genreIds: string[];
  genres: string[];
};

export type GetSearchAxiosResponseT = {
  data: {
    resultCount: number;
    results: ResultItemT[];
  };
};

export type HTTPValidationError = {
  status: number;
  error: string;
};

export const getSearch = (
  params: GetSearchParamsT
): Promise<AxiosResponse<GetSearchAxiosResponseT, HTTPValidationError>> => {
  const queries = new URLSearchParams(params).toString();
  return axios.get<GetSearchAxiosResponseT>(`/api/search?${queries}`);
};
