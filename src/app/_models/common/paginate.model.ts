import { Link } from '@models';

export interface Paginate {
  total?: number;
  data: Array<any>;
  links: Array<Link>;
  last_page?: number;
};
