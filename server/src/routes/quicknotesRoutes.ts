import { ColorIds } from "../common/colors";

const data = require("../db");
const quicknotesData = data.quicknotes;
const express = require("express");
const router = express.Router();

/**
 * [GET /quicknotes]
 */
router.get("/", async (req: any, res: any) => {
  try {
    let quicknotes = await quicknotesData.getAllQuicknotes();
    return res.status(200).json(quicknotes);
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Failed to fetch quicknotes from database." });
  }
});

/**
 * [GET /quicknotes/:id]
 */
router.get("/:id", async (req: any, res: any) => {
  const id = req.params.id;
  try {
    let quicknote = await quicknotesData.getQuicknoteById(id.trim());
    return res.status(200).json(quicknote);
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Failed to fetch quicknotes from database." });
  }
});

/**
 * [POST /quicknotes]
 */
router.post("/", async (req: any, res: any) => {
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
  if (title.length > 30) {
    return res.status(400).json({
      error: "Title length cannot exceed 30 characters",
    });
  }
  if (body.length > 300) {
    return res.status(400).json({
      error: "Body length cannot exceed 300 characters",
    });
  }
  if (!ColorIds.includes(color)) {
    return res.status(400).json({
      error: `'${color}' is not a valid hex code`,
    });
  }

  try {
    let new_quicknote = await quicknotesData.createQuicknote(
      title,
      color,
      body
    );
    return res.status(200).json(new_quicknote);
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to create new quicknote.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /quicknotes/:id]
 */
router.patch("/:id", async (req: any, res: any) => {
  const id = req.params.id;
  const title = req.body.title;
  const color = req.body.color;
  const favorited = req.body.favorited;
  const body = req.body.body;

  if (title && title.length > 30) {
    return res.status(400).json({
      error: "Title length cannot exceed 30 characters",
    });
  }
  if (body && body.length > 300) {
    return res.status(400).json({
      error: "Body length cannot exceed 300 characters",
    });
  }
  if (color && !ColorIds.includes(color)) {
    return res.status(400).json({
      error: `'${color}' is not a valid hex code`,
    });
  }

  // Check if quicknote exists
  let quicknote;
  try {
    quicknote = await quicknotesData.getQuicknoteById(id.trim());
    if (!quicknote) {
      return res.status(400).json({
        error: `Quicknote with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to fetch quicknote.",
      message: e.toString(),
    });
  }

  if (title != null) {
    quicknote.title = title;
  }
  if (color != null) {
    quicknote.color = color;
  }
  if (body != null) {
    quicknote.body = body;
  }
  if (favorited != null) {
    quicknote.favorited = favorited;
  }
  quicknote.lastModified = Date.now();

  // Update the quicknote
  try {
    let updated_quicknote = await quicknotesData.updateQuicknoteById(
      id.trim(),
      quicknote
    );
    return res.status(200).json(updated_quicknote);
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to update quicknote.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /quicknotes/:id/:groupId]
 */
router.patch("/:id/:groupId", async (req: any, res: any) => {
  const id = req.params.id;
  const groupId = req.params.groupId;

  // Check if quicknote exists
  let quicknote;
  try {
    quicknote = await quicknotesData.getQuicknoteById(id.trim());
    if (!quicknote) {
      return res.status(400).json({
        error: `Quicknote with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to fetch quicknote.",
      message: e.toString(),
    });
  }

  // If group is in quicknote, remove the group, otherwise, add it
  if (quicknote.groups.includes(groupId.trim())) {
    try {
      quicknote = await quicknotesData.removeGroupFromQuicknote(
        id.trim(),
        groupId.trim()
      );
      return res.status(200).json(quicknote);
    } catch (e: any) {
      return res.status(500).json({
        error: "Failed to remove group from quicknote.",
        message: e.toString(),
      });
    }
  } else {
    try {
      quicknote = await quicknotesData.addGroupToQuicknote(
        id.trim(),
        groupId.trim()
      );
      return res.status(200).json(quicknote);
    } catch (e: any) {
      return res.status(500).json({
        error: "Failed to add group to quicknote.",
        message: e.toString(),
      });
    }
  }
});

/**
 * [DELETE /quicknotes/:id/]
 */
router.delete("/:id", async (req: any, res: any) => {
  const id = req.params.id;

  // Check if quicknote exists
  let quicknote;
  try {
    quicknote = await quicknotesData.getQuicknoteById(id.trim());
    if (!quicknote) {
      return res.status(400).json({
        error: `Quicknote with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to fetch quicknote.",
      message: e.toString(),
    });
  }

  // Delete the quicknote
  try {
    let delete_status = await quicknotesData.deleteQuicknoteById(id.trim());
    return res.status(200).json({ success: delete_status });
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to delete quicknote.",
      message: e.toString(),
    });
  }
});

module.exports = router;
