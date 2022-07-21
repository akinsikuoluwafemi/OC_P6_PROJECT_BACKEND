// const Sauce = require("../models/sauce");
// const fs = require("fs");
// const User = require("../models/user");

// exports.createSauce = async (req, res, next) => {
//   try {
//     const url = req.protocol + "://" + req.get("host");
//     console.log(req.body);

//     req.body.sauce = JSON.parse(req.body.sauce);

//     // const sauce = new Sauce({
//     //   name: req.body.sauce.name,
//     //   manufacturer: req.body.sauce.manufacturer,
//     //   description: req.body.sauce.description,
//     //   heat: req.body.sauce.heat,
//     //   likes: req.body.sauce.likes,
//     //   dislikes: req.body.sauce.dislikes,
//     //   imageUrl: url + "/images" + req.file.filename,
//     //   mainPepper: req.body.sauce.mainPepper,
//     //   usersLiked: req.body.sauce.usersLiked,
//     //   usersDisliked: req.body.sauce.usersDisliked,
//     //   userId: req.body.sauce.userId,
//     // });

//     const sauce = new Sauce({
//       name: req.body.name,
//       manufacturer: req.body.manufacturer,
//       description: req.body.description,
//       heat: req.body.heat,
//       likes: req.body.likes,
//       dislikes: req.body.dislikes,
//       imageUrl: req.body.imageUrl,
//       mainPepper: req.body.mainPepper,
//       usersLiked: req.body.usersLiked,
//       usersDisliked: req.body.usersDisliked,
//       userId: req.body.userId,
//     });
//     const newSauce = await sauce.save();
//     if (newSauce) {
//       res.status(201).json({
//         message: "Sauce saved successfully",
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       error: error.message,
//     });
//   }
// };

