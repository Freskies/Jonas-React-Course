import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";
import Logo from "../pages/Logo.jsx";
import AppNav from "./AppNav.jsx";

export default function Sidebar () {
	return <div className={styles.sidebar}>
		<Logo/>
		<AppNav/>
		<Outlet/>
		<footer className={styles.footer}>
			<p className={styles.copyright}>
				&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
			</p>
		</footer>
	</div>;
};