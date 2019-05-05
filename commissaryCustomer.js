// Initialize NPM packages 
var mysql = require("mysql");
var inquirer = require("inquirer");
// const cTable = require("console.table");

// Set the port of our application
// process.env.PORT lets the port be set by Heroku

// MySQL connection, so that it looks to the SQL page for the table to be built.
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password:(didnt build it with a password)
  password: "",
  database: "commissary_db"
});
// Connection with the server, and loads data once successfully connected
  connection.connect(function(err) {
    if (err) {
      console.error("YOU ARE HAVING THESE ISSUES WITH THE CONNECTION " + err);
    }
    // Section to show there has been a sho hit and a friendly welcome
    console.log("Welcome to the...");
    // console.log(" _______  _____  _     _ __   _ _______ _______         _____   ______      _______  _____  _______ _______ _____ _______ _______ _______  ______ __   __");
    // console.log(" |       |     | |     | | \  | |       |______ |      |     | |_____/       |       |     | |  |  | |  |  |   |   |______ |______ |_____| |_____/   \_/  ");
    // console.log(" |_____  |_____| |_____| |  \_| |_____  |______ |_____ |_____| |    \_        |_____  |_____| |  |  | |  |  | __|__ ______| ______| |     | |    \_    |   ");
    console.log("");
    console.log("+-+-+-+-+-+-+-+-+-+    +-+-+-+-+-+-+-+-+-+-+");
    console.log("|C|o|u|n|c|e|l|o|r|    |C|o|m|m|i|s|s|a|r|y|");
    console.log("+-+-+-+-+-+-+-+-+-+    +-+-+-+-+-+-+-+-+-+-+");
    console.log("");
    // Friendly greeting about the store and sales
    console.log("These are the products currently for sale! Take a peek and see if anthing is appealing!")
    console.log("");
    displayAll();
  });

  
// Loads the products table from the server on successful connection
  function displayAll() {
    // pulls data with these identifiers from the mySQL table
    connection.query("SELECT id, product_name, department_name, price, stock_quantity FROM products", function(err, res) {
      if (err) throw err;
        // Makes a nice little table of the data
        console.table(res);
        console.log("");
        // triggers the content that asks the customer what they would like to purchase
        customerInput(res);
      });
    };


//INQUIRER SECTION  
function customerInput(commissaryInventory){
  // asks user what they would like to order and quantity
  inquirer.prompt([
    // user picks which one of the products they would like to purchase
    {
      type: "input",
      name: "customerChoice",
      message: "What is the ID number of the product you would like to purchase? [Quit with Q]",
      // choices: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
      validate: function(val) {
        return !isNaN(val) || val.toLowerCase() === "q";
      }
    }
  ])
  .then(function(val) {
    // check if the user wants to exit the program
    bailMePleaseIHaveNoMoney(val.customerChoice);
    var productId = parseInt(val.customerChoice);
    var product = checkInventory( productId, commissaryInventory)

    // If there is a product with the id the user chose, prompt the customer for how many they want
    if (product) {
      // Pass the chosen product to promptCustomerForQuantity
      howManyYouWant(product);
    }
    else {
      // Otherwise let them know the item is not in the inventory, re-run loadProducts
      console.log("\n That item is not in the inventory.");
      displayAll();
    }
  })
}

// prompt user for how many of the product they hope to purchase
function howManyYouWant(product) {
  inquirer.prompt([
    {
      type: "input",
      name: "quantity",
      message: "How many would you like to purchase?",
    }
  ])
  .then(function(val){
    var quantity = parseInt(val.quantity);
    // let the user know if shop is out of product
    if(quantity > product.stock_quantity){
      console.log("\n We're sorry! There isnt enough of that product.")
      displayAll();
    }
    else{
      //OTHERWISE let them purchase!! GET CARRIED AWAY!
      buyThatThangGuh(product, quantity)
    }
  });
}

function buyThatThangGuh(product, quantity) {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [{stock_quantity: product.stock_quantity - quantity}, {id: product.id}],
    function(err, res){
      // console.log('Response Post Purchase', res)

      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!")
      console.log("\n Hope you enjoy your purchased item from The Commissary!");
      // console.log("");
      // console.log("");
      // console.log("");
      // console.log("");
      // console.log("");
      // console.log("");
      // console.log("");
      // console.log("");
      // console.log("");
      // console.log("");
      // console.log("");
      // console.log("");
      // console.log("");
      // console.log("");
      // console.log("");
      // console.log("");
      // console.log("");

      displayAll();
    }
  );
}

// THIS IS WHERE WE CHECK TO MAKE SURE THAT THINGS ARE ACTUALLY IN THE SHOP
function checkInventory(productId, commissaryInventory){
  for (var i = 0; i < commissaryInventory.length; i++){
    if (commissaryInventory[i].id === productId){
      return commissaryInventory[i];
    }
  }
  return null;
}

// Making sure that if they want to quit they can
function bailMePleaseIHaveNoMoney(choice) {
  if(choice.toLowerCase() === 'q'){
    console.log('\n That is alright! Enjoy the day, and come back to visit again!');
    process.exit(0);
  }
}
