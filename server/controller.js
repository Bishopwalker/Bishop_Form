module.exports ={
    getUsers: async (req, res) => {
        const db = req.app.get('db');
        console.log('hit')
        const users = await db.get_users();
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
        const {id,firstName, lastName, age, hobby} =  req.body;
        const user = await db.add_user({id,firstName, lastName, age, hobby});
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
        const {id,firstName, lastName, age, hobby} =  req.body;
        const user = await db.update_user({id,firstName, lastName, age, hobby});
        return res.status(200).send(user);
    }

}