const { ValidationError } = require("../../helpers");
const { Orders } = require("../../models");

const getById = async (req, res, next) => {
  const { page = 1, perPage = 5 } = req.query;
  const user_id = req.params.id;
  try {
    let orders = []
    if(user_id !== ''){orders = await Orders.find({ user_id })};
    let array=[];
    orders.map(it=>array.push(it.createdAt));
    array.sort(function(a, b) {
      var c = new Date(a);
      var d = new Date(b);
      return d-c;
  });
  let newOrders = [];
        array.forEach(it=>orders.map(item=>{if(item.createdAt === it){newOrders.push(item)}}));
    let total = orders.length;
    let catalog = [];
    for (
      i = page * perPage - perPage;
      i < page * perPage && i < newOrders.length;
      i++
    ) {
      catalog.push(newOrders[i]);
    }
    res.status(200).json({ data: catalog, total });
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getById;
