var width =  650; // The width of the svg is a global variable
var height = 650; // The height of the svg is a global variable

var fdata;
var adata;
var asdata;
var afdata;
var amdata;
var eudata; // The formatted data is a global variable
var rendered_year = 0;
var playing = false;

// Setting the Y axis
var yAxis = d3.scaleLinear()
	.domain([0, 90])
	.range([height, 0])

// Setting the X axis
var xAxis = d3.scaleLog()
	.base(10)
	.range([0, width])
	.domain([142, 150000])

var area = d3.scaleLinear()
	.range([10 , 100])
	.domain([2000, 1400000000]);

// TODO Ordinal scale for colors for example: d3.scaleOrdinal(d3.schemePastel1)
var continentColor = d3.scaleOrdinal(d3.schemePastel1);


var svg = d3.select("#svg_chart")
	.attr("width", width)
	.attr("height", height)
	.style("background", "rgb(250,250,250)")
	//.style("stroke", "black");


 svg.append("g").attr("transform","translate(10,630)").call(d3.axisBottom(xAxis).tickFormat(d3.format(".0s")).ticks(3));
 svg.append("g").attr("transform","translate(20,10)").call(d3.axisLeft(yAxis));
svg.append("text").attr("class", "y label").attr("transform", "translate(35,455)rotate(-90)").text("Life expectancy (years)");
svg.append("text").attr("class", "x label").attr("transform", "translate(350,630)").text("Income(U.S Dollar)");
    //.attr("y", 20)
    //.attr("x", 20)
    //.attr("dy", ".75em").attr("transform","rotate(90)")

//<circle r="10.003493676419538" cx="159.8069187361607" cy="450.3333333333333" fill="#fbb4ae" style="opacity: 0.7;"></circle>
//<circle r="10.021214316020453" cx="204.07287184786185" cy="468.99999999999994" fill="#ccebc5" style="opacity: 0.7;"></circle>
//<circle r="10.001414287734697" cx="182.70243708517452" cy="482.1444444444444" fill="#b3cde3" style="opacity: 0.7;"></circle>
//<circle r="10.351134537335055" cx="175.67563099837676" cy="422.3333333333333" fill="#decbe4" style="opacity: 0.7;"></circle>
function cc()
{

//draw_circles(rendered_year)
render()
}
// Reading the input data
d3.json("data/data.json").then(function (data) {

	// Console log the original data
	console.log(data);

	// Cleanup data



	fdata = data.map(function (year_data) {
		// retain the countries for which both the income and life_exp is specified
		return year_data["countries"].filter(function (country) {
			var existing_data = (country.income && country.life_exp);
			return existing_data
		}).map(function (country) {
			// convert income and life_exp into integers (everything read from a file defaults to an string)
			country.income = +country.income;
			country.life_exp = +country.life_exp;
			return country;
		})
	});


    eudata = data.map(function (year_data) {
        // retain the countries for which both the income and life_exp is specified
        return year_data["countries"].filter(function(d) { return d.continent == "europe" }).filter(function (country) {
            var existing_data = (country.income && country.life_exp);
            return existing_data
        }).map(function (country) {
            // convert income and life_exp into integers (everything read from a file defaults to an string)
            country.income = +country.income;
            country.life_exp = +country.life_exp;
            return country;
        })
    });
    amdata = data.map(function (year_data) {
        // retain the countries for which both the income and life_exp is specified
        return year_data["countries"].filter(function(d) { return d.continent == "americas" }).filter(function (country) {
            var existing_data = (country.income && country.life_exp);
            return existing_data
        }).map(function (country) {
            // convert income and life_exp into integers (everything read from a file defaults to an string)
            country.income = +country.income;
            country.life_exp = +country.life_exp;
            return country;
        })
    });
asdata = data.map(function (year_data) {
        // retain the countries for which both the income and life_exp is specified
        return year_data["countries"].filter(function(d) { return d.continent == "asia" }).filter(function (country) {
            var existing_data = (country.income && country.life_exp);
            return existing_data
        }).map(function (country) {
            // convert income and life_exp into integers (everything read from a file defaults to an string)
            country.income = +country.income;
            country.life_exp = +country.life_exp;
            return country;
        })
    });
afdata = data.map(function (year_data) {
        // retain the countries for which both the income and life_exp is specified
        return year_data["countries"].filter(function(d) { return d.continent == "africa" }).filter(function (country) {
            var existing_data = (country.income && country.life_exp);
            return existing_data
        }).map(function (country) {
            // convert income and life_exp into integers (everything read from a file defaults to an string)
            country.income = +country.income;
            country.life_exp = +country.life_exp;
            return country;
        })
    });

	// Console log the formatted data
	console.log(fdata);

	// invoke the circle that draws the scatterplot
	// the argument corresponds to the year
	draw_circles(0);
})

