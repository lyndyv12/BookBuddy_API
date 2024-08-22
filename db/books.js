const client = require("./client");

const getBooks = async () => {
    try {
        const SQL = `SELECT * FROM books`;
        const { rows } = await client.query(SQL);
        if (!rows) {
            return {message: "something went wrong"}
        }
        return rows;
    } catch(err){
        console.log(err);
    }
};

const getBookbyID = async (id) => {
    try {
        const SQL = `SELECT * FROM books WHERE id=$1`;
        const { 
            rows: [book], 
        } = await client.query(SQL, [id]);
        return book;
    } catch(err){
        console.log(err);
    }
};


const createBook = async({ title, author, description, coverimage, available }) => {
    try{
        const SQL= `INSERT INTO books(title, author, description, coverimage, available) VALUES($1, $2, $3, $4, $5) RETURNING *`
        const {
            rows: [book],
        } = await client.query(SQL, [
            title, 
            author, 
            description, 
            coverimage,
            available
        ]);
        console.log(book)
    } catch(err){
        console.log(err);
    }
};

module.exports = { getBooks, createBook, getBookbyID };