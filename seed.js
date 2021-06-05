const mongoose=require('mongoose');
const Product = require('./models/product');
const products=[
    {
        name:"Iphone 12",
        img:"https://images.unsplash.com/photo-1617997455403-41f333d44d5b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGlwaG9uZSUyMDEyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
        price:100000,
        desc:"The iPhone 12 and iPhone 12 mini are Apple's mainstream flagship iPhones for 2020. The phones come in 6.1-inch and 5.4-inch "
    },
    {
        name:"Laptop",
        img:"https://images.unsplash.com/photo-1559163499-413811fb2344?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhcHRvcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60 ",
        price:2000000  ,
        desc:"A laptop, laptop computer, or notebook computer is a small, portable personal computer (PC) with a screen and alphanumeric keyboard.  "
    },
    {
        name:"Watch ",
        img:"https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60 ",
        price:20000  ,
        desc:"A watch is a portable timepiece intended to be carried or worn by a person. ... "
    },
    {
        name:"Titan Watch",
        img:"https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHRpdGFuJTIwd2F0Y2h8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60 ",
        price:30000  ,
        desc:"A watch is a portable timepiece intended to be carried or worn by a person. ..."
    },
    {
        name:"HP Laptop ",
        img:"https://images.unsplash.com/photo-1618410325698-018bb3eb2318?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGhwJTIwbGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60 ",
        price: 40000 ,
        desc:"Meticulously Designed Laptops With Intel® Core™ Processor. Shop Today! Alienware Command Center. Cryo - Tech Cooling. The 51Whr Battery. RBG Backlit Keyboard. Amenities: Dell Gaming Backpack, Accidental Damage Service, Performance USB Headset. "
    },
    {
        name:"bag ",
        img:"https://images.unsplash.com/photo-1560891958-68bb1fe7fb78?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmFnfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60 ",
        price:30000,
        desc:"A bag is a common tool in the form of a non-rigid container. The use of bags predates recorded history, with the earliest bags being no more than lengths of ... "
    },
    {
        name:"Electric kettle",
        img:"https://images.unsplash.com/photo-1530049625133-46d513586ab7?ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MjI4MDcxMHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=525&q=60 ",
        price:30000,
        desc:"An electric kettle is an electrical appliance, that has a self-contained heating unit, for heating water, and automatically switches off when the water reaches boiling point or at a preset temperature below 100 °C. ... In the rest of this paper, we refer to the electric kettle as kettle only. "
    },
    {
        name:"Headphone",
        img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60 ",
        price:30000,
        desc:"Headphones let a single user listen to an audio source privately, in contrast to a loudspeaker, which emits sound into the open air for anyone nearby to hear. Headphones are also known as earspeakers, earphones or, colloquially, cans. ... Headphones exhibit a range of different audio reproduction quality capabilities."
    },
    {
        name:"Drone",
        img:"https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJvbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
        price:200000,
        desc:"Drones are more formally known as unmanned aerial vehicles (UAVs) or unmanned aircraft systems (UASes). Essentially, a drone is a flying robot that can be remotely controlled or fly autonomously through software-controlled flight plans in their embedded systems, working in conjunction with onboard sensors and GPS."
    },
]

const seedDB= async()=>{
    await Product.insertMany(products);
    console.log("DB seeded");
}

module.exports= seedDB;