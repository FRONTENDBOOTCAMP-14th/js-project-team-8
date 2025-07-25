import { initDashboard } from './pages/Dashboard/Dashboard';
import { initWrite } from './pages/Write/Write';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
  initWrite();
});
