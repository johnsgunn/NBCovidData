var jsonOutput;
var currentReport;

var caseHistoryChart = null;
var vaccineHistoryChart = null;
var healthZoneChart = null;
var largeChart = null;
var pedCasesChart = null;
var caseTrendsChart = null;

var darkMode = false;

const chartTextColor = "#f2f2f2";
const chartGridColor = "#999999";
const canvasBG = {
    id: 'custom_canvas_background_color',
    beforeDraw: (chart) => {
      const ctx = chart.canvas.getContext('2d');
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = 'dimgray';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };

  var caseSummaryJSON = null;
  var healthZoneJSON = null;
  var vaccinationSummaryJSON = null;
  var caseHistoryJSON = null;
  var vaccineHistoryJSON = null;
  var schoolsSummaryJSON = null;
  var schoolsListJSON = null;