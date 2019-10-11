$(document).ready(function() {
  var newWorkoutForm = $("form.workout");
  var strokeInput = $("input#stroke-input");
  var distanceInput = $("input#distance-input");
  var repsInput = $("input#reps-input");
  var intervalInput = $("input#time-input");

  newWorkoutForm.on("submit", function(event) {
    console.log("workout submitted");
    event.preventDefault();
    var workoutData = {
      stroke: strokeInput.val().trim(),
      distance: distanceInput.val().trim(),
      reps: repsInput.val().trim(),
      interval: intervalInput.val().trim()
    };
    console.log(workoutData);
    if (!workoutData.stroke || !workoutData.distance) {
      return;
    }
    logWorkout(workoutData.stroke, workoutData.distance, workoutData.reps, workoutData.interval);
    strokeInput.val("");
    distanceInput.val("");
    repsInput.val("");
    intervalInput.val("");
  });

  function logWorkout(stroke, distance, reps, interval) {
    console.log("function log Workout called");
    $.post("/api/newWorkout", {
      stroke: stroke,
      distance: distance,
      reps: reps,
      interval: interval
    }).then(function(data)  {
      console.log("yay workout logged");
      window.location.replace("/members");
    })
    .catch(err => handleWorkoutErr(err))
  }

  function handleWorkoutErr(err) { 
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
