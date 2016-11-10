const d3 = require("d3")


$(function() {    
    $("canvas.percentage").each(function () {
        const context = this.getContext("2d")        
        const percents = this.attributes.value.value;
        const width = this.width;
        const height = this.height;
        const colors = ["#e75735", "#fff"];
        
        const arc = d3.arc()
              .outerRadius(47)
              .innerRadius(43)
              .context(context);
        
        const pie = d3.pie()
              .sort(null)
              .value(function(d) { return d; });

        context.translate(width / 2 , height / 2);

        const arcs = pie([percents, 100 - percents]);

        arcs.forEach(function(d, i) {
            context.beginPath();
            arc(d);
            context.fillStyle = colors[i];
            context.fill();
        });

        context.fillStyle = "black";
        context.font = '300 42px Lato'
        context.textAlign ="center"
        context.textBaseline = 'middle'
        context.fillText(percents, 0, 0);
    })

});