// exports.getAllSauce = async (req, res, next) => {
//   try {
//     const allSauce = await Sauce.find({});
//     console.log("auth", req.auth);
//     if (allSauce) {
//       res.status(200).json(allSauce);
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getOneSauce = async (req, res, next) => {
//   try {
//     const sauce = await Sauce.findOne({ _id: req.params.id });
//     if (sauce) {
//       res.status(200).json(sauce);
//     }
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

// // exports.modifyOneSauce = async (req, res, next) => {
// //   try {
// //     const sauce = {
// //       _id: req.params.id,
// //       name: req.body.name,
// //       manufacturer: req.body.manufacturer,
// //       description: req.body.description,
// //       heat: req.body.heat,
// //       likes: req.body.likes,
// //       dislikes: req.body.dislikes,
// //       imageUrl: req.body.imageUrl,
// //       mainPepper: req.body.mainPepper,
// //       usersLiked: req.body.usersLiked,
// //       usersDisliked: req.body.usersDisliked,
// //       userId: req.body.userId,
// //     };
// //     const updatedSauce = await Sauce.updateOne({ _id: req.params.id }, sauce);
// //     console.log(updatedSauce);
// //     // make sure anoother user can't edit another users sauce
// //     // find the sauce first and check if the userId is equal to the userId in the req.auth.userId
// //     if (updatedSauce) {
// //       res.status(200).json({
// //         message: "Sauce updated successfully",
// //       });
// //     }
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // };
// exports.modifyOneSauce = async (req, res, next) => {
//   try {
//     const existingSauce = await Sauce.findOne({ _id: req.params.id });
//     if (!existingSauce) {
//       return res.status(404).json({
//         error: "No sauce found",
//       });
//     }

//     // make sure another user can't edit another users sauce
//     if (existingSauce.userId !== req.auth.userId) {
//       return res.status(400).json({
//         error: "Unauthorized request",
//       });
//     }
//     const sauce = {
//       _id: req.params.id,
//       name: req.body.name,
//       manufacturer: req.body.manufacturer,
//       description: req.body.description,
//       heat: req.body.heat,
//       likes: req.body.likes,
//       dislikes: req.body.dislikes,
//       imageUrl: req.body.imageUrl,
//       mainPepper: req.body.mainPepper,
//       usersLiked: req.body.usersLiked,
//       usersDisliked: req.body.usersDisliked,
//       userId: req.body.userId,
//     };
//     const updatedSauce = await Sauce.updateOne({ _id: req.params.id }, sauce);
//     console.log(updatedSauce);
//     // make sure anoother user can't edit another users sauce
//     // find the sauce first and check if the userId is equal to the userId in the req.auth.userId
//     if (updatedSauce) {
//       res.status(200).json({
//         message: "Sauce updated successfully",
//       });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.deleteSauce = async (req, res, next) => {
//   try {
//     const sauce = await Sauce.findOne({ _id: req.params.id });
//     // if there is no sauce return a 404 not found error
//     if (!sauce) {
//       return res.status(404).json({
//         error: "No sauce found",
//       });
//       //   making sure only the user that created the thing can delete it
//     }
//     if (sauce.userId !== req.auth.userId) {
//       console.log(sauce.userId);
//       console.log(req.auth.userId);

//       return res.status(400).json({
//         error: "Unauthorized request",
//       });
//     }
//     try {
//       const deletedSauce = await Sauce.deleteOne({ _id: req.params.id });
//       if (deletedSauce) {
//         res.status(200).json({ message: "Deleted Successfully" });
//       }
//     } catch (error) {
//       res.status(404).json({
//         error: error.message,
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       error: error.message,
//     });
//   }
// };

// exports.likeASauce = async (req, res, next) => {
//   try {
//     const LIKE = req.body.like === 1;
//     const DEFAULT = req.body.like === 0;
//     const DIS_LIKE = req.body.like === -1;

//     const sauceBeingLiked = await Sauce.findById({ _id: req.params.id });
//     const currentUser = await User.findById({ _id: req.body.userId });

//     // console.log(sauceBeingLiked);
//     // console.log(currentUser);

//     if (LIKE) {
//       if (
//         !sauceBeingLiked.usersLiked.includes(req.body.userId) &&
//         sauceBeingLiked.usersDisliked.includes(req.body.userId)
//       ) {
//         await sauceBeingLiked.updateOne({
//           $inc: { dislikes: -1 },
//         });
//         await sauceBeingLiked.updateOne({
//           $pull: { usersDisliked: req.body.userId },
//         });
//       }
//       //if the current user has not liked the sauce before
//       if (!sauceBeingLiked.usersLiked.includes(req.body.userId)) {
//         await sauceBeingLiked.updateOne({
//           $push: { usersLiked: req.body.userId },
//           $inc: { likes: 1 },
//         });
//         // console.log("this is running again");
//         return res.status(200).json("sauce has been liked");
//         // I have not liked it, I have disliked it, and I want to like it again
//       } else {
//         res.status(500).json("sauce has been disliked before");
//       }
//     } else if (DEFAULT) {
//       if (sauceBeingLiked.usersLiked.includes(req.body.userId)) {
//         // remove the userId from the userLiked Arr
//         await sauceBeingLiked.updateOne({
//           $pull: { usersLiked: req.body.userId },
//         });
//         // reduce the likes
//         await sauceBeingLiked.updateOne({
//           $inc: { likes: -1 },
//         });
//         res.status(200).json("like has been cancelled");
//       }
//       if (sauceBeingLiked.usersDisliked.includes(req.body.userId)) {
//         await sauceBeingLiked.updateOne({
//           $pull: { usersDisliked: req.body.userId },
//         });
//         await sauceBeingLiked.updateOne({
//           $inc: { dislikes: -1 },
//         });
//         res.status(200).json("dislike have been cancelled");
//       }
//     } else if (DIS_LIKE) {
//       if (sauceBeingLiked.usersLiked.includes(req.body.userId)) {
//         await sauceBeingLiked.updateOne({
//           $pull: { usersLiked: req.body.userId },
//         });
//         await sauceBeingLiked.updateOne({
//           $push: { usersDisliked: req.body.userId },
//         });

//         await sauceBeingLiked.updateOne({
//           $inc: { likes: -1 },
//         });

//         await sauceBeingLiked.updateOne({
//           $inc: { dislikes: 1 },
//         });

//         return res.status(200).json("sauce has been disliked");
//       }
//       // you ave not liked it before but just want to dislike it
//       if (!sauceBeingLiked.usersLiked.includes(req.body.userId)) {
//         await sauceBeingLiked.updateOne({
//           $push: { usersDisliked: req.body.userId },
//         });

//         await sauceBeingLiked.updateOne({
//           $inc: { dislikes: 1 },
//         });
//         return res.status(200).json("sauce has been disliked");
//       } else {
//         return res.status(500).json("sauce has already been disliked ");
//       }
//     }
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };

const Sauce = require("../models/sauce");
const fs = require("fs");

