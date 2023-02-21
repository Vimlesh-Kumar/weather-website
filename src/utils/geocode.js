
const request=require('request')

const geocoding=(address,callback)=>
{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidmltbGVzaDExIiwiYSI6ImNsZTg1MmoyYzA3N2Ezb2xyd3J3ZGNydjgifQ.uo1901s0_uIF82LCghKx7Q'
    request({url:url,json:true},(error,response)=>
    {
        if(error)
        {
            callback("Unable to connect to weather server",undefined)
        }
        else if(response.body.features.length===0)
        {
            callback('Unable to find location please try another search',undefined)
        }
        else {
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            const location=response.body.features[0].place_name
            //console.log(latitude, longitude)
            
            callback(undefined,{
                latitude:latitude,
                longitude:longitude,
                location:location
            })
        }
    })
}


module.exports=geocoding