const d3 = require("d3")


$(function() {    
    $("canvas.pie-chart").each(function () {
        const context = this.getContext("2d")
        const values = JSON.parse(this.attributes.values.value);

        const width = this.width;
        const height = this.height;
        const colors = ["#747474", "#e75735", "#4eb7a8", "#e5e5e5"];
        
        const arc = d3.arc()
              .innerRadius(30)
              .outerRadius(47)
              .context(context);
        
        const pie = d3.pie()
              .sort(null)
              .value(function(d) { return d; });

        context.translate(width / 2 , height / 2);
        
        const arcs = pie(values);

        arcs.forEach(function(d, i) {
            context.beginPath();
            arc(d);
            context.fillStyle = colors[i];
            context.fill();
        });

    })

});
