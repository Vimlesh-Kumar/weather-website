const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express();

// Defining path for express config.
const publicDirpath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templetes/views')
const partialPath=path.join(__dirname,'../templetes/partials')

//setup static directory to server
app.use(express.static(publicDirpath))


//setup handlebar engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.get('',(req,res)=>
{
    res.render('index',{
        title:"Weather App",
        createdBy:"Vimlesh Kumar"
    })
})

app.get('/about',(req,res)=>
{
    res.render('about',{
        title:"Vimlesh",
        createdBy:"Kumar"
    })
})

app.get('/help',(req,res)=>
{
    res.render('help',
    {
        title:"Help",
        createdBy:"This page helps us to manage this app."
    })
})

app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send({
            error:"You must provide a address."
        })
    }
   
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location:location,
                address: req.query.address
            })
        })
    })

})
app.get('/help/*',(req,res)=>
{
    res.render('404',{
        title:404,
        errorMessage:"Help article Page not found."
    })
})

app.get('*',(req,res)=>
{
    // res.send("Page Not found. Error:404!")
    res.render('404',{
        title:404,
        errorMessage:"Page not found."
    })
})





app.listen(3000,()=>
{
    console.log("Express is running on port:3000")
})