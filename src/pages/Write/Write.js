import './Write.css';

import { Sidebar } from '../../components/Sidebar/Sidebar';
import { BookItem } from '../../components/BookItem/BookItem';

document.addEventListener('DOMContentLoaded', initWrite);

function initWrite() {
  const write = document.querySelector('#write');

  write.prepend(Sidebar({}));
}
