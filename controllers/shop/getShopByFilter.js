const { Shop } = require("../../models");

const getShopByFilter = async (req, res, next) => {
  try {
    const isPagination = req.query.page;
    let {
      man_woman,
      category,
      maxPrice = 5000,
      minPrice = 0,
      product,
      sizes,
      sort,
      search,
      page = 1,
      perPage = 12,
      currency = "ua",
      selectedLanguage = "ua"
    } = req.query;
    console.log("REQ.PARAMS:", req.params);
    const limit = perPage * 1;
    const skip = perPage * (page - 1);
    let reg = [];
    let regsearch = [];
    
    if(sizes !== "null" && sizes !== "" && sizes !== undefined){
    if(typeof sizes === "string"){reg.push(new RegExp(sizes))} else {
    for (let i = 0; i < sizes.length; i++) {
        reg[i] = new RegExp(sizes[i]);
    }}
  }
  // перевірка по укр. мові
      if(selectedLanguage === "ua"){
    // перевірка по валюті
    if(currency === "usd"){
        // пошук по search
        if(search !== "null" && search !== "" && search !== undefined){
          if(typeof search === "string"){regsearch.push(new RegExp(search))} else {
          for (let i = 0; i < search.length; i++) {
            regsearch[i] = new RegExp(search[i]);
          }}
          let catalog = {}
          if(sort === "minMaxPrice"){
            
          catalog = await Shop.find({description_ua:{ $in: regsearch }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          else if(sort === "maxMinPrice"){
          catalog = await Shop.find({description_ua:{ $in: regsearch }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);}
          else {
            catalog = await Shop.find({description_ua:{ $in: regsearch }})
            .sort({
              newPrice_usd: 1,
            })
            .limit(limit)
            .skip(skip);}
          let total = await Shop.find({description_ua:{ $in: regsearch }}).count();
          return res.status(200).json({ catalog, total });
        }
      
          console.log(man_woman, category, product, sizes)
          // нема фільтрів
      
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
          console.log("нема фільтрів");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          else if(sort === "maxMinPrice"){
          catalog = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);}
          else {
            catalog = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
            .sort({
              newPrice_usd: 1,
            })
            .limit(limit)
            .skip(skip);}
          let total = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
        
            // фільтр по категорії : чоловіче / жіноче / дитяче 
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
          console.log("чоловіче / жіноче / дитяче ");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({man_women_ua : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
          else if(sort === "maxMinPrice"){
          catalog = await Shop.find({man_women_ua : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({man_women_ua : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({man_women_ua : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по одежі /взутті/
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){
            console.log("фільтр по одежі /взутті/ ");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по продукція
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log("фільтр по продукція ");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_ua : product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_ua : product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_ua : product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_ua : product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по розмірам
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log("фільтр по розмірам");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else  if(sort === "maxMinPrice"){
          catalog = await Shop.find({sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по одежі /взуття/ 
            // + чоловік / жінка / дитяче
            
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по одежі /взуття/ + чоловік / жінка / дитяче ");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({category_ua : category, man_women_ua : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по одежі /взуття/ 
            // +product
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по одежі /взуття/ + product");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_ua : product, category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр чоловік/жінка  
            // +product
            
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" пофільтр чоловік/жінка   + product");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_ua : product, man_women_ua : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по одежі /взуття/ 
            // +sizes
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по одежі /взуття/ + sizes");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по category 
            // +sizes
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){        
            console.log(" по category + sizes");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по category 
            // +product
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по category + product");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_ua : product, category_ua : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по sizes 
            // +product
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по sizes + product");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_ua : product, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_ua : product, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_ua : product, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_ua : product, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по одежі /взуття/ 
            // + чоловік / жінка / дитяче
            // + продукція
      
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" ппо одежі /взуття/  + product + чоловік / жінка / дитяче");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, product_ua: product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, product_ua: product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, product_ua: product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({category_ua : category, man_women_ua : man_woman, product_ua: product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по одежі /взуття/ 
            // + чоловік / жінка / дитяче
            // + sizes
      
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" ппо одежі /взуття/  + sizes + чоловік / жінка / дитяче");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else  if(sort === "maxMinPrice"){
          catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({category_ua : category, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // product 
            // + чоловік / жінка / дитяче
            // + sizes
      
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" product  + sizes + чоловік / жінка / дитяче");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
          else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_ua : product, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // product 
            // + category
            // + sizes
      
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" product  + sizes + category");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_ua : product, category_ua : category, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_ua : product, category_ua : category, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_ua : product, category_ua : category, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_ua : product, category_ua : category, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по одежі /взуття/ 
            // + чоловік / жінка / дитяче
            // + продукція
            // + розміри
      
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" +4 фільтри");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({ man_women_ua : man_woman, category_ua : category,product_ua: product, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({man_women_ua : man_woman, category_ua : category, product_ua: product, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({man_women_ua : man_woman, category_ua : category,product_ua: product, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({ man_women_ua : man_woman, category_ua : category,product_ua: product, sizes_ua:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
        catalog = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_usd: 1,
        })
        .limit(limit)
        .skip(skip);
        total = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
    // FINISH USD
    // EURO
    else if (currency === "euro"){
    // пошук по search
    if(search !== "null" && search !== "" && search !== undefined){
      if(typeof search === "string"){regsearch.push(new RegExp(search))} else {
      for (let i = 0; i < search.length; i++) {
        regsearch[i] = new RegExp(search[i]);
      }}
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({description_ua:{ $in: regsearch }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      else if(sort === "maxMinPrice"){
      catalog = await Shop.find({description_ua:{ $in: regsearch }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);}
      else {
        catalog = await Shop.find({description_ua:{ $in: regsearch }})
        .sort({
          newPrice_euro: 1,
        })
        .limit(limit)
        .skip(skip);}
      let total = await Shop.find({description_ua:{ $in: regsearch }}).count();
      return res.status(200).json({ catalog, total });
    }

      console.log(man_woman, category, product, sizes)
      // нема фільтрів

      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
      console.log("нема фільтрів");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      else if(sort === "maxMinPrice"){
      catalog = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);}
      else {
        catalog = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_euro: 1,
        })
        .limit(limit)
        .skip(skip);}
      let total = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по категорії : чоловіче / жіноче / дитяче 
      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
      console.log("чоловіче / жіноче / дитяче ");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({man_women_ua : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
      else if(sort === "maxMinPrice"){
      catalog = await Shop.find({man_women_ua : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({man_women_ua : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({man_women_ua : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по одежі /взутті/
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){
        console.log("фільтр по одежі /взутті/ ");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по продукція
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log("фільтр по продукція ");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_ua : product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_ua : product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_ua : product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_ua : product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по розмірам
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log("фільтр по розмірам");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else  if(sort === "maxMinPrice"){
      catalog = await Shop.find({sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по одежі /взуття/ 
        // + чоловік / жінка / дитяче
        
      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по одежі /взуття/ + чоловік / жінка / дитяче ");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({category_ua : category, man_women_ua : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по одежі /взуття/ 
        // +product
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по одежі /взуття/ + product");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_ua : product, category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр чоловік/жінка  
        // +product
        
      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" пофільтр чоловік/жінка   + product");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_ua : product, man_women_ua : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по одежі /взуття/ 
        // +sizes
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по одежі /взуття/ + sizes");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по category 
        // +sizes
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){        
        console.log(" по category + sizes");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по category 
        // +product
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по category + product");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_ua : product, category_ua : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по sizes 
        // +product
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по sizes + product");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_ua : product, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_ua : product, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_ua : product, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_ua : product, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по одежі /взуття/ 
        // + чоловік / жінка / дитяче
        // + продукція

      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" ппо одежі /взуття/  + product + чоловік / жінка / дитяче");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, product_ua: product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, product_ua: product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, product_ua: product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({category_ua : category, man_women_ua : man_woman, product_ua: product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по одежі /взуття/ 
        // + чоловік / жінка / дитяче
        // + sizes

      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" ппо одежі /взуття/  + sizes + чоловік / жінка / дитяче");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else  if(sort === "maxMinPrice"){
      catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({category_ua : category, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // product 
        // + чоловік / жінка / дитяче
        // + sizes

      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" product  + sizes + чоловік / жінка / дитяче");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
      else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_ua : product, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // product 
        // + category
        // + sizes

      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" product  + sizes + category");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_ua : product, category_ua : category, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_ua : product, category_ua : category, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_ua : product, category_ua : category, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_ua : product, category_ua : category, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по одежі /взуття/ 
        // + чоловік / жінка / дитяче
        // + продукція
        // + розміри

      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" +4 фільтри");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({ man_women_ua : man_woman, category_ua : category,product_ua: product, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({man_women_ua : man_woman, category_ua : category, product_ua: product, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({man_women_ua : man_woman, category_ua : category,product_ua: product, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({ man_women_ua : man_woman, category_ua : category,product_ua: product, sizes_ua:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

    catalog = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
    .sort({
      newPrice_euro: 1,
    })
    .limit(limit)
    .skip(skip);
    total = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
    return res.status(200).json({ catalog, total });
    }
    // FINISH EURO
    // UAH
    else {
      // пошук по search
        if(search !== "null" && search !== "" && search !== undefined){
        if(typeof search === "string"){regsearch.push(new RegExp(search))} else {
        for (let i = 0; i < search.length; i++) {
          regsearch[i] = new RegExp(search[i]);
        }}
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({description_ua:{ $in: regsearch }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        else if(sort === "maxMinPrice"){
        catalog = await Shop.find({description_ua:{ $in: regsearch }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);}
        else {
          catalog = await Shop.find({description_ua:{ $in: regsearch }})
          .sort({
            newPrice_ua: 1,
          })
          .limit(limit)
          .skip(skip);}
        let total = await Shop.find({description_ua:{ $in: regsearch }}).count();
        return res.status(200).json({ catalog, total });
      }

        console.log(man_woman, category, product, sizes)
        // нема фільтрів

        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
        console.log("нема фільтрів");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        else if(sort === "maxMinPrice"){
        catalog = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);}
        else {
          catalog = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_ua: 1,
          })
          .limit(limit)
          .skip(skip);}
        let total = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
      
          // фільтр по категорії : чоловіче / жіноче / дитяче 
        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
        console.log("чоловіче / жіноче / дитяче ");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({man_women_ua : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
        else if(sort === "maxMinPrice"){
        catalog = await Shop.find({man_women_ua : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({man_women_ua : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({man_women_ua : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по одежі /взутті/
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){
          console.log("фільтр по одежі /взутті/ ");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по продукція
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log("фільтр по продукція ");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_ua : product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_ua : product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_ua : product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_ua : product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по розмірам
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log("фільтр по розмірам");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else  if(sort === "maxMinPrice"){
        catalog = await Shop.find({sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по одежі /взуття/ 
          // + чоловік / жінка / дитяче
          
        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по одежі /взуття/ + чоловік / жінка / дитяче ");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({category_ua : category, man_women_ua : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по одежі /взуття/ 
          // +product
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по одежі /взуття/ + product");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_ua : product, category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр чоловік/жінка  
          // +product
          
        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" пофільтр чоловік/жінка   + product");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_ua : product, man_women_ua : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по одежі /взуття/ 
          // +sizes
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по одежі /взуття/ + sizes");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по category 
          // +sizes
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){        
          console.log(" по category + sizes");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({sizes_ua:{ $in: reg }, category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по category 
          // +product
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по category + product");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_ua : product, category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_ua : product, category_ua : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по sizes 
          // +product
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по sizes + product");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_ua : product, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_ua : product, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_ua : product, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_ua : product, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по одежі /взуття/ 
          // + чоловік / жінка / дитяче
          // + продукція

        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" ппо одежі /взуття/  + product + чоловік / жінка / дитяче");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, product_ua: product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, product_ua: product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, product_ua: product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({category_ua : category, man_women_ua : man_woman, product_ua: product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по одежі /взуття/ 
          // + чоловік / жінка / дитяче
          // + sizes

        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" ппо одежі /взуття/  + sizes + чоловік / жінка / дитяче");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else  if(sort === "maxMinPrice"){
        catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({category_ua : category, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({category_ua : category, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // product 
          // + чоловік / жінка / дитяче
          // + sizes

        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" product  + sizes + чоловік / жінка / дитяче");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
        else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_ua : product, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_ua : product, man_women_ua : man_woman, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // product 
          // + category
          // + sizes

        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" product  + sizes + category");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_ua : product, category_ua : category, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_ua : product, category_ua : category, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_ua : product, category_ua : category, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_ua : product, category_ua : category, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по одежі /взуття/ 
          // + чоловік / жінка / дитяче
          // + продукція
          // + розміри

        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" +4 фільтри");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({ man_women_ua : man_woman, category_ua : category,product_ua: product, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({man_women_ua : man_woman, category_ua : category, product_ua: product, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({man_women_ua : man_woman, category_ua : category,product_ua: product, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({ man_women_ua : man_woman, category_ua : category,product_ua: product, sizes_ua:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

      catalog = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_ua: 1,
      })
      .limit(limit)
      .skip(skip);
      total = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
    return res.status(200).json({ catalog, total });
    }
    // FINISH UAH
      }
  // перевірка по рос. мові
  if(selectedLanguage === "ru"){
    // перевірка по валюті
    if(currency === "usd"){
        // пошук по search
        if(search !== "null" && search !== "" && search !== undefined){
          if(typeof search === "string"){regsearch.push(new RegExp(search))} else {
          for (let i = 0; i < search.length; i++) {
            regsearch[i] = new RegExp(search[i]);
          }}
          let catalog = {}
          if(sort === "minMaxPrice"){
            
          catalog = await Shop.find({description_ru:{ $in: regsearch }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          else if(sort === "maxMinPrice"){
          catalog = await Shop.find({description_ru:{ $in: regsearch }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);}
          else {
            catalog = await Shop.find({description_ru:{ $in: regsearch }})
            .sort({
              newPrice_usd: 1,
            })
            .limit(limit)
            .skip(skip);}
          let total = await Shop.find({description_ru:{ $in: regsearch }}).count();
          return res.status(200).json({ catalog, total });
        }
      
          console.log(man_woman, category, product, sizes)
          // нема фільтрів
      
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
          console.log("нема фільтрів");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          else if(sort === "maxMinPrice"){
          catalog = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);}
          else {
            catalog = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
            .sort({
              newPrice_usd: 1,
            })
            .limit(limit)
            .skip(skip);}
          let total = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
        
            // фільтр по категорії : чоловіче / жіноче / дитяче 
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
          console.log("чоловіче / жіноче / дитяче ");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({man_women_ru : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
          else if(sort === "maxMinPrice"){
          catalog = await Shop.find({man_women_ru : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({man_women_ru : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({man_women_ru : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по одежі /взутті/
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){
            console.log("фільтр по одежі /взутті/ ");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по продукція
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log("фільтр по продукція ");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_ru : product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_ru : product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_ru : product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_ru : product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по розмірам
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log("фільтр по розмірам");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else  if(sort === "maxMinPrice"){
          catalog = await Shop.find({sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по одежі /взуття/ 
            // + чоловік / жінка / дитяче
            
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по одежі /взуття/ + чоловік / жінка / дитяче ");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({category_ru : category, man_women_ru : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по одежі /взуття/ 
            // +product
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по одежі /взуття/ + product");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_ru : product, category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр чоловік/жінка  
            // +product
            
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" пофільтр чоловік/жінка   + product");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_ru : product, man_women_ru : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по одежі /взуття/ 
            // +sizes
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по одежі /взуття/ + sizes");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по category 
            // +sizes
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){        
            console.log(" по category + sizes");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по category 
            // +product
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по category + product");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_ru : product, category_ru : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по sizes 
            // +product
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по sizes + product");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_ru : product, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_ru : product, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_ru : product, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_ru : product, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по одежі /взуття/ 
            // + чоловік / жінка / дитяче
            // + продукція
      
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" ппо одежі /взуття/  + product + чоловік / жінка / дитяче");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, product_ru: product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, product_ru: product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, product_ru: product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({category_ru : category, man_women_ru : man_woman, product_ru: product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по одежі /взуття/ 
            // + чоловік / жінка / дитяче
            // + sizes
      
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" ппо одежі /взуття/  + sizes + чоловік / жінка / дитяче");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else  if(sort === "maxMinPrice"){
          catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({category_ru : category, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // product 
            // + чоловік / жінка / дитяче
            // + sizes
      
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" product  + sizes + чоловік / жінка / дитяче");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
          else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_ru : product, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // product 
            // + category
            // + sizes
      
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" product  + sizes + category");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_ru : product, category_ru : category, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_ru : product, category_ru : category, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_ru : product, category_ru : category, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_ru : product, category_ru : category, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по одежі /взуття/ 
            // + чоловік / жінка / дитяче
            // + продукція
            // + розміри
      
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" +4 фільтри");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({ man_women_ru : man_woman, category_ru : category,product_ru: product, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({man_women_ru : man_woman, category_ru : category, product_ru: product, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({man_women_ru : man_woman, category_ru : category,product_ru: product, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({ man_women_ru : man_woman, category_ru : category,product_ru: product, sizes_ru:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
        catalog = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_usd: 1,
        })
        .limit(limit)
        .skip(skip);
        total = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
    // FINISH USD
    // EURO
    else if (currency === "euro"){
    // пошук по search
    if(search !== "null" && search !== "" && search !== undefined){
      if(typeof search === "string"){regsearch.push(new RegExp(search))} else {
      for (let i = 0; i < search.length; i++) {
        regsearch[i] = new RegExp(search[i]);
      }}
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({description_ru:{ $in: regsearch }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      else if(sort === "maxMinPrice"){
      catalog = await Shop.find({description_ru:{ $in: regsearch }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);}
      else {
        catalog = await Shop.find({description_ru:{ $in: regsearch }})
        .sort({
          newPrice_euro: 1,
        })
        .limit(limit)
        .skip(skip);}
      let total = await Shop.find({description_ru:{ $in: regsearch }}).count();
      return res.status(200).json({ catalog, total });
    }

      console.log(man_woman, category, product, sizes)
      // нема фільтрів

      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
      console.log("нема фільтрів");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      else if(sort === "maxMinPrice"){
      catalog = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);}
      else {
        catalog = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_euro: 1,
        })
        .limit(limit)
        .skip(skip);}
      let total = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по категорії : чоловіче / жіноче / дитяче 
      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
      console.log("чоловіче / жіноче / дитяче ");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({man_women_ru : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
      else if(sort === "maxMinPrice"){
      catalog = await Shop.find({man_women_ru : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({man_women_ru : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({man_women_ru : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по одежі /взутті/
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){
        console.log("фільтр по одежі /взутті/ ");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по продукція
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log("фільтр по продукція ");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_ru : product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_ru : product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_ru : product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_ru : product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по розмірам
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log("фільтр по розмірам");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else  if(sort === "maxMinPrice"){
      catalog = await Shop.find({sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по одежі /взуття/ 
        // + чоловік / жінка / дитяче
        
      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по одежі /взуття/ + чоловік / жінка / дитяче ");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({category_ru : category, man_women_ru : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по одежі /взуття/ 
        // +product
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по одежі /взуття/ + product");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_ru : product, category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр чоловік/жінка  
        // +product
        
      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" пофільтр чоловік/жінка   + product");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_ru : product, man_women_ru : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по одежі /взуття/ 
        // +sizes
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по одежі /взуття/ + sizes");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по category 
        // +sizes
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){        
        console.log(" по category + sizes");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по category 
        // +product
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по category + product");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_ru : product, category_ru : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по sizes 
        // +product
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по sizes + product");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_ru : product, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_ru : product, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_ru : product, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_ru : product, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по одежі /взуття/ 
        // + чоловік / жінка / дитяче
        // + продукція

      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" ппо одежі /взуття/  + product + чоловік / жінка / дитяче");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, product_ru: product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, product_ru: product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, product_ru: product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({category_ru : category, man_women_ru : man_woman, product_ru: product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по одежі /взуття/ 
        // + чоловік / жінка / дитяче
        // + sizes

      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" ппо одежі /взуття/  + sizes + чоловік / жінка / дитяче");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else  if(sort === "maxMinPrice"){
      catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({category_ru : category, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // product 
        // + чоловік / жінка / дитяче
        // + sizes

      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" product  + sizes + чоловік / жінка / дитяче");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
      else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_ru : product, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // product 
        // + category
        // + sizes

      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" product  + sizes + category");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_ru : product, category_ru : category, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_ru : product, category_ru : category, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_ru : product, category_ru : category, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_ru : product, category_ru : category, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по одежі /взуття/ 
        // + чоловік / жінка / дитяче
        // + продукція
        // + розміри

      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" +4 фільтри");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({ man_women_ru : man_woman, category_ru : category,product_ru: product, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({man_women_ru : man_woman, category_ru : category, product_ru: product, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({man_women_ru : man_woman, category_ru : category,product_ru: product, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({ man_women_ru : man_woman, category_ru : category,product_ru: product, sizes_ru:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

    catalog = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
    .sort({
      newPrice_euro: 1,
    })
    .limit(limit)
    .skip(skip);
    total = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
    return res.status(200).json({ catalog, total });
    }
    // FINISH EURO
    // UAH
    else {
      // пошук по search
        if(search !== "null" && search !== "" && search !== undefined){
        if(typeof search === "string"){regsearch.push(new RegExp(search))} else {
        for (let i = 0; i < search.length; i++) {
          regsearch[i] = new RegExp(search[i]);
        }}
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({description_ru:{ $in: regsearch }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        else if(sort === "maxMinPrice"){
        catalog = await Shop.find({description_ru:{ $in: regsearch }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);}
        else {
          catalog = await Shop.find({description_ru:{ $in: regsearch }})
          .sort({
            newPrice_ua: 1,
          })
          .limit(limit)
          .skip(skip);}
        let total = await Shop.find({description_ru:{ $in: regsearch }}).count();
        return res.status(200).json({ catalog, total });
      }

        console.log(man_woman, category, product, sizes)
        // нема фільтрів

        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
        console.log("нема фільтрів");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        else if(sort === "maxMinPrice"){
        catalog = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);}
        else {
          catalog = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_ua: 1,
          })
          .limit(limit)
          .skip(skip);}
        let total = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
      
          // фільтр по категорії : чоловіче / жіноче / дитяче 
        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
        console.log("чоловіче / жіноче / дитяче ");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({man_women_ru : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
        else if(sort === "maxMinPrice"){
        catalog = await Shop.find({man_women_ru : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({man_women_ru : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({man_women_ru : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по одежі /взутті/
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){
          console.log("фільтр по одежі /взутті/ ");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по продукція
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log("фільтр по продукція ");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_ru : product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_ru : product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_ru : product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_ru : product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по розмірам
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log("фільтр по розмірам");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else  if(sort === "maxMinPrice"){
        catalog = await Shop.find({sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по одежі /взуття/ 
          // + чоловік / жінка / дитяче
          
        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по одежі /взуття/ + чоловік / жінка / дитяче ");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({category_ru : category, man_women_ru : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по одежі /взуття/ 
          // +product
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по одежі /взуття/ + product");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_ru : product, category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр чоловік/жінка  
          // +product
          
        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" пофільтр чоловік/жінка   + product");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_ru : product, man_women_ru : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по одежі /взуття/ 
          // +sizes
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по одежі /взуття/ + sizes");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по category 
          // +sizes
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){        
          console.log(" по category + sizes");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({sizes_ru:{ $in: reg }, category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по category 
          // +product
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по category + product");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_ru : product, category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_ru : product, category_ru : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по sizes 
          // +product
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по sizes + product");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_ru : product, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_ru : product, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_ru : product, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_ru : product, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по одежі /взуття/ 
          // + чоловік / жінка / дитяче
          // + продукція

        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" ппо одежі /взуття/  + product + чоловік / жінка / дитяче");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, product_ru: product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, product_ru: product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, product_ru: product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({category_ru : category, man_women_ru : man_woman, product_ru: product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по одежі /взуття/ 
          // + чоловік / жінка / дитяче
          // + sizes

        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" ппо одежі /взуття/  + sizes + чоловік / жінка / дитяче");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else  if(sort === "maxMinPrice"){
        catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({category_ru : category, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({category_ru : category, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // product 
          // + чоловік / жінка / дитяче
          // + sizes

        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" product  + sizes + чоловік / жінка / дитяче");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
        else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_ru : product, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_ru : product, man_women_ru : man_woman, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // product 
          // + category
          // + sizes

        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" product  + sizes + category");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_ru : product, category_ru : category, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_ru : product, category_ru : category, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_ru : product, category_ru : category, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_ru : product, category_ru : category, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по одежі /взуття/ 
          // + чоловік / жінка / дитяче
          // + продукція
          // + розміри

        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" +4 фільтри");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({ man_women_ru : man_woman, category_ru : category,product_ru: product, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({man_women_ru : man_woman, category_ru : category, product_ru: product, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({man_women_ru : man_woman, category_ru : category,product_ru: product, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({ man_women_ru : man_woman, category_ru : category,product_ru: product, sizes_ru:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

      catalog = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_ua: 1,
      })
      .limit(limit)
      .skip(skip);
      total = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
    return res.status(200).json({ catalog, total });
    }
    // FINISH UAH
      }
  // перевірка по англ. мові
  if(selectedLanguage === "en"){
    // перевірка по валюті
    if(currency === "usd"){
        // пошук по search
        if(search !== "null" && search !== "" && search !== undefined){
          if(typeof search === "string"){regsearch.push(new RegExp(search))} else {
          for (let i = 0; i < search.length; i++) {
            regsearch[i] = new RegExp(search[i]);
          }}
          let catalog = {}
          if(sort === "minMaxPrice"){
            
          catalog = await Shop.find({description_en:{ $in: regsearch }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          else if(sort === "maxMinPrice"){
          catalog = await Shop.find({description_en:{ $in: regsearch }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);}
          else {
            catalog = await Shop.find({description_en:{ $in: regsearch }})
            .sort({
              newPrice_usd: 1,
            })
            .limit(limit)
            .skip(skip);}
          let total = await Shop.find({description_en:{ $in: regsearch }}).count();
          return res.status(200).json({ catalog, total });
        }
      
          console.log(man_woman, category, product, sizes)
          // нема фільтрів
      
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
          console.log("нема фільтрів");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          else if(sort === "maxMinPrice"){
          catalog = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);}
          else {
            catalog = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
            .sort({
              newPrice_usd: 1,
            })
            .limit(limit)
            .skip(skip);}
          let total = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
        
            // фільтр по категорії : чоловіче / жіноче / дитяче 
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
          console.log("чоловіче / жіноче / дитяче ");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({man_women_en : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
          else if(sort === "maxMinPrice"){
          catalog = await Shop.find({man_women_en : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({man_women_en : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({man_women_en : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по одежі /взутті/
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){
            console.log("фільтр по одежі /взутті/ ");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по продукція
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log("фільтр по продукція ");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_en : product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_en : product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_en : product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_en : product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по розмірам
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log("фільтр по розмірам");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else  if(sort === "maxMinPrice"){
          catalog = await Shop.find({sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по одежі /взуття/ 
            // + чоловік / жінка / дитяче
            
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по одежі /взуття/ + чоловік / жінка / дитяче ");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({category_en : category, man_women_en : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({category_en : category, man_women_en : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({category_en : category, man_women_en : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({category_en : category, man_women_en : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по одежі /взуття/ 
            // +product
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по одежі /взуття/ + product");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_en : product, category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_en : product, category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_en : product, category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_en : product, category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр чоловік/жінка  
            // +product
            
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" пофільтр чоловік/жінка   + product");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_en : product, man_women_en : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_en : product, man_women_en : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_en : product, man_women_en : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_en : product, man_women_en : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по одежі /взуття/ 
            // +sizes
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по одежі /взуття/ + sizes");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по category 
            // +sizes
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){        
            console.log(" по category + sizes");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по category 
            // +product
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по category + product");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_en : product, category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_en : product, category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_en : product, category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_en : product, category_en : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по sizes 
            // +product
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по sizes + product");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_en : product, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_en : product, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_en : product, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_en : product, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по одежі /взуття/ 
            // + чоловік / жінка / дитяче
            // + продукція
      
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" ппо одежі /взуття/  + product + чоловік / жінка / дитяче");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({category_en : category, man_women_en : man_woman, product_en: product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({category_en : category, man_women_en : man_woman, product_en: product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({category_en : category, man_women_en : man_woman, product_en: product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({category_en : category, man_women_en : man_woman, product_en: product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по одежі /взуття/ 
            // + чоловік / жінка / дитяче
            // + sizes
      
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" ппо одежі /взуття/  + sizes + чоловік / жінка / дитяче");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({category_en : category, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else  if(sort === "maxMinPrice"){
          catalog = await Shop.find({category_en : category, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({category_en : category, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({category_en : category, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // product 
            // + чоловік / жінка / дитяче
            // + sizes
      
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" product  + sizes + чоловік / жінка / дитяче");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_en : product, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
          else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_en : product, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_en : product, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_en : product, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // product 
            // + category
            // + sizes
      
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" product  + sizes + category");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_en : product, category_en : category, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_en : product, category_en : category, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_en : product, category_en : category, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_en : product, category_en : category, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по одежі /взуття/ 
            // + чоловік / жінка / дитяче
            // + продукція
            // + розміри
      
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" +4 фільтри");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({ man_women_en : man_woman, category_en : category,product_en: product, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({man_women_en : man_woman, category_en : category, product_en: product, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({man_women_en : man_woman, category_en : category,product_en: product, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({ man_women_en : man_woman, category_en : category,product_en: product, sizes_en:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
        catalog = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_usd: 1,
        })
        .limit(limit)
        .skip(skip);
        total = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
    // FINISH USD
    // EURO
    else if (currency === "euro"){
    // пошук по search
    if(search !== "null" && search !== "" && search !== undefined){
      if(typeof search === "string"){regsearch.push(new RegExp(search))} else {
      for (let i = 0; i < search.length; i++) {
        regsearch[i] = new RegExp(search[i]);
      }}
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({description_en:{ $in: regsearch }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      else if(sort === "maxMinPrice"){
      catalog = await Shop.find({description_en:{ $in: regsearch }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);}
      else {
        catalog = await Shop.find({description_en:{ $in: regsearch }})
        .sort({
          newPrice_euro: 1,
        })
        .limit(limit)
        .skip(skip);}
      let total = await Shop.find({description_en:{ $in: regsearch }}).count();
      return res.status(200).json({ catalog, total });
    }

      console.log(man_woman, category, product, sizes)
      // нема фільтрів

      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
      console.log("нема фільтрів");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      else if(sort === "maxMinPrice"){
      catalog = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);}
      else {
        catalog = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_euro: 1,
        })
        .limit(limit)
        .skip(skip);}
      let total = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по категорії : чоловіче / жіноче / дитяче 
      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
      console.log("чоловіче / жіноче / дитяче ");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({man_women_en : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
      else if(sort === "maxMinPrice"){
      catalog = await Shop.find({man_women_en : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({man_women_en : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({man_women_en : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по одежі /взутті/
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){
        console.log("фільтр по одежі /взутті/ ");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по продукція
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log("фільтр по продукція ");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_en : product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_en : product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_en : product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_en : product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по розмірам
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log("фільтр по розмірам");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else  if(sort === "maxMinPrice"){
      catalog = await Shop.find({sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по одежі /взуття/ 
        // + чоловік / жінка / дитяче
        
      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по одежі /взуття/ + чоловік / жінка / дитяче ");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({category_en : category, man_women_en : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({category_en : category, man_women_en : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({category_en : category, man_women_en : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({category_en : category, man_women_en : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по одежі /взуття/ 
        // +product
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по одежі /взуття/ + product");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_en : product, category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_en : product, category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_en : product, category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_en : product, category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр чоловік/жінка  
        // +product
        
      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" пофільтр чоловік/жінка   + product");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_en : product, man_women_en : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_en : product, man_women_en : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_en : product, man_women_en : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_en : product, man_women_en : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по одежі /взуття/ 
        // +sizes
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по одежі /взуття/ + sizes");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по category 
        // +sizes
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){        
        console.log(" по category + sizes");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по category 
        // +product
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по category + product");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_en : product, category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_en : product, category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_en : product, category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_en : product, category_en : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по sizes 
        // +product
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по sizes + product");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_en : product, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_en : product, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_en : product, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_en : product, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по одежі /взуття/ 
        // + чоловік / жінка / дитяче
        // + продукція

      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" ппо одежі /взуття/  + product + чоловік / жінка / дитяче");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({category_en : category, man_women_en : man_woman, product_en: product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({category_en : category, man_women_en : man_woman, product_en: product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({category_en : category, man_women_en : man_woman, product_en: product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({category_en : category, man_women_en : man_woman, product_en: product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по одежі /взуття/ 
        // + чоловік / жінка / дитяче
        // + sizes

      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" ппо одежі /взуття/  + sizes + чоловік / жінка / дитяче");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({category_en : category, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else  if(sort === "maxMinPrice"){
      catalog = await Shop.find({category_en : category, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({category_en : category, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({category_en : category, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // product 
        // + чоловік / жінка / дитяче
        // + sizes

      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" product  + sizes + чоловік / жінка / дитяче");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_en : product, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
      else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_en : product, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_en : product, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_en : product, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // product 
        // + category
        // + sizes

      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" product  + sizes + category");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_en : product, category_en : category, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_en : product, category_en : category, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_en : product, category_en : category, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_en : product, category_en : category, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по одежі /взуття/ 
        // + чоловік / жінка / дитяче
        // + продукція
        // + розміри

      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" +4 фільтри");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({ man_women_en : man_woman, category_en : category,product_en: product, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({man_women_en : man_woman, category_en : category, product_en: product, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({man_women_en : man_woman, category_en : category,product_en: product, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({ man_women_en : man_woman, category_en : category,product_en: product, sizes_en:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

    catalog = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
    .sort({
      newPrice_euro: 1,
    })
    .limit(limit)
    .skip(skip);
    total = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
    return res.status(200).json({ catalog, total });
    }
    // FINISH EURO
    // UAH
    else {
      // пошук по search
        if(search !== "null" && search !== "" && search !== undefined){
        if(typeof search === "string"){regsearch.push(new RegExp(search))} else {
        for (let i = 0; i < search.length; i++) {
          regsearch[i] = new RegExp(search[i]);
        }}
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({description_en:{ $in: regsearch }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        else if(sort === "maxMinPrice"){
        catalog = await Shop.find({description_en:{ $in: regsearch }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);}
        else {
          catalog = await Shop.find({description_en:{ $in: regsearch }})
          .sort({
            newPrice_ua: 1,
          })
          .limit(limit)
          .skip(skip);}
        let total = await Shop.find({description_en:{ $in: regsearch }}).count();
        return res.status(200).json({ catalog, total });
      }

        console.log(man_woman, category, product, sizes)
        // нема фільтрів

        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
        console.log("нема фільтрів");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        else if(sort === "maxMinPrice"){
        catalog = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);}
        else {
          catalog = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_ua: 1,
          })
          .limit(limit)
          .skip(skip);}
        let total = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
      
          // фільтр по категорії : чоловіче / жіноче / дитяче 
        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
        console.log("чоловіче / жіноче / дитяче ");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({man_women_en : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
        else if(sort === "maxMinPrice"){
        catalog = await Shop.find({man_women_en : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({man_women_en : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({man_women_en : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по одежі /взутті/
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){
          console.log("фільтр по одежі /взутті/ ");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по продукція
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log("фільтр по продукція ");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_en : product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_en : product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_en : product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_en : product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по розмірам
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log("фільтр по розмірам");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else  if(sort === "maxMinPrice"){
        catalog = await Shop.find({sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по одежі /взуття/ 
          // + чоловік / жінка / дитяче
          
        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по одежі /взуття/ + чоловік / жінка / дитяче ");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({category_en : category, man_women_en : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({category_en : category, man_women_en : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({category_en : category, man_women_en : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({category_en : category, man_women_en : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по одежі /взуття/ 
          // +product
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по одежі /взуття/ + product");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_en : product, category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_en : product, category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_en : product, category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_en : product, category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр чоловік/жінка  
          // +product
          
        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" пофільтр чоловік/жінка   + product");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_en : product, man_women_en : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_en : product, man_women_en : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_en : product, man_women_en : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_en : product, man_women_en : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по одежі /взуття/ 
          // +sizes
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по одежі /взуття/ + sizes");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по category 
          // +sizes
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){        
          console.log(" по category + sizes");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({sizes_en:{ $in: reg }, category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по category 
          // +product
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по category + product");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_en : product, category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_en : product, category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_en : product, category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_en : product, category_en : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по sizes 
          // +product
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по sizes + product");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_en : product, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_en : product, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_en : product, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_en : product, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по одежі /взуття/ 
          // + чоловік / жінка / дитяче
          // + продукція

        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" ппо одежі /взуття/  + product + чоловік / жінка / дитяче");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({category_en : category, man_women_en : man_woman, product_en: product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({category_en : category, man_women_en : man_woman, product_en: product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({category_en : category, man_women_en : man_woman, product_en: product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({category_en : category, man_women_en : man_woman, product_en: product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по одежі /взуття/ 
          // + чоловік / жінка / дитяче
          // + sizes

        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" ппо одежі /взуття/  + sizes + чоловік / жінка / дитяче");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({category_en : category, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else  if(sort === "maxMinPrice"){
        catalog = await Shop.find({category_en : category, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({category_en : category, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({category_en : category, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // product 
          // + чоловік / жінка / дитяче
          // + sizes

        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" product  + sizes + чоловік / жінка / дитяче");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_en : product, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
        else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_en : product, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_en : product, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_en : product, man_women_en : man_woman, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // product 
          // + category
          // + sizes

        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" product  + sizes + category");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_en : product, category_en : category, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_en : product, category_en : category, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_en : product, category_en : category, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_en : product, category_en : category, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по одежі /взуття/ 
          // + чоловік / жінка / дитяче
          // + продукція
          // + розміри

        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" +4 фільтри");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({ man_women_en : man_woman, category_en : category,product_en: product, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({man_women_en : man_woman, category_en : category, product_en: product, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({man_women_en : man_woman, category_en : category,product_en: product, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({ man_women_en : man_woman, category_en : category,product_en: product, sizes_en:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

      catalog = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_ua: 1,
      })
      .limit(limit)
      .skip(skip);
      total = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
    return res.status(200).json({ catalog, total });
    }
    // FINISH UAH
      }
  // перевірка по німецькій. мові
  if(selectedLanguage === "de"){
    // перевірка по валюті
    if(currency === "usd"){
        // пошук по search
        if(search !== "null" && search !== "" && search !== undefined){
          if(typeof search === "string"){regsearch.push(new RegExp(search))} else {
          for (let i = 0; i < search.length; i++) {
            regsearch[i] = new RegExp(search[i]);
          }}
          let catalog = {}
          if(sort === "minMaxPrice"){
            
          catalog = await Shop.find({description_de:{ $in: regsearch }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          else if(sort === "maxMinPrice"){
          catalog = await Shop.find({description_de:{ $in: regsearch }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);}
          else {
            catalog = await Shop.find({description_de:{ $in: regsearch }})
            .sort({
              newPrice_usd: 1,
            })
            .limit(limit)
            .skip(skip);}
          let total = await Shop.find({description_de:{ $in: regsearch }}).count();
          return res.status(200).json({ catalog, total });
        }
      
          console.log(man_woman, category, product, sizes)
          // нема фільтрів
      
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
          console.log("нема фільтрів");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          else if(sort === "maxMinPrice"){
          catalog = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);}
          else {
            catalog = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
            .sort({
              newPrice_usd: 1,
            })
            .limit(limit)
            .skip(skip);}
          let total = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
        
            // фільтр по категорії : чоловіче / жіноче / дитяче 
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
          console.log("чоловіче / жіноче / дитяче ");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({man_women_de : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
          else if(sort === "maxMinPrice"){
          catalog = await Shop.find({man_women_de : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({man_women_de : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({man_women_de : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по одежі /взутті/
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){
            console.log("фільтр по одежі /взутті/ ");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по продукція
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log("фільтр по продукція ");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_de : product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_de : product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_de : product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_de : product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по розмірам
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log("фільтр по розмірам");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else  if(sort === "maxMinPrice"){
          catalog = await Shop.find({sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по одежі /взуття/ 
            // + чоловік / жінка / дитяче
            
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по одежі /взуття/ + чоловік / жінка / дитяче ");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({category_de : category, man_women_de : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({category_de : category, man_women_de : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({category_de : category, man_women_de : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({category_de : category, man_women_de : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по одежі /взуття/ 
            // +product
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по одежі /взуття/ + product");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_de : product, category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_de : product, category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_de : product, category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_de : product, category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр чоловік/жінка  
            // +product
            
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" пофільтр чоловік/жінка   + product");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_de : product, man_women_de : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_de : product, man_women_de : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_de : product, man_women_de : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_de : product, man_women_de : man_woman, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по одежі /взуття/ 
            // +sizes
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по одежі /взуття/ + sizes");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по category 
            // +sizes
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){        
            console.log(" по category + sizes");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по category 
            // +product
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по category + product");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_de : product, category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_de : product, category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_de : product, category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_de : product, category_de : category, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по sizes 
            // +product
            
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" по sizes + product");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_de : product, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_de : product, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_de : product, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_de : product, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по одежі /взуття/ 
            // + чоловік / жінка / дитяче
            // + продукція
      
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes == "null" || sizes == "" || sizes == undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" ппо одежі /взуття/  + product + чоловік / жінка / дитяче");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({category_de : category, man_women_de : man_woman, product_de: product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({category_de : category, man_women_de : man_woman, product_de: product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({category_de : category, man_women_de : man_woman, product_de: product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({category_de : category, man_women_de : man_woman, product_de: product, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
            // фільтр по одежі /взуття/ 
            // + чоловік / жінка / дитяче
            // + sizes
      
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product == "null" || product == "" || product == undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" ппо одежі /взуття/  + sizes + чоловік / жінка / дитяче");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({category_de : category, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else  if(sort === "maxMinPrice"){
          catalog = await Shop.find({category_de : category, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({category_de : category, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({category_de : category, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // product 
            // + чоловік / жінка / дитяче
            // + sizes
      
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category == "null" || category == "" || category == undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" product  + sizes + чоловік / жінка / дитяче");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_de : product, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
          else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_de : product, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_de : product, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_de : product, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // product 
            // + category
            // + sizes
      
          if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" product  + sizes + category");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({product_de : product, category_de : category, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({product_de : product, category_de : category, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({product_de : product, category_de : category, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({product_de : product, category_de : category, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
            // фільтр по одежі /взуття/ 
            // + чоловік / жінка / дитяче
            // + продукція
            // + розміри
      
          if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
          (category !== "null" && category !== "" && category !== undefined) &&
          (product !== "null" && product !== "" && product !== undefined) &&
          (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
          (search == "null" || search == "" || search == undefined)     
          ){  
            console.log(" +4 фільтри");
          let catalog = {}
          if(sort === "minMaxPrice"){
          catalog = await Shop.find({ man_women_de : man_woman, category_de : category,product_de: product, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);
        }
        else if(sort === "maxMinPrice"){
          catalog = await Shop.find({man_women_de : man_woman, category_de : category, product_de: product, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: -1,
          })
          .limit(limit)
          .skip(skip);
        }
        else {
          catalog = await Shop.find({man_women_de : man_woman, category_de : category,product_de: product, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_usd: 1,
          })
          .limit(limit)
          .skip(skip);}
          let total = await Shop.find({ man_women_de : man_woman, category_de : category,product_de: product, sizes_de:{ $in: reg }, newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
          return res.status(200).json({ catalog, total });
        }
      
        catalog = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_usd: 1,
        })
        .limit(limit)
        .skip(skip);
        total = await Shop.find({newPrice_usd: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
    // FINISH USD
    // EURO
    else if (currency === "euro"){
    // пошук по search
    if(search !== "null" && search !== "" && search !== undefined){
      if(typeof search === "string"){regsearch.push(new RegExp(search))} else {
      for (let i = 0; i < search.length; i++) {
        regsearch[i] = new RegExp(search[i]);
      }}
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({description_de:{ $in: regsearch }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      else if(sort === "maxMinPrice"){
      catalog = await Shop.find({description_de:{ $in: regsearch }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);}
      else {
        catalog = await Shop.find({description_de:{ $in: regsearch }})
        .sort({
          newPrice_euro: 1,
        })
        .limit(limit)
        .skip(skip);}
      let total = await Shop.find({description_de:{ $in: regsearch }}).count();
      return res.status(200).json({ catalog, total });
    }

      console.log(man_woman, category, product, sizes)
      // нема фільтрів

      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
      console.log("нема фільтрів");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      else if(sort === "maxMinPrice"){
      catalog = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);}
      else {
        catalog = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_euro: 1,
        })
        .limit(limit)
        .skip(skip);}
      let total = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по категорії : чоловіче / жіноче / дитяче 
      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
      console.log("чоловіче / жіноче / дитяче ");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({man_women_de : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
      else if(sort === "maxMinPrice"){
      catalog = await Shop.find({man_women_de : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({man_women_de : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({man_women_de : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по одежі /взутті/
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){
        console.log("фільтр по одежі /взутті/ ");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по продукція
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log("фільтр по продукція ");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_de : product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_de : product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_de : product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_de : product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по розмірам
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log("фільтр по розмірам");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else  if(sort === "maxMinPrice"){
      catalog = await Shop.find({sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по одежі /взуття/ 
        // + чоловік / жінка / дитяче
        
      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по одежі /взуття/ + чоловік / жінка / дитяче ");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({category_de : category, man_women_de : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({category_de : category, man_women_de : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({category_de : category, man_women_de : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({category_de : category, man_women_de : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по одежі /взуття/ 
        // +product
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по одежі /взуття/ + product");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_de : product, category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_de : product, category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_de : product, category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_de : product, category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр чоловік/жінка  
        // +product
        
      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" пофільтр чоловік/жінка   + product");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_de : product, man_women_de : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_de : product, man_women_de : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_de : product, man_women_de : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_de : product, man_women_de : man_woman, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по одежі /взуття/ 
        // +sizes
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по одежі /взуття/ + sizes");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по category 
        // +sizes
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){        
        console.log(" по category + sizes");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по category 
        // +product
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по category + product");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_de : product, category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_de : product, category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_de : product, category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_de : product, category_de : category, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по sizes 
        // +product
        
      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" по sizes + product");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_de : product, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_de : product, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_de : product, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_de : product, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по одежі /взуття/ 
        // + чоловік / жінка / дитяче
        // + продукція

      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes == "null" || sizes == "" || sizes == undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" ппо одежі /взуття/  + product + чоловік / жінка / дитяче");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({category_de : category, man_women_de : man_woman, product_de: product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({category_de : category, man_women_de : man_woman, product_de: product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({category_de : category, man_women_de : man_woman, product_de: product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({category_de : category, man_women_de : man_woman, product_de: product, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

        // фільтр по одежі /взуття/ 
        // + чоловік / жінка / дитяче
        // + sizes

      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product == "null" || product == "" || product == undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" ппо одежі /взуття/  + sizes + чоловік / жінка / дитяче");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({category_de : category, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else  if(sort === "maxMinPrice"){
      catalog = await Shop.find({category_de : category, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({category_de : category, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({category_de : category, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // product 
        // + чоловік / жінка / дитяче
        // + sizes

      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category == "null" || category == "" || category == undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" product  + sizes + чоловік / жінка / дитяче");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_de : product, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
      else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_de : product, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_de : product, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_de : product, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // product 
        // + category
        // + sizes

      if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" product  + sizes + category");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({product_de : product, category_de : category, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({product_de : product, category_de : category, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({product_de : product, category_de : category, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({product_de : product, category_de : category, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }
        // фільтр по одежі /взуття/ 
        // + чоловік / жінка / дитяче
        // + продукція
        // + розміри

      if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
      (category !== "null" && category !== "" && category !== undefined) &&
      (product !== "null" && product !== "" && product !== undefined) &&
      (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
      (search == "null" || search == "" || search == undefined)     
      ){  
        console.log(" +4 фільтри");
      let catalog = {}
      if(sort === "minMaxPrice"){
      catalog = await Shop.find({ man_women_de : man_woman, category_de : category,product_de: product, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);
    }
    else if(sort === "maxMinPrice"){
      catalog = await Shop.find({man_women_de : man_woman, category_de : category, product_de: product, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: -1,
      })
      .limit(limit)
      .skip(skip);
    }
    else {
      catalog = await Shop.find({man_women_de : man_woman, category_de : category,product_de: product, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_euro: 1,
      })
      .limit(limit)
      .skip(skip);}
      let total = await Shop.find({ man_women_de : man_woman, category_de : category,product_de: product, sizes_de:{ $in: reg }, newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
      return res.status(200).json({ catalog, total });
    }

    catalog = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }})
    .sort({
      newPrice_euro: 1,
    })
    .limit(limit)
    .skip(skip);
    total = await Shop.find({newPrice_euro: { $gte: minPrice, $lte: maxPrice }}).count();
    return res.status(200).json({ catalog, total });
    }
    // FINISH EURO
    // UAH
    else {
      // пошук по search
        if(search !== "null" && search !== "" && search !== undefined){
        if(typeof search === "string"){regsearch.push(new RegExp(search))} else {
        for (let i = 0; i < search.length; i++) {
          regsearch[i] = new RegExp(search[i]);
        }}
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({description_de:{ $in: regsearch }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        else if(sort === "maxMinPrice"){
        catalog = await Shop.find({description_de:{ $in: regsearch }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);}
        else {
          catalog = await Shop.find({description_de:{ $in: regsearch }})
          .sort({
            newPrice_ua: 1,
          })
          .limit(limit)
          .skip(skip);}
        let total = await Shop.find({description_de:{ $in: regsearch }}).count();
        return res.status(200).json({ catalog, total });
      }

        console.log(man_woman, category, product, sizes)
        // нема фільтрів

        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
        console.log("нема фільтрів");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        else if(sort === "maxMinPrice"){
        catalog = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);}
        else {
          catalog = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
          .sort({
            newPrice_ua: 1,
          })
          .limit(limit)
          .skip(skip);}
        let total = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
      
          // фільтр по категорії : чоловіче / жіноче / дитяче 
        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
        console.log("чоловіче / жіноче / дитяче ");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({man_women_de : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
        else if(sort === "maxMinPrice"){
        catalog = await Shop.find({man_women_de : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({man_women_de : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({man_women_de : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по одежі /взутті/
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){
          console.log("фільтр по одежі /взутті/ ");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по продукція
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log("фільтр по продукція ");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_de : product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_de : product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_de : product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_de : product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по розмірам
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log("фільтр по розмірам");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else  if(sort === "maxMinPrice"){
        catalog = await Shop.find({sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по одежі /взуття/ 
          // + чоловік / жінка / дитяче
          
        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по одежі /взуття/ + чоловік / жінка / дитяче ");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({category_de : category, man_women_de : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({category_de : category, man_women_de : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({category_de : category, man_women_de : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({category_de : category, man_women_de : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по одежі /взуття/ 
          // +product
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по одежі /взуття/ + product");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_de : product, category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_de : product, category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_de : product, category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_de : product, category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр чоловік/жінка  
          // +product
          
        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" пофільтр чоловік/жінка   + product");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_de : product, man_women_de : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_de : product, man_women_de : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_de : product, man_women_de : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_de : product, man_women_de : man_woman, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по одежі /взуття/ 
          // +sizes
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по одежі /взуття/ + sizes");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по category 
          // +sizes
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){        
          console.log(" по category + sizes");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({sizes_de:{ $in: reg }, category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по category 
          // +product
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по category + product");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_de : product, category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_de : product, category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_de : product, category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_de : product, category_de : category, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по sizes 
          // +product
          
        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" по sizes + product");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_de : product, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_de : product, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_de : product, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_de : product, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по одежі /взуття/ 
          // + чоловік / жінка / дитяче
          // + продукція

        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes == "null" || sizes == "" || sizes == undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" ппо одежі /взуття/  + product + чоловік / жінка / дитяче");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({category_de : category, man_women_de : man_woman, product_de: product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({category_de : category, man_women_de : man_woman, product_de: product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({category_de : category, man_women_de : man_woman, product_de: product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({category_de : category, man_women_de : man_woman, product_de: product, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

          // фільтр по одежі /взуття/ 
          // + чоловік / жінка / дитяче
          // + sizes

        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product == "null" || product == "" || product == undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" ппо одежі /взуття/  + sizes + чоловік / жінка / дитяче");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({category_de : category, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else  if(sort === "maxMinPrice"){
        catalog = await Shop.find({category_de : category, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({category_de : category, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({category_de : category, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // product 
          // + чоловік / жінка / дитяче
          // + sizes

        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category == "null" || category == "" || category == undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" product  + sizes + чоловік / жінка / дитяче");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_de : product, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
        else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_de : product, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_de : product, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_de : product, man_women_de : man_woman, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // product 
          // + category
          // + sizes

        if((man_woman == "null" || man_woman == "" || man_woman == undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" product  + sizes + category");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({product_de : product, category_de : category, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({product_de : product, category_de : category, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({product_de : product, category_de : category, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({product_de : product, category_de : category, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }
          // фільтр по одежі /взуття/ 
          // + чоловік / жінка / дитяче
          // + продукція
          // + розміри

        if((man_woman !== "null" && man_woman !== "" && man_woman !== undefined) && 
        (category !== "null" && category !== "" && category !== undefined) &&
        (product !== "null" && product !== "" && product !== undefined) &&
        (sizes !== "null" && sizes !== "" && sizes !== undefined) &&
        (search == "null" || search == "" || search == undefined)     
        ){  
          console.log(" +4 фільтри");
        let catalog = {}
        if(sort === "minMaxPrice"){
        catalog = await Shop.find({ man_women_de : man_woman, category_de : category,product_de: product, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);
      }
      else if(sort === "maxMinPrice"){
        catalog = await Shop.find({man_women_de : man_woman, category_de : category, product_de: product, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: -1,
        })
        .limit(limit)
        .skip(skip);
      }
      else {
        catalog = await Shop.find({man_women_de : man_woman, category_de : category,product_de: product, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
        .sort({
          newPrice_ua: 1,
        })
        .limit(limit)
        .skip(skip);}
        let total = await Shop.find({ man_women_de : man_woman, category_de : category,product_de: product, sizes_de:{ $in: reg }, newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
        return res.status(200).json({ catalog, total });
      }

      catalog = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }})
      .sort({
        newPrice_ua: 1,
      })
      .limit(limit)
      .skip(skip);
      total = await Shop.find({newPrice_ua: { $gte: minPrice, $lte: maxPrice }}).count();
    return res.status(200).json({ catalog, total });
    }
    // FINISH UAH
      }
      } catch (error) {
        res.status(400).json({ message: "Invalid filters characters" });
      }
    };

module.exports = getShopByFilter;
