import { ColorIds } from "../common/colors";

import data from "../db";
const marknotesData = data.marknotes;
const express = require("express");
const router = express.Router();

/**
 * [GET /user/:userId/marknotes]
 */
router.get("/user/:userId/marknotes", async (req: any, res: any) => {
  const userId = req.params.userId;
  try {
    let marknotes = await marknotesData.getAllMarknotes(userId.trim());
    return res.status(200).json(marknotes);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "Failed to fetch marknotes from database." });
  }
});

/**
 * [GET /user/:userId/marknotes/:id]
 */
router.get("/user/:userId/marknotes/:id", async (req: any, res: any) => {
  const id = req.params.id;
  const userId = req.params.userId;
  try {
    let marknote = await marknotesData.getMarknoteById(
      id.trim(),
      userId.trim()
    );
    return res.status(200).json(marknote);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "Failed to fetch marknotes from database." });
  }
});

/**
 * [POST /user/:userId/marknotes]
 */
router.post("/user/:userId/marknotes", async (req: any, res: any) => {
  const userId = req.params.userId;
  let title = req.body.title;
  let color = req.body.color;
  let body = req.body.body;

  if (!title) {
    title = "";
  }
  if (!color) {
    color = "grey";
  }
  if (!body) {
    body = "";
  }
  if (!ColorIds.includes(color)) {
    return res.status(400).json({
      error: `'${color}' is not a valid hex code`,
    });
  }

  try {
    let new_marknote = await marknotesData.createMarknote(
      userId.trim(),
      title,
      color,
      body
    );
    return res.status(200).json(new_marknote);
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to create new marknote.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /user/:userId/marknotes/:id]
 */
router.patch("/user/:userId/marknotes/:id", async (req: any, res: any) => {
  const id = req.params.id;
  const userId = req.params.userId;
  const title = req.body.title;
  const color = req.body.color;
  const body = req.body.body;
  const favorited = req.body.favorited;

  if (color && !ColorIds.includes(color)) {
    return res.status(400).json({
      error: `'${color}' is not a valid hex code`,
    });
  }

  // Check if marknote exists
  let marknote;
  try {
    marknote = await marknotesData.getMarknoteById(id.trim(), userId.trim());
    if (!marknote) {
      return res.status(400).json({
        error: `Marknote with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to fetch marknote.",
      message: e.toString(),
    });
  }

  if (title != null) {
    marknote.title = title;
  }
  if (color != null) {
    marknote.color = color;
  }
  if (body != null) {
    marknote.body = body;
  }
  if (favorited != null) {
    marknote.favorited = favorited;
  }
  marknote.lastModified = Date.now();

  // Update the marknote
  try {
    let updated_marknote = await marknotesData.updateMarknoteById(
      id.trim(),
      userId.trim(),
      marknote
    );
    return res.status(200).json(updated_marknote);
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to update marknote.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /user/:userId/marknotes/:id/:groupId]
 */
router.patch("/user/:userId/marknotes/:id/:groupId", async (req: any, res: any) => {
  const id = req.params.id;
  const groupId = req.params.groupId;
  const userId = req.params.userId;

  // Check if marknote exists
  let marknote;
  try {
    marknote = await marknotesData.getMarknoteById(id.trim(), userId.trim());
    if (!marknote) {
      return res.status(400).json({
        error: `Marknote with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to fetch marknote.",
      message: e.toString(),
    });
  }

  // If group is in marknote, remove the group, otherwise, add it
  if (marknote.groups.includes(groupId.trim())) {
    try {
      marknote = await marknotesData.removeGroupFromMarknote(
        id.trim(),
        groupId.trim(),
        userId.trim()
      );
      return res.status(200).json(marknote);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: "Failed to remove group from marknote.",
        message: e.toString(),
      });
    }
  } else {
    try {
      marknote = await marknotesData.addGroupToMarknote(
        id.trim(),
        groupId.trim(),
        userId.trim()
      );
      return res.status(200).json(marknote);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: "Failed to add group to marknote.",
        message: e.toString(),
      });
    }
  }
});

/**
 * [DELETE /user/:userId/marknotes/:id/]
 */
router.delete("/user/:userId/marknotes/:id", async (req: any, res: any) => {
  const id = req.params.id;
  const userId = req.params.userId;
  // Check if marknote exists
  let marknote;
  try {
    marknote = await marknotesData.getMarknoteById(id.trim(), userId.trim());
    if (!marknote) {
      return res.status(400).json({
        error: `Marknote with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to fetch marknote.",
      message: e.toString(),
    });
  }

  // Delete the marknote
  try {
    let delete_status = await marknotesData.deleteMarknoteById(
      id.trim(),
      userId.trim()
    );
    return res.status(200).json({ success: delete_status });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to delete marknote.",
      message: e.toString(),
    });
  }
});

module.exports = router;
