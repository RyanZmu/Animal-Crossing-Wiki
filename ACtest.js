let header = document.createElement("h1")
header.append('ANIMAL CROSSING NEW HORIZONS ITEM PRICES')

let main = document.querySelector('main')
let itemList = document.createElement('table')
let tableRow = document.createElement('tr')
itemList.prepend(tableRow)

document.body.prepend(header)
main.append(itemList)
document.body.append(main)

function requestInfo (infoRequested, itemName) {
    if (infoRequested === ''|| itemName === '') {
        alert('Please Enter A Valid Name and Type')
    }
     fetch(`http://acnhapi.com/v1a/${infoRequested.replace(' ', '_')}/${itemName.replace(' ', '_')}`)
     .then(response => response.json())
     .catch(error => console.error(error))
     .then(data => {
        displayInfo(data,infoRequested)
    })
}

let searchForm = document.querySelector('.userForm')
let searchType = document.querySelector('.searchType')
let searchInputType = document.querySelector('.userInputType')
let searchInputName = document.querySelector('.userInputName')
let submitButton = document.querySelector('.submitButton')
searchInputType.value = ""

submitButton.addEventListener('click', (event) => {
    event.preventDefault()

    let userType = searchInputType.value 
    let userName = searchInputName.value.toLowerCase()
    console.log(userType)
    console.log(userName)
    searchInputName.value = ""
  
    requestInfo(userType, userName)    
})

function valuesToDisplay(valuesArray) {
    valuesArray.map(value => {
        let listItem = document.createElement('td')
       
          console.log(value)
          listItem.append(value)
          if (!value.includes('images')){
          itemList.append(listItem)
          }else {
              let imageArea = document.createElement('img')
              imageArea.setAttribute("src",`${value}`)
              itemList.append(imageArea)
             
          }
      })

}

function displayInfo (infoToDisplay,infoType) {
 if (typeof infoToDisplay === 'object'){
   if (infoType === 'fish') { //make object
 let name = 'Name: ' + infoToDisplay['file-name'].replace('_', ' ')
 let price = 'Price: ' + infoToDisplay.price
 let rarity = 'Rarity: ' + infoToDisplay.availability['rarity']
 let cjPrice = 'CJ Price: ' + infoToDisplay['price-cj']
 let catchPhrase = 'Catchphrase: ' + infoToDisplay['catch-phrase']
 let image = infoToDisplay['image_uri']
 let shadowSize = 'Shadow Size: ' + infoToDisplay.shadow

 let values = [name,shadowSize,rarity,price,cjPrice,catchPhrase,image]

 valuesToDisplay(values)
   }

   if (infoType === "bugs"){//make object
       console.log(infoToDisplay)
       let name = infoToDisplay['file-name'].replace('_', ' ')
       let rarity = infoToDisplay.availability.rarity
       let price = 'Price: ' + infoToDisplay.price
       let flickPrice = 'Flick Price: ' + infoToDisplay['price-flick']
       let catchPhraseBug = infoToDisplay['catch-phrase']
       let imageBug = infoToDisplay['image_uri']

       let bugValues = [name,rarity,price,flickPrice,catchPhraseBug,imageBug]
        //! Lots of repetive lines, Will write as a OOP program in future
       valuesToDisplay(bugValues)

   }
 }else{
    console.error(new Error(`displayInfo expected an Object`))
 }
}

// !Could make a Results class to handle the different types. so like Fish extends Results and then have unique fish results aside from the results we'll give to every item. Refactor maybe later. displayInfo could bbe a Results class minus the fish specific types.

// ! Also maybe since the first input cares about type, have that decide the headers and then the second box handle displaying info, **


// class Results {
//     constructor(name,price) {
//         this.name = name
//         this.price = price
//     }

//     valuesDisplay () {

//         console.log(this.name)

// class ItemResults extends Results 

// class VillagerResults extends Results

// class FossilResults exteds Results
        
        //! Expand on this idea later, try to rewrite this program in Object Oriented Programming Paradigm, maybe do a seperate JS doc.

            // let listItem = document.createElement('td')
              
            //   listItem.append(value)
            //   if (value !== image){
            //   itemList.append(listItem)
            //   }else {
            //     let imageArea = document.createElement('img')
            //     imageArea.setAttribute("src",`${value}`)
            //     itemList.append(imageArea)
            // }
//         }
// }