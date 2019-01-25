  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA-6eVIIGHkd9v-K_fHVtSG0djDNk2GsIU",
    authDomain: "train-time-4029b.firebaseapp.com",
    databaseURL: "https://train-time-4029b.firebaseio.com",
    projectId: "train-time-4029b",
    storageBucket: "train-time-4029b.appspot.com",
    messagingSenderId: "352201050861"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  $("#add-train").on("click", function(event) {
      event.preventDefault();


//pull user input

    var trainName = $("#name-input").val().trim();
    console.log(trainName);
    var trainDestination = $("#destination-input").val().trim();
    console.log(trainDestination);
    var firstTrainTime = $("#time-input").val().trim();
    console.log(firstTrainTime);
    var trainFrequency = $("#frequency-input").val().trim();
    console.log(trainFrequency);


    //create local object for train data
    var newTrain = {
        name: trainName,
        destination:trainDestination,
        trainTime:firstTrainTime,
        frequency:trainFrequency
    };

    //upload train data to database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.trainTime);
    console.log(newTrain.frequency);

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");


  });

  database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

      var trainName = childSnapshot.val().name;
      var trainDestination = childSnapshot.val().destination;
      var firstTrainTime = childSnapshot.val().trainTime;
      var trainFrequency = childSnapshot.val().frequency;

      //difference in times 
      var diffTimes = moment().diff(moment(firstTrainTime, 'X'), "minutes");
      var tRemainder = diffTimes % trainFrequency;
      var minAway = trainFrequency - tRemainder;
      console.log(minAway);


      //new row
      var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(trainDestination),
          $("<td>").text(trainFrequency),
          $("<td>").text(moment().add(minAway, "m").format("hh:mm")),
          $("<td>").text(minAway),

      );

      //append new row to table
      $("#train-schedule-table > tbody").append(newRow);

  });