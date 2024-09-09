const client = require("./client");

const createReservation = async ({ userId, booksid }) => {
  try {
    const SQL = `INSERT INTO reservations(userid, booksid) VALUES($1, $2) RETURNING *`;
    const {
      rows: [result],
    } = await client.query(SQL, [userId, booksid]);
    return result;
  } catch (err) {
    throw err;
  }
};

const getReservation = async (id) => {
  try {
    const SQL = `SELECT * FROM reservations WHERE id=$1`;
    const {
      rows: [result],
    } = await client.query(SQL, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

const getUsersReservations = async(userid) => {
  try{
    const SQL = 'SELECT reservations.id, books.title, books.description, books.coverimage, books.author FROM reservations JOIN books ON reservations.booksid = books.id AND userID=$1';

    const { rows } = await client.query(SQL, {userID});
    if(!rows) return;
    console.log(rows);
    return rows;

  } catch (err) { 
    throw(err)
  }
}

const deleteReservation = async (id) => {
  try {
    const SQL = `DELETE FROM reservations WHERE id=$1 RETURNING *`;
    const {
      rows: [result],
    } = await client.query(SQL, [id]);
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { createReservation, getReservation, getUsersReservations, deleteReservation };
