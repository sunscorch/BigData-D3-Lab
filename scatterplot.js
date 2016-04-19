
        var scaleX;
        var scaleY;
       /*var xSel = $('#sel-x').find(":selected").text();
        console.log(xSel);*/
        d3.csv("car.csv", function(result){
                dataloaded(result);
            
                showViz(data);
                //update x axis
                $("#sel-x").change(function(){
                    updateX(data);
                });
                //update y axis
                $("#sel-y").change(function(){
                    updateY(data);
                });
            
                 $("#update").click(function(){
                    console.log("hello")
                    updateMpg(data);
                });///update data
            })
       
        
        function dataloaded(result){
              data = result.map(function(d){
                return {
                    name:                   d.name,
                    mpg:                   +d.mpg,
                    cylinders:             +d.cylinders,
                    displacement:          +d.displacement,
                    weight:                +d.weight,
                    acceleration:          +d.acceleration,
                    modelyear:             +d["model.year"]
                }//return 
            })//end of map
         }//end of dataloaded
    
        function showViz(data){
             xSel = $('#sel-x').find(":selected").text();
             xSel = xSel.split('.').join(' ');
             ySel = $('#sel-y').find(":selected").text();
             min = $('#mpg-min').val();
             max = $('#mpg-max').val();
            //console.log(data);
            
                svg = d3.select("#viz").attr("width", 600)
                                       .attr("height",600); 
            
             scaleX = d3.scale.linear().range([50,550]);
             scaleY = d3.scale.linear().range([50,550]);
            
            var Xmax = d3.max(data, function(d) { return d[xSel]; });
            var Ymax = d3.max(data, function(d) { return d[ySel]; });
            
            scaleX.domain([0,Xmax]);
            scaleY.domain([Ymax,0]);
            
            if(xSel=="model.year"){
                scaleX.domain(1968,Xmax);
            }
            
            if(ySel=="model.year"){
                scaleY.domain(Ymax,1968);
            }
            
             axisX = d3.svg.axis().scale(scaleX).orient("buttom");
             axisY = d3.svg.axis().scale(scaleY).orient("left");
            
             selection = d3.select("#viz") 
                .selectAll("circle") 
                .data(data); 
            
             selection.enter() 
                .append("circle");
            
             selection
                .attr({
                    r: 3,
                    cx: function(d) { 
                    
                        return scaleX(d[xSel]) },
                    
                    cy: function(d) { 
                       // if min<=d.mpg<=max
                        return scaleY(d[ySel])}
                })
                .on('mouseover', function(d){
                    //d3.select(this).attr({r:10});
                    d3.select("#hovered").text(d.name);
             });
            //console.log(data);
               d3.select("#viz").append("g")
                 .attr("class","xAxis")
                 .attr("transform","translate(14,550)")
                 .call(axisX);
            
               d3.select("#viz").append("g")
                 .attr("class","yAxis")
                 .attr("transform","translate(60,0)")
                 .call(axisY);
                
                d3.select("#viz").append("text")
                  .attr("class","yText")
                  .attr("x",60)
                  .attr("y",60)
                  .text(xSel);
                
                d3.select("#viz").append("text")
                  .attr("class","xText")
                  .attr("x",520)
                  .attr("y",540)
                  .text(ySel);
            selection.exit().remove();
            
        }
    
        function updateX(data){
            xSel = $('#sel-x').find(":selected").text();
            xSel = xSel.split('.').join('');
            var Xmax = d3.max(data, function(d) { return d[xSel]; });
            console.log(Xmax);
            scaleX.domain([0,Xmax]);
            
            
            if(xSel=="modelyear"){
                scaleX.domain([1968,Xmax]);
            }
            
    
            d3.select(".xAxis")
              .call(axisX);
            
            d3.select(".xText")
              .text(xSel);
            
           selection = d3.select("#viz") 
                .selectAll("circle") 
                .data(data); 
            
             selection.enter() 
                .append("circle");
            
             selection
                .attr({
                    r: 3,
                    cx: function(d) { 
                       // console.log(d[xSel]);
                        return scaleX(d[xSel]) },
                    
                    cy: function(d) { 
                       // if min<=d.mpg<=max
                        return scaleY(d[ySel])}
                });
            selection.exit().remove();
                
            
        }
        
        function updateY(data){
            ySel = $('#sel-y').find(":selected").text();
            ySel = ySel.split('.').join('');
            
            var Ymax = d3.max(data, function(d) { return d[ySel]; });
            scaleY.domain([Ymax,0]);
            
            if(ySel=="modelyear"){
                scaleY.domain([Ymax,1968]);
            }
            
            d3.select(".yAxis")
              .call(axisY);
            
            d3.select(".yText")
              .text(ySel);
            
            selection = d3.select("#viz") 
                .selectAll("circle") 
                .data(data); 
            
             selection.enter() 
                .append("circle");
            
             selection
                .attr({
                    r: 3,
                    cx: function(d) { 
                    
                        return scaleX(d[xSel]) },
                    
                    cy: function(d) { 
                       // if min<=d.mpg<=max
                        return scaleY(d[ySel])}
                });
            selection.exit().remove();
        }
      
    function updateMpg(data){
        
        var min = $('#mpg-min').val();
            min = parseInt(min);
        var max = $('#mpg-max').val();
            max = parseInt(max);

        
        selection = d3.select("#viz") 
                .selectAll("circle") 
                .data(data); 
            
             selection.enter() 
                .append("circle");
            
             selection
                .attr({
                    r: 3,
                    cx: function(d) { 
                        if (min<=d.mpg&&d.mpg<=max){
                        console.log(d[xSel]);
                        return scaleX(d[xSel])} },
                    
                    cy: function(d) { 
                        if (min<=d.mpg&&d.mpg<=max){
                        return scaleY(d[ySel])}}
                });
            selection.exit().remove();
        
    }
       
