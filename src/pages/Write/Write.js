import './Write.css';

import { Sidebar } from '../../components/Sidebar/Sidebar';
import { BookItem } from '../../components/BookItem/BookItem';

export function initWrite() {
  const write = document.querySelector('#write');

  write.prepend(Sidebar({}));
}
