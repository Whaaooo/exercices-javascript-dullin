// Define a Person constructor function.
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  // Add a method to the Person prototype that returns the full name
  // of the person (i.e. the first and last name concatenated).
  Person.prototype.getFullName = function() {
    return this.firstName + " " + this.lastName;
  }
  
  // Define a function that takes another function as an argument and
  // returns a new function that wraps the input function and logs the
  // arguments and return value of the input function whenever it is called.
  function logFunction(fn) {
    return function() {
      let args = [].slice.call(arguments);
      let result = fn.apply(this, args);
      console.log("Function called with arguments:", args);
      console.log("Function return value:", result);
      return result;
    }
  }
  
  // Use the logFunction to create a new function that wraps the
  // getFullName method of the Person prototype and logs its arguments
  // and return value whenever it is called.
  let loggedGetFullName = logFunction(Person.prototype.getFullName);
  
  // Create a new person and use the loggedGetFullName function to get
  // their full name, which will be logged to the console.
  let person = new Person("John", "Doe");
  console.log(loggedGetFullName.call(person));


  console.log("\nI fell in love with a frog one day\n"
            + "As I walked by a pond and saw him lay\n"
            + "His skin was green, his eyes so bright\n"
            + "I knew in that moment, our love was right\n\n"
            
            + "At first I hesitated, unsure if it was wise\n"
            + "To love a creature of a different size\n"
            + "But as I watched him hop and play\n"
            + "I couldn't help but feel my heart sway\n\n"
            
            + "He taught me to see the world in a new light\n"
            + "To find beauty in the simplest things in sight\n"
            + "With him by my side, I feel complete\n"
            + "Our love is strong, and can't be beat\n\n"
            
            + "So if you see us out and about\n"
            + "Don't be surprised, or have any doubt\n"
            + "Our love is real, and here to stay\n"
            + "A frog and I, in love, forever and a day\n"
  );