module.exports ={
    getUsers: async (req, res) => {
        const db = req.app.get('db');
        console.log('hit')
        const users = await db.get_users();
        console.log(users)
        return res.status(200).send(users);
    },
    getUserById: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const user = await db.get_user({id});
        return res.status(200).send(user);
    },
    addUser: async (req, res) => {
        const db = req.app.get('db');
        console.log(req.body)
        const {firstname, lastname, person_age, hobby} =  req.body;
        const user = await db.add_user(firstname, lastname, person_age, hobby);
        return res.status(200).send(user);

    },
    deleteUser: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const user = await db.delete_user({id});
        return res.status(200).send(user);
    },
    updateUser: async (req, res) => {
        const db = req.app.get('db');
        const {id,firstName, lastName, person_age, hobby} =  req.body;
        const user = await db.update_user({id,firstName, lastName, person_age, hobby});
        return res.status(200).send(user);
    }

}