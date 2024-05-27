/*!

=========================================================
* BLK Design System React - v1.2.2
=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// used inside src/views/examples/LandingPage.js
const bigChart = {
  data: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientFill = ctx.createLinearGradient(0, 230, 0, 50);

    gradientFill.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientFill.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientFill.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: [
        "JUN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
      datasets: [
        {
          label: "Data",
          fill: true,
          backgroundColor: gradientFill,
          borderColor: "#1d8cf8",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1d8cf8",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#5464ed",
          //pointHoverBorderColor:'rgba(35,46,55,1)',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [80, 160, 200, 160, 250, 280, 220, 190, 200, 250, 290, 320],
        },
      ],
    };
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#ccc",  // Changed from titleFontColor to titleColor
        bodyColor: "#666",   // Changed from bodyFontColor to bodyColor
        bodySpacing: 4,
        padding: 12,         // Changed from xPadding to padding (if applicable)
        mode: "nearest",
        intersect: false,
        position: "nearest",
      }
    },
    responsive: true,
    scales: {
      y: {
        grid: {
          drawBorder: false,
          color: "rgba(0,0,0,0.0)",
          borderColor: "transparent",
        },
        ticks: {
          display: false,
          suggestedMin: 0,
          suggestedMax: 350,
          padding: 20,
          color: "#9a9a9a",
        }
      },
      x: {
        grid: {
          drawBorder: false,
          color: "rgba(0,0,0,0)",
          borderColor: "transparent",
        },
        ticks: {
          padding: 20,
          color: "#9a9a9a",
        }
      }
    }
  }
  
};

export default bigChart;
