const app = require('./app');
const dotenv = require('dotenv');

//! ------------- config -------------
dotenv.config();

//! ------------- declaration var config -------------
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
	console.log(`Ramadhan Kareem Team 3! http://localhost:${PORT}`);
});
