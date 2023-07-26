export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryType {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
}

export interface NewDiary extends DiaryType {
  comment: string;
}

export type ToPostDiary = Omit<NewDiary, 'id'>;
