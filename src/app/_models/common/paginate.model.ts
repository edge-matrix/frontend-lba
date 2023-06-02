import { Link } from '@models';

export interface Paginate {
  data: Array<any>;
  links: Array<Link>;
  last_page?: number;
};
