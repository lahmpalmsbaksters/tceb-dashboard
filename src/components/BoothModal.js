import React from "react";
import { Modal, Box } from "@mui/material";
import { Bar } from "react-chartjs-2";

const BoothModal = ({ open, handleClose, selectedBooths }) => {
  const generateChartData = (graphData) => {
    const labels = graphData.map((item) =>
      new Date(item.time_stamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    const data = graphData.map((item) => item.counts);

    return {
      labels,
      datasets: [
        {
          label: "Visitors Count",
          data,
          backgroundColor: "rgba(33, 76, 129, 0.8)", // Dark blue for bar color
          borderColor: "rgba(33, 76, 129, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="booth-details-modal"
      aria-describedby="booth-details-description"
    >
      <Box
        className="bg-white shadow-lg p-6 sm:p-8 rounded-lg border-4 border-pink-400"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "1200px", // Adjust for larger width for two booths
          outline: "none",
        }}
      >
        {selectedBooths && selectedBooths.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedBooths.map((booth, index) => (
              <div key={index}>
                {/* Booth Title */}
                <h2 id="booth-details-modal" className="text-2xl font-bold mb-4">
                  {booth.booth_name} Booth
                </h2>

                {/* Metrics Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="border rounded-lg p-4 text-center shadow">
                    <div className="text-sm font-bold">Visitor Count</div>
                    <div className="text-3xl font-bold">{booth.count}</div>
                    <div className="text-xs text-gray-500">จำนวนคนเยี่ยมชมบูธ</div>
                  </div>
                  <div className="border rounded-lg p-4 text-center shadow">
                    <div className="text-sm font-bold">Avg. Dwell-Time (Min)</div>
                    <div className="text-3xl font-bold">{booth.time}</div>
                    <div className="text-xs text-gray-500">เวลาเยี่ยมชมบูธโดยเฉลี่ย</div>
                  </div>
                  <div className="border rounded-lg p-4 text-center shadow">
                    <div className="text-sm font-bold">Out to Fun Zone</div>
                    <div className="text-3xl font-bold">{booth.current_to_target}</div>
                    <div className="text-xs text-gray-500">ไป Fun Zone</div>
                  </div>
                  <div className="border rounded-lg p-4 text-center shadow">
                    <div className="text-sm font-bold">Out to Networking Zone</div>
                    <div className="text-3xl font-bold">{booth.out_of_target}</div>
                    <div className="text-xs text-gray-500">ไป Networking Zone</div>
                  </div>
                </div>

                {/* Frame Label and Bar Chart */}
                <div className="mb-4">
                  <div className="text-sm mb-2">Frame 100000320{index + 3}</div>
                  <div className="mt-4">
                    <Bar data={generateChartData(booth.graph)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default BoothModal;
