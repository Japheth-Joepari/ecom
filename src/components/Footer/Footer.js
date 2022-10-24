import styles from "./Footer.modules.scss";
const getYear = new Date().getFullYear();

const Footer = () => {
  return <div className="footer">&copy; {getYear} All right reserved</div>;
};
export default Footer;
