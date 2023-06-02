import { Paginate } from "@models";

export interface Response {
  paginate?: Paginate;
  success?: string;
  data?: Array<any>;
  singleData?: any;
  Error?: string;
	statusCode: number;
};
