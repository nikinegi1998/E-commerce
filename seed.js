const Products = require('./model/product');

const products = [
    {
        title: "BUMZEE",
        img:"https://images.unsplash.com/photo-1607453998774-d533f65dac99?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGtpZHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        subtitle: "Pack of 3 Kids Printed T-shirt with Shorts",
        category: "Kids",
        price:463,
        offers:"100% Original Products Free Delivery on order above Rs. 599 Pay on delivery might be available Easy 7 days returns and exchanges. Try & Buy might be available",
        desc:"90% Polyester, 10% Elastane, Dry Clean brown solid woven single breasted casual blazer, long sleeves, has a notched lapel, button closure, two pockets"
    },
    {
        title: "CUTECUMBER",
        img:"https://images.unsplash.com/photo-1555009393-f20bdb245c4d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGtpZHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        subtitle: "Girls Pink & Maroon Printed Playsuit",
        category: "Women",
        price:1207,
        offers:"100% Original Products Free Delivery on order above Rs. 599 Pay on delivery might be available Easy 7 days returns and exchanges. Try & Buy might be available",
        desc:"90% Polyester, 10% Elastane, Dry Clean brown solid woven single breasted casual blazer, long sleeves, has a notched lapel, button closure, two pockets"
    },
    {
        title: "MAX",
        img:"https://images.unsplash.com/photo-1599624427857-461fd60c23e5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fGtpZHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        subtitle: "Girls White & Blue Printed Fit and Flare Dress",
        category: "Kids",
        price:699,
        offers:"100% Original Products Free Delivery on order above Rs. 599 Pay on delivery might be available Easy 7 days returns and exchanges. Try & Buy might be available",
        desc:"90% Polyester, 10% Elastane, Dry Clean brown solid woven single breasted casual blazer, long sleeves, has a notched lapel, button closure, two pockets"
    }
]

const seedDb = async()=>{
   await Products.insertMany(products);
   console.log("DB Seeded");
}

module.exports=seedDb;