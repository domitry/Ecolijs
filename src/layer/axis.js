define([
    'underscore',
    'utils/parser_tools'
],function(_, t){
    return [
        "axis",
        ["scale"],
        {
            text_color: "#323232",
            axis_color: "none",
            tick_color:"#000",
            stroke_width: 1.0,
            orient: "bottom"
        },
        t.auto_bbox(
            t.auto_append(
                "g",
                function(g, scale, options){
                    
                    var axis = d3.svg.axis()
                            .scale(scale)
                            .orient(options.orient);

                    g.attr("class", "axis").call(axis);

                    g
                        .selectAll("path, line")
                        .style("fill","none")
                        .style("stroke-width",options.stroke_width);

                    g
                        .selectAll("path")
                        .style("stroke", options.axis_color);

                    g
                        .selectAll("line")
                        .style("stroke", options.tick_color);

                    g
                        .selectAll("text")
                        .attr("fill", options.text_color);

                    if(options.orient=="left"){
                        var width = g.node().getBoundingClientRect().width;
                        g.attr("transform", "translate(" + width + ", 0)");
                    }   
                    
                    return g;
                }
            )
        )
    ];
});
