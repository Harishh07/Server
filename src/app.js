const sequelize =  require("./db/dbconnect");
const express = require("express");
var cors = require('cors');
const app = express();
app.use(cors());
const Book = require("../models/book_schema");
const { where } = require("sequelize");
var router = express.Router()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

sequelize.sync().then(res=> console.log("Working!")).catch(err => console.log(err));

//API'S

//1.Display all books (GET)
app.get("/",async function(req,res){

    try{
        const books = await Book.findAll(); 
        res.send(books);
    }catch(err){
        next(err);
        return;
    }
});

//2. GET a book using it's BOOK ID
app.get("/:id",async function(req,res){
    const bookId = parseInt(req.params.id);
    console.log(bookId);
    const book = await Book.findAll({

        where:{
            id:bookId
        }
    });
    if(Object.keys(book).length === 0)
        res.status(404).send({msg:"Sorry! Book doesn't exist!"});
    else
        res.send(book);

});


//3. Insert a new Book to the DATABASE
app.post("/",async function(req,res){

    const {name,author,price} = req.body;
    const book = await Book.create({name:name,author:author,price:price});
    res.send(book);
});

//4. Delete a book by its ID


app.delete("/delete/:id",async (req,res,next) => {

    
    const bookId = parseInt(req.params.id);
    const deletedBook = await Book.destroy({
        where:{
                id:bookId
        }
    });
    res.send("Book Removed successfully!!");
    
});




//5. Update the Book using its ID


app.put("/update/:id",async (req,res,next) => {

   
        const bookId = parseInt(req.params.id);
        const {name,author,price} = req.body;
        const updatedBook = await Book.update({name:name,author:author,price:price},{
            where:{
                id:bookId
            }
        }); 
        console.log(updatedBook);
        if(updatedBook[0]==0)
        res.status(404).send({msg:"Sorry! Book doesn't exist!"});
        else
        res.status(200).send({msg:"Book Updated Successfully!"});
});

//6. Deleting all records from the Database


app.delete("/del",async (req,res,next) => {

    try{
        const deletedBooks = await Book.destroy({
            truncate:true
        });
        res.send("All Records Removed Successfully!!");
    }catch(err){
        next(err);
        return;
    }
});




app.listen(3000,() => {
    console.log("Server listening on port 3000.");
});



