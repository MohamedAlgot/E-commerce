- setup e-commerce

1. design DB [User , category , subCategory , brand , products , cart , coupon ,order]
2. implement APIs

Men >> [brand1, brand2,brand3]
Woman >> [brand1 ,brand4, brand5 , brand6]

Category >> name , slug , logo
SubCategory >> name , slug , logo , categoryId
Brand >> name , slug , logo , categoryIds:[]
Product >> {
// strings
name ,
slug ,
description ,

// numbers
price:10 ,
discount:9 ,
discoutType :[fiexedAmount,percentage],
stock ,
//
cloros:[red, orange , blue],
sizes:[pro, pro max ][2x,3x,4x][42,43,44,45],
// ids
createdBy,
updatedBy,
categoryId,
subCategoryId,
brandId
}
CategoriesAssignedToBrands
[cId, bId]
[1,1]
[1,2]
[1,3]
[1,4]
[2,1]
[2,3]
// sql

name = Automatic Powder Detergent Lavender >>
slug = Automatic-Powder-Detergent-Lavender
name = toys | games
slug = toyes-or-games
name = مسحوق غسيل أوتوماتيكي برائحة اللافندر
slug = mashouk-khalesel
https://noon.com/product?Automatic%20Powder%20Detergent%20Lavender
https://noon.com/product?مسحوق غسيل أوتوماتيكي برائحة اللافندر

// create [category , brand , product]
// apply factory design pattern

// has body >> dto
// service
// controller >> create handler
// modules
=====================================

- last session

1. create product
2. create order (place order)
3. # payment gateways intergation [stripe - paymob - kashier]

- order design db

* orderId >> customId -> \_id
* address >> table >> {name , phoneNumber , street , city , country , data}
* payment method >> [COD, Credit , E-Walet]
* invoicelink >> pdf
* sql design
* order-iterms >> order-items table >> [{pId, pName, pPrice , pDiscount, pFinalPrice , qunatity , subTotla },{},{}]
* subtotal
* fees
* coupon >> [couponId , cValue , cType ]
  - total
  - createdAt
  - updatedAt
