   var url = "http://localhost:5820/animalKindgom/query?reasoning=true"; 
    var query = 
				
				"SELECT ?animals ?country "+ 
			"WHERE {"+
 				"?animals B:livesIn ?country."+
				"?animals rdf:type owl:NamedIndividual."+
			"}" ;
    $.ajax({
        headers : {
            Accept: 'application/sparql-results+json'
        }, 
        url: url,
        data: {
            query: query
        },
        success: function(data) {
            var results = data.results.bindings;

					//make new array
					animalCountryArray = [['State', 'National Symbol']];					
					//convert countries & animals URI into an array
					for(i=0; i<results.length; i++){
						
						var country = results[i].country.value;
						var animal = results[i].animals.value;
						
						countryURI = encodeURI(JSON.stringify(country));
						var countryString = makeString(countryURI);
						
						animalURI = encodeURI(JSON.stringify(animal));
						var animalString = makeString(animalURI);
						
						//add Animals & Countries to array
						animalCountryArray.push([countryString[0], (countryString[0] + ":" + animalString[0])]);

					}
						//add arraylist to another array

						//Convert the URI in a String	
						function	makeString(animalURI){
								stringURI = encodeURI(JSON.stringify(animalURI));
								stringArray = stringURI.split("%22%2522http://127.0.0.1:3333/");
								stringArray = stringArray[1].split("%2522%22");
							return stringArray;
							}
        }
    });

			//google library Geographic chart
      google.charts.load('current', {
        'packages':['geochart'],
				'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable(
						animalCountryArray
        );
        var options = {};
        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        chart.draw(data, options);
      }
	