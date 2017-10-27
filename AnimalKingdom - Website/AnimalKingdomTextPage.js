var imageAnimal = document.getElementById("imageAnimal");
var nameAnimal = document.getElementById("nameAnimal");
var abstractAnimal = document.getElementById("abstractText");
var animalKingdom = document.getElementById("animalKingdom");
var animalPhylum = document.getElementById("animalPhylum");
var animalClass = document.getElementById("animalClass");
var animalOrder = document.getElementById("animalOrder");
var animalFamily = document.getElementById("animalFamily");
var typeOfFood = document.getElementById("typeOfFood");

var inputSearch = document.getElementById("inputSearch");

var	searchQueryUser = false;
var userSearch = "";

$("div #textBox").hide("textField");
$("div #thumbnail").hide("thumbnail");
$("p").hide();

$("#inputSearch").keypress(function(event){
			if(event.which === 13){
									var userSearch = inputSearch.value;
									searchQueryUser = true;
									sparqlQuery(userSearch);


							}
					});

//Click on the seach button to start the update of the properties
$("#searchButton").click(function(){
									var userSearch = inputSearch.value;
									searchQueryUser = true;
									sparqlQuery(userSearch);

});


function sparqlQuery(userSearch){

	
if(searchQueryUser == true){

		$("div #textBox").show("textField")
		$("div #thumbnail").show("thumbnail");
		$("p").show();

    var url = "http://localhost:5820/animalKindgom/query/"; 
    var query = 
				
		"SELECT  ?thumbnailAnimal ?labelAnimal ?abstactAnimal ?kingdomAnimal ?phylumAnimal ?classAnimal ?orderAnimal ?familyAnimal ?typeOfFood "+  
				"WHERE {"+
				"dbr:"+ userSearch + " A:label ?labelAnimal."+
 	 			"dbr:"+ userSearch + " A:abstract ?abstactAnimal."+
				"dbr:"+ userSearch + " A:isThumbnailOf ?thumbnailAnimal."+
     		"dbr:"+ userSearch + " A:ofKingdom ?kingdomAnimal."+
     		"dbr:"+ userSearch + " A:ofPhylum ?phylumAnimal."+
  	 		"dbr:"+ userSearch + " A:ofClass ?classAnimal."+
				"dbr:"+ userSearch + " A:ofOrder ?orderAnimal."+
				"dbr:"+ userSearch + " A:ofFamily ?familyAnimal."+
				"dbr:"+ userSearch + " C:eats ?typeOfFood."+
				"}";
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
					//Get result of the query
						var animalLabel = results[0].labelAnimal.value;
						var animalTumbnail = results[0].thumbnailAnimal.value;
						var animalAbstract = results[0].abstactAnimal.value;
						var animalKingdom = results[0].kingdomAnimal.value;
						var animalPhylum = results[0].phylumAnimal.value;
						var animalClass  = results[0].classAnimal.value;
						var animalOrder  = results[0].orderAnimal.value;
						var animalFamily = results[0].familyAnimal.value;
						var typeOfFood = results[0].typeOfFood.value;

						
						updateProperties();


					function updateProperties(){
					
						animalKingdomURI = encodeURI(JSON.stringify(animalKingdom));
						var animalKingdomString = makeStringdbpedia(animalKingdomURI);
						
						animalPhylumURI = encodeURI(JSON.stringify(animalPhylum));
						var animalPhylumString = makeStringdbpedia(animalPhylumURI);

						animalClassURI = encodeURI(JSON.stringify(animalClass));
						var animalClassString = makeStringdbpedia(animalClassURI);
						
						animalOrderURI = encodeURI(JSON.stringify(animalOrder));
						var animalOrderString = makeStringdbpedia(animalOrderURI);
						
						animalFamilyURI = encodeURI(JSON.stringify(animalFamily));
						var animalFamilyString = makeStringdbpedia(animalFamilyURI);
						
						typeOfFoodURI = encodeURI(JSON.stringify(typeOfFood));
						var typeOfFoodString = makeStringOwnOntology(typeOfFoodURI);
							
					//Convert the URI in a String	
						function	makeStringdbpedia(animalURI){
								stringURI = encodeURI(JSON.stringify(animalURI));
								stringArray = stringURI.split("%22%2522http://dbpedia.org/resource/");
								stringArray = stringArray[1].split("%2522%22");
							return stringArray;
							}
						
						//Convert the URI in a String	
						function	makeStringOwnOntology(URI){
								stringURI = encodeURI(JSON.stringify(URI));
								stringArray = stringURI.split("#");
								stringArray = stringArray[1].split("%2522%22");
							return stringArray;
							}
						
						//Update the elements on HTML file

						nameAnimal.innerHTML = animalLabel;;
						$("img").attr("src", animalTumbnail);
						abstractAnimal.innerHTML = animalAbstract;
						document.getElementById('animalKingdom').innerHTML = animalKingdomString[0]
						document.getElementById('animalPhylum').innerHTML = animalPhylumString[0]
						document.getElementById('animalClass').innerHTML = animalClassString[0]
						document.getElementById('animalOrder').innerHTML = animalOrderString[0]
						document.getElementById('animalFamily').innerHTML = animalFamilyString[0]
						document.getElementById('animalFamily').innerHTML = animalFamilyString[0]
						document.getElementById('typeOfFood').innerHTML = typeOfFoodString[0]
							

						};

        }
    });
	
};
	
}
