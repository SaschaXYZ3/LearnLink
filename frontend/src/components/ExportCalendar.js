import React from "react";

function ExportCalendarButton() {
  const handleDownload = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/export-calendar", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download calendar.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "calendar.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading calendar:", error.message);
    }
  };

  return (
    <button onClick={handleDownload} className="btn btn-primary mt-3">
    Export Calendar as .ics
  </button>
  );
}

export default ExportCalendarButton;