const { ValidationError } = require("../../helpers");
const { Category_ua, Catalog } = require("../../models");

const get_ua = async (req, res, next) => {
  const today = new Date().getDate();
  try {
    const categoryFilters = await Category_ua.find();
    // if( categoryFilters && (today - new Date(categoryFilters[0]?.createdAt).getDate() > 7)) {
    // const catalog = await Catalog.find();
    // let filterParams = {
    //   level_1: [],
    //   level_2: [],
    //   level_3: {},
    //   level_4: {},
    // };
    // if (catalog) {
    //   catalog.map((it) => {
    //     let level_1 = it.categories.split(" > ")[0];
    //     let level_2 = it.categories.split(" > ")[1];
    //     let level_3 = [it.categories.split(" > ")[2]];
    //     let level_4 = it.sizes.split(",");
    //     if (level_1 && !filterParams.level_1.includes(level_1)) {
    //       filterParams.level_1.push(level_1);
    //     }
    //     if (level_2 && !filterParams.level_2.includes(level_2)) {
    //       filterParams.level_2.push(level_2);
    //     }
    //     if (level_3) {
    //       if (!filterParams.level_3[`${level_2}`]) {
    //         filterParams.level_3[level_2] = [];
    //       }
    //     }
    //     level_3.map((it) => {
    //       if (!filterParams.level_3[level_2].includes(it)) {
    //         filterParams.level_3[level_2].push(it);
    //       }
    //     });
    //     if (level_4) {
    //       if (!filterParams.level_4[`${level_2}`]) {
    //         filterParams.level_4[level_2] = [];
    //       }
    //     }
    //     level_4.map((it) => {
    //       if (!filterParams.level_4[level_2].includes(it)) {
    //         filterParams.level_4[level_2].push(it);
    //       }
    //     });
    //   });
    // }
    // await Category_ua.findOneAndDelete({
    //   _id: categoryFilters[0]?._id.toString(),
    // });
    // const category = await Category_ua.create(filterParams);
    // res.status(200).json(category);
    // }
    res.status(200).json(categoryFilters);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = get_ua;
