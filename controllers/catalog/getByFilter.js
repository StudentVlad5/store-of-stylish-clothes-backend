const { constructorResponse } = require("../../helpers");
const { Catalog } = require("../../models");

const getByFilter = async (req, res, next) => {
  try {
    const isPagination = req.query.page;
    let {
      man_woman,
      category,
      maxPrice,
      minPrice = 0,
      product,
      sizes,
      page = 1,
      perPage = 12,
    } = req.query;
    console.log("REQ.PARAMS:", req.params);
    const limit = perPage * 1;
    const skip = perPage * (page - 1);
    let total = await Catalog.find().count();
    let catalog = await Catalog.find().limit(limit).skip(skip);
    let filterCatalog = await Catalog.find();
    let filterCatalog1 = [];    
    let filterCatalog2 = [];
    let filterCatalog3 = [];
    let filterCatalog4 = [];
    let filterCatalog5 = [];
    const constructorData = {
      pagination: isPagination,
      total,
      perPage,
      page,
    };

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

    if (sizes !== "null" && sizes !== "" && sizes !== undefined) {
      console.log("sizes", [sizes]);
      let checkfilter4;
      typeof sizes === 'string' ? checkfilter4 = [sizes] : checkfilter4 = [...sizes];
      console.log("checkfilter4", checkfilter4);

      filterCatalog3.map((it) =>
        {checkfilter4.map(i => {if(it.sizes.includes(i)){filterCatalog4.push(it)}})}
      );
    } else {
      filterCatalog4 = Object.assign(filterCatalog3);
    }
    console.log("filterCatalog4", filterCatalog4.length);

    if (
      minPrice !== "null" &&
      maxPrice !== "null" &&
      minPrice !== "" &&
      minPrice !== undefined &&
      maxPrice !== "" &&
      maxPrice !== undefined
    ) {
      console.log("minPrice", minPrice);
      console.log("maxPrice", maxPrice);
      filterCatalog4.map(
        (it) => {if(minPrice < it.price &&  it.price < maxPrice){
          filterCatalog5.push(it)}
        }
      );
    } else {
      filterCatalog5 = Object.assign(filterCatalog4);
    }
    console.log("filterCatalog5", filterCatalog5.length);
    
    // console.log(filterCatalog6.length);
    // if (search) {
    //   total = await Catalog.find({
    //     name: { $regex: search },
    //   }).count();
    //   constructorData.total = total;

    //   const catalog = await Catalog.find({
    //     name: { $regex: search },
    //   });

    //   const group = await Catalog.find({
    //     typeOfPlants: { $regex: search },
    //   });

    //   // console.log('SEARCH ~products:', catalog);
    //   // console.log('SEARCH ~total products:', total);
    //   // console.log('SEARCH ~group:', group);

    //   res.status(200).json({ catalog, total, group });
    // }

    // if (sort) {
    //   total = await Catalog.find({ ...filterConstructor }).count();
    //   constructorData.total = total;

    //   if (sort === 'rating') {
    //     catalog = await Catalog.find({ ...filterConstructor })
    //       .sort({
    //         rating: -1,
    //       })
    //       .limit(limit)
    //       .skip(skip);
    //   }

    //   if (sort === 'minMaxPrice') {
    //     catalog = await Catalog.find({ ...filterConstructor })
    //       .sort({
    //         currentPrice: 1,
    //       })
    //       .limit(limit)
    //       .skip(skip);
    //   }

    //   if (sort === 'maxMinPrice') {
    //     catalog = await Catalog.find({ ...filterConstructor })
    //       .sort({
    //         currentPrice: -1,
    //       })
    //       .limit(limit)
    //       .skip(skip);
    //   }

    //   if (sort === 'discount') {
    //     catalog = await Catalog.find({ ...filterConstructor })
    //       .sort({
    //         discount: -1,
    //       })
    //       .limit(limit)
    //       .skip(skip);
    //   }

    //   if (sort === 'name') {
    //     catalog = await Catalog.find({ ...filterConstructor })
    //       .sort({
    //         name: 1,
    //       })
    //       .limit(limit)
    //       .skip(skip);
    //   }

    //   return res.status(200).json({ catalog, total });
    // }

    if (isPagination) {
      total = filterCatalog5.length;
      let filterCatalog6 = [];
      filterCatalog5.map((it, ind) => {
        if (+skip <= ind && ind < skip + limit) {
          filterCatalog6.push(it);
        }
      });
      catalog = [...filterCatalog6];

      return res.status(200).json({ catalog, total });
    } else {
      res.status(200).json({ catalog, total });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid filters characters" });
  }
};

module.exports = getByFilter;
