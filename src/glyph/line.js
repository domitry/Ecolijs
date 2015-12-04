define([
    'underscore'
],function(_){
    return [
        "line",
        ["data", "x", "y", "position"],
        {
            color:'steelblue',
            stroke_width: 2
        },
        function(context, data, xlabel, ylabel, position, options){
            var path = (context.select("path").node()==null ? context.append("path") : context.select("path"));
	        path.datum(data.asarray());

            var line = d3.svg.line()
                    .x(position(xlabel, ylabel).x)
                    .y(position(xlabel, ylabel).y);

            path
                .attr("d", line)
                .attr("stroke", options.color)
                .attr("stroke-width", options.stroke_width)
                .attr("fill", "none");

            return path;
        }
    ];
});
