import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./MainLayout.css";

const MainLayout = (props) => {
	return (
		<div className="d-flex w-auto">
			<Sidebar />
			<div className="main-layout-container">
				<Header />
				{props.children}
			</div>
		</div>
	);
};

export default MainLayout;
