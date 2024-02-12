import "./Header.css";
import AvatarIcon from "../../assets/images/Avatar.png";
import DownArrowIcon from "../../assets/images/DownArrow.png";
import SearchIcon from "../../assets/images/Search.png";
import BellIcon from "../../assets/images/Bell.png";

const Header = () => {
	return (
		<div className="header-container">
			<div className="icons-container">
				<img src={SearchIcon} alt="Search" />
				<img src={BellIcon} alt="Bell" />
				<img src={AvatarIcon} alt="Avatar" />
				<img src={DownArrowIcon} alt="Down arrow" />
			</div>
		</div>
	);
};

export default Header;
