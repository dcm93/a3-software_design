var LineChart = function () {

    var height = 600,
        width = 950,
        margin = {
            top: 10,
            right: 120,
            bottom: 50,
            left: 80
        },
        yTitle = 'Y Axis Title',
        xTitle = 'X Axis Title',
        title = 'Chart Title',
        stroke = 'blue',
        strokeWidth = 1.5,
        duration = 1000,
        xScaleType = 'linear',
        yScaleType = 'linear';

    var chart = function (selection) {
        var chartWidth = width - margin.left - margin.right,
            chartHeight = height - margin.top - margin.bottom,
            xAxis = d3.axisBottom().tickFormat(d3.format('d')),
            yAxis = d3.axisLeft().tickFormat(d3.format('.2s'));

        var yScale,
            xScale;

        function setScales() {
            if (xScaleType == 'linear') {
                xScale = d3.scaleLinear();
            } else {
                xScale = d3.scaleLog();
            }

            if (yScaleType == 'linear') {
                yScale = d3.scaleLinear();
            } else {
                yScale = d3.scaleLog();
            }
        }

        setScales();
        selection.each(function (data) {
            var self = d3.select(this);
            var svg = self.selectAll("svg").data(data);

            var svgEnter = svg.enter()
                .append('svg')
                .attr('width', width)
                .attr('height', height);

            svgEnter.append('text')
                .attr('transform', 'translate(' + (margin.left + chartWidth / 2) + ',' + 20 + ")")
                .text(title)
                .attr('class', 'chart-title');

            svgEnter.append('g')
                .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ")")
                .attr('class', 'chartG');

            svgEnter.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + (chartHeight + margin.top) + ')')
                .attr('class', 'xAxisLabel');

            svgEnter.append('g')
                .attr('class', 'yAxisLabel')
                .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')

            svgEnter.append('text')
                .attr('transform', 'translate(' + (margin.left + chartWidth / 2) + ',' + (chartHeight + margin.top + 40) + ')')
                .attr('class', 'xTitle');

            svgEnter.append('text')
                .attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + chartHeight / 2) + ') rotate(-90)')
                .attr('class', 'yTitle');

            var xExtent = d3.extent(data, function (d) { return +d.x});
            var yExtent = d3.extent(data, function (d) { return +d.y});

            //set domains
            xScale.domain([xExtent[0], xExtent[1]]).range([0, chartWidth]);
            yScale.domain([yExtent[0], yExtent[1]]).range([chartHeight, 0]);

            //set scales
            xAxis.scale(xScale);
            yAxis.scale(yScale);

            self.select('.xAxisLabel').transition().duration(duration / 2).call(xAxis);
            self.select('.yAxisLabel').transition().duration(duration / 2).call(yAxis);

            self.select('.xTitle').text(xTitle);
            self.select('.yTitle').text(yTitle);
            var line = d3.line()
                .x(function (d) { return xScale(+d.x) })
                .y(function (d) { return yScale(+d.y) });

            var line = self.select('.chartG').selectAll('path').data(data, (d) => d.id);
            line.enter()
                .append('path')
                .attr('class', 'elements')
                .attr('d', line(data))
                .attr('fill', 'none')
                .attr('stroke', stroke)
                .attr('stroke-width', strokeWidth)
                .each(function (d) { d.totalLength = this.getTotalLength(); })
                .attr("stroke-dasharray", function (d) { return d.totalLength + " " + d.totalLength; })
                .attr("stroke-dashoffset", function (d) { return -d.totalLength; })
                .transition().duration(duration).attr('stroke-dashoffset', 0);

            line.attr('stroke-dasharray', 'none')
            .transition()
            .duration(duration)
            .attr('d', line(data));

            line.exit().transition().duration(duration)
            .attr('stroke-dashoffset',function (d) { return -d.totalLength; })
            .attr('stroke-dasharray', function (d) { return d.totalLength + " " + d.totalLength; })
            .remove();
        });
    };
    chart.height = function (value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    }
    chart.width = function (value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    }
    chart.title = function (value) {
        if (!arguments.length) return title;
        title = value;
        return chart;
    }
    chart.xTitle = function (value) {
        if (!arguments.length) return xTitle;
        xTitle = value;
        return chart;
    }
    chart.yTitle = function (value) {
        if (!arguments.length) return yTitle;
        yTitle = value;
        return chart;
    }

    chart.stroke = function (value) {
        if (!arguments.length) return stroke;
        stroke = value;
        return chart;
    }
    chart.strokeWidth = function (value) {
        if (!arguments.length) return strokeWidth;
        strokeWidth = value;
        return chart;
    }
    chart.duration = function (value) {
        if (!arguments.length) return duration;
        duration = value;
        return chart;
    }
    chart.xScaleType = function (value) {
        if (!arguments.length) return xScaleType;
        xScaleType = value;
        return chart;
    }
    chart.yScaleType = function (value) {
        if (!arguments.length) return yScaleType;
        yScaleType = value;
        return chart;
    }
    return chart;
};



