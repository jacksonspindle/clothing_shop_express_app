const express = require('express')
const app = express()
const { conn, Shoes, Owners } = require('./db')

app.use('/static', express.static('static'))


app.post('/', async(req, res, next) => {
    try {
        await Shoes.create(req.body) 
        res.redirect('/')       
    } catch (ex) {
        next(ex)
    }
})


app.get('/:id', async (req, res, next) => {
        const shoes = await Shoes.findByPk(req.params.id, {
            include: [ Owners ]
        })

        const owners = await Owners.findAll({
        })

    try {
        res.send(`
         <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Shoes</title>
            <link rel="stylesheet"  href="/static/style.css"/>
        </head>
        <body>
            
            <h1>SHOES</h1>
            
            <div class="shoe-card-container">
            <h2>${shoes.name}</h2>
                <img src=${shoes.image} />
                
                <h4>${shoes.size}</h3>
                <p>${shoes.description}</p>
            </div>
        </body>
        </html>
        `)
    } catch (ex) {
        next(ex)
    }
})




app.get('/', async (req, res, next) => {
    try {
        const shoes = await Shoes.findAll({
            include: [ Owners ]
        })

        const owners = await Owners.findAll({
        })
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Shoes</title>
            <link rel="stylesheet"  href="/static/style.css"/>
        </head>
        <body>
           
            <h1>SHOES</h1>
            <div class="card-container">
                <ul>
                    ${shoes.map((shoe) => {
                        return `
                        <div class="shoe-card-container">
                        <a href="/${shoe.id}"> <img src=${shoe.image} /></a>
                        <li>${shoe.name}</li>
                        </div>`
                    }).join(' ')}
                </ul>
            </div>
        </body>
        </html>
    `)
    } catch (ex) {
        next(ex)
    }
})


const setup = async() => {
    try {
      await conn.sync({ force: true})
      const [ airForce1, jordan4BlackCat, jordan4CactusJack ] = await Promise.all([
        Shoes.create({name: 'Air Force 1', size: 5.6, image: './static/img/airforce1.png', description: 'The Air Force is a range of athletic shoes made by Nike that began with the Air Force 1[1] and went on to include the Air Force 2, Air Force 3, Air Force STS, Air Force 5, Air Force XXV and Air Force 09.'}),
        Shoes.create({name: 'Jordan 4 Black Cat', size: 6, image: './static/img/jordan4blackcat.png'}),
        Shoes.create({name: 'Joran 4 Cactus Jack', size: 9.5, image: './static/img/jordan4cactusjack.png'})
      ])
      
      const port = 3002
      app.listen(port, () => {
        `listening to port ${port}`
      })  
      console.log(airForce1)
    } catch (ex) {
        console.log(ex)
    }
}

setup()