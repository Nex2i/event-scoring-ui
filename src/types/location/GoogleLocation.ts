export interface GoogleLocation {
  placeId: string;
  dataId: string;
  isSap: boolean;
  reviewHistory: ReviewHistory[];
}

export interface ReviewHistory {
  asOfDate: number;
  serpReviewUrl: string;
  rawHtmlUrl: string;
  numberOfReviews: number;
  rating: number;
  newReviews: number;
  reviewSnapshot: SerpReviews;
}

export interface SerpReviews extends SerpResponse {
  topics: SerpTopics[];
  reviews: SerpReview[];
}

export interface SerpReview {
  link: string;
  user: SerpGoogleUser;
  rating: number;
  date: string;
  summary: string;
  snippet: string;
  response: SerpReviewResponse;
}

export interface SerpTopics {
  keyword: string;
  id: string;
  mentions: number;
}

export interface SerpGoogleUser {
  name: string;
  link: string;
  thumbnail: string;
  numberOfReviews: number;
}

export interface SerpReviewResponse {
  date: string;
  snippet: string;
}

export interface SerpResponse {
  searchMetaData: SerpSearchMetaData;
  searchParameters: SerpSearchParameters;
  searchInformation: SerpSearchInformation;
  placeInfo: SerpPlaceInfo;
  pagination: SerpPagination;
}

export interface SerpPlaceInfo {
  reviews: number;
  rating: number;
}

export interface SerpSearchMetaData {
  jsonUrl: string;
  rawHtmlUrl: string;
}

export interface SerpSearchParameters {}

export interface SerpSearchInformation {}

export interface SerpPagination {
  next: string;
  nextPageToken: string;
}
