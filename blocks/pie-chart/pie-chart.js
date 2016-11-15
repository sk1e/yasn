const d3 = require("d3")
const colors = require("../../colors.json")


$(function() {    
    $("canvas.pie-chart").each(function () {

        const context = this.getContext("2d")
        const values = JSON.parse(this.attributes.values.value);

        const width = this.width;
        const height = this.height;

        const fillColors = [colors["theme-color-3-foreground"], colors["theme-color-2"], colors["theme-color-1"], colors["theme-color-3"]];
        
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
            context.fillStyle = fillColors[i];
            context.fill();
        });

    })

});
