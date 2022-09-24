export interface Course {
  _id        ?: string;
  institution?: string;
  name       ?: string;
  description?: string;
  image      ?: string;
  price      ?: number;
  currency   ?: string;
  start      ?: string;
  duration   ?: string;
  schedule   ?: string;
  url        ?: string;
}