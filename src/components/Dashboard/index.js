import MainLayout from "../../layouts/MainLayout";
import "./Dashboard.css";
import ReportButtonArrowIcon from "../../assets/images/ReportButtonArrow.png";
import RightBlackArrowIcon from "../../assets/images/RightBlackArrow.png";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const Dashboard = () => {
	const initialAllocatedValues = [9500, 8000, 10000, 10000, 17000];
	const initialNonAllocatedValues = [8500, 8000, 9500, 10000, 12500];
	const [allocatedValues, setAllocatedValues] = useState(
		initialAllocatedValues
	);
	const [nonAllocatedValues, setNonAllocatedValues] = useState(
		initialNonAllocatedValues
	);
	const [selectedRows, setSelectedRows] = useState([]);

	const resources = [
		{ heading: "Overall Resources", count: "80,000" },
		{ heading: "Daily Average", count: "24,512" },
		{ heading: "Allocations", count: "47,833" },
		{ heading: "Yet to Allocate", count: "12,245" },
	];

	const resourceTableHeadings = [
		"Resource ID",
		"Days",
		"Metrics",
		"Allocation ID",
	];

	const availableResources = [
		{
			id: "12111",
			day: "Monday",
			metrics: 25000,
			allocationId: "#141312",
		},
		{
			id: "12112",
			day: "Tuesday",
			metrics: 32000,
			allocationId: "#141313",
		},
		{
			id: "12113",
			day: "Wednesday",
			metrics: 12000,
			allocationId: "#141314",
		},
		{
			id: "12114",
			day: "Thursday",
			metrics: 14000,
			allocationId: "#141315",
		},
		{
			id: "12115",
			day: "Friday",
			metrics: 22000,
			allocationId: "#141316",
		},
		{
			id: "12116",
			day: "Saturday",
			metrics: 17000,
			allocationId: "#141317",
		},
	];

	const options = {
		plugins: {
			title: {
				display: false,
				text: "Chart.js Bar Chart - Stacked",
			},
		},
		responsive: true,
		scales: {
			x: {
				stacked: true,
				grid: {
					color: "rgba(0,0,0,0.03)",
				},
			},
			y: {
				stacked: true,
				grid: {
					color: "rgba(0, 0, 0, 0.03)",
				},
				ticks: {
					stepSize: 15000,
					callback: function (value, index, values) {
						return [0, 15000, 30000].includes(value)
							? value.toLocaleString()
							: "";
					},
				},
			},
		},
	};

	const labels = ["MON", "TUE", "WED", "THU", "FRI"];

	const data = {
		labels,
		datasets: [
			{
				label: "Allocated",
				data: allocatedValues,
				backgroundColor: "#48B482",
				borderRadius: 10,
				barPercentage: 0.6,
			},
			{
				label: "Not Allocated",
				data: nonAllocatedValues,
				backgroundColor: "#E3FCEC",
				borderRadius: 10,
				barPercentage: 0.6,
			},
		],
	};

	const rowClickHandler = (resource, index) => {
		if (
			index <= allocatedValues.length - 1 &&
			index <= nonAllocatedValues.length - 1
		) {
			let currentSelectedRows = [...selectedRows];
			if (!currentSelectedRows.includes(resource.id)) {
				currentSelectedRows.push(resource.id);
			} else {
				currentSelectedRows = currentSelectedRows.filter(
					(selectedRow) => selectedRow !== resource.id
				);
			}
			setSelectedRows([...currentSelectedRows]);
			if (!currentSelectedRows.length) {
				setAllocatedValues(initialAllocatedValues);
				setNonAllocatedValues(initialNonAllocatedValues);
				return;
			}
			let selectedResourcesindexes = [];
			let nonSelectedResourcesindexes = [];
			availableResources.map(
				(availableResource, availableResourceIndex) => {
					return currentSelectedRows.map((currentSelectedRowId) => {
						if (availableResource.id === currentSelectedRowId) {
							selectedResourcesindexes.push(
								availableResourceIndex
							);
						}
					});
				}
			);
			console.log(selectedResourcesindexes, "selectedResourcesindexes");

			let currentAllocatedValues = [...allocatedValues];
			const updatedAllocatedValues = currentAllocatedValues.map(
				(currentAllocatedValue, currentAllocatedValueIndex) => {
					if (currentAllocatedValueIndex === index) {
						currentAllocatedValue = resource.metrics;
						return currentAllocatedValue;
					} else if (
						!selectedResourcesindexes.includes(
							currentAllocatedValueIndex
						)
					) {
						currentAllocatedValue = 500;
						return currentAllocatedValue;
					} else {
						return currentAllocatedValue;
					}
				}
			);
			const updatedAllocatedValuesIndexes = updatedAllocatedValues.map(
				(ele, index) => index
			);
			const nonSelectedIndexes = updatedAllocatedValuesIndexes.filter(
				(item) => !selectedResourcesindexes.includes(item)
			);
			nonSelectedIndexes.forEach((res) => {
				updatedAllocatedValues[res] = 500;
			});

			setAllocatedValues([...updatedAllocatedValues]);
			let currentNonAllocatedValues = [...nonAllocatedValues];
			const updatedNonAllocatedValues = currentNonAllocatedValues.map(
				(currentNonAllocatedValue, currentNonAllocatedValueIndex) => {
					if (currentNonAllocatedValueIndex === index) {
						currentNonAllocatedValue = 0;
						return currentNonAllocatedValue;
					} else if (
						!selectedResourcesindexes.includes(
							currentNonAllocatedValueIndex
						)
					) {
						currentNonAllocatedValue = 500;
						return currentNonAllocatedValue;
					} else {
						return currentNonAllocatedValue;
					}
				}
			);
			nonSelectedIndexes.forEach((res) => {
				updatedNonAllocatedValues[res] = 500;
			});
			setNonAllocatedValues([...updatedNonAllocatedValues]);
		}
	};

	return (
		<MainLayout>
			<div className="container">
				<div className="row">
					<div className="col-lg-6 heading-text">Dashboard</div>
					<div className="col-lg-6 text-end">
						<button className="report-button">
							<img
								src={ReportButtonArrowIcon}
								alt="ReportButtonArrow"
								style={{ marginRight: "8px" }}
							/>
							Download Report
						</button>
					</div>
				</div>
				<div className="row mt-4">
					{resources.map((resource) => {
						return (
							<div
								key={resource.count}
								className="col resource-container"
							>
								<div>
									<p className="resource-heading">
										{resource.heading}
									</p>
									<p className="resource-count">
										{resource.count}
									</p>
								</div>
								<div className="resource-divider" />
								<p className="resource-button">
									View more
									<img
										src={RightBlackArrowIcon}
										alt="RightBlackArrow"
										style={{ marginLeft: "5px" }}
									/>
								</p>
							</div>
						);
					})}
				</div>
			</div>
			<div className="container mt-5">
				<div className="row">
					<div className="col-lg-5" style={{ paddingRight: "35px" }}>
						<div className="graph-container">
							<p className="table-heading">Allocations per day</p>
							<Bar options={options} data={data} height={200} />
						</div>
					</div>
					<div className="col-lg-7 graph-container">
						<p className="table-heading">Resources Available</p>
						<table className="table">
							<thead>
								<tr>
									{resourceTableHeadings.map(
										(resourceHeading) => (
											<th
												key={resourceHeading}
												style={{
													backgroundColor: "#E3FCEC",
												}}
												scope="col"
											>
												{resourceHeading}
											</th>
										)
									)}
								</tr>
							</thead>
							<tbody>
								{availableResources.map((resource, index) => {
									return (
										<tr
											className="table-row"
											key={resource.id}
											style={{
												backgroundColor:
													selectedRows.includes(
														resource.id
													)
														? "#48B482"
														: "transparent",
											}}
											onClick={() =>
												rowClickHandler(resource, index)
											}
										>
											<td>{resource.id}</td>
											<td>{resource.day}</td>
											<td>{resource.metrics}</td>
											<td>{resource.allocationId}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default Dashboard;
