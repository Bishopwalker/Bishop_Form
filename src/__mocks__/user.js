export const mockUser = (req, res, ctx) => {
    return res(
        ctx.json({
            id:1,
            firstname:'Hassan',
            lastname:'Ammar',
            age:38,
            hobbies:['coding','reading','writing']
        })
    )
}