export interface Institution {
  _id        ?: string;
  name       ?: string;
  description?: string;
  url        ?: string;
  social     ?: string[],
  email      ?: string,
  logo       ?: string,
  status     ?: number
}