window.addEventListener("load",()=>{
    document.getElementById("date").value = new Date().toJSON().slice(0, 10);
    getCountries()
})


document.getElementById("countries").addEventListener("change",()=>{
    cc = document.getElementById("countries").value
    document.getElementById("states").innerHTML ="<option selected>Select your State :</option>"
    
    getStates(cc)

})




document.getElementById("submit").addEventListener('click',()=>{
    let date = document.getElementById("date").value
    let year = date.slice(0,4)
    let month = date.slice(5,7)
    let day = date.slice(8,10)
    let country = document.getElementById("countries").value
    let state = document.getElementById("states").value


    getPrayerTime(year,month,day,state,country)
    .then(()=>{
        getAllMonthTable(year,month,day,state,country)
        document.getElementById("ctn").style.visibility = "visible"
        document.getElementById("ctn2").style.visibility = "visible"
    })

    

})



document.getElementById("reset").addEventListener('click',()=>{
    
    document.getElementById("countries").selectedIndex = 0;
    document.getElementById("states").innerHTML = "<option selected>Select your State :</option>" ;
    document.getElementById("ctn").innerHTML = ""
    document.getElementById("tab1").innerHTML = ""
    document.getElementById("current-m").innerHTML = ""

    document.getElementById("ctn").style.visibility = "hidden"
    document.getElementById("ctn2").style.visibility = "hidden"

})




function getPrayerTime(year,month,day,state,country)
{

    return new Promise ((resolve,reject)=>{
        axios.get('https://api.aladhan.com/v1/calendarByCity/'+year+'/'+month+'?city='+state+'&country='+country+'&method=16')

        .then(function (response) {

            month = response.data.data

            document.getElementById("ctn").innerHTML = ""
            for (const d of month) {
                if (day == d.date.readable.slice(0,2))
                document.getElementById("ctn").innerHTML += 
                `
                <div class="row">
                    <p><b>Date : ${d.date.readable} </b></p>

                    <div class="col-md-2 col-sm-4 col-6">
                        <div id="fa" class="box">
                            Fajr<br>
                            ${d.timings.Fajr.slice(0,5)}
                        </div>
                    </div>

                    <div class="col-md-2 col-sm-4 col-6">
                        <div id="su" class="box">
                            Sunrise<br>
                            ${d.timings.Sunrise.slice(0,5)}
                        </div>
                    </div>

                    <div class="col-md-2 col-sm-4 col-6">
                        <div id="dh" class="box">
                            Dhuhr<br>
                            ${d.timings.Dhuhr.slice(0,5)}
                        </div>
                    </div>

                    <div class="col-md-2 col-sm-4 col-6">
                        <div id="as" class="box">
                            Asr<br>
                            ${d.timings.Asr.slice(0,5)}
                        </div>
                    </div>

                    <div class="col-md-2 col-sm-4 col-6">
                        <div id="ma" class="box">
                            Maghrib<br>
                            ${d.timings.Maghrib.slice(0,5)}
                        </div>
                    </div>

                    <div class="col-md-2 col-sm-4 col-6">
                        <div id="is" class="box">
                            Isha<br>
                            ${d.timings.Isha.slice(0,5)}
                        </div>
                    </div>

                </div>
                `        
            }
            resolve()
        })
        .catch(function (error) {
        console.log(error);
        reject()
        })
    })

    

}





function getAllMonthTable(year,month,day,state,country)
{


    axios.get('https://api.aladhan.com/v1/calendarByCity/'+year+'/'+month+'?city='+state+'&country='+country+'&method=16')
    .then(function (response) {
    
    // handle success
    
    month = response.data.data

    currentMonth = state +" - "+ month[0].date.gregorian.month.en+" - "+month[0].date.gregorian.year

    document.getElementById("current-m").innerHTML = currentMonth
    document.getElementById("tab1").innerHTML = 
        `   <tr>
                <th>Date</th>
                <th>Fajr</th>
                <th>Sunrise</th>
                <th>Dhuhr</th>
                <th>Asr</th>
                <th>Maghrib</th>
                <th>Isha</th>
            </tr>
        `
        for (const d of month) {
            if (day == d.date.readable.slice(0,2))
            {
                document.getElementById("tab1").innerHTML += 
                ` 
                    <tr class="current-day">
                    <td>${d.date.readable}</td>
                    <td>${d.timings.Fajr.slice(0,5)}</td>
                    <td>${d.timings.Sunrise.slice(0,5)}</td>
                    <td>${d.timings.Dhuhr.slice(0,5)}</td>
                    <td>${d.timings.Asr.slice(0,5)}</td>
                    <td>${d.timings.Maghrib.slice(0,5)}</td>
                    <td>${d.timings.Isha.slice(0,5)}</td>
                    </tr>
                `
            }else{
                document.getElementById("tab1").innerHTML += 
                ` 
                    <tr>
                    <td>${d.date.readable}</td>
                    <td>${d.timings.Fajr.slice(0,5)}</td>
                    <td>${d.timings.Sunrise.slice(0,5)}</td>
                    <td>${d.timings.Dhuhr.slice(0,5)}</td>
                    <td>${d.timings.Asr.slice(0,5)}</td>
                    <td>${d.timings.Maghrib.slice(0,5)}</td>
                    <td>${d.timings.Isha.slice(0,5)}</td>
                    </tr>
                `
            }
            
        }

    })
    .catch(function (error) {
    console.log(error);
    })

}







function getCountries(){
    axios.get("https://api.countrystatecity.in/v1/countries",{
        headers: {
        "X-CSCAPI-KEY": `c2lvVjBGVDVrSTlSNzhBdjQzWkFzdFdhbFpCbWRxSGlRVDZDdDBSbA==`
        }
    })
    .then(function (response) {
        let countries = response.data

        for (const country of countries) {

            document.getElementById("countries").innerHTML +=
            `
                <option value="${country.iso2}">${country.name}</option>
            `
        }           
    })
    .catch(function (error) {
        console.log(error);
    })
}




function getStates(cc){
    axios.get("https://api.countrystatecity.in/v1/states",{
        headers: {
        "X-CSCAPI-KEY": `c2lvVjBGVDVrSTlSNzhBdjQzWkFzdFdhbFpCbWRxSGlRVDZDdDBSbA==`
        }
    })
    .then(function (response) {
        let states = response.data

        for (const state of states) {
            if(cc == state.country_code)
            {
                document.getElementById("states").innerHTML += 
                `
                <option value="${state.name}">${state.name}</option>
                `
            }
        }
                       
    })
    .catch(function (error) {
        console.log(error);
    })
}



