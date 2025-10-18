// Station types
export interface StationMetadata {
  code: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  lat: number;
  lon: number;
  zip: string;
  _raw: unknown;
}

// Route station status types
export type StationStatus = 'scheduled' | 'departed' | 'arrived' | 'enroute';

export interface RouteStation {
  code: string;
  bus: boolean;
  arrivalActual: string | null;
  arrivalEstimated: string | null;
  arrivalScheduled: string | null;
  departureActual: string | null;
  departureEstimated: string | null;
  departureScheduled: string | null;
  status: StationStatus;
  timezone: string;
  station?: StationMetadata;
  _raw?: unknown;
}

// Train types
export interface Train {
  id: string;
  heading: string;
  number: number;
  route: string;
  stations: RouteStation[];
  _raw: unknown;
}

// Route types
export interface Route {
  route: string;
  trains: Train[];
}

// Raw API response types
export interface RawStationData {
  code: string;
  bus: boolean;
  tz: string;
  postdep?: string;
  schdep?: string;
  estdep?: string;
  postarr?: string;
  scharr?: string;
  estarr?: string;
}

export interface RawTrainData {
  ID: string;
  Heading: string;
  TrainNum: string;
  RouteName: string;
  [key: string]: string; // For Station1, Station2, etc. properties
}

export interface RawStationsApiResponse {
  StationsDataResponse?: {
    error?: {
      message: string;
    };
    features?: Array<{
      properties: {
        Code: string;
        StationName: string;
        Address1: string;
        Address2: string;
        City: string;
        State: string;
        lat: number;
        lon: number;
        Zipcode: string;
        [key: string]: unknown;
      };
    }>;
  };
}

export interface RawTrainsApiResponse {
  features: Array<{
    properties: RawTrainData;
  }>;
}

// Crypto module types
export interface CryptoInitializers {
  PUBLIC_KEY: string;
  CRYPTO_SALT: Buffer;
  CRYPTO_IV: Buffer;
}

// Site building types
export interface Delay {
  arrival: string | false;
  departure: string | false;
}

export interface Tag {
  text: string;
  bg: string;
  color: string;
}

export interface SiteStation extends RouteStation {
  name: string;
  arrivalKnown: boolean;
  departureKnown: boolean;
  delay: Delay;
  tag: Tag;
  dotColor: string;
  spacerColors: {
    before: string;
    after: string;
  };
  arrival: string;
  departure: string;
  info?: string;
}

export interface SiteTrain {
  route: string;
  number: number;
  filepath: string;
  url: string;
  info: string;
  status: string;
  trackColor: string;
  tag: Tag;
  stations: SiteStation[];
  from: string;
  to: string;
}

export interface SiteRoute {
  name: string;
  filepath: string;
  url: string;
  trains: SiteTrain[];
}

// Utility function types
export type FetchFunction = typeof global.fetch;
export type CryptoParseFunction = (data: string) => Promise<unknown>;
export type FilesystemModule = typeof import('node:fs/promises');

// Main function dependencies
export interface MainDependencies {
  fs?: FilesystemModule;
  getStations?: (options?: { cryptoParse?: CryptoParseFunction; fetch?: FetchFunction }) => Promise<StationMetadata[]>;
  getTrains?: (allStationMetadata: StationMetadata[], options?: { fetch?: FetchFunction; cryptoParse?: CryptoParseFunction }) => Promise<Train[]>;
}

// Get stations dependencies
export interface GetStationsDependencies {
  cryptoParse?: CryptoParseFunction;
  fetch?: FetchFunction;
}

// Get trains dependencies
export interface GetTrainsDependencies {
  fetch?: FetchFunction;
  cryptoParse?: CryptoParseFunction;
}