// setting the callback function when the slider changes
d3.select("#slider").on("input", render);

// callback function to render the scene when the slider changes
function render() {

	// extracting the value of slider
	var slider_val = d3.select("#slider").property("value");
	
	// rendered_year is the global variable that stores the current year
	// get the rendered_year from the slider (+ converts into integer type)
	rendered_year = +slider_val

	// Call rendering function
	draw_circles(rendered_year)
}


function draw_circles(year) {
var e = document.getElementById('Cont');
var cont = e.options[e.selectedIndex].value;

	console.log(year);
if(cont=="All")
{
    var circle_update = svg.selectAll("circle")
        .data(fdata[year]);
}
else if(cont == "asia"){ var circle_update = svg.selectAll("circle")
        .data(asdata[year]);}
else if(cont == "africa"){ var circle_update = svg.selectAll("circle")
        .data(afdata[year]);}
else if(cont == "europe"){ var circle_update = svg.selectAll("circle")
        .data(eudata[year]);}
else if(cont == "americas"){ var circle_update = svg.selectAll("circle")
        .data(amdata[year]);}

//var text_update = svg.append("text")
    //.attr("class", "yearlabel seventeen")
    //.attr("text-anchor", "middle")
    //.attr("y", 3*height/4 - 30)
    //.attr("x", width/2)
    //.text(year+1800);
//var yeartext = svg.selectAll(".textyear").data(fdata[year]);
//yeartext.append("text").merge(yeartext)
    //.attr("class", "yearlabel seventeen")
    //.attr("text-anchor", "middle")
    //.attr("y", 3*height/4 - 30)
    //.attr("x", width/2)
    //.text(year+1800)
    //.classed("textyear",true);
    //yeartext.exit().remove();
    // TODO all your rendering D3 code here
//text_update.exit().remove()

        circle_update.enter().append("circle").merge(circle_update)
            .attr("r", (d) => area(d.population))
            .attr("cx", (d) => xAxis(d.income))
            .attr("cy",(d) => yAxis(d.life_exp)).attr("fill", (d) => continentColor(d.continent)).style("opacity", "0.80").style("stroke", "black");

//.filter(function(d) { return d.continent == "europe";})//

      document.getElementById("year_s").innerHTML = year +1800;

//fill: rgb(255, 127, 14)
 //circle_update.enter().append("circle").merge(circle_update)
            //.attr("r", function(d,i){return 10;})
            //.attr("cx",function(d,i){return xAxis(d.income);})
            //.attr("cy",function(d,i){return yAxis(d.life_exp);})
circle_update.exit().remove()
    	// this variable gets set only through the button 
	// therefore step is called in a loop only when play is pressed
	// step is not called when slider is changed
	if (playing)
        setTimeout(step, 50)
}


// callback function when the button is pressed
function play() {
	
	if (d3.select("button").property("value") == "Play") {
		d3.select("button").text("Pause")
        d3.select("button").property("value", "Pause")
        playing = true
        step()
	}
	else {
		d3.select("button").text("Play")
        d3.select("button").property("value", "Play")
        playing = false
        
	}
}

// callback function when the button is pressed (to play the scene)
function step() {
	
	// At the end of our data, loop back
	rendered_year = (rendered_year < 214) ? rendered_year + 1 : 0
	draw_circles(rendered_year)
}


