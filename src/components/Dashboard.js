import React, { useState, useEffect } from "react";
import Header from "./Header";
import AnalyticsCounter from "./AnalyticsCounter";
import { People, Male, Female } from "@mui/icons-material";
import { Modal, Box, Divider } from "@mui/material";
import { Chart } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import axios from "axios";

import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import InterestsIcon from "@mui/icons-material/Interests";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Diversity2Icon from "@mui/icons-material/Diversity2";

// Register Bar Chart Components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ff74-171-96-75-214.ngrok-free.app/get_zone_data",
          {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        // Ensure the correct data structure is returned and assign it
        if (response.status === 200 && response.data) {
          setData(response.data);
        } else {
          console.error("Error: Data not received correctly from the API.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  if (!data) {
    return <div>Loading...</div>; // Show loading state while waiting for data
  }

  const visitorsData = data.zone_visiting[0]; // Adjust to fit API response structure
  const journeyData = data.customer_journey;
  const zones = data.zone;

  const handleOpen = (zone) => {
    setSelectedZone(zone);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedZone(null);
  };

  const iconMap = {
    flow_zone: <FamilyRestroomIcon />, // Flow Zone -> Map icon
    fun_zone: <InterestsIcon />, // Fun Zone -> Sports Esports icon
    fantastic_zone: <AutoAwesomeIcon />, // Fantastic Zone -> Star icon
    networking_zone: <Diversity2Icon />, // Networking Zone -> Network Check icon
  };

  // Chart data generation for each booth
  // const generateChartData = (graphData) => {
  //   const labels = graphData.map((item) =>
  //     new Date(item.time_stamp).toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     })
  //   );
  //   const data = graphData.map((item) => item.counts);

  //   return {
  //     labels,
  //     datasets: [
  //       {
  //         label: "Visitors Count",
  //         data,
  //         backgroundColor: "rgba(33, 76, 129, 0.8)",
  //         borderColor: "rgba(33, 76, 129, 1)",
  //         borderWidth: 1,
  //         barThickness: 50, // Set a fixed bar thickness (adjust this value)
  //         maxBarThickness: 80, // Set the maximum thickness of the bar
  //         // datalabels: {
  //         //   anchor: "end", // Position the label at the top of the bar
  //         //   align: "end", // Align the label with the end of the bar
  //         //   color: "black", // Set label color to black
  //         //   font: {
  //         //     weight: "thin", // Make the labels bold
  //         //   },
  //         //   formatter: (value) => value, // Show the actual value as the label
  //         // },
  //       },
  //     ],
  //   };
  // };

  const generateChartData = (graphData) => {
    const labels = graphData.map((item) => {
      // Convert timestamp to UTC time without local timezone adjustments
      const date = new Date(item.time_stamp);
      return date.toISOString().slice(11, 16); // Extract the time part (HH:mm)
    });
    const data = graphData.map((item) => item.counts);

    return {
      labels,
      datasets: [
        {
          type: "bar", // Specify the type as 'bar' for this dataset
          label: "Visitors Count (Bar)",
          data,
          backgroundColor: "rgba(42, 49, 117, 1)",
          // borderColor: "rgba(33, 76, 129, 1)",
          borderWidth: 1,
          barThickness: 50, // Set a fixed bar thickness
          maxBarThickness: 80, // Set the maximum thickness of the bar
        },
        // {
        //   type: "line", // Specify the type as 'line' for this dataset
        //   label: "Visitors Count (Line)",
        //   data,
        //   fill: false,
        //   backgroundColor: "rgba(75, 192, 192, 0.2)",
        //   borderColor: "rgba(75, 192, 192, 1)",
        //   tension: 0.4, // Set a smooth curve
        //   pointRadius: 5, // Control the size of data points
        //   pointHoverRadius: 7,
        // },
      ],
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Header />
      <div className="p-4 sm:p-6 lg:p-4">
        <div className="bg-[#2A3175] text-white p-6 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Traffic Analysis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <AnalyticsCounter
                title="Visitors Count"
                value={visitorsData.visitors}
                subTitle="จำนวนคนเข้างาน"
                icon={<People style={{ fontSize: 72, color: "#6E85B7" }} />} // Light blue icon color
              />
            </div>
            <div className="col-span-1 sm:col-span-1 lg:col-span-1">
              <AnalyticsCounter
                title="Male"
                value={visitorsData.Male}
                subTitle="ผู้ชาย"
                icon={<Male style={{ fontSize: 72, color: "#6E85B7" }} />} // Light blue icon color
              />
            </div>
            <div className="col-span-1 sm:col-span-1 lg:col-span-1">
              <AnalyticsCounter
                title="Female"
                value={visitorsData.Female}
                subTitle="ผู้หญิง"
                icon={<Female style={{ fontSize: 72, color: "#6E85B7" }} />} // Light blue icon color
              />
            </div>
          </div>
        </div>

        {/* Zoning Analysis Section */}
        <div className="bg-[#5993CE] text-white p-6 rounded-3xl shadow-lg my-6">
          <h2 className="text-2xl font-bold mb-6">Zoning Analysis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {zones.map((zone, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 text-center cursor-pointer"
                onClick={() => handleOpen(zone)}
              >
                <div className="text-4xl sm:text-5xl text-blue-400 mb-2">
                  {React.cloneElement(iconMap[zone.zone_name], {
                    style: { fontSize: "64px" },
                  })}
                </div>
                <div className="text-sm sm:text-lg font-semibold text-black">
                  {zone.zone_name
                    .replace(/_/g, " ")
                    .replace(
                      /\w\S*/g,
                      (txt) =>
                        txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
                    )}{" "}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#9FBEDE] text-black p-6 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">
            Customer Journey
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {journeyData.map((journey, index) => (
              <div
                key={index}
                className="bg-white shadow-lg p-4 sm:p-6 lg:p-8 rounded-xl"
              >
                <div className="text-sm sm:text-2xl font-semibold">
                  {journey.journey_name
                    .replace(/_/g, " ")
                    .replace(/\bto\b/g, ">")
                    .replace(
                      /\w+/g,
                      (txt) =>
                        txt.charAt(0).toUpperCase() + txt.slice(1) + " Zone"
                    )}
                </div>

                <div className="flex justify-end mt-14">
                  <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-800">
                    {journey.journey_counts}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Journey Section */}

      {/* Modal for showing zone details */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="zone-details-modal"
        aria-describedby="zone-details-description"
      >
        <Box
          className="bg-white shadow-lg p-6 sm:p-8 rounded-xl"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth:
              selectedZone && selectedZone.booth.length === 1
                ? "600px"
                : "1200px", // Adjust for one or two booths
            outline: "none",
          }}
        >
          {selectedZone && (
            <div className="flex justify-between items-start gap-6">
              {selectedZone.booth.map((booth, index) => (
                <div
                  key={index}
                  className="flex-1 border border-gray-300 p-6 sm:p-8 rounded-2xl" // Added padding and rounded border
                  style={{ opacity: 0.9 }}
                >
                  <h2
                    id="zone-details-modal"
                    className="text-2xl font-bold mb-4"
                  >
                    {booth.booth_name.charAt(0).toUpperCase() +
                      booth.booth_name.slice(1)}{" "}
                    Booth
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="border rounded-lg p-4 text-center shadow">
                      <div className="text-3xl font-bold">{booth.count}</div>
                      <div className="text-sm font-bold">Visitor Count</div>

                      <div className="text-xs text-gray-500">
                        จำนวนคนเยี่ยมชมบูธ
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 text-center shadow">
                      <div className="text-3xl font-bold">
                        {(booth.time / 60).toFixed(2)}
                      </div>
                      <div className="text-sm font-bold">
                        Avg. Dwell-Time (Min)
                      </div>

                      <div className="text-xs text-gray-500">
                        เวลาเยี่ยมชมบูธโดยเฉลี่ย
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 text-center shadow">
                      <div className="text-3xl font-bold">
                        {booth.current_to_target}
                      </div>
                      <div className="text-sm font-bold">
                        {booth.booth_name === "expopass"
                          ? "Out to Fun Zone"
                          : booth.booth_name === "logicspace"
                          ? "Out to THAIRUN Booth"
                          : booth.booth_name === "thairun"
                          ? "Out to LogicSpace Booth"
                          : booth.booth_name === "baksters"
                          ? "Out to PRO-toys Booth"
                          : booth.booth_name === "protoys"
                          ? "Out to Baksters Booth"
                          : booth.booth_name === "marketing"
                          ? "Out to Flow Zone"
                          : ""}
                      </div>

                      <div className="text-xs text-gray-500">
                        {booth.booth_name === "expopass"
                          ? "ไป Fun Zone"
                          : booth.booth_name === "logicspace"
                          ? "ไป THAIRUN บูธ"
                          : booth.booth_name === "thairun"
                          ? "ไป LogicSpace บูธ"
                          : booth.booth_name === "baksters"
                          ? "ไป PRO-toys บูธ"
                          : booth.booth_name === "protoys"
                          ? "ไป Baksters บูธ"
                          : booth.booth_name === "marketing"
                          ? "ไป Flow โซน"
                          : ""}
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 text-center shadow">
                      <div className="text-3xl font-bold">
                        {booth.out_of_target}
                      </div>
                      <div className="text-sm font-bold">
                        {booth.booth_name === "expopass"
                          ? "Out to Networking Zone"
                          : booth.booth_name === "logicspace"
                          ? "Out to Flow Zone"
                          : booth.booth_name === "thairun"
                          ? "Out to Flow Zone"
                          : booth.booth_name === "baksters"
                          ? "Out to Networking Zone"
                          : booth.booth_name === "protoys"
                          ? "Out to Networking Zone"
                          : booth.booth_name === "marketing"
                          ? "Out to Fantastic Zone"
                          : ""}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booth.booth_name === "expopass"
                          ? "ไป Networking Zone"
                          : booth.booth_name === "logicspace"
                          ? "ไป Flow โซน"
                          : booth.booth_name === "thairun"
                          ? "ไป Flow โซน"
                          : booth.booth_name === "baksters"
                          ? "ไป Networking โซน"
                          : booth.booth_name === "protoys"
                          ? "ไป Networking โซน"
                          : booth.booth_name === "marketing"
                          ? "ไป Fantastic โซน"
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm font-bold">Visitor Per Hour</div>
                    {/* <Bar data={generateChartData(booth.graph)} /> */}
                    <Chart type="bar" data={generateChartData(booth.graph)} />
                  </div>
                </div>
              ))}

              {selectedZone.booth.length === 2 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ height: "100%" }}
                />
              )}
            </div>
          )}

          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-900 text-white py-2 px-4 rounded-lg"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Dashboard;
