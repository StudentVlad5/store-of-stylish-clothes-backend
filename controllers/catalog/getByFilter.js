const { constructorResponse } = require("../../helpers");
const { Catalog } = require("../../models");

const getByFilter = async (req, res, next) => {
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
    } = req.query;
    console.log("REQ.PARAMS:", req.params);
    const limit = perPage * 1;
    const skip = perPage * (page - 1);

    let filterCatalog;
    let filterCatalog1 = [];    
    let filterCatalog2 = [];
    let filterCatalog3 = [];
    let filterCatalog4 = [];

    if (search !== "null" && search !== "" && search !== undefined &&
     sizes !== "null" && sizes !== "" && sizes !== undefined) {
      filterCatalog = await Catalog.find({$and:[{description:{ $regex: search }}, {sizes:{ $regex: sizes }}]});
    } 
    else if (search !== "null" && search !== "" && search !== undefined) {
      filterCatalog = await Catalog.find({$and:[{description:{ $regex: search }}]});
    } 
    else if (sizes !== "null" && sizes !== "" && sizes !== undefined) {
      filterCatalog = await Catalog.find({$and:[{sizes:{ $regex: sizes}}]});
    } else {
      filterCatalog = await Catalog.find();
    }
      
    console.log("filterCatalog", filterCatalog.length);

    if (man_woman !== "null" && man_woman !== "" && man_woman !== undefined) {
      console.log("man_woman", typeof man_woman);
      let checkfilter1;
      typeof man_woman === 'string' ? checkfilter1 = [man_woman] : checkfilter1 = [...man_woman];
      console.log("checkfilter1", checkfilter1);

      filterCatalog.map((it) =>
        {checkfilter1.map(i => {if(it.categories.includes(i)){filterCatalog1.push(it)}})}
      );
    } else {
      filterCatalog1 = Object.assign(filterCatalog);
    }
    console.log("filterCatalog1", filterCatalog1.length);

    if (category !== "null" && category !== "" && category !== undefined) {
      console.log("category", [category]);
      let checkfilter2;
      typeof category === 'string' ? checkfilter2 = [category] : checkfilter2 = [...category];
      console.log("checkfilter2", checkfilter2);

      filterCatalog1.map((it) =>
        {checkfilter2.map(i => {if(it.categories.includes(i)){filterCatalog2.push(it)}})}
      );
    } else {
      filterCatalog2 = Object.assign(filterCatalog1);
    }
    console.log("filterCatalog2", filterCatalog2.length);

    if (product !== "null" && product !== "" && product !== undefined) {
      console.log("product", [product]);
      let checkfilter3;
      typeof product === 'string' ? checkfilter3 = [product] : checkfilter3 = [...product];
      console.log("checkfilter3", checkfilter3);

      filterCatalog2.map((it) =>
        {checkfilter3.map(i => {if(it.categories.includes(i)){filterCatalog3.push(it)}})}
      );
    } else {
      filterCatalog3 = Object.assign(filterCatalog2);
    }
    console.log("filterCatalog3", filterCatalog3.length);

    if (
      minPrice !== 0 &&
      maxPrice !== 5000 &&
      minPrice !== "" &&
      minPrice !== undefined &&
      maxPrice !== "" &&
      maxPrice !== undefined
    ) {
      console.log("minPrice", minPrice);
      console.log("maxPrice", maxPrice);
      filterCatalog3.map(
        (it) => {if(minPrice < it.price &&  it.price < maxPrice){
          filterCatalog4.push(it)}
        }
      );
    } else {
      filterCatalog4 = Object.assign(filterCatalog3);
    }
   
    console.log(filterCatalog4.length);
  
    if (sort !== "null" && sort !== "" && sort !== undefined) {
      if (sort === 'minMaxPrice') {
        filterCatalog4.sort((a,b)=>{
          if(a.price>b.price){return 1} 
          else if(a.price<=b.price){return -1} 
          else return 0        
        })
      }

      if (sort === 'maxMinPrice') {
        filterCatalog4.sort((a,b)=>{
          if(a.price<b.price){return 1} 
          else if(a.price>=b.price){return -1} 
          else return 0        
        })
      }
    }
      console.log("filterCatalog4", filterCatalog4.length);

    if (isPagination) {
      total = filterCatalog4.length;
      let filterCatalog = [];
      filterCatalog4.map((it, ind) => {
        if (+skip <= ind && ind < skip + limit) {
          filterCatalog.push(it);
        }
      });
      let catalog = [...filterCatalog];
      return res.status(200).json({ catalog, total });
    } else {
      let total = await Catalog.find().count();
      let catalog = await Catalog.find().limit(limit).skip(skip);
      res.status(200).json({ catalog, total });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid filters characters" });
  }
};

module.exports = getByFilter;
