import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import DashboardIcon from "../../assets/images/Dashboard.png";
import AnalyticsIcon from "../../assets/images/Analytics.png";

const Sidebar = () => {
	return (
		<div className="sidebar-container">
			<div className="navlink-container">
				<NavLink to={"/dashboard"}>
					<img src={DashboardIcon} alt="Dashboard" />
					Dashboard
				</NavLink>
				<NavLink to={"/analytics"}>
					<img src={AnalyticsIcon} alt="Analytics" />
					Analytics
				</NavLink>
			</div>
		</div>
	);
};

export default Sidebar;
