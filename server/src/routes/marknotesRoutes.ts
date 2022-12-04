import { isHex } from "../common/regex";
const data = require("../db");
const marknotesData = data.marknotes;
const express = require("express");
const router = express.Router();

/**
 * [GET /marknotes]
 */
router.get("/", async (req: any, res: any) => {
  try {
    let marknotes = await marknotesData.getAllMarknotes();
    return res.status(200).json(marknotes);
  } catch (e) {
    return res.status(500).json({ error: "Failed to fetch marknotes from database." });
  }
});

/**
 * [GET /marknotes/:id]
 */
router.get("/:id", async (req: any, res: any) => {
  const id = req.params.id;
  try {
    let marknote = await marknotesData.getMarknoteById(id.trim());
    return res.status(200).json(marknote);
  } catch (e) {
    return res.status(500).json({ error: "Failed to fetch marknotes from database." });
  }
});

/**
 * [POST /marknotes]
 */
router.post("/", async (req: any, res: any) => {
  let title = req.body.title;
  let color = req.body.color;
  let body = req.body.body;

  if (!title) {
    title = "";
  }
  if (!color) {
    color = "#828282";
  }
  if (!body) {
    body = "";
  }
  if (!isHex(color)) {
    return res.status(400).json({
      error: `'${color}' is not a valid hex code`,
    });
  }

  try {
    let new_marknote = await marknotesData.createMarknote(title, color, body);
    return res.status(200).json(new_marknote);
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to create new marknote.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /marknotes/:id]
 */
router.patch("/:id", async (req: any, res: any) => {
  const title = req.body.title;
  const color = req.body.color;
  const body = req.body.body;
  const favorited = req.body.favorited;
  const id = req.params.id;

  if (color && !isHex(color)) {
    return res.status(400).json({
      error: `'${color}' is not a valid hex code`,
    });
  }

  // Check if marknote exists
  let marknote;
  try {
    marknote = await marknotesData.getMarknoteById(id.trim());
    if (!marknote) {
      return res.status(400).json({
        error: `Marknote with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
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
  marknote.lastModified = Date.now()

  // Update the marknote
  try {
    let updated_marknote = await marknotesData.updateMarknoteById(
      id.trim(),
      marknote
    );
    return res.status(200).json(updated_marknote);
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to update marknote.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /marknotes/:id/:groupId]
 */
router.patch("/:id/:groupId", async (req: any, res: any) => {
  const id = req.params.id;
  const groupId = req.params.groupId;

  // Check if marknote exists
  let marknote;
  try {
    marknote = await marknotesData.getMarknoteById(id.trim());
    if (!marknote) {
      return res.status(400).json({
        error: `Marknote with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
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
        groupId.trim()
      );
    } catch (e: any) {
      return res.status(500).json({
        error: "Failed to remove group from marknote.",
        message: e.toString(),
      });
    }
  } else {
    try {
      marknote = await marknotesData.addGroupToMarknote(
        id.trim(),
        groupId.trim()
      );
    } catch (e: any) {
      return res.status(500).json({
        error: "Failed to add group to marknote.",
        message: e.toString(),
      });
    }
  }
});

/**
 * [DELETE /marknotes/:id/]
 */
router.delete("/:id", async (req: any, res: any) => {
  const id = req.params.id;

  // Check if marknote exists
  let marknote;
  try {
    marknote = await marknotesData.getMarknoteById(id.trim());
    if (!marknote) {
      return res.status(400).json({
        error: `Marknote with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to fetch marknote.",
      message: e.toString(),
    });
  }

  // Delete the marknote
  try {
    let delete_status = await marknotesData.deleteMarknoteById(id.trim());
    return res.status(200).json({ success: delete_status });
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to delete marknote.",
      message: e.toString(),
    });
  }
});

module.exports = router;
