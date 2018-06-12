$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBzLJP__7ARRe_w2bS--SzPSn_6NH_dNLU",
        authDomain: "adddatabase-eff03.firebaseapp.com",
        databaseURL: "https://adddatabase-eff03.firebaseio.com",
        projectId: "adddatabase-eff03",
        storageBucket: "adddatabase-eff03.appspot.com",
        messagingSenderId: "53490192758"
    };
    firebase.initializeApp(config);
    // Create a variable to reference the database
    var database = firebase.database();

    //Intial Values
    //var name = "";
    //var destination = "";
    //var traintime = 0;
    //var frequency = 0
    //On click event trigger when submit button is pushed that generates rows
    $("#add-train").on("click", function (event) {
        // Don't refresh the page!
        event.preventDefault();
        //create row
        //$('#myTable tr:last').after('<tr><th id="name-display" scope="row"></th> <td id="role-display"></td><td id="date-display"></td><td id="rate-display"></td></tr>');
        // YOUR TASK!!!
        // Code in the logic for storing and retrieving the most recent user.
        // Don't forget to provide initial data to your Firebase database.
        var name = $("#train-name").val().trim();
        var destination = $("#destination-new").val().trim();
        var traintime = $("#traintime-new").val().trim();
        var frequency = $("#frequency-new").val().trim();

        database.ref().push({
            name: name,
            destination: destination,
            traintime: traintime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        //$("input").val("");
        //return false;
    });
    //database.ref().push(newtrain);

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function (childSnapshot) {

        var name = childSnapshot.val().name;
        var dest = childSnapshot.val().destination;
        var time = childSnapshot.val().traintime;
        var freq = childSnapshot.val().frequency;

        // Log everything that's coming out of snapshot
        console.log(name);
        console.log(dest);
        console.log(time);
        console.log(freq);

        //Convert time
        var freq = parseInt(freq);
        var dconvert = moment(childSnapshot.val().traintime, 'hh:mm').subtract(1, 'years');
        var trainT = moment(dconvert).format('hh:mm');
        console.log("Date convert = " + dconvert);
        console.log("Train Time = " + trainT);

        var tconvert = moment(trainT, "HH:mm").subtract(1, "years");
        var tdiff = moment().diff(moment(tconvert), "minutes");
        console.log("time difference=" + tdiff);
        var tremain = tdiff % freq;
        console.log("time remain=" + tremain);
        var mins = freq - tremain;
        console.log("minutes=" + mins);
        var nextT = moment().add(mins, "minutes")
        console.log("Next train=" + nextT);
        console.log(moment(nextT).format("HH:mm"));


        // full list of items to the well
        $("#tbody").append(
            "<tr><td id='name-display'>" + childSnapshot.val().name +
            " </td><td id = 'destination-display'> " + childSnapshot.val().destination +
            " </td><td id = 'frequency-display'> " + childSnapshot.val().frequency +
            " </td><td id = 'arrival-display'> " + moment(nextT).format("HH:mm") +
            " </td><td id = 'minutes-display'> " + mins + " </td></tr>");

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);

        // Handle the errors
    });

});