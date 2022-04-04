import {setupWorker, rest} from 'msw'

const worker = setupWorker(
  rest.get('http://localhost:3003/form/users-test/', (req, res, ctx) => {
    return res(
      ctx.json([

            {
                id:0,
                age: 4,
                lastName: 'Bloggs',
                firstName: 'Jim',
                hobbies: 'Everythign under the sun',
            },
            {
                id:1,
                age: 40,
                lastName: 'Smith',
                firstName: 'Jennifer',
                hobbies: 'Gardening',
            },
          {
              id:2,
              age: 44,
              lastName: 'Sambu',
              firstName: 'Williams',
              hobbies: 'Everythign under the sun',
          },
          {
              id:3,
              age: 50,
              lastName: 'Susuz',
              firstName: 'Hobbies',
              hobbies: 'Everythign under the sun And Nothing at all',
          }]
      )
  )}
  )
  )
worker.start()
