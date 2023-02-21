
const request=require('request')
const forecast=(latitude,longitude,callback)=>
{
    const url='http://api.weatherstack.com/current?access_key=7fbebbb0bf2e8ad9d067374498175dfe&query='+latitude+','+longitude
    request({url:url,json:true},(error,response)=>
    {
        if(error)
        {
            callback('Unable to connect weather server.')
        }
        else if(response.body.error)
        {
            callback('Unable to find location please try.')
        }
        else{
            const data=response.body
            const rainDetails=data.current.precip
            callback(undefined,"Today is "+data.current.weather_descriptions[0] +', temperature is '+response.body.current.temperature +' degree Celsius and chances of rain is '+ rainDetails+' %.')
        }
    })
}



module.exports=forecast