exports.createSauce = async (req, res, next) => {
  try {
    const url = req.protocol + "://" + req.get("host");

    req.body.sauce = JSON.parse(req.body.sauce);
    console.log(req.body.sauce);

    const sauce = new Sauce({
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      heat: req.body.sauce.heat,
      imageUrl: url + "/images" + req.file.filename,
      mainPepper: req.body.sauce.mainPepper,
      userId: req.body.sauce.userId,
    });

    await sauce.save();
    res.status(201).json({
      message: "Sauce saved successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getAllSauce = async (req, res, next) => {
  try {
    const allSauce = await Sauce.find({});
    console.log("auth", req.auth);
    if (allSauce) {
      res.status(200).json(allSauce);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOneSauce = async (req, res, next) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    if (!sauce) {
      return res.status(404).json("not found");
    }
    res.status(200).json(sauce);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.modifyOneSauce = async (req, res, next) => {
  try {
    let sauce = new Sauce({ _id: req.params.id });

    // if I am editing a new
    if (req.file) {
      //if you are changing the file, put the new file, if not, sue the req.body.imageUrl(already existing image)
      const url = req.protocol + "://" + req.get("host");
      console.log(req.body.sauce);

      req.body.sauce = JSON.parse(req.body.sauce);

      sauce = {
        _id: req.params.id,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        heat: req.body.sauce.heat,
        imageUrl: url + "/images/" + req.file.filename,
        mainPepper: req.body.sauce.mainPepper,
      };
    } else {
      sauce = {
        _id: req.params.id,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        heat: req.body.heat,
        imageUrl: req.body.imageUrl,
        mainPepper: req.body.mainPepper,
      };
    }

    await Sauce.updateOne({ _id: req.params.id }, sauce);
    // make sure another user can't edit another users sauce
    // find the sauce first and check if the userId is equal to the userId in the req.auth.userId
    res.status(201).json({
      message: "Sauce updated successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSauce = async (req, res, next) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    // if there is no sauce return a 404 not found error
    if (!sauce) {
      return res.status(404).json({
        error: "No sauce found",
      });
      //   making sure only the user that created the thing can delete it
    }
    if (sauce.userId !== req.auth.userId) {
      console.log(sauce.userId);
      console.log(req.auth.userId);

      return res.status(400).json({
        error: "Unauthorized request",
      });
    }
    try {
      const filename = sauce.imageUrl.split("/images")[1];

      fs.unlink("images/" + filename, async () => {
        await Sauce.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Deleted Successfully" });
      });
    } catch (error) {
      res.status(404).json({
        error: error.message,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.likeASauce = async (req, res, next) => {
  try {
    const LIKE = req.body.like === 1;
    const DEFAULT = req.body.like === 0;
    const DIS_LIKE = req.body.like === -1;

    const sauceBeingLiked = await Sauce.findById({ _id: req.params.id });
    // const currentUser = await User.findById({ _id: req.body.userId });

    // console.log(sauceBeingLiked);
    // console.log(currentUser);

    if (LIKE) {
      if (
        !sauceBeingLiked.usersLiked.includes(req.body.userId) &&
        sauceBeingLiked.usersDisliked.includes(req.body.userId)
      ) {
        await sauceBeingLiked.updateOne({
          $inc: { dislikes: -1 },
        });
        await sauceBeingLiked.updateOne({
          $pull: { usersDisliked: req.body.userId },
        });
      }
      //if the current user has not liked the sauce before
      if (!sauceBeingLiked.usersLiked.includes(req.body.userId)) {
        await sauceBeingLiked.updateOne({
          $push: { usersLiked: req.body.userId },
          $inc: { likes: 1 },
        });
        // console.log("this is running again");
        return res.status(200).json("sauce has been liked");
        // I have not liked it, I have disliked it, and I want to like it again
      } else {
        res.status(500).json("sauce has been liked before");
      }
    } else if (DEFAULT) {
      if (sauceBeingLiked.usersLiked.includes(req.body.userId)) {
        // remove the userId from the userLiked Arr
        await sauceBeingLiked.updateOne({
          $pull: { usersLiked: req.body.userId },
        });
        // reduce the likes
        await sauceBeingLiked.updateOne({
          $inc: { likes: -1 },
        });
        res.status(200).json("like has been cancelled");
      }
      if (sauceBeingLiked.usersDisliked.includes(req.body.userId)) {
        await sauceBeingLiked.updateOne({
          $pull: { usersDisliked: req.body.userId },
        });
        await sauceBeingLiked.updateOne({
          $inc: { dislikes: -1 },
        });
        res.status(200).json("dislike have been cancelled");
      }
    } else if (DIS_LIKE) {
      if (sauceBeingLiked.usersLiked.includes(req.body.userId)) {
        await sauceBeingLiked.updateOne({
          $pull: { usersLiked: req.body.userId },
        });
        await sauceBeingLiked.updateOne({
          $push: { usersDisliked: req.body.userId },
        });

        await sauceBeingLiked.updateOne({
          $inc: { likes: -1 },
        });

        await sauceBeingLiked.updateOne({
          $inc: { dislikes: 1 },
        });

        return res.status(200).json("sauce has been disliked");
      }
      // you ave not liked it before but just want to dislike it
      if (!sauceBeingLiked.usersLiked.includes(req.body.userId)) {
        await sauceBeingLiked.updateOne({
          $push: { usersDisliked: req.body.userId },
        });

        await sauceBeingLiked.updateOne({
          $inc: { dislikes: 1 },
        });
        return res.status(200).json("sauce has been disliked");
      } else {
        return res.status(500).json("sauce has already been disliked ");
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
