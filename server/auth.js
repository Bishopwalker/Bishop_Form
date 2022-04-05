const bcrypt = require('bcrypt')
module.exports ={
    register: async(req, res) => {
        const { firstname,email, password } = req.body;
        const db = req.app.get('db');
    const foundUser = await db.check_user(email);
    //check if user exists
        if(foundUser[0]){
            console.log('user already exists')
            return res.status(409).send('Email already in use');
        }
        //hash password
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        //Registering user and sending the session client-side
        const newUser = await db.register(firstname, email, hash);
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },
    login: async(req, res) => {
        const { email, password } = req.body;
        const db = req.app.get('db');
        const foundUser = await db.check_user(email);
        if(!foundUser[0]){
            return res.status(404).send('Email not found');
        }
        const authenticated = bcrypt.compareSync(password, foundUser[0].password);
       if(!authenticated){
           return res.status(401).send('Incorrect password');
       }
       //setting session
        delete foundUser[0].password;
        req.session.user = foundUser[0];
        res.status(202).send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    logMeIn:async(req, res) => {
        const db = req.app.get('db');
        if(req.session.user){
            console.log(req.session.user)
            const me = await db.get_user(req.session.user.id);
            res.status(200).send(req.session.user);
        }else{
            res.status(401).send('Please log in');
        }
    }
}