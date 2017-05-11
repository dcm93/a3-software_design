$(function () {
    var xVar = 'year';
    var yVar = 'value';
    var chartData;

    d3.csv('data/data.csv', function (error, data) {
        var prepData = function () {
            chartData = data.map(function (d) {
                return {
                    x: d[xVar],
                    y: d[yVar],
                    id: d['country_area']
                };
            });
        };
            prepData();
            var lineChart = LineChart().title('GDP Australia').xTitle('Year').yTitle('Value').strokeWidth(4.0).stroke('yellow').duration(3000).xScaleType('linear').yScaleType('linear');
            var chart =  d3.select("#vis").data([chartData])
                .call(lineChart);
    })
})