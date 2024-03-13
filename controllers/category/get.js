const { ValidationError } = require("../../helpers");
const { Category, Catalog } = require("../../models");

const get = async (req, res, next) => {
  const today = new Date().getDate();
  try {
    const catalog = await Catalog.find();
    const categoryFilters = await Category.find();
    if( today - new Date(categoryFilters[0]?.createdAt).getDate() > 7) {
    let filterParams = {
      level_1: [],
      level_2: [],
      level_3: [],
      level_4: {},
    };
    if (catalog) {
      catalog.map((it) => {
        let level_1 = it.categories.split(" > ")[0];
        let level_2 = it.categories.split(" > ")[1];
        let level_3 = it.categories.split(" > ")[2];
        let level_4 = it.sizes.split(',');
        if (level_1 && !filterParams.level_1.includes(level_1)) {
          filterParams.level_1.push(level_1);
        }
        if (level_2 && !filterParams.level_2.includes(level_2)) {
          filterParams.level_2.push(level_2);
        }
        if (level_3 && !filterParams.level_3.includes(level_3)) {
          filterParams.level_3.push(level_3);
        }
        if (level_4) {
          if(!filterParams.level_4[`${level_2}`]){filterParams.level_4[level_2] =[]}};
          level_4.map(it => {if(!filterParams.level_4[level_2].includes(it)){
            filterParams.level_4[level_2].push(it)}})  
      });
    }
    await Category.findOneAndDelete({ _id: categoryFilters[0]?._id.toString()
    });
    const category = await Category.create(filterParams);
    res.status(200).json(category);
  }
  res.status(200).json(categoryFilters);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = get;
