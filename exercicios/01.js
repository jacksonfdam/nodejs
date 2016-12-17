example = function (optionalArg) {
  optionalArg = optionalArg || "No parameter was passed"
  console.log(optionalArg);
}

betterExample = function (optionalArg) {
  if (typeof optionalArg === 'undefined') {
    optionalArg = "No parameter was passed"
  }
  console.log(optionalArg);
}

console.log("Without parameter:");
example();
betterExample();

console.log("\nWith paramater:");
example("parameter was passed");
betterExample("parameter was passed");

console.log("\nEmpty String:");
example("");
betterExample("");