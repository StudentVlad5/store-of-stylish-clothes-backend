const { Event } = require("../../models");

const getUserEvents = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await Event.find(
      {},
      { CreateId: id, StartTime: 1, Subject: 1, OwnerId: 1 }
    );
    // const newResponse = dataFilter(user, userMainField);
    res.status(200).json(user);
  } catch (error) {
    throw new WrongIdError(error.message);
  }
};

module.exports = getUserEvents;
