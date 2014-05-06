var ldf = require('ldf-client'),
      SparqlQuerySolver = ldf.SparqlQuerySolver,
      LinkedDataFragmentsClient = ldf.LinkedDataFragmentsClient,
      Logger = ldf.Logger,
      N3 = require('n3');
// Create the client to solve the query

var config = {
  "datasource": "http://localhost:5000/fcf",
  "prefixes": {
    "rdf":         "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "gpml":     "https://wikipathways.firebaseio.com/.json"
  }
};

var query = 'SELECT * WHERE { ?s <http://www.biopax.org/release/biopax-level3.owl#UnificationXref> ?o } LIMIT 10';


      var client = new LinkedDataFragmentsClient(config),
          querySolver = new SparqlQuerySolver(client, config.prefixes);
      querySolver.getQueryResults(query)
      .then(function (result) {
        // Display result rows
        if (result.rows) {
          console.log(JSON.stringify(result.rows, null, '  '));
        }
        // Display Turtle
        else {
          var writer = new N3.Writer(config.prefixes);
          writer.addTriples(result.triples);
          writer.end(function (error, turtle) {
            // Display error or Turtle result
            if (error) return console.log(error);
            console.log(turtle);
          });
        }
      })
      .fail(function (error) { console.log(error.message); })
      .fin(function () { $execute.prop('disabled', false); });
