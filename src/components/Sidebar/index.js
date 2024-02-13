import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import DashboardIcon from "../../assets/images/Dashboard.png";
import AnalyticsIcon from "../../assets/images/Analytics.png";
import RightArrowWhiteIcon from "../../assets/images/RightArrowWhite.png";
import { Dropdown } from "react-bootstrap";

const Sidebar = () => {
	return (
		<div className="sidebar-container">
			<div className="navlink-container">
				<NavLink to={"/dashboard"}>
					<img src={DashboardIcon} alt="Dashboard" />
					Dashboard
				</NavLink>

				<Dropdown>
					<Dropdown.Toggle className="action-container">
						<img src={AnalyticsIcon} alt="Analytics" />
						<div style={{ flexGrow: 1 }}>Analytics</div>
						<img src={RightArrowWhiteIcon} alt="RightArrow" />
					</Dropdown.Toggle>

					<Dropdown.Menu className="action-menu-container">
						<Dropdown.Item
							className="action-container action-menu"
							href="#/action-1"
						>
							<img src={AnalyticsIcon} alt="Analytics" />
							Add a connection
						</Dropdown.Item>
						<Dropdown.Item
							className="action-container action-menu"
							href="#/action-2"
						>
							<img src={AnalyticsIcon} alt="Analytics" />
							Saved connections
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</div>
	);
};

export default Sidebar;
