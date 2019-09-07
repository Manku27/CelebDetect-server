const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
	users : [
		{
			id: '123',
			name : 'checkcheck',
			email: 'why.even@gmail.com',
			password : 'secret',
			entries : 0,
			joined: new Date()
		},
		{
			id: '456',
			name : 'check2check',
			email: 'why2.even2@gmail.com',
			password : 'secret2',
			entries : 0,
			joined: new Date()
		}
	] , 
	login : [
	{
		id : '999',
		hash: '',
		email: 'oki@gmail.com'
	}]
}

app.get('/',(req,res) => {
	res.send(database.users);
})

app.get('/profile/:id' , (req,res) => {
	const{id} = req.params;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id){
			found = true;
			return res.json(user);
		}
	})
	if(!found){
		res.status(400).json('noppppeee')
	}
})

app.post('/signin', (req,res) => {
	bcrypt.compare("secret", '$2a$10$t9YPuc3hW8EIa8tixDGvm.vbHHdde9JxQzb5iEZdqmLKTY5z0k.s2', function(err, res) {
    console.log('1 guess', res);
	});
	bcrypt.compare("veggies", '$2a$10$t9YPuc3hW8EIa8tixDGvm.vbHHdde9JxQzb5iEZdqmLKTY5z0k.s2', function(err, res) {
    console.log('2 guess', res);
	});
	if(req.body.email === database.users[0].email
		&& req.body.password === database.users[0].password){
		res.json(database.users[0]);
	} else {
		res.status(400).json('error')
	}
})

app.post('/signup',(req,res) =>{
	const{email, name, password} = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
	console.log(hash);
	});
	database.users.push({
		id: '678',
		name : name,
		email: email,
		password : password,
		entries : 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.put('/image', (req,res) => {
	const{id} = req.body;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id){
			found = true;
			user.entries++
			return res.json(user.entries);
		}
	})
	if(!found){
		res.status(400).json('noppppeee')
	}
})

app.listen(3000, ()=> {
	console.log('app runs on port 3000')
}

)