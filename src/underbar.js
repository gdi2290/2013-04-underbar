var _ = {};

(function() {

  // Return an array of the last n elements of an array. If n is undefined,
  // return just the last element.
  _.last = function(array, n) {
    if (n === undefined || n === 1) {
      return array.pop();
    } else if (Array.isArray(array) === false) {
      var tempArray = [];
      for (var i = (array.length - 1); i >= n; i--) {
        tempArray.unshift(array[i]);
      }
      return tempArray;
    }
    return array.splice(-n,n);
  };

  // Like last, but for the first elements
  _.first = function(array, n) {
    // TIP: you can often re-use similar functions in clever ways, like so:
    var tempArray = [];
    if (n === undefined || n === 1) {
      // return _.last(array.reverse(), n);
      return array.shift();
    } else {
      for (var i = 0; i < (Math.min(n, array.length)); i++) {
        tempArray.push(array[i]);
      }
    }

    // array = [].slice.call(array);
    // return _.last(array.reverse(), n).reverse()
    return tempArray;
  };


  // Call iterator(value, key, collection) for each element of collection
  _.each = function(obj, iterator) {
    // console.log(obj);
    // console.log(iterator);
    if(!obj) return;
    if(obj.length){
      for (var i = 0; i < obj.length; i++) {
        iterator(obj[i],i, obj);
      }
    } else {
      for(var key in obj){
        if (obj.hasOwnProperty(key)) {
          iterator(obj[key], key, obj);
        }
      }
    }

  };

  /*
   * TIP: Here's an example of a function that needs to iterate, which we've
   * implemented for you. Instead of using a standard `for` loop, though,
   * it uses the iteration helper `each`, which you will need to write.
   */

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var answers = [];
    _.each(collection, function(array) {
      if (iterator(array)) {
        answers.push(array);
      }
    });
    return answers;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    var answers = [];
    _.each(collection, function(array) {
      if (!iterator(array)) {
        answers.push(array);
      }
    });
    return answers;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    // console.log(array);
    var answers = [];
    _.each(array, function(index) {
      if (_.indexOf(answers, index) == -1) {
        answers.push(index);
      }
    });
    return answers;
  };


  /*
   * map() is a useful primitive iteration function that works a lot
   * like each(), but in addition to running the operation on all
   * the members, it also maintains an array of results.
   */

  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var answers = [];
    for (var i = 0; i < array.length; i++) {
      answers[i] = iterator(array[i]);
    }
    return answers;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(obj, propertyName) {
    return _.map(obj, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName) {

    return _.map(list, function(value){
      return value[methodName] ? value[methodName].apply(value) : methodName.apply(value);
    });

  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(obj, iterator, initialValue) {
  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  // console.log(obj);
  // console.log(iterator);
  // console.log(initialValue);
  var answer = initialValue || 0;
  _.each(obj, function(stuff) {
    answer = iterator(answer, stuff);
  });
  return answer;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: A lot of iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item){
      if(wasFound){
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(objects, iterator) {
    // TIP: use reduce on this one!
    // console.log(objects);
    // console.log("_____________")
    // console.log(iterator);
    // console.log("------")
    // console.log("")
    // var answer = true
    iterator = iterator || function(stuff) {
      return stuff;
    };
    for (var i = 0; i < objects.length; i++) {
      if (!iterator(objects[i])) {
        return false;
      }

    }
    return true;

  //   return _.reduce(objects, function(obj, item){
  //     if(obj){
  //       return true;
  //     }
  //     return iterator(item);
  //   }, false);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.any = function(objects, iterator) {
    // debugger;
    iterator = iterator || function(stuff) {
      return stuff;
    };
    return ! _.every(objects, function(object){
      return ! iterator(object);
    });





    // TIP: re-use every() here
    // var objects = objects || function(stuff) {
    //    return Boolean(stuff);
    //  };
    // _.each(objects, function(obj) {
    //   if (iterator(obj)) {
    //     return true;
    //   }
    // });
    // return false;


    // console.log(iterator);
    // console.log("------------------")

    //   //     if (!iterator && objects[i]) {
    //   //   return true;
    //   // }
    //   if (iterator == undefined && objects.length) {
    //     console.log("first one");
    //     // if (_.contains(objects, String())) {
    //     //   return true;
    //     // }
    //     return _.contains(objects, true);

    //   } else {
    //     for (var i = 0; i < objects.length; i++) {
    //       console.log(objects[i])
    //       console.log(iterator(objects[i]))
    //       // if (!iterator) {
    //         // return false;
    //       // }
    //       if (iterator(objects[i])) {
    //         return true;
    //       }
    //     };
    //     return false;
    //   }
    //   return false;
    // return !_.every(onjects, iterator);
  };


  /*
   * These are a couple of helpers for merging objects
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {key2: "something new", key3: "something else new"}, {bla: "even more stuff"} );
   // obj1 now contains key1, key2, key3 and bla

  // {}, {a:'b'}
  _.extend = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        obj[key] = arguments[i][key];
      }
    }
    // for (var key in arguments[1]) {
    //   // throw arguments[1][0];
    //   // debugger;
    //   obj[key] = arguments[1][key];
    // }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  };


  /*
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a `closure scope` (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
  // function that is called by a function
  var cache = {};

  return function() {
      if (cache.hasOwnProperty(arguments)) {
        return cache[arguments];
      } else {
        return cache[arguments] = func.apply(this, arguments);
      }
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    if (arguments[2]) {
      setTimeout(func(arguments[2],arguments[3]),wait);
    }
    setTimeout(func,wait);
  };


  /*
   * Advanced collection operations
   */
  _.range = function(topNum) {
    var returnArray = [];
    for (var i = 0; i < topNum.length; i++) {
      returnArray.push(i);
    }
    return returnArray;
  };
  // Shuffle an array.
  // _.shuffle = function(obj) {
  //   var returnSet = [];
  //   while(obj.length) {
  //     var index = ~~(Math.Random() * (obj.length + 1));
  //       returnSet.push(obj[index]);
  //       obj.slice();
  //   }
  //   return returnSet;
  // };
  // _.shuffle = function(obj) {
  //   var returnSet = [];
  //   while(obj.length) {
  //     var index = ~~(Math.Random() * (obj.length + 1));
  //       returnSet.push(obj[index]);
  //       // obj.slice();
  //     var newObj = [];
  //     for (var i = 0; i < obj.length; i++) {
  //       if(i !== index){
  //         newObj.push(obj[i]);
  //       }
  //     }
  //     obj = newObj;
  //   }
  //   return returnSet;
  // };
    _.shuffle = function(obj) {
    var returnSet = [];
    while(obj.length) {
      var index = ~~(Math.Random() * (obj.length + 1));
      returnSet.push(obj[index]);
      delete obj[index];
    }
    return returnSet;
  };
  /* (End of pre-course curriculum) */

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3]]
  _.zip = function() {
  };

  // Flattens a multidimensional array to a one-dimensional array that
  // contains all the elements of all the nested arrays.
  //
  // Hints: Use Array.isArray to check if something is an array
  //
  _.flatten = function(nestedArray, result) {
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /*
   * Offroad
   */

  // EXTRA CREDIT:
  // Return an object that responds to chainable function calls for
  // map, pluck, select, etc
  //
  // See README for details
  _.chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See README for details
  _.throttle = function(func, wait) {
  };

}).call(this);
