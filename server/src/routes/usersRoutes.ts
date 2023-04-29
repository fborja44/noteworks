import { ColorIds } from "../common/colors";

import data from "../db";
const express = require("express");
const usersData = data.users;
const router = express.Router();

/**
 * [DELETE /user/:userId/all]
 */
router.delete("/user/:userId/all", async (req: any, res: any) => {
  const userId = req.params.userId;
  // Delete all notes
  try {
    const delete_status = await usersData.deleteAllNotes(userId.trim());
    return res.status(200).json({ status: delete_status });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      status: false,
      error: "Failed to delete all notes.",
      message: e.toString(),
    });
  }
});

module.exports = router;
