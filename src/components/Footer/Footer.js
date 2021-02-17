import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return(
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__info">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li><Link to="/" className="footer__link">Яндекс.Практикум</Link></li>
          <li><Link to="/" className="footer__link">Github</Link></li>
          <li><Link to="/" className="footer__link">Facebook</Link></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;