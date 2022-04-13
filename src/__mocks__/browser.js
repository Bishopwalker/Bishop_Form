import {setupWorker, rest} from 'msw'


export const worker = setupWorker(
  rest.get('http://localhost:3003/form/users/', (req, res, ctx) => {
    return res(
      ctx.json([

            {
                id:0,
                age: 4,
                lastname: 'Bloggs',
                firstname: 'Jim',
                hobbies: 'Everythign under the sun, fishing, swimming, and reading',
            },
            {
                id:1,
                age: 40,
                lastname: 'Smith',
                firstname: 'Jennifer',
                hobbies: 'Gardening, cooking, and reading',
            },
          {
              id:2,
              age: 44,
              lastname: 'Sambu',
              firstname: 'Williams',
              hobbies: 'Everythign under the sun, fishing, swimming, and reading, soccer, work, and smoking',
          },
          {
              id:3,
              age: 50,
              lastname: 'Susuz',
              firstname: 'Hobbies',
              hobbies: 'Everythign under the sun And Nothing at all',
          }]
      )
  )}
  ),
    rest.get('http://localhost:3003/form/users/:id', (req, res, ctx) => {
        const user = req.body.searchParams.get('email');

       if(user === 'a@a.com'){
           return res(
               ctx.json({
                   id:0,
                   age: 4,
                   lastName: 'Ammar',
                   firstName: 'Hassan',
                   hobbies: 'Everythign under the sun',
               })
           )
       }
       }),

    rest.post('http://localhost:3003/auth/login/', (req, res, ctx) => {
     //   const user = req.body.searchParams.get('email');


            return res(
                ctx.json({
                    id: 0,
                    age: 4,
                    lastName: 'Ammar',
                    firstName: 'Hassan',
                    hobbies: 'Everythign under the sun',
                })
            )

    })

  )

worker.start()