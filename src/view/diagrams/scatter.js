define([
    'underscore',
    'core/manager',
    'view/components/filter'
],function(_, Manager, Filter){
    function Scatter(parent, scales, df_id, _options){
	var options = {
	    x: null,
	    y: null,
	    r: 5,
	    shape:'circle',
	    color:'steelblue',
	    stroke_color: 'black',
	    stroke_width: 1
	};
	if(arguments.length>3)_.extend(options, _options);

	this.scales = scales;
	var df = Manager.getData(df_id);
	var data = this.proceedData(df.column(options.x), df.column(options.y), options);

	var model = parent.append("g");
	var circles = model.selectAll("circle")
	    .data(data)
	    .enter()
	    .append("circle")
	    .attr("r", 0)

	this.updateModels(circles, scales, options);

	this.options = options;
	this.model = model;
	this.df = df;
	this.df_id = df_id;

	return this;
    }

    Scatter.prototype.proceedData = function(x_arr, y_arr, options){
	return _.map(_.zip(x_arr, y_arr), function(d){return {x:d[0], y:d[1]}});
    }

    Scatter.prototype.updateModels = function(selector, scales, options){
	var onMouse = function(){
	    d3.select(this).transition()
		.duration(200)
		.attr("fill", d3.rgb(options.color).darker(1));
	}

	var outMouse = function(){
	    d3.select(this).transition()
		.duration(200)
		.attr("fill", options.color);
	}

	selector
	    .attr("cx",function(d){return scales.x(d.x)})
	    .attr("cy", function(d){return scales.y(d.y)})
	    .attr("fill", options.color)
	    .attr("stroke", options.stroke_color)
	    .attr("stroke-width", options.stroke_width)
	    .attr("clip-path","url(#clip_context)")
	    .on("mouseover", onMouse)
	    .on("mouseout", outMouse)
	    .transition().duration(200)
	    .attr("r", options.r)
    }

    Scatter.prototype.selected = function(data, row_nums){
	var selected_cells = this.df.pickUpCells(this.options.value, row_nums)
	var data = this.proceedData(selected_cells, this.options);
	var models = this.model.selectAll("rect").data(data);
	this.updateModels(models, this.scales, this.options);
    }

    Scatter.prototype.update = function(){
	var models = this.model.selectAll("rect");
	this.updateModels(models,  this.scales, this.options);
    }

    Scatter.prototype.checkSelectedData = function(ranges){
	var rows = [];
	var column = this.df.column(this.options.value);
	_.each(column, function(val, i){
	    if(val > ranges.x[0] && val < ranges.x[1])rows.push(i);
	});
	Manager.selected(this.df_id, rows);
    }

    return Scatter;
});
