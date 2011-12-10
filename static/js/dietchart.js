dietchart = function dietchart() {

	return {
		drawLineChart: function() {
			// Create and populate the data table.
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'x');
			data.addColumn('number', 'bel');
			data.addColumn('number', 'kilo');
			data.addRow(["20111203", 150, 93]);
			data.addRow(["20111204", 145, 92]);
			data.addRow(["20111205", 147, 95]);
			
			// Create and draw the visualization.
			new google.visualization.LineChart(document.getElementById('chart_div')).
				draw(data, {curveType: "function",
							width: 400, height: 300,
							vAxis: {maxValue: 10}}
							///, hAxis: {textPosition: "none", slantedText: true, slantedTextAngle: "90"}}
					);
		}
	};
}();

google.load('visualization', '1', {'packages':['corechart']});
google.setOnLoadCallback(dietchart.drawLineChart